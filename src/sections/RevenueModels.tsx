import { Variation } from '../App';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

const content: Record<Variation, string> = {
  indie: `
# Section 3: Revenue Model Blueprints (Indie Hacker Edition)

Focus on **capital efficiency**. With a budget under $10K, you cannot afford high-burn customer acquisition. Your revenue model must be lean, scalable, and inherently profitable.

## 1. The "Credit-Based" Micro-SaaS (Standard)
High-value AI outputs justify premium, predictable pricing.

*   **Pricing Strategy:** $20.00 for 100 credits (Core unit price).
*   **Subscription Hooks:** $49/mo (300 credits) -> $149/mo (1200 credits).
*   **The "Indie" Edge:** Offer a **Pay-as-you-go** top-up ($20 for 100 credits) for infrequent users. This captures revenue that subscriptions miss.
*   **Profit Gap:** Target > 90% margins. With 100 credits costing $20, and API costs estimated at < $1, your efficiency is world-class.

## 2. The "Bring Your Own Key" (BYOK) Utility
The lowest risk model for solo founders. You sell the *interface* and *workflow*, not the compute.

*   **The Playbook:** Charge a flat monthly fee ($9/mo) or a one-time fee ($49). The user plugs in their own OpenAI/Anthropic API key.
*   **Scaling:** Zero infrastructure risk. If a user goes viral and uses millions of tokens, *they* pay the bill, not you.
*   **Marketplace Potential:** Sell specialized "Prompt Templates" or "Workflows" within this tool for $5-$10 each.

## 3. The Simplified Marketplace (Asset Sales)
Selling the *results* of AI, not the tool itself.

*   **The Playbook:** Use AI to generate 100+ niche-specific assets (e.g., "50 AI-generated App Icons for Fintech", "30 SEO Blog Outlines for SaaS").
*   **Distribution:** Sell via Gumroad, LemonSqueezy, or your own site.
*   **Marketing:** High SEO value. Each asset pack is a "landing page" for your brand.

## 4. Rapid Iteration Strategy: The "Waitlist to Paid" Bridge
Don't build the full SaaS on day one.
1.  **MVP:** A simple form that takes input and sends the AI result via email manually.
2.  **Monetize:** Charge $10 for a "Priority Result."
3.  **Validate:** If 10 people pay, *then* build the automated dashboard.
`,
  vc: `
# Section 3: Revenue Model Blueprints (VC-Backed Edition)

Your goal is predictable, recurring revenue (ARR) with high Net Revenue Retention (NRR). You need models that scale to millions.

## 1. B2B SaaS Subscription (Seat + Usage Hybrid)

The standard for modern AI enterprise software.

**The Playbook:**
*   **Platform Fee:** A base fee for access to the platform, integrations, and SOC2 compliance ($500 - $5,000/month).
*   **Seat Licenses:** $50 - $150 per user/month.
*   **Usage Limits:** Cap the AI generation (e.g., "Up to 10,000 AI actions per month").
*   **Overage:** Charge a premium for usage beyond the cap, or force an upgrade to the next tier.
*   **Why it works:** Guarantees baseline revenue while capturing upside from heavy users.

## 2. API / Developer Platform (Usage-Based Billing)

If you are building infrastructure or models (like Anthropic, Pinecone, or ElevenLabs).

**The Playbook:**
*   **Metric:** Bill per 1,000 tokens, per second of audio generated, or per GB of vector storage.
*   **Tiers:**
    *   *Developer:* Pay-as-you-go via credit card.
    *   *Scale:* Volume discounts for committing to $5k+/month.
    *   *Enterprise:* Custom pricing, dedicated instances, SLAs, and invoice billing.
*   **Implementation:** Requires robust metering infrastructure (e.g., Stripe Metered Billing, Metronome).

## 3. The "Work-Based" Pricing Model (Outcome Pricing)

Instead of charging for seats (which AI reduces), charge for the *work done*.

**The Playbook:**
*   **Example:** An AI customer support agent. Instead of charging per agent seat, charge $1 per successfully resolved ticket.
*   **Value Alignment:** The customer only pays when the AI successfully does the job.
*   **Risk:** You absorb the compute cost of failed attempts. Your AI must be highly accurate.

## 4. White-Label / Reseller (Partner Revenue Share)

Scale distribution by letting other agencies or software platforms embed your AI.

**The Playbook:**
*   Provide a white-label API or iframeable UI.
*   Charge a wholesale rate (e.g., $0.01 per generation).
*   The partner marks it up and sells it to their clients for $0.05.
*   **Benefit:** Massive distribution without building a massive sales team.
`,
  enterprise: `
# Section 3: Revenue Model Blueprints (Enterprise Edition)

Internal tools don't generate external revenue, but they must demonstrate "Value Realization" to justify their budget (Chargeback models).

## 1. The Internal Chargeback Model

IT or the AI Center of Excellence (CoE) builds the tool and charges other Business Units (BUs) for usage.

**The Playbook:**
*   **Cost Recovery:** Calculate the total cost of ownership (TCO) including cloud compute, API costs, and developer salaries.
*   **Allocation:** Track usage per BU (e.g., Marketing used 40% of tokens, HR used 60%).
*   **Chargeback:** Bill the respective BU's budget internally. This prevents "tragedy of the commons" where one department burns through the API budget.

## 2. The "Efficiency Dividend" Model

Measure the hard cost savings and attribute them to the AI project.

**The Playbook:**
*   **Baseline:** Process X currently takes 10,000 hours/year at $50/hour = $500,000.
*   **AI Implementation:** AI reduces time to 2,000 hours/year.
*   **Dividend:** $400,000 saved. The AI team claims a portion of this "saved budget" to fund future AI initiatives.

## 3. The Innovation Fund Model

For highly experimental AI projects that may not have immediate ROI.

**The Playbook:**
*   Funded directly by the CEO or Board's strategic innovation budget.
*   Not tied to immediate chargebacks.
*   Success is measured by strategic milestones (e.g., "Deploy first generative AI model to production by Q3") rather than immediate cost savings.
`
};

export function RevenueModels({ variation }: { variation: Variation }) {
  return <MarkdownRenderer content={content[variation]} />;
}
