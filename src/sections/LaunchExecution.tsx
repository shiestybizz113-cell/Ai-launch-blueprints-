import { Variation } from '../App';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

const content: Record<Variation, string> = {
  indie: `
# Section 4: Launch Execution Roadmap (Indie Hacker Edition)

Focus on **velocity** and **feedback loops**. You don't need a PR firm; you need 10 obsessed users.

## 1. The Bootstrap Sprint (0 to 1,000 Users)
*   **Building in Public (Week 1-4):** Share "ugly" screenshots on X and LinkedIn. Ask for feedback on *specific* features (e.g., "Which icon looks better?").
*   **The Waitlist:** Launch a simple page with a "Refer-a-friend" loop to earn early credits.
*   **The Micro-Launch (Week 5-6):** Launch to your waitlist first. Offer a "Founding Member" lifetime deal (LTD) for the first 50 users to inject $2,500 - $5,000 of initial capital.
*   **The Scaling Launch (Week 7-12):** Execute a Product Hunt launch (Mid-week). Reach out to 20 micro-influencers (5k-15k followers) in your niche for shoutouts in exchange for pro access.

## 2. Community & Loops
*   Helpful, non-spam posts in r/SaaS, r/IndieHackers.
*   Build a "Feedback Flywheel": Every user feedback is a feature request you build in < 48 hours.

## 3. The Bootstrap KPI Dashboard
1.  **Direct Sales Growth:** Goal is $1,000 MRR in 90 days.
2.  **Churn Rate:** If >10% in Month 1, your product has no product-market fit. Stop marketing, fix the product.
3.  **Active Users:** Target > 20% engagement.
`,
  vc: `
A high-growth launch is about **explosive momentum** and **market dominance**. Every action must be measured against its ability to scale ARR and attract Series A/B investors.

## 1. The 90-Day GTM Performance Dashboard (15 Critical KPIs)
Your dashboard (e.g., in Looker/PostHog) must track these 15 metrics from Day 1:

| Category | KPI | Target Benchmark |
| :--- | :--- | :--- |
| **Acquisition** | CPL | < $50 (B2B AI) |
| | Trial Signup Rate | > 8% |
| | CAC Efficiency | Payback < 6 mos |
| **Engagement** | Time to Value (TTV)| < 5 minutes |
| | DAU/MAU | > 40% |
| | Feature Adoption | > 60% |
| **Retention** | D30 Retention | > 35% |
| | Logged-in Freq | > 3 sessions/wk |
| | Net Revenue Ret | > 110% |
| **Monetization**| Trial-to-Paid | > 12% |
| | ACV | Negotiable |
| | Gross Margin | > 75% |
| **Efficiency** | LTV : CAC | > 3.0x |
| | Burn Multiple | < 1.5x revenue growth |
| | Magic Number | > 0.7x |

## 2. Strategic Launch Phases
*   **Phase 1: Design Partner Program (Month 1):** Onboard 10 enterprise clients. Goal: *Data*. "AI tool reduced task time by 72% for [Client Name]."
*   **Phase 2: Category Creation (Month 2):** Embargoed Tier 1 PR. CEO Keynote: "Change how the world works." Paid acquisition blitz.
*   **Phase 3: Sales Velocity (Month 3):** SDR "Outbound Machine." Scale lead-to-opportunity. Goal: Build $1M+ pipeline.
`,
  enterprise: `
Internal launches prioritize change management, security compliance, and user training.

## 1. 90-Day Pre-Launch Timeline
*   **Month 1: Compliance.** InfoSec audit. Finalize data retention. Get CISO sign-off.
*   **Month 2: Pilot.** 50-person pilot (e.g., Marketing). Create internal wiki, FAQs, and demo videos. Identify friction.
*   **Month 3: Evangelism.** Identify "AI Champions" in every BU. Schedule company Town Hall announcement.

## 2. Launch Day Playbook
*   **09:00 AM:** CEO/Executive Sponsor announces tool (emphasize safety, "assist not replace").
*   **10:00 AM:** IT pushes the tool/SSO access.
*   **10:30 AM:** Comms sends Quick Start Guide + 2-min demo video.
*   **12:00 PM:** "Office Hours" virtual meeting room opens for live support.

## 3. Adoption & Metrics (First 30 Days)
*   **Tactics:** Weekly "Lunch & Learns", "Prompt of the Week" newsletter, gamified incentives for time-saved tracking.
*   **Dashboard KPIs:**
    1.  **Weekly Active Users (WAU):** % of company active.
    2.  **Tokens Consumed:** Cloud cost tracking.
    3.  **Estimated Hours Saved:** Productivity monitoring.
    4.  **Support Tickets:** Friction monitoring.
`
};

export function LaunchExecution({ variation }: { variation: Variation }) {
  return <MarkdownRenderer content={content[variation]} />;
}
