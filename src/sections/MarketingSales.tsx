import { Variation } from '../App';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

const content: Record<Variation, string> = {
  indie: `
# Section 5: Marketing & Sales Toolkit (Indie Hacker Edition)

You don't have a sales team. Your marketing must do the selling. Focus on content, SEO, and direct outreach.

## 1. Cold Outreach Email Sequence (The "Value First" Approach)

**Email 1: The Quick Question (Day 1)**
> Subject: Quick question about your [Specific Workflow]
> 
> Hi {{Name}},
> Saw your recent post about [Topic]. I'm building a small AI tool that automates [Pain Point]. 
> I'm not selling anything yet, just looking for feedback from experts like you. Would you be open to a 5-min chat or checking out a quick Loom video?
> 
> Best, [Your Name]

**Email 2: The Loom Video (Day 4)**
> Subject: Re: Quick question about your [Specific Workflow]
>
> Hey {{Name}}, following up here. I recorded a 60-second video showing how the tool handles [Pain Point] for [Their Company]. 
> [Link to Loom]
> Let me know if this looks useful!

## 2. Social Media Content Calendar (Twitter/LinkedIn)

*   **Monday:** "Build in Public" update. Share a technical challenge you overcame with the AI model.
*   **Wednesday:** A "How-To" thread. Show exactly how to achieve a specific result using your tool (include video).
*   **Friday:** Social Proof. Share a screenshot of a happy user's feedback or an MRR milestone.

## 3. Affiliate/Partnership Framework

*   **The Offer:** Give affiliates a 30% recurring commission for the first year.
*   **The Target:** Find newsletter writers or YouTubers in your specific niche who have 5k-20k subscribers.
*   **The Pitch:** "I love your newsletter. I built an AI tool specifically for your audience. I'd love to give you a free lifetime account and a 30% affiliate link if you ever want to mention it."

## 4. The "Engineering as Marketing" Play

Build free, single-purpose AI tools that act as lead magnets.
*   *Example:* If your main product is an AI SEO writer, build a free "AI Meta Description Generator."
*   Require an email to use it. Upsell the main product in the email sequence.
`,
  vc: `
# Section 5: Marketing & Sales Toolkit (VC-Backed Edition)

You are building a scalable revenue engine. Marketing generates MQLs (Marketing Qualified Leads), Sales closes them.

## 1. Enterprise Cold Outreach Sequence

**Email 1: The Insight (Day 1)**
> Subject: AI automation for {{Company}}'s [Department]
>
> Hi {{Name}},
> Most VPs of [Department] we speak with are struggling to scale [Process] without adding headcount. 
> We recently helped [Competitor/Similar Company] use AI to reduce [Process] time by 40%. 
> Are you open to a brief conversation to see how our proprietary model handles this?

**Email 2: The Case Study (Day 3)**
> Subject: How [Similar Company] saved $X with AI
>
> Hi {{Name}},
> I thought this might be relevant to your goals this quarter. Here is a brief case study on how [Similar Company] implemented our platform to achieve [ROI Metric].
> [Link to PDF/Case Study]
> Do you have 15 minutes next Tuesday?

## 2. Sales Pitch Templates

**The Elevator Pitch (SDR):**
"We provide an AI platform that helps [Target Role] automate [Painful Process]. Unlike generic AI, our models are fine-tuned on [Specific Data], which typically saves our clients [ROI Metric]."

**The Demo Flow (Account Executive):**
1.  **Discovery (10 mins):** "What happens today when [Trigger Event] occurs?"
2.  **The "Aha" Demo (10 mins):** Show the exact workflow they just described, but automated by AI.
3.  **Security/Trust (5 mins):** Address hallucinations and data privacy proactively.
4.  **Next Steps (5 mins):** Secure agreement for a technical deep-dive or pilot.

## 3. Content Strategy (Thought Leadership)

*   **Whitepapers:** "The State of Generative AI in [Industry] 2024." (Gated behind an email capture).
*   **Webinars:** "How to safely deploy LLMs in [Industry]."
*   **SEO:** Target high-intent, long-tail keywords (e.g., "Best AI alternative to [Legacy Competitor]").

## 4. Partner Ecosystem

*   Integrate with the systems of record (Salesforce, Hubspot, AWS).
*   Get listed on their App Marketplaces.
*   Co-sell with their account executives by proving your AI tool drives more usage of their core platform.
`,
  enterprise: `
# Section 5: Marketing & Sales Toolkit (Enterprise Edition)

Internal marketing is about driving adoption and overcoming resistance to change.

## 1. Internal Comms Sequence

**Email 1: The Teaser (T-Minus 2 Weeks)**
> Subject: Coming Soon: A new way to handle [Process]
>
> Hi Team,
> We know [Process] takes up too much of your time. On [Date], we are launching [Tool Name], an internal AI assistant designed to help you do this 5x faster. 
> It's secure, approved by InfoSec, and built specifically for our data. Stay tuned for training invites.

**Email 2: The Launch & Training (Launch Day)**
> Subject: [Tool Name] is Live! 🚀
>
> Hi Team,
> [Tool Name] is now available at [Internal URL]. 
> 📺 Watch this 2-minute video to see how it works.
> 📅 Register for a 15-minute live training session here.

## 2. The "Internal Pitch" (For Managers)

Managers need to convince their reports to use the tool.
"I know learning a new tool is annoying, but [Tool Name] is going to eliminate the manual data entry we all hate doing on Fridays. I expect everyone to try it for their next report. If it hallucinates or makes mistakes, report it to the IT channel so we can improve it."

## 3. Adoption Content Calendar

*   **Week 1:** "Getting Started" quick-reference PDF.
*   **Week 2:** "Top 5 Prompts for [Department]" cheat sheet.
*   **Week 3:** Highlight a success story ("How Sarah in Accounting saved 4 hours this week").
*   **Week 4:** Feedback survey ("What should the AI learn to do next?").

## 4. The "AI Champions" Program

*   Identify power users in each department.
*   Give them a special Slack badge or title ("AI Ambassador").
*   Have them host informal "office hours" for their peers. Peer-to-peer training is vastly more effective than IT-mandated training.
`
};

export function MarketingSales({ variation }: { variation: Variation }) {
  return <MarkdownRenderer content={content[variation]} />;
}
