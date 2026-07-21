import { MarkdownRenderer } from '../components/MarkdownRenderer';

const content = `
# Founder Case Studies & Testimonials

Learn how other founders used the AI Product Launch Blueprint to scale their businesses.

## 🚀 Case Study 1: Sarah Jenkins (Indie Hacker)
**Product:** CopySpark (AI Copywriting for Freelancers)
**Result:** $10k MRR in 4 months

> "The Market Validation framework saved me from building a product nobody wanted. I used the 'Fake Door' test and realized my initial idea was too broad. By narrowing down to freelance copywriters, I hit $10k MRR in just 4 months. The pricing psychology section alone was worth 100x the cost of the Pro tier."
> 
> — **Sarah Jenkins**, Founder of CopySpark

## 💼 Case Study 2: David Chen (VC-Backed Startup)
**Product:** SupportGenius (Enterprise AI Support)
**Result:** Raised $2.5M Seed Round

> "We were struggling to articulate our moat to investors. The Product Positioning templates helped us define our 'Strategic Wedge' against legacy incumbents. We used the Launch Execution playbook to coordinate our Product Hunt launch and PR embargo, resulting in 500+ qualified leads in 48 hours."
> 
> — **David Chen**, CEO of SupportGenius

## 🏢 Case Study 3: Elena Rodriguez (Enterprise Innovation)
**Product:** DocuBot (Internal Compliance AI)
**Result:** $1.2M Annual Cost Savings

> "Deploying AI internally is a political minefield. The Enterprise track gave us the exact framework to get InfoSec approval and build a chargeback model. We rolled out DocuBot to 500 employees and saved $1.2M in compliance review costs in the first year. The 'Kill Switch' contingency plan was what finally got our Legal team to say yes."
> 
> — **Elena Rodriguez**, VP of Innovation at GlobalCorp
`;

export function CaseStudies() {
  return <MarkdownRenderer content={content} />;
}
