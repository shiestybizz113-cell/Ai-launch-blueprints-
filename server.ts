import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Stripe from "stripe";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

let stripeClient: Stripe | null = null;
function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY environment variable is required');
    }
    stripeClient = new Stripe(key);
  }
  return stripeClient;
}

let geminiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    geminiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return geminiClient;
}

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, 
  max: 100, 
  message: "Too many requests from this IP, please try again after an hour"
});

async function startServer() {
  const app = express();
  app.set("trust proxy", 1);
  const PORT = 3000;

  // Stripe Webhook (MUST be before body parser)
  app.post("/api/webhooks/stripe", express.raw({ type: "application/json" }), (req, res) => {
    const sig = req.headers["stripe-signature"];
    if (!process.env.STRIPE_WEBHOOK_SECRET || !sig) {
      return res.status(400).send("Webhook Error: Missing configuration");
    }

    try {
      const event = getStripe().webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );

      if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        console.log("Payment successful for:", session.customer_email);
        // Here you would update your database (e.g. Firebase or Postgres)
        // adding credits to the user.
      }

      res.json({ received: true });
    } catch (err: any) {
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  });

  app.use(express.json());

  // API Routes
  app.use("/api", apiLimiter);

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/create-payment-intent", async (req, res) => {
    const { amount, currency } = req.body;
    try {
      const paymentIntent = await getStripe().paymentIntents.create({
        amount: Math.round(amount * 100), // convert to cents
        currency: currency || "usd",
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/gemini/optimize-blueprint", async (req, res) => {
    const { text, sectionName } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: "No text strategy provided to analyze." });
    }

    try {
      if (!process.env.GEMINI_API_KEY) {
        const mockResponse = `### 🌟 AI Strategic Optimization (Simulated Output)
**Section:** ${sectionName || "GTM Draft Blueprint"}

**Optimized Core Directions:**
1. **Dynamic Execution Loop**: Refined user's target notes ("*${text.trim()}*") into operational metrics targeting rapid scale-up.
2. **Mitigate Implementation Friction**: Standardize roles across indie and enterprise teams using synchronized checklists.
3. **Publishing Readiness**: Clear compliance logs of unvetted assumptions across operational parameters.

*Pro-tip: Connect your GEMINI_API_KEY in the Settings or Secrets dashboard to leverage real live-model generation!*`;
        return res.json({ optimized: mockResponse, isMock: true });
      }

      const client = getGemini();
      const prompt = `You are an elite product launch advisor and GTM expert.
Optimize the following draft strategy notes for the blueprint chapter named "${sectionName || "AI Strategy Outline"}".
Provide a professional, actionable, and elegant go-to-market plan of 3 core recommendations backed by the principles of high-velocity growth.

Draft Notes:
"${text}"

Return standard polished Markdown format, omitting any greeting or generic commentary. Include an elegant 🌟 icon at the top of recommendations.`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          temperature: 0.7,
        }
      });

      const optimizedText = response.text || "Failed to generate optimized strategy.";
      res.json({ optimized: optimizedText, isMock: false });
    } catch (error: any) {
      console.error("Gemini optimization error:", error);
      res.json({
        optimized: `### 🌟 Strategist's Core Advisory Re-routing
- Checked your input: "${text}"
- Set up or verify your API key limits in your environmental variables context safely.
- **Top Advice**: Integrate client-facing modules on a high-density, single-screen dashboard to ensure maximum visibility of stats.`,
        isMock: true,
        error: error.message
      });
    }
  });

  // Generic Gemini proxy. Keeps the API key server-side — the browser never
  // receives GEMINI_API_KEY. Accepts the same { model, contents, config } shape
  // the @google/genai SDK uses and returns the text + candidates.
  app.post("/api/gemini/generate", async (req, res) => {
    const { model, contents, config } = req.body ?? {};
    if (!model || !contents) {
      return res.status(400).json({ error: "`model` and `contents` are required." });
    }
    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({ error: "GEMINI_API_KEY is not configured on the server." });
    }
    try {
      const client = getGemini();
      const response = await client.models.generateContent({ model, contents, config });
      res.json({ text: response.text ?? "", candidates: response.candidates ?? [] });
    } catch (error: any) {
      console.error("Gemini generate error:", error);
      res.status(500).json({ error: error.message || "Gemini request failed." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
