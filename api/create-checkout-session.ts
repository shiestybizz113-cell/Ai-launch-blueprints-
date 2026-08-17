import type { VercelRequest, VercelResponse } from "@vercel/node";
import Stripe from "stripe";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return res.status(500).json({ error: "STRIPE_SECRET_KEY not configured" });

  const { amount, credits } = req.body;
  if (!amount || !credits) return res.status(400).json({ error: "amount and credits are required" });

  const origin = req.headers.origin || req.headers.referer?.replace(/\/$/, "") || "https://aicatalyst.empire1.cloud";

  try {
    const stripe = new Stripe(key);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${credits} Premium Credits`,
              description: `AI Catalyst Credit Pack — ${credits} credits`,
            },
            unit_amount: Math.round(amount * 100),
          },
          quantity: 1,
        },
      ],
      metadata: { credits: String(credits), pack: `${credits}_credits` },
      success_url: `${origin}/?success=true&credits=${credits}`,
      cancel_url: `${origin}/?canceled=true`,
    });

    res.json({ url: session.url });
  } catch (error: any) {
    console.error("Checkout session error:", error);
    res.status(500).json({ error: error.message });
  }
}
