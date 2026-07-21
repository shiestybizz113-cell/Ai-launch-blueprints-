import { useEffect } from 'react';
import { SectionId } from '../App';

const metadataMap: Record<SectionId, { title: string; description: string }> = {
  market: {
    title: 'Market Validation | AI Launch Blueprint',
    description: 'Validate your market demand and target audience using structured validation frameworks.',
  },
  positioning: {
    title: 'Product Positioning Guide | AI Launch Blueprint',
    description: 'Craft high-converting product positioning strategies, value propositions, and competitor analyses.',
  },
  revenue: {
    title: 'Revenue Model Blueprints | AI Launch Blueprint',
    description: 'Explore profitable and battle-tested revenue model blueprints customized for your business.',
  },
  launch: {
    title: 'Product Launch Strategy | AI Launch Blueprint',
    description: 'Design a powerful go-to-market plan and customer acquisition strategy for a successful launch.',
  },
  marketing: {
    title: 'Marketing & Growth Playbooks | AI Launch Blueprint',
    description: 'Scale your user acquisition with actionable marketing playbooks, growth strategies, and organic channels.',
  },
  finance: {
    title: 'Financial Projections Model | AI Launch Blueprint',
    description: 'Model your projected revenue, operational costs, customer lifetime value, and cash flow.',
  },
  risk: {
    title: 'Risk Assessment & Mitigation | AI Launch Blueprint',
    description: 'Identify potential business vulnerabilities and build resilient risk-mitigation strategies.',
  },
  monetization: {
    title: 'Advanced Monetization Blueprints | AI Launch Blueprint',
    description: 'Unlock advanced monetization channels, value pricing models, and upsell strategies.',
  },
  cases: {
    title: 'Bento Case Studies | AI Launch Blueprint',
    description: 'Learn from successful real-world AI products with interactive bento-styled case studies.',
  },
  templates: {
    title: 'Resource Templates | AI Launch Blueprint',
    description: 'Access complete resources, copy-paste worksheets, and launch checklists.',
  },
  engine: {
    title: 'Content Strategy Engine | AI Launch Blueprint',
    description: 'Plan, schedule, and optimize your organic content engine using advanced categorization tools.',
  },
  analytics: {
    title: 'Analytics Dashboard | AI Launch Blueprint',
    description: 'Track real-time conversion rates, credit consumption, and promotional revenue metrics.',
  },
  prompts: {
    title: 'AI Prompt Library | AI Launch Blueprint',
    description: 'Optimize your generation workflows with curated performance-tested AI prompts.',
  },
  generator: {
    title: 'UI Blueprint Generator | AI Launch Blueprint',
    description: 'Instantly prototype styled premium UI blueprints matching your precise brand kit colors.',
  },
  rewards: {
    title: 'Affiliate Rewards Hub | AI Launch Blueprint',
    description: 'Earn extra AI credits and cash payouts through direct referrals and affiliate rewards.',
  },
  roi: {
    title: 'ROI Calculator Tool | AI Launch Blueprint',
    description: 'Calculate precise ROI projections and launch margins to plan your growth trajectory.',
  },
  team: {
    title: 'Team Access & Invites | AI Launch Blueprint',
    description: 'Manage corporate seats, role-based controls, and securely invite team members to your workspace.',
  },
  settings: {
    title: 'Account Settings | AI Launch Blueprint',
    description: 'Analyze usage health trends, download compliance summaries, manage local configuration, and set currencies.',
  },
  roadmap: {
    title: 'Interactive GTM Launch Roadmap | AI Launch Blueprint',
    description: 'Track and check off sequential product launch milestones from validation through growth.',
  },
};

export function useDocumentMetadata(activeSection: SectionId) {
  useEffect(() => {
    const meta = metadataMap[activeSection];
    if (!meta) return;

    // Update title
    document.title = meta.title;

    // Update or create meta description tag
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', meta.description);
  }, [activeSection]);
}
