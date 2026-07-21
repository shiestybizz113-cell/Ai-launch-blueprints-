import { Variation } from '../App';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

const content: Record<Variation, string> = {
  indie: `
# Section 1: Market Validation Framework (Indie Hacker Edition)

As a solo founder with limited budget, your validation must be fast, cheap, and highly iterative. You cannot afford to build something nobody wants.

## 1. 5-Step Customer Discovery Process (Zero-Budget)

1. **The "Scratch Your Own Itch" Hypothesis:** Define the exact problem you are facing that AI can solve. Write it down in one sentence.
2. **Community Lurking:** Find 3 subreddits, Discord servers, or Facebook groups where your target audience hangs out. Search for keywords related to your problem. Document 10 complaints.
3. **The "Fake Door" Test:** Build a simple landing page (Carrd/Softr) explaining the solution. Add an email capture form ("Join the Waitlist").
4. **Cold Outreach (High Personalization):** DM 50 people from step 2. Offer a 15-minute chat to learn about their workflow, NOT to pitch.
5. **The "Wizard of Oz" MVP:** Before writing code, can you solve their problem manually using ChatGPT/Claude and charge them for the result? If yes, you have validation.

## 2. Competitive Analysis Matrix Template

Evaluate competitors not on features, but on *speed, cost, and ease of use*.

| Competitor | Core Offering | Price | Their Weakness | Your Indie Advantage |
| :--- | :--- | :--- | :--- | :--- |
| **Status Quo (No AI)** | Manual labor | High (Time) | Slow, error-prone | Instant AI generation |
| **Incumbent SaaS** | Bloated software | $99/mo | Hard to learn, slow | Single-purpose, fast |
| **Direct AI Rival** | Similar AI tool | $20/mo | Generic outputs | Niche-specific prompts |

## 3. Ideal Customer Profile (ICP) Questionnaire

Answer these 5 questions to define your niche:
1. Who is the specific person losing time/money right now? (e.g., "Freelance SEO writers", not "Marketers")
2. What is their exact trigger event? (e.g., "When they get a brief for 10 articles due in 2 days")
3. Where do they look for solutions?
4. What is their willingness to pay? (Are they spending their own money or company money?)
5. What is the "Aha!" moment they need to experience?

## 4. Go-To-Market Timing Checklist

Do not launch until you can check all 4 boxes:
- [ ] I have 50+ emails on my waitlist.
- [ ] I have manually solved the problem for at least 3 people.
- [ ] I have a working prototype that delivers the core value in under 2 minutes.
- [ ] I know exactly which 3 channels I will post my launch to (e.g., Product Hunt, specific Subreddit, Twitter).
`,
  vc: `
# Section 1: Market Validation Framework (VC-Backed Edition)

With runway and a team, your validation focuses on Total Addressable Market (TAM), scalability, and defensibility against incumbents.

## 1. 5-Step Customer Discovery Process (Scale & Defensibility)

1. **Thesis Generation:** Define the macro-trend your AI product rides (e.g., "LLMs replacing Level 1 Customer Support").
2. **Expert Interviews:** Conduct 20+ structured interviews with industry experts, analysts, and potential enterprise buyers. Use tools like GLG or AlphaSights if necessary.
3. **Data-Driven Demand Testing:** Run paid ad campaigns (LinkedIn/Google) directing to unbranded landing pages to test messaging and calculate initial CAC (Customer Acquisition Cost).
4. **Design Partner Program:** Secure 3-5 mid-market companies to act as design partners. They get early access and influence the roadmap in exchange for feedback and case studies.
5. **Technical Feasibility & Moat Analysis:** Validate that your AI approach (fine-tuning, RAG, proprietary data) creates a defensible moat that OpenAI/Anthropic won't build natively in 6 months.

## 2. Competitive Analysis Matrix Template

Focus on data moats, distribution channels, and enterprise readiness.

| Competitor | AI Strategy | Distribution | Enterprise Readiness | Your Strategic Wedge |
| :--- | :--- | :--- | :--- | :--- |
| **Legacy Enterprise** | Bolting on AI | Direct Sales | High (SOC2, SSO) | Native AI workflows, 10x faster |
| **AI Native Startup** | GPT-4 Wrapper | PLG | Low | Proprietary data integration |
| **Foundation Models** | General purpose | API / Chat | Medium | Domain-specific fine-tuning |

## 3. Ideal Customer Profile (ICP) Questionnaire

Focus on the buying committee:
1. **The Champion:** Who feels the pain daily and will advocate for your tool?
2. **The Economic Buyer:** Who holds the budget and what ROI metrics do they care about?
3. **The IT/Security Reviewer:** What compliance standards (SOC2, GDPR, HIPAA) are mandatory?
4. **The End User:** How does this change their daily workflow? Will they resist?
5. **The Trigger Event:** What organizational change prompts this purchase? (e.g., "Mandate to cut support costs by 20%")

## 4. Go-To-Market Timing Checklist

- [ ] 3-5 successful Design Partner deployments with documented ROI.
- [ ] Core infrastructure scales to support 10,000+ concurrent users.
- [ ] Initial compliance/security posture established (e.g., SOC2 Type I readiness).
- [ ] Go-to-market team (Sales/Marketing leads) hired and onboarded.
`,
  enterprise: `
# Section 1: Market Validation Framework (Enterprise Edition)

For internal corporate innovation, validation is about strategic alignment, risk mitigation, and proving ROI against existing internal processes.

## 1. 5-Step Customer Discovery Process (Internal Stakeholders)

1. **Strategic Alignment Check:** Ensure the AI initiative aligns with the CEO/Board's top 3 strategic objectives for the year.
2. **Process Mining:** Analyze existing internal workflows to identify the highest-cost, most repetitive tasks suitable for AI automation.
3. **Stakeholder Mapping:** Identify blockers (Legal, InfoSec, HR) and champions (Business Unit Leads) early.
4. **Proof of Concept (PoC) Scoping:** Define a tightly scoped PoC with strict success criteria (e.g., "Reduce document processing time by 40%").
5. **Shadow IT Audit:** Discover what AI tools employees are already using unofficially to understand organic demand.

## 2. Competitive Analysis Matrix Template

Compare against internal alternatives and enterprise vendors.

| Alternative | Cost | Security/Compliance | Integration Effort | Your Internal AI Solution |
| :--- | :--- | :--- | :--- | :--- |
| **Existing Manual Process** | High (Headcount) | High (Known) | None | 80% cost reduction |
| **Off-the-shelf Enterprise AI** | High (Licensing) | Medium (Vendor Risk) | High | Custom-built for internal data |
| **Shadow IT (Public ChatGPT)** | Low | VERY LOW (Data Leak Risk) | None | Secure, private, compliant |

## 3. Ideal Customer Profile (ICP) Questionnaire (Internal Business Units)

1. Which Business Unit (BU) has the highest volume of unstructured data processing?
2. Who is the BU leader willing to sponsor the pilot?
3. What is the current error rate or bottleneck in their process?
4. What systems of record (Salesforce, SAP, Workday) must the AI integrate with?
5. How will success be measured? (FTE hours saved, error reduction, faster turnaround)

## 4. Go-To-Market Timing Checklist (Internal Launch)

- [ ] InfoSec and Legal have formally approved the data handling architecture.
- [ ] Pilot BU has signed off on the PoC results and ROI.
- [ ] Training materials and internal support desk (IT) are prepared.
- [ ] Executive sponsor has communicated the rollout plan to the broader organization.
`
};

export function MarketValidation({ variation }: { variation: Variation }) {
  return <MarkdownRenderer content={content[variation]} />;
}
