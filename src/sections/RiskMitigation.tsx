import { Variation } from '../App';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

const content: Record<Variation, string> = {
  indie: `
# Section 7: Risk Mitigation & Contingency (Indie Hacker Edition)

Your biggest risks are platform dependency, API costs, and copycats.

## 1. Top 3 Indie AI Failures & Solutions

**Failure 1: The "Wrapper" Death.** 
*   *Risk:* You built a thin UI over ChatGPT. OpenAI releases a UI update that does exactly what your app does. You go to zero overnight.
*   *Solution:* Build workflows, not just prompts. Integrate with specific APIs (e.g., pulling data from Shopify, writing to Notion) that ChatGPT cannot easily do natively.

**Failure 2: The API Bill Shock.**
*   *Risk:* A user writes a script to spam your tool, racking up a $5,000 OpenAI bill in one night.
*   *Solution:* Implement strict rate limiting (e.g., max 50 requests per hour per IP/User). Set hard billing limits in your OpenAI/Anthropic dashboard.

**Failure 3: The Copycat Clone.**
*   *Risk:* Someone sees your success on Twitter and clones your app in a weekend.
*   *Solution:* Build a community. People can clone code, but they cannot clone your brand, your newsletter, or your relationship with your users.

## 2. Pivot Decision Tree

*   **Scenario A:** High traffic, zero conversions.
    *   *Action:* Your pricing is wrong, or your landing page promises something the product doesn't deliver. Implement a $1 trial to test willingness to pay.
*   **Scenario B:** Users sign up, use it once, and never return (High Churn).
    *   *Action:* The output quality is too low. Stop marketing. Spend 100% of your time refining the prompt engineering or switching to a better model.
*   **Scenario C:** Zero traffic.
    *   *Action:* Your distribution is broken. Stop coding. Spend 100% of your time on SEO, social media, and cold outreach.

## 3. Customer Churn Prevention

*   **The "Empty State" Problem:** If a user logs in and sees a blank text box, they will leave. Provide 3 one-click templates so they experience value in the first 10 seconds.
*   **Automated Check-ins:** If a user hasn't generated anything in 7 days, send an automated email: "Here is a new prompt template that is working great for other [User Persona]s."
`,
  vc: `
# Section 7: Risk Mitigation & Contingency (VC-Backed Edition)

Your risks are structural: model dependency, data privacy, and failing to find product-market fit before the runway runs out.

## 1. Top 3 Startup AI Failures & Solutions

**Failure 1: The "Commoditized Model" Trap.**
*   *Risk:* You rely entirely on GPT-4. A competitor uses Claude 3.5 and is suddenly 20% better and 50% cheaper. You have no moat.
*   *Solution:* Model agnosticism. Build an abstraction layer (e.g., using LiteLLM) so you can swap foundation models instantly. Invest heavily in proprietary data to fine-tune smaller, cheaper open-source models (Llama 3) for your specific use case.

**Failure 2: Enterprise Security Rejection.**
*   *Risk:* You close a $100k deal, but it dies in InfoSec review because you send PII to a public OpenAI endpoint.
*   *Solution:* Use enterprise-grade endpoints (Azure OpenAI, AWS Bedrock) with zero-data-retention agreements. Achieve SOC2 Type II compliance before scaling sales.

**Failure 3: High Gross Churn due to Hallucinations.**
*   *Risk:* The AI makes a critical mistake in a business context, destroying trust. The customer churns immediately.
*   *Solution:* Implement "Human-in-the-Loop" (HITL) workflows. The AI drafts the response, but a human must click "Approve" before it executes. Gradually remove the human as confidence scores rise.

## 2. Pivot Decision Tree

*   **Scenario A:** CAC is too high, payback period is > 24 months.
    *   *Action:* Shift from outbound sales to Product-Led Growth (PLG). Build a freemium tier to lower acquisition costs.
*   **Scenario B:** Gross margins are < 50%.
    *   *Action:* You are over-using expensive models. Route simple queries to cheaper models (e.g., GPT-4o-mini) and only use frontier models for complex reasoning.
*   **Scenario C:** Competitor raises $50M and gives your core feature away for free.
    *   *Action:* Move upmarket. Focus on complex enterprise integrations and compliance that the competitor's free tool cannot handle.

## 3. Rapid Iteration Protocol

AI moves too fast for quarterly roadmaps.
*   **Weekly Model Evals:** Run automated regression tests on your prompts every week. Model updates can silently break your outputs.
*   **The "Red Team":** Dedicate one engineer to constantly try to break your AI (prompt injection, jailbreaks) before your customers do.
`,
  enterprise: `
# Section 7: Risk Mitigation & Contingency (Enterprise Edition)

Internal risks center around data leakage, compliance violations, and employee rejection.

## 1. Top 3 Enterprise AI Failures & Solutions

**Failure 1: The Data Leak (Shadow IT).**
*   *Risk:* Employees paste sensitive customer data or source code into public ChatGPT because the internal tools are too slow or restricted.
*   *Solution:* Provide a secure, internal "Walled Garden" chat interface immediately. Log all prompts for compliance, but guarantee employees that their data won't train public models.

**Failure 2: The "Black Box" Liability.**
*   *Risk:* The AI makes a biased or incorrect decision (e.g., in hiring or loan approval) and the company cannot explain *why* to regulators.
*   *Solution:* Mandate explainability. For high-risk use cases, avoid black-box LLMs. Use transparent machine learning models, or require the LLM to cite its sources (RAG) with links to internal documents.

**Failure 3: Employee Rejection (The "Job Killer" Fear).**
*   *Risk:* Employees refuse to use the tool, or actively sabotage it, fearing it will replace them.
*   *Solution:* Rebrand the initiative. It is not "Automation," it is "Augmentation." Tie AI usage to performance bonuses, rewarding employees who use it to increase their output.

## 2. Contingency Planning (The "Kill Switch")

You must have a plan for when the AI goes rogue.
*   **The PR Disaster:** The internal chatbot generates highly offensive or biased content that an employee screenshots.
    *   *Contingency:* Implement a hard "Kill Switch" that takes the tool offline globally within 60 seconds. Have a pre-drafted internal comms memo ready.
*   **The Vendor Outage:** OpenAI/Anthropic goes down for 12 hours.
    *   *Contingency:* Fallback routing. If the primary API fails, automatically route requests to a backup provider (e.g., Azure or GCP) or degrade gracefully with a clear error message.

## 3. Continuous Monitoring Protocol

*   **Toxicity & Bias Scanning:** Run all AI outputs through a secondary, smaller model trained specifically to detect policy violations before displaying them to the user.
*   **Feedback Loops:** Every AI output must have a "Thumbs Up / Thumbs Down" button. Any "Thumbs Down" automatically creates a ticket for the AI engineering team to review the prompt trace.
`
};

export function RiskMitigation({ variation }: { variation: Variation }) {
  return <MarkdownRenderer content={content[variation]} />;
}
