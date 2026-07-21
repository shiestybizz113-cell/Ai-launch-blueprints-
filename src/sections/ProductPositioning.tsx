import { Variation } from '../App';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

const content: Record<Variation, string> = {
  indie: `
# Section 2: Product Positioning Strategy (Indie Hacker Edition)

Positioning for indie hackers is about finding a hyper-specific niche. You cannot compete on "being the best AI." You compete on "being the best AI for [Specific Person] doing [Specific Task]."

## 1. Value Proposition Templates

**B2C (Prosumer):**
"Stop wasting hours on [Tedious Task]. [Product Name] uses AI to [Achieve Desired Result] in seconds, so you can focus on [What They Actually Want to Do]."
*Example:* "Stop wasting hours writing YouTube descriptions. TubeScribe uses AI to generate SEO-optimized descriptions in seconds, so you can focus on editing your video."

**B2B (Freelancers/Agencies):**
"For [Specific Niche] who struggle with [Pain Point], [Product Name] is an AI tool that [Key Benefit]. Unlike [Status Quo], we [Unique Indie Advantage]."
*Example:* "For freelance copywriters who struggle with blank page syndrome, CopySpark is an AI tool that generates 10 proven hooks instantly. Unlike ChatGPT, we use your past successful tweets to train the model."

## 2. Positioning Statement Formula & Examples

**Formula:** [Product] is the only [Category] that helps [Target Audience] [Core Benefit] by [Unique AI Capability].

1. **AI Headshot Generator:** "SnapPro is the only AI photography tool that helps real estate agents get professional headshots by training a custom model on just 3 selfies."
2. **AI Code Reviewer:** "CodeRoast is the only AI code reviewer that helps solo developers catch security bugs by analyzing commits against OWASP top 10 in real-time."
3. **AI Meal Planner:** "MacroAI is the only AI meal planner that helps busy parents create weekly menus by reading grocery store receipts to know what's already in the fridge."

## 3. Feature-to-Benefit Translation Framework

| AI Feature | Weak Positioning (Technical) | Strong Positioning (Indie Benefit) |
| :--- | :--- | :--- |
| GPT-4 Integration | "Powered by GPT-4" | "Writes like a native English speaker" |
| RAG Architecture | "Uses Retrieval-Augmented Generation" | "Never hallucinates facts about your business" |
| Whisper API | "Uses Whisper for STT" | "Transcribes your messy voice notes perfectly" |

## 4. Pricing Psychology Model

As an indie hacker, avoid complex enterprise pricing. Keep it simple and value-driven.

1. **The "Coffee" Anchor:** "For the price of two lattes a month ($9/mo)..."
2. **The "Time is Money" ROI:** "If this saves you 1 hour a week, it pays for itself 10x over."
3. **One-Time Lifetime Deal (LTD):** Great for early cash flow. "$99 forever. Limited to first 100 users."
4. **Usage-Based (Credits):** "Buy 100 generation credits for $10. No monthly subscription."
`,
  vc: `
# Section 2: Product Positioning Strategy (VC-Backed Edition)

Your positioning must justify a premium price point, displace existing enterprise software, and tell a larger visionary story about the future of work.

## 1. Value Proposition Templates

**Enterprise SaaS:**
"[Product Name] is the AI-native operating system for [Department]. We transform [Legacy Process] into a strategic advantage by [Proprietary AI Capability], delivering [Measurable ROI]."
*Example:* "SupportGenius is the AI-native operating system for Customer Success. We transform ticket resolution into a strategic advantage by autonomously resolving 60% of Tier 1 queries, delivering a 30% reduction in support costs."

**Developer Platform:**
"Build [Next Gen Capability] faster. [Product Name] provides the infrastructure to [Technical Action] without [Common Technical Headache]."
*Example:* "Build context-aware AI agents faster. VectorBase provides the infrastructure to manage billions of embeddings without managing complex database scaling."

## 2. Positioning Statement Formula & Examples

**Formula:** To [Target Enterprise Buyer], [Product] is the [Category Creation] that [Strategic Business Value] because only [Product] has [Defensible AI Moat].

1. **AI Legal Tech:** "To General Counsels, Lexi is the AI Contract Intelligence Platform that reduces review time by 80% because only Lexi is trained on a proprietary dataset of 10 million negotiated enterprise contracts."
2. **AI Sales Coach:** "To VP of Sales, CloseAI is the Revenue Intelligence Engine that increases win rates by 15% because only CloseAI analyzes real-time emotional sentiment on Zoom calls."
3. **AI Supply Chain:** "To COOs, SupplyMind is the Predictive Logistics Platform that prevents stockouts because only SupplyMind uses federated learning across global supplier networks."

## 3. Feature-to-Benefit Translation Framework

| AI Feature | Weak Positioning | Strong Positioning (Enterprise Benefit) |
| :--- | :--- | :--- |
| Fine-tuned LLM | "Custom fine-tuned models" | "Adapts to your company's unique brand voice and terminology" |
| SOC2 Compliance | "SOC2 Type II Certified" | "Bank-grade security ensures your proprietary data never leaks" |
| Agentic Workflows | "Uses autonomous agents" | "Executes multi-step workflows across your existing SaaS stack automatically" |

## 4. Pricing Psychology Model

Enterprise pricing is about capturing the value created, not the cost of compute.

1. **Value-Based Pricing:** Charge a percentage of the money saved or revenue generated.
2. **Seat + Platform Fee:** A base platform fee ($10k/yr) + per-seat licenses ($50/mo/user).
3. **Tiered Usage (Commitments):** Annual contracts with committed usage tiers (e.g., 1M API calls/mo) with overage penalties.
4. **The "Pilot to Enterprise" Land and Expand:** Start with a $15k 3-month paid pilot, converting to a $100k/yr enterprise agreement upon hitting success criteria.
`,
  enterprise: `
# Section 2: Product Positioning Strategy (Enterprise Edition)

Internal positioning is about driving adoption, overcoming fear of job replacement, and proving efficiency to leadership.

## 1. Value Proposition Templates

**Internal Tooling:**
"Meet [Internal Tool Name], your new AI assistant for [Process]. It handles the [Tedious Part of Job], empowering you to focus on [High-Value Strategic Work]."
*Example:* "Meet DocuBot, your new AI assistant for compliance reviews. It handles the initial document screening, empowering you to focus on complex risk analysis."

## 2. Positioning Statement Formula & Examples

**Formula:** [Internal Tool] is a secure, company-approved AI tool that helps [Department] [Achieve Goal] by [AI Capability], ensuring we maintain [Compliance/Security Standard].

1. **Internal HR Bot:** "HR-Assist is a secure, company-approved AI tool that helps employees find benefits information instantly by querying our internal handbooks, ensuring we maintain strict data privacy."
2. **Internal Code Assistant:** "DevCopilot is a secure AI tool that helps engineers write boilerplate code faster by learning from our internal codebases, ensuring proprietary IP never leaves our servers."

## 3. Feature-to-Benefit Translation Framework

| AI Feature | Fear-Inducing Positioning | Empowering Positioning |
| :--- | :--- | :--- |
| Automation | "Automates your job" | "Eliminates your most boring daily tasks" |
| Data Ingestion | "Reads all your emails" | "Instantly finds that document you lost in your inbox" |
| Predictive Analytics | "Tells you what to do" | "Provides data-driven recommendations to support your decisions" |

## 4. Internal "Pricing" & ROI Psychology

Even internal tools need to prove ROI to justify the development and compute costs.

1. **FTE Hours Saved:** "This tool saves 10 hours per week per employee. Across 100 employees, that's $2.5M in recovered productivity annually."
2. **Error Reduction:** "Reduces manual data entry errors by 95%, saving $500k in compliance fines."
3. **Time-to-Market:** "Accelerates software delivery by 20%, allowing us to launch 2 more products this year."
`
};

export function ProductPositioning({ variation }: { variation: Variation }) {
  return <MarkdownRenderer content={content[variation]} />;
}
