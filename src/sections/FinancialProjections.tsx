import { Variation } from '../App';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

const content: Record<Variation, string> = {
  indie: `
# Section 6: Financial Projections (Indie Hacker Edition)

Keep your overhead near zero. Focus on the **Contribution Margin** of every single user.

## 1. The Bootstrap Unit Economics ($10K Launch Target)
If your goal is to spend <$10,000 on the build and launch, you must optimize for organic reach and extreme lean operations.

**Cost per User Breakdown:**
*   **API Cost:** $0.05/user (Optimized GPT-4o-mini).
*   **Infrastructure:** $0.01/user (Serverless).
*   **Total OpEx:** $0.06/user.
*   **Revenue (Standard):** $15.00/mo.
*   **Contribution Margin:** $14.94 (99% Efficiency).

## 2. Growth Stages
*   **Ramen Profit (100 users):** $1,500 MRR. Covers basic living expenses.
*   **Stability (500 users):** $7,500 MRR. Allows for hiring a contractor.
*   **Independence (2,000 users):** $30,000 MRR. True financial freedom.

## 3. The "Payback" Rule
If you spend $100 on ads, you must earn $100 back in **Month 1**. As an indie hacker, you cannot afford to wait 12 months for a customer to break even.
`,
  vc: `
Investors look for **compound growth** and **exceptional unit economics**. Scale is your only priority.

## 1. Year 1 Revenue Scenarios (The Growth Engine)
| Scenario | Month 12 ARR | Key Driver | Investor Sentiment |
| :--- | :--- | :--- | :--- |
| **Conservative**| $250K | Organic | "Slow." |
| **Expected** | $1.2M | Sales + PPC | "Strong Seed-to-A." |
| **Aggressive** | $4.5M | Viral PLG | "Unicorn potential." |

## 2. Advanced Unit Economics (LTV & CAC)
| Metric | Seed Stage | Series A | Late Stage |
| :--- | :--- | :--- | :--- |
| **CAC Payback** | < 6 mos | < 12 mos | < 18 mos |
| **LTV : CAC** | > 4.0x | > 3.0x | > 2.5x |
| **Net Churn** | < 2% / mo | < 1% / mo | Negative NRR |

## 3. Burn vs. Efficiency
The **Burn Multiple** is more important than raw growth.
*   *Burn Multiple = Net Burn / Net New ARR*
*   **Excellent:** < 1.0.
*   **Good:** 1.0 - 1.5.
*   **High Risk:** > 2.0.

## 4. Expansion Revenue Loop
Model a 20% annual expansion rate. As AI users become more reliant on your tool, the "Seat + Usage" hybrid model naturally increases their ACV (Average Contract Value) without additional acquisition cost.
`,
  enterprise: `
Internal tools are evaluated on ROI, Cost Avoidance, and Total Cost of Ownership (TCO).

## 1. TCO Calculator
Budget for the full lifecycle, not just the build.
*   **Dev (CapEx):** Engineering time ($200k).
*   **Infra (OpEx):** Cloud, Vector DBs ($50k).
*   **API Costs (OpEx):** Token usage ($100k).
*   **Maintenance (OpEx):** Model updates ($75k).
*   **Total Y1 Cost:** $425,000.

## 2. ROI Scenario (Customer Support)
| Metric | Current Manual | AI-Enhanced |
| :--- | :--- | :--- |
| **Tickets/yr** | 100,000 | 100,000 |
| **Cost/Ticket** | $8.00 | $5.75 |
| **Total Cost** | $800k | $575k |
| **Savings** | - | $225k/yr |

## 3. Build vs. Buy Matrix
*   **Buy:** High licensing cost, low implementation, zero maintenance.
*   **Build:** High upfront Dev cost, low compute cost, high maintenance, *but retains proprietary IP/security.*
`
};

export function FinancialProjections({ variation }: { variation: Variation }) {
  return <MarkdownRenderer content={content[variation]} />;
}
