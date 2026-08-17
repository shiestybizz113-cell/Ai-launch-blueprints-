import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenAI } from "@google/genai";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { text, sectionName } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: "No text strategy provided to analyze." });
  }

  const key = process.env.GEMINI_API_KEY;

  if (!key) {
    const mockResponse = `### AI Strategic Optimization (Simulated Output)
**Section:** ${sectionName || "GTM Draft Blueprint"}

**Optimized Core Directions:**
1. **Dynamic Execution Loop**: Refined your target notes ("*${text.trim()}*") into operational metrics targeting rapid scale-up.
2. **Mitigate Implementation Friction**: Standardize roles across indie and enterprise teams using synchronized checklists.
3. **Publishing Readiness**: Clear compliance logs of unvetted assumptions across operational parameters.

*Pro-tip: Add GEMINI_API_KEY in Vercel environment variables to enable live AI generation!*`;
    return res.json({ optimized: mockResponse, isMock: true });
  }

  try {
    const client = new GoogleGenAI({ apiKey: key });
    const prompt = `You are an elite product launch advisor and GTM expert.
Optimize the following draft strategy notes for the blueprint chapter named "${sectionName || "AI Strategy Outline"}".
Provide a professional, actionable, and elegant go-to-market plan of 3 core recommendations backed by the principles of high-velocity growth.

Draft Notes:
"${text}"

Return standard polished Markdown format, omitting any greeting or generic commentary.`;

    const response = await client.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: { temperature: 0.7 },
    });

    const optimizedText = response.text || "Failed to generate optimized strategy.";
    res.json({ optimized: optimizedText, isMock: false });
  } catch (error: any) {
    console.error("Gemini optimization error:", error);
    res.json({
      optimized: `### Strategist's Core Advisory Re-routing
- Checked your input: "${text}"
- **Top Advice**: Integrate client-facing modules on a high-density, single-screen dashboard.`,
      isMock: true,
      error: error.message,
    });
  }
}
