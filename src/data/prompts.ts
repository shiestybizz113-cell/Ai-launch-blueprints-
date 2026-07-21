export interface GPTPrompt {
  id: string;
  title: string;
  category: string;
  useCase: string;
  prompt: string;
  optionalUpgrade: string;
  tags: string[];
  tier: 'free' | 'pro';
}

export const PROMPT_CATEGORIES = [
  "Business Clarity",
  "Offer Design",
  "Branding",
  "Customer Research",
  "Content Creation",
  "Sales & Outreach",
  "Email & Messages",
  "Money & Pricing",
  "Operations",
  "AI Automation",
  "Founder Decision-Making"
];

export const ALL_101_PROMPTS: GPTPrompt[] = [
  // --- 15 FREE STARTER PROMPTS ---
  {
    id: "prompt-1",
    title: "The Ultimate One-Page Business Plan",
    category: "Business Clarity",
    useCase: "Create a lean canvas business plan for your raw concept in under 2 minutes.",
    prompt: `Act as a veteran business strategist and venture builder. Help me draft a comprehensive One-Page Business Plan / Lean Canvas for my product: [PRODUCT_DESCRIPTION]. 

Please structure the output with clear sections:
1. Problem: The top 3 frustrations of my target audience: [TARGET_AUDIENCE]
2. Solution: How [PRODUCT_NAME] uniquely addresses these frustrations
3. Key Metrics: The top 3 indicators to track success (e.g. LTV, CAC, Retention)
4. Unique Value Proposition: A single, compelling, clear high-level statement
5. Unfair Advantage: Something that cannot be easily copied or bought
6. Channels: The top 3 distribution channels to reach my market
7. Customer Segments: Micro-targeted profiles of my early adopters
8. Cost Structure: The primary fixed and variable expenses to run this
9. Revenue Streams: How we will make money (pricing model, transactional/recurring)`,
    optionalUpgrade: "Include SWOT analysis, five-forces analysis, and a 36-month hiring schedule for scaled ops.",
    tags: ["Planning", "Strategy", "Clarity"],
    tier: "free"
  },
  {
    id: "prompt-2",
    title: "Irresistible High-Ticket Offer Architecture",
    category: "Offer Design",
    useCase: "Bundle your services or software into a high-converting premium package.",
    prompt: `You are an expert marketer who specializes in premium packages and high-ticket sales. My business is [BUSINESS_TYPE] selling to [TARGET_CLIENT]. 

Help me design an Irresistible Offer Bundle. Break it down using this framework:
1. Core Product: What is the primary software or service delivered?
2. The Stack (Bonuses): What 3 high-value bonuses can we include that directly resolve the next bottleneck they'll face?
3. Risk Reversal: What guarantees can we offer (e.g., double money-back, performance-based, risk-free periods)?
4. Urgency/Scarcity: What real, authentic limit can we place on this offer?
5. The Anchor Price vs. Closing Price: How can we establish value so the investment feels like a 10x ROI?`,
    optionalUpgrade: "Inject automated follow-up scripts and objection-handling scripts for premium sales discovery calls.",
    tags: ["Offers", "Monetization", "Revenue"],
    tier: "free"
  },
  {
    id: "prompt-3",
    title: "Minimum Viable Brand Identity & Vibe Guide",
    category: "Branding",
    useCase: "Establish a coherent visual style, tone of voice, and brand guidelines.",
    prompt: `You are a creative brand director. Generate a comprehensive brand identity framework for [PRODUCT_NAME]. Our core service is [SERVICE_DESCRIPTION] targeting [AUDIENCE].

Provide:
1. Brand Archetype: Identify our dominant archetype (e.g., The Rebel, The Sage, The Hero) and explain why.
2. Tone of Voice Rules: 3 adjectives describing our tone with 'Say This' vs. 'Never Say That' examples.
3. Typography Pairing Strategy: Suggest primary display fonts and secondary body fonts that convey our brand's character.
4. Cohesive Color Story: Define the primary, secondary, and accent colors, and explain the emotional psychology behind them.
5. Brand Tagline: Draft 5 high-impact, memorable taglines of 5 words or less.`,
    optionalUpgrade: "Generate comprehensive social media layout guides and newsletter template structures.",
    tags: ["Branding", "Creative", "Copywriting"],
    tier: "free"
  },
  {
    id: "prompt-4",
    title: "The Ultimate Persona Deep-Dive Matrix",
    category: "Customer Research",
    useCase: "Understand the deep fears, hopes, and subconscious desires of your ideal buyer.",
    prompt: `Act as a behavioral psychologist specializing in user acquisition. I want to build a deep buyer persona profile for: [TARGET_DEMOGRAPHIC] interested in [PRODUCT_OR_TOPIC].

Please generate a structured report detailing:
1. The Core Frustrations: What are they complaining about at 2:00 AM on Reddit or Twitter?
2. Hidden Aspirations: What is their ultimate dream state (personal or professional) that they are too embarrassed to say out loud?
3. Daily Obstacles: What stands in their way right now?
4. Trust Triggers: What credentials, certifications, or social proof do they require before entering their credit card?
5. Key Objections: What is the exact reason they would tell their spouse or boss for NOT buying our solution?`,
    optionalUpgrade: "Add 10 high-impact interview questions for qualitative validation calls.",
    tags: ["Research", "User Persona", "Psychology"],
    tier: "free"
  },
  {
    id: "prompt-5",
    title: "Programmatic SEO Pillar Page Outline",
    category: "Content Creation",
    useCase: "Plan an SEO pillar piece of content that ranks fast on Google.",
    prompt: `You are a world-class SEO content strategist. I want to rank for the primary target keyword: [KEYWORD]. My business is [BUSINESS_SUMMARY].

Generate an SEO Pillar Page Outline:
1. Catchy H1 Headline: Optimized for clicks and SEO.
2. Search Intent Analysis: Define whether the searcher is informational, navigational, or transactional, and how to satisfy it immediately.
3. Structured Table of Contents: Provide specific, optimized H2 and H3 subheadings.
4. Semantic Keywords (LSI): Suggest 15 related terms to naturally sprinkle throughout the text.
5. Interactive & Visual Ideas: What charts, checklists, calculators, or diagrams should we embed to keep dwell time high?`,
    optionalUpgrade: "Provide 3 high-impact meta titles and meta descriptions that boast 8%+ CTR.",
    tags: ["SEO", "Content", "Traffic"],
    tier: "free"
  },
  {
    id: "prompt-6",
    title: "Cold Email Outbound Sequence That Converts",
    category: "Sales & Outreach",
    useCase: "Generate a 3-step cold email sequence targeting high-value corporate partners or clients.",
    prompt: `Act as an elite B2B sales copywriter. I need to reach out to [TARGET_ROLE] in the [INDUSTRY] sector to pitch [OFFER_OR_SOLUTION]. 

Write a highly personalized, non-spammy, 3-step cold email sequence. 
- Email 1: The 'Pattern Interrupt' (Short, low-friction, focusing on their problem, under 120 words).
- Email 2: The 'Case Study / Social Proof' (Highlighting a quick victory we did for someone like them, sent 3 days later).
- Email 3: The 'No-Oriented Close' (A very low pressure call-to-action that is easy to say 'no' to, sent 5 days later).

Rules: Avoid all buzzwords, keep the formatting simple, and write like a human contacting another human.`,
    optionalUpgrade: "Include LinkedIn connection message templates and follow-up DM scripts.",
    tags: ["Sales", "Email", "B2B"],
    tier: "free"
  },
  {
    id: "prompt-7",
    title: "The 'Gary Halbert' Style Launch Sales Page",
    category: "Email & Messages",
    useCase: "Craft a high-converting copywriting framework for launching a new product.",
    prompt: `Act as a legendary direct-response copywriter like Gary Halbert or Eugene Schwartz. I am launching a new product: [PRODUCT_NAME] which does [FUNCTION]. 

Draft a compelling, emotional, direct-response sales letter for my landing page. Structure it as follows:
1. The Hook: A bold headline that addresses their ultimate pain or ultimate desire.
2. The Story: Build rapport by sharing the 'origin story' of why this product was created.
3. The Presentation: Introduce [PRODUCT_NAME] as the only logical solution.
4. The Bullet-Point Benefits: 7 high-impact, curiosity-driven bullet points showcasing the transformation.
5. The Offer Stack & Guarantee: Build massive value and remove all risk.
6. The Urgency & Call to Action: Why they must buy right now.`,
    optionalUpgrade: "Add 5 curiosity-piquing P.S. (Postscript) lines to squeeze extra sales.",
    tags: ["Copywriting", "Sales", "Launch"],
    tier: "free"
  },
  {
    id: "prompt-8",
    title: "SaaS Multi-Tier Pricing Modeler",
    category: "Money & Pricing",
    useCase: "Establish dynamic tiers for a software-as-a-service application.",
    prompt: `You are a SaaS monetization consultant. I want to set up pricing for [SAAS_NAME], a tool that helps [AUDIENCE] do [CORE_BENEFIT].

Analyze and construct a 3-tier pricing strategy:
1. Starter/Hobbyist Tier: Price point, key target features, and why it encourages users to start.
2. Growth/Pro Tier (The Sweet Spot): Recommended pricing, feature expansion, and how to anchor it to look like the best value.
3. Enterprise/Team Tier: Pricing methodology (usage-based, seats-based, or contact sales), and security/white-label features to include.
4. Upsell Triggers: What metrics (e.g. credits, storage, team members) should trigger an automatic upgrade to the next plan?`,
    optionalUpgrade: "Suggest an annual discount structure and a localized purchasing power strategy.",
    tags: ["Pricing", "SaaS", "Strategy"],
    tier: "free"
  },
  {
    id: "prompt-9",
    title: "Standard Operating Procedure (SOP) Generator",
    category: "Operations",
    useCase: "Document repetitive tasks so you can safely outsource or automate them.",
    prompt: `Act as an operations manager / COOs assistant. I want to create a robust Standard Operating Procedure (SOP) for the task of: [TASK_NAME_AND_SUMMARY].

Please draft a standard, professional SOP following this layout:
1. Title & Objective: The clear, high-level business goal of this process.
2. Roles Involved: Who performs this? (e.g. Founder, Virtual Assistant, Editor).
3. Tools Required: List of target platforms or credentials.
4. Step-by-Step Execution Guide: An extremely clear, chronological, bulleted list of actions.
5. Exception Handling: What to do if something goes wrong (e.g. API fails, client complains).
6. Quality Assurance Checklist: 3 rules the operator must verify before marking the task complete.`,
    optionalUpgrade: "Suggest 3 automation shortcuts using Zapier, Make, or custom webhooks.",
    tags: ["Operations", "SOP", "Automation"],
    tier: "free"
  },
  {
    id: "prompt-10",
    title: "The Zapier/Make Automation Blueprinter",
    category: "AI Automation",
    useCase: "Connect your web app to Slack, Google Sheets, or your CRM with AI.",
    prompt: `Act as a senior systems automation engineer. I want to automate the workflow: [WORKFLOW_GOAL] (e.g., When a new Stripe payment occurs, send a customized welcome email and invite them to Discord).

Please write a step-by-step technical automation recipe using Zapier or Make:
1. Trigger: App, exact event trigger, and data parameters needed.
2. Filtering & Logic: What criteria must be met to proceed (e.g. amount > $50)?
3. Actions (Step-by-step): List the exact action steps, including formatting data, updating database records, or sending Webhook payloads.
4. Error-Handling Strategies: How to catch rate limits or failed states without breaking the trigger loop.`,
    optionalUpgrade: "Provide custom node.js code snippet for advanced JSON data filtering in Zapier.",
    tags: ["Automation", "Workflow", "DevOps"],
    tier: "free"
  },
  {
    id: "prompt-11",
    title: "The 'Mental Model' Founder Decision Solver",
    category: "Founder Decision-Making",
    useCase: "Run your hardest startup decisions through legendary philosophical frameworks.",
    prompt: `You are an elite executive coach. I am facing a difficult business decision: [DESCRIBE_DECISION].

Help me evaluate this decision using 3 legendary frameworks:
1. First Principles Thinking: Break down this decision into its most fundamental truths, ignoring historical precedent.
2. Regret Minimization Framework (Jeff Bezos): How will I look back on this choice when I am 80 years old?
3. Opportunity Cost Analysis: What am I actively giving up (time, attention, capital) if I say yes to this path?

Provide a summary rating of Option A vs Option B based on long-term enterprise value.`,
    optionalUpgrade: "Perform risk-return heat mapping and formulate a Plan B mitigation sequence.",
    tags: ["Decisions", "Philosophy", "Executive"],
    tier: "free"
  },
  {
    id: "prompt-12",
    title: "High-Converting Product Hunt Launch Kit",
    category: "Launch Execution",
    useCase: "Create headlines, taglines, first comments, and outreach copy for a top product launch.",
    prompt: `Act as a successful Product Hunt launch expert. I am launching [PRODUCT_NAME], which is [PRODUCT_SUMMARY] on Product Hunt.

Please generate:
1. Short Tagline: Max 60 characters, explaining the core hook clearly.
2. Maker's First Comment: An engaging, personal, and human story introducing why I built this, the problem solved, and a special discount code.
3. Launch Outreach Copy: 3 distinct outreach scripts (LinkedIn, Twitter, Slack/Discord groups) asking for feedback without sounding desperate.`,
    optionalUpgrade: "Provide a detailed hourly launch-day timeline checklist to maintain momentum.",
    tags: ["Launch", "Product Hunt", "Marketing"],
    tier: "free"
  },
  {
    id: "prompt-13",
    title: "The viral 'Hook, Line, & Sinker' Twitter Thread",
    category: "Content Creation",
    useCase: "Draft an educational Twitter/X thread that drives traffic to your email newsletter or product.",
    prompt: `Act as a viral ghostwriter for tech founders. Write a 6-tweet Twitter/X thread detailing how I solved [PROBLEM] or built [PRODUCT] in [TIMEFRAME].

Follow this outline:
- Tweet 1: The Hook. Bold statement, contrast, or stat. (Under 240 chars)
- Tweet 2: The Struggle. Describe the painful starting point or status quo.
- Tweet 3-5: The Steps. Provide highly actionable advice, lists, or screenshots setup.
- Tweet 6: The Call to Action. Direct traffic to [PRODUCT_URL] or my newsletter.`,
    optionalUpgrade: "Suggest 3 visual asset ideas or meme concepts to accompany the tweets.",
    tags: ["Twitter", "Growth", "Viral"],
    tier: "free"
  },
  {
    id: "prompt-14",
    title: "Customer Acquisition Cost (CAC) Reducer",
    category: "Customer Research",
    useCase: "Create organic or referral-based strategies to bring down paid acquisition costs.",
    prompt: `Act as a viral growth hacker. My current CAC is too high. I run a [PRODUCT_TYPE] for [AUDIENCE] and acquire customers via [CURRENT_CHANNELS].

Generate 5 creative, low-cost organic customer acquisition loops:
1. The Integration Loop: Partnering with other software in the ecosystem.
2. The Referral Engine: Incentivizing current users to invite friends (similar to Dropbox or Robinhood).
3. The Content Trap: Creating free side-project marketing tools (similar to HubSpot's Website Grader).
4. Community-Led Growth: Establishing a niche space they can't afford to miss.`,
    optionalUpgrade: "Draft email invitation templates and referral prize tier structure setups.",
    tags: ["Growth", "Metrics", "CAC"],
    tier: "free"
  },
  {
    id: "prompt-15",
    title: "Indie White-Label Service Upsell Plan",
    category: "Offer Design",
    useCase: "Turn your standard software subscribers into premium high-ticket consulting clients.",
    prompt: `Act as a high-ticket business consultant. I run a software product called [PRODUCT_NAME] for [AUDIENCE]. 

I want to design a premium white-labeled service upsell (e.g. 'Done-With-You' or 'Done-For-You' strategy audit) that I can sell for $1,500 - $5,000/mo.
1. Service Definition: What high-friction manual labor does the software perform that we can bundle and do for them?
2. Positioning: How to pitch this to our top 5% most active, high-volume software users.
3. Scalability: How to perform this service without locking the founder in 40 hours of calls every week.`,
    optionalUpgrade: "Provide sample contract templates and onboarding questionnaire prompts.",
    tags: ["Consulting", "Offers", "High-Ticket"],
    tier: "free"
  },

  // --- 86 PRO LICENSED PROMPTS ---
  // Category: Business Clarity (8 pro prompts)
  {
    id: "prompt-16",
    title: "Blue Ocean Strategy Navigator",
    category: "Business Clarity",
    useCase: "Find uncontested market spaces and make the competition irrelevant.",
    prompt: `Act as a corporate strategist. Apply the Blue Ocean Strategy framework to [MY_PRODUCT_IDEA]. Identify which industry standards to Eliminate, Reduce, Raise, and Create.`,
    optionalUpgrade: "Generate an industry strategy canvas diagram data scheme.",
    tags: ["Strategy", "Clarity"],
    tier: "pro"
  },
  {
    id: "prompt-17",
    title: "First-Principles Market Disruption Model",
    category: "Business Clarity",
    useCase: "Re-examine cost drivers in an industry to launch a low-cost or high-speed alternative.",
    prompt: `Deconstruct [INDUSTRY] from first principles. What are the true physical or technical limits of delivering [SERVICE]? Create a disruptive pricing model based on this analysis.`,
    optionalUpgrade: "Add competitor vulnerability charts.",
    tags: ["Strategy", "Disruption"],
    tier: "pro"
  },
  {
    id: "prompt-18",
    title: "The 10-Year Vision & Core Purpose Planner",
    category: "Business Clarity",
    useCase: "Map the long-term goals and immutable mission statement of your brand.",
    prompt: `Create a BHAG (Big Hairy Audacious Goal) worksheet for my startup [COMPANY]. Define 10-year, 3-year, and 1-year goals aligned to our core purpose.`,
    optionalUpgrade: "Include quarterly OKR template blocks.",
    tags: ["Vision", "OKR"],
    tier: "pro"
  },
  {
    id: "prompt-19",
    title: "Value Proposition Canvas Builder",
    category: "Business Clarity",
    useCase: "Map customer pains/gains directly to your product's pain relievers and gain creators.",
    prompt: `Analyze [PRODUCT] using the Strategyzer Value Proposition Canvas. Outline target customer jobs, pains, and gains, and align them with our value proposition.`,
    optionalUpgrade: "Draft copy snippets matching each pain/gain.",
    tags: ["Value Prop", "UX"],
    tier: "pro"
  },
  {
    id: "prompt-20",
    title: "Unfair Advantage Identifier",
    category: "Business Clarity",
    useCase: "Isolate what makes your business impossible to replicate.",
    prompt: `Audit my startup [SUMMARY] for defensibility. Review network effects, proprietary data, exclusive partnerships, and structural costs to define our unfair advantage.`,
    optionalUpgrade: "Incorporate a patent or trade secret screening framework.",
    tags: ["IP", "Moat"],
    tier: "pro"
  },
  {
    id: "prompt-21",
    title: "The Pivot Decision Worksheet",
    category: "Business Clarity",
    useCase: "Evaluate whether it's time to change product direction or stay the course.",
    prompt: `Act as a veteran VC. My startup [NAME] is facing stagnant growth in [SECTOR]. Analyze our current metrics [METRICS] and help us outline 3 distinct pivot options.`,
    optionalUpgrade: "Include transition roadmaps for each pivot.",
    tags: ["Pivot", "Startup"],
    tier: "pro"
  },
  {
    id: "prompt-22",
    title: "Ideal Co-Founder Alignment Questionnaire",
    category: "Business Clarity",
    useCase: "Vet potential business partners on equity, work ethic, and future goals.",
    prompt: `Draft a 20-question co-founder alignment worksheet covering equity splits, vesting schedules, IP contribution, working hours, and worst-case exit strategies.`,
    optionalUpgrade: "Include a template memorandum of understanding (MoU).",
    tags: ["Team", "Co-Founder"],
    tier: "pro"
  },
  {
    id: "prompt-23",
    title: "The Pre-Mortem Scenario Planner",
    category: "Business Clarity",
    useCase: "Anticipate failure before it happens to safeguard your startup.",
    prompt: `Assume it is 12 months from now, and [PRODUCT] has completely failed. Generate a detailed autopsy of why we failed, focusing on market, product, and execution errors.`,
    optionalUpgrade: "Provide immediate corrective action items.",
    tags: ["Risk", "Strategy"],
    tier: "pro"
  },

  // Category: Offer Design (8 pro prompts)
  {
    id: "prompt-24",
    title: "The Value-Ladder Expansion Matrix",
    category: "Offer Design",
    useCase: "Map out freebies, low-ticket tripwires, core offers, and high-ticket backends.",
    prompt: `Design a comprehensive 4-stage value ladder for my brand [SUMMARY]. Include lead magnet, tripwire, core product, and VIP high-ticket offer details.`,
    optionalUpgrade: "Write conversion email swipe copy for each transition.",
    tags: ["Offer Design", "Value Ladder"],
    tier: "pro"
  },
  {
    id: "prompt-25",
    title: "Productized Service Blueprint",
    category: "Offer Design",
    useCase: "Convert a custom consulting agency into repeatable, flat-rate packages.",
    prompt: `Transform custom agency services [SERVICES] into 3 flat-rate productized service packages. Outline scope limits, delivery timelines, and standard pricing.`,
    optionalUpgrade: "Draft client onboarding questionnaire questions.",
    tags: ["Agency", "Productization"],
    tier: "pro"
  },
  {
    id: "prompt-26",
    title: "The 'Dream 100' Strategic Partnership Offer",
    category: "Offer Design",
    useCase: "Craft joint-venture offers that top influencers and affiliates can't say no to.",
    prompt: `Generate a partnership proposal pitch outline for [PRODUCT_NAME] targeting high-profile creators. Highlight clear mutual benefits, revenue shares, and promotional materials.`,
    optionalUpgrade: "Draft the introductory email templates.",
    tags: ["Partnerships", "Growth"],
    tier: "pro"
  },
  {
    id: "prompt-27",
    title: "B2B Pilot Program Framework",
    category: "Offer Design",
    useCase: "Close early enterprise pilot customers without long sales cycles.",
    prompt: `Structure a B2B Pilot Program offer for [PRODUCT]. Define pilot duration, success milestones, cost structures, and how to auto-convert them to annual enterprise contracts.`,
    optionalUpgrade: "Include a letter of intent (LOI) outline.",
    tags: ["Sales", "B2B"],
    tier: "pro"
  },
  {
    id: "prompt-28",
    title: "The Lifetime Value (LTV) Boost Bundle",
    category: "Offer Design",
    useCase: "Bundle support, templates, or integrations to double purchase value.",
    prompt: `I sell [PRODUCT]. What are 5 high-converting cross-sells, upsells, or add-ons I can offer at the checkout to increase average order value (AOV)?`,
    optionalUpgrade: "Add a 1-click upsell script.",
    tags: ["E-commerce", "Sales"],
    tier: "pro"
  },
  {
    id: "prompt-29",
    title: "The 'Risk-Free' Bold Guarantee Writer",
    category: "Offer Design",
    useCase: "Craft guarantees that eliminate buying friction and double conversion rates.",
    prompt: `Create 3 distinct bold guarantees for [PRODUCT]. Frame them as results-oriented, conditional, and unconditional guarantees to remove buying fear.`,
    optionalUpgrade: "Add legal fallback disclaimers.",
    tags: ["Guarantees", "Copywriting"],
    tier: "pro"
  },
  {
    id: "prompt-30",
    title: "Founding Member Launch Offer",
    category: "Offer Design",
    useCase: "Secure early funding and active users by creating an exclusive launch offer.",
    prompt: `Draft an email campaign introducing our 'Founding Member' lifetime plan for [SAAS]. Emphasize limited availability, massive pricing discounts, and co-creation rights.`,
    optionalUpgrade: "Include urgency timer strategies.",
    tags: ["Offers", "Launch"],
    tier: "pro"
  },
  {
    id: "prompt-31",
    title: "High-Ticket Retainer Contract Planner",
    category: "Offer Design",
    useCase: "Establish recurring monthly retainers with clients for ongoing growth.",
    prompt: `Structure a monthly retainer proposal for [ROLE/SKILL] catering to [CLIENT_TYPE]. Define recurring deliverables, communications protocols, and exit clauses.`,
    optionalUpgrade: "Write standard payment terms clauses.",
    tags: ["Retainer", "Agency"],
    tier: "pro"
  },

  // Category: Branding (8 pro prompts)
  {
    id: "prompt-32",
    title: "The Brand Origin Narrative Writer",
    category: "Branding",
    useCase: "Write a compelling founder backstory that makes customers fall in love with your brand.",
    prompt: `Craft a brand origin story for [PRODUCT_NAME] based on my personal struggle: [STRUGGLE]. Use the 'Hero's Journey' narrative framework to connect with [AUDIENCE].`,
    optionalUpgrade: "Include video script hooks for TikTok or YouTube.",
    tags: ["Branding", "Storytelling"],
    tier: "pro"
  },
  {
    id: "prompt-33",
    title: "Anti-Competitor Brand Positioning Guide",
    category: "Branding",
    useCase: "Define your brand in opposition to the slow, greedy incumbents.",
    prompt: `My competitor is [COMPETITOR_NAME], known for [COMPETITOR_Friction]. Outline how [OUR_BRAND] can position itself as the fast, ethical, and modern alternative.`,
    optionalUpgrade: "Write head-to-head comparison table headlines.",
    tags: ["Branding", "Positioning"],
    tier: "pro"
  },
  {
    id: "prompt-34",
    title: "Company Cultural Manifesto Creator",
    category: "Branding",
    useCase: "Establish values and standards that align both clients and internal employees.",
    prompt: `Write a 7-point Company Cultural Manifesto for [COMPANY]. We believe in [VALUE_1], [VALUE_2], and [VALUE_3] and reject traditional corporate red tape.`,
    optionalUpgrade: "Design employee welcome book highlights.",
    tags: ["Manifesto", "Culture"],
    tier: "pro"
  },
  {
    id: "prompt-35",
    title: "The Sound & Tone Consistency Bible",
    category: "Branding",
    useCase: "Maintain a single uniform tone across emails, ads, and support replies.",
    prompt: `Create a tone of voice manual for our brand: [NAME]. Outline how we speak to customers during good moments (onboarding, feature releases) vs bad moments (outages, refunds).`,
    optionalUpgrade: "Draft canned customer service macros.",
    tags: ["Branding", "Tone"],
    tier: "pro"
  },
  {
    id: "prompt-36",
    title: "Brand Logo Concept Generator",
    category: "Branding",
    useCase: "Create symbolic, minimalist, or pictorial design prompts for designers or Midjourney.",
    prompt: `Act as a master graphic identity designer. Generate 5 highly detailed concepts for [BRAND]'s logo, specifying shapes, symmetry, visual metaphors, and negative space cues.`,
    optionalUpgrade: "Provide exact HEX code palettes.",
    tags: ["Design", "Creative"],
    tier: "pro"
  },
  {
    id: "prompt-37",
    title: "The Product Naming Brainstormer",
    category: "Branding",
    useCase: "Generate 20 distinct, catchy name ideas for your SaaS or product.",
    prompt: `Generate 25 brand name ideas for a [PRODUCT_TYPE] that solves [PROBLEM]. Group them by category: Modern, Compound, Metaphorical, and Minimalist. Ensure they are easy to spell.`,
    optionalUpgrade: "Check domain extension availability strategies.",
    tags: ["Naming", "Startup"],
    tier: "pro"
  },
  {
    id: "prompt-38",
    title: "Personal Brand Pillar Matrix",
    category: "Branding",
    useCase: "Position yourself as an authority in your niche to drive organic software growth.",
    prompt: `Help me structure a personal brand outline for [FOUNDER_NAME] on LinkedIn/X. Focus on our expertise [TOPIC] and our journey building [COMPANY]. Detail 3 main content pillars.`,
    optionalUpgrade: "Add a 30-day posting schedule.",
    tags: ["LinkedIn", "Authority"],
    tier: "pro"
  },
  {
    id: "prompt-39",
    title: "The Rebranding Evaluation Checklist",
    category: "Branding",
    useCase: "Analyze if a rebrand will fix conversion issues or make them worse.",
    prompt: `We are considering rebranding [CURRENT_NAME] to target [NEW_AUDIENCE]. Outline the operational, SEO, and brand equity risks and create a transition checklist.`,
    optionalUpgrade: "Include redirection mapping guides.",
    tags: ["Rebrand", "Risk"],
    tier: "pro"
  },

  // Category: Customer Research (8 pro prompts)
  {
    id: "prompt-40",
    title: "Competitor Reddit & Review Mine",
    category: "Customer Research",
    useCase: "Find complaints about your competitors to steal their market share.",
    prompt: `Identify the top 5 criticisms or complaints users have about [COMPETITOR_NAME] on Reddit, G2, or Capterra. Tell me how our product [OUR_PRODUCT] can exploit these flaws.`,
    optionalUpgrade: "Draft direct landing page ad copy targeting these flaws.",
    tags: ["Research", "Reddit"],
    tier: "pro"
  },
  {
    id: "prompt-41",
    title: "Qualitative User Interview Script",
    category: "Customer Research",
    useCase: "Ask questions that reveal what users actually want, not what they say they want.",
    prompt: `Write a customer discovery interview script based on 'The Mom Test' principles for my product: [PRODUCT]. Frame 10 open-ended questions that avoid bias.`,
    optionalUpgrade: "Include follow-up questions for non-committal answers.",
    tags: ["Interview", "UX"],
    tier: "pro"
  },
  {
    id: "prompt-42",
    title: "Churn Reason Investigation Survey",
    category: "Customer Research",
    useCase: "Ask users why they cancelled in a way that generates honest, actionable feedback.",
    prompt: `Generate a 3-question churn survey for customers cancelling their subscription to [SAAS]. Include multi-choice answers and text prompts that encourage constructive feedback.`,
    optionalUpgrade: "Add auto-responder flows offering temporary discounts based on answers.",
    tags: ["Retention", "Survey"],
    tier: "pro"
  },
  {
    id: "prompt-43",
    title: "Jobs-To-Be-Done (JTBD) Playbook",
    category: "Customer Research",
    useCase: "Discover the exact 'job' your customers are hiring your software to do.",
    prompt: `Apply the Jobs-To-Be-Done framework to [PRODUCT]. What is the emotional, social, and functional progress our user [AUDIENCE] is trying to achieve?`,
    optionalUpgrade: "Draft landing page section headlines based on findings.",
    tags: ["Research", "JTBD"],
    tier: "pro"
  },
  {
    id: "prompt-44",
    title: "Beta User Recruitment Campaign",
    category: "Customer Research",
    useCase: "Find 50 passionate early testers in online forums or social channels.",
    prompt: `Draft a recruitment post for [PRODUCT_NAME] on Indie Hackers / Reddit. Position the beta program as high-value, highly exclusive, and free for the first 50 testers.`,
    optionalUpgrade: "Include validation application questions.",
    tags: ["Beta", "Launch"],
    tier: "pro"
  },
  {
    id: "prompt-45",
    title: "Net Promoter Score (NPS) Campaign Guide",
    category: "Customer Research",
    useCase: "Track user satisfaction and turn happy promoters into active referrers.",
    prompt: `Draft an NPS survey email sequence for active users of [SAAS]. Include separate follow-up sequences for Detractors, Passives, and Promoters.`,
    optionalUpgrade: "Add referral link generation triggers for Promoters.",
    tags: ["NPS", "Feedback"],
    tier: "pro"
  },
  {
    id: "prompt-46",
    title: "ICP (Ideal Customer Profile) Definition Guide",
    category: "Customer Research",
    useCase: "Narrow down your target audience to high-budget enterprise stakeholders.",
    prompt: `Create a comprehensive ICP document for [SAAS] in the [SECTOR] industry. Define firmographics (funding, company size, tools) and psychographics of the buyer.`,
    optionalUpgrade: "Draft 20 targeted cold outbound keywords.",
    tags: ["ICP", "B2B"],
    tier: "pro"
  },
  {
    id: "prompt-47",
    title: "Customer Journey Mapping Matrix",
    category: "Customer Research",
    useCase: "Track user friction from finding your site to their first monthly payment.",
    prompt: `Map the user journey for [PRODUCT] across 5 phases: Awareness, Consideration, Acquisition, Activation, and Retention. Identify friction points in each step.`,
    optionalUpgrade: "Suggest triggered email helpers for inactive stages.",
    tags: ["Research", "UX"],
    tier: "pro"
  },

  // Category: Content Creation (8 pro prompts)
  {
    id: "prompt-48",
    title: "The Ultimate LinkedIn Thought-Leadership Hub",
    category: "Content Creation",
    useCase: "Create a weekly posting plan that drives SaaS leads from your profile.",
    prompt: `You are a professional LinkedIn growth expert. Draft 5 high-impact, educational LinkedIn posts for [FOUNDER_NAME] talking about [TOPIC]. Mix personal lessons with data.`,
    optionalUpgrade: "Add engaging, click-worthy first-sentence hooks.",
    tags: ["LinkedIn", "Traffic"],
    tier: "pro"
  },
  {
    id: "prompt-49",
    title: "High-Yield Youtube Video Script Outline",
    category: "Content Creation",
    useCase: "Structure engaging video content that ranks on both Google and YouTube.",
    prompt: `Create an 8-minute educational YouTube script outline on '[TOPIC]'. Structure the script with a hook (first 15s), intro, 3 actionable tips, and a CTA.`,
    optionalUpgrade: "Suggest 3 thumbnail layout designs and title variants.",
    tags: ["YouTube", "Video"],
    tier: "pro"
  },
  {
    id: "prompt-50",
    title: "Newsletter Editorial Blueprint",
    category: "Content Creation",
    useCase: "Plan a recurring weekly email newsletter that retains customer attention.",
    prompt: `Act as an editor. Create a 4-week content calendar for a newsletter targeting [AUDIENCE] interested in [TOPIC]. Each week must feature a specific story and action item.`,
    optionalUpgrade: "Draft standard newsletter headers and footers.",
    tags: ["Newsletter", "Retention"],
    tier: "pro"
  },
  {
    id: "prompt-51",
    title: "SEO Competitor Keyword Map",
    category: "Content Creation",
    useCase: "Steal low-hanging SEO traffic by mapping competitor content topics.",
    prompt: `Act as an SEO agency. I want to build traffic for [MY_SITE]. Generate a list of 15 high-volume, low-difficulty informational keywords in the [SECTOR] niche.`,
    optionalUpgrade: "Include semantic clustering groups.",
    tags: ["SEO", "Keyword"],
    tier: "pro"
  },
  {
    id: "prompt-52",
    title: "The Viral TikTok/Reels Script Matrix",
    category: "Content Creation",
    useCase: "Write 5 short-form video scripts designed for high retention loops.",
    prompt: `Write 5 short video script templates (30-45s) for TikTok/Instagram Reels about [TOPIC]. Focus on visual commands, fast-paced pacing, and auditory pattern interrupts.`,
    optionalUpgrade: "Provide trending sound selection ideas.",
    tags: ["Short-form", "TikTok"],
    tier: "pro"
  },
  {
    id: "prompt-53",
    title: "B2B Case Study Narrative Builder",
    category: "Content Creation",
    useCase: "Turn a basic customer testimonial into a high-converting PDF case study.",
    prompt: `Act as a copywriter. Structure a compelling B2B Case Study based on customer triumph [TRIUMPH] using our tool [TOOL]. Use the Problem-Solution-Result framework.`,
    optionalUpgrade: "Suggest layout callouts and highlights.",
    tags: ["Case Study", "B2B"],
    tier: "pro"
  },
  {
    id: "prompt-54",
    title: "Social Media Auto-Repurposing Engine",
    category: "Content Creation",
    useCase: "Turn a single long-form blog post into 10 distinct social media snippets.",
    prompt: `Take the following blog content: [CONTENT]. Repurpose it into 3 Twitter/X posts, 2 LinkedIn posts, 1 short-form script, and 1 community post snippet.`,
    optionalUpgrade: "Create custom hashtags lists.",
    tags: ["Social Media", "Automation"],
    tier: "pro"
  },
  {
    id: "prompt-55",
    title: "The Ultimate Product FAQ Builder",
    category: "Content Creation",
    useCase: "Address pre-sales questions directly to reduce customer support volume.",
    prompt: `Create a 10-question FAQ section for [PRODUCT] landing page. Anticipate objections on pricing, trial periods, security, integrations, and user onboarding steps.`,
    optionalUpgrade: "Include schema.org structured data script snippets.",
    tags: ["FAQ", "UX"],
    tier: "pro"
  },

  // Category: Sales & Outreach (8 pro prompts)
  {
    id: "prompt-56",
    title: "Enterprise Account-Based Marketing (ABM) Playbook",
    category: "Sales & Outreach",
    useCase: "Coordinate targeted outreach to close high-budget enterprise clients.",
    prompt: `Act as a sales director. Design an ABM playbook targeting decision-makers at [COMPANY_TYPE] to sell [SAAS]. Outline the multi-touch cadence across email, phone, and mail.`,
    optionalUpgrade: "Draft specific scripts for administrative gatekeepers.",
    tags: ["Enterprise", "ABM"],
    tier: "pro"
  },
  {
    id: "prompt-57",
    title: "LinkedIn Outreach Sequence That Works",
    category: "Sales & Outreach",
    useCase: "Send low-friction DMs that start genuine conversations without looking spammy.",
    prompt: `Write a 3-step LinkedIn connection and follow-up sequence to pitch [SERVICE] to [ROLE]. Avoid typical buzzwords and focus on asking for their perspective.`,
    optionalUpgrade: "Include voice message prompt blueprints.",
    tags: ["LinkedIn", "Outreach"],
    tier: "pro"
  },
  {
    id: "prompt-58",
    title: "B2B Sales Discovery Call Script",
    category: "Sales & Outreach",
    useCase: "Run sales calls that qualify leads and expose their deepest budget paint points.",
    prompt: `Draft a 30-minute sales discovery call template for [PRODUCT_NAME]. Map out timing blocks for Rapport, Pain Discovery, Budget Qualification, Demo, and Closing Next Steps.`,
    optionalUpgrade: "Add rebuttals for standard price objections.",
    tags: ["Sales Call", "Scripts"],
    tier: "pro"
  },
  {
    id: "prompt-59",
    title: "The Ultimate Pitch Deck Outline",
    category: "Sales & Outreach",
    useCase: "Structure a 10-slide deck to secure venture capital or angel investment.",
    prompt: `Create a comprehensive 10-slide startup pitch deck outline for [COMPANY_NAME] seeking seed funding. Detail exact headers, key data visuals, and slide takeaways.`,
    optionalUpgrade: "Include talking points for the presenter.",
    tags: ["Investment", "Pitch"],
    tier: "pro"
  },
  {
    id: "prompt-60",
    title: "Inbound Lead Qualification Form Rules",
    category: "Sales & Outreach",
    useCase: "Qualify inbound signups so your sales team only calls warm, qualified accounts.",
    prompt: `My product is [SAAS] with tiers at $29/mo and $499/mo. Outline the optimal fields for our booking form to qualify budget, urgency, authority, and needs (BANT).`,
    optionalUpgrade: "Suggest automatic routing logic triggers.",
    tags: ["Inbound", "Qualification"],
    tier: "pro"
  },
  {
    id: "prompt-61",
    title: "JV Webinar Script & Transition Blueprint",
    category: "Sales & Outreach",
    useCase: "Coordinate webinar promotions that pitch high-value software or service packages.",
    prompt: `Draft a 45-minute webinar script outline explaining '[TOPIC]'. Integrate a smooth transition from educational content to our paid package offer [OFFER].`,
    optionalUpgrade: "Provide follow-up conversion emails.",
    tags: ["Webinar", "Outreach"],
    tier: "pro"
  },
  {
    id: "prompt-62",
    title: "The 'Almost Lost Lead' Recovery Sequence",
    category: "Sales & Outreach",
    useCase: "Recover prospects who ghosted you after receiving your proposal.",
    prompt: `Create a 2-step follow-up email sequence for high-ticket clients who went silent after receiving our project proposal. Focus on pattern interrupts.`,
    optionalUpgrade: "Add SMS follow-up alternatives.",
    tags: ["Sales", "Recovery"],
    tier: "pro"
  },
  {
    id: "prompt-63",
    title: "B2B Contract Negotiator Script",
    category: "Sales & Outreach",
    useCase: "Negotiate payment terms and scope limits with enterprise lawyers.",
    prompt: `Act as a B2B sales counselor. My client is asking to change standard terms on [TERM] (e.g. liability caps, Net-60 payment). Help me draft an amicable response that protects our startup.`,
    optionalUpgrade: "Include fallback terms scenarios.",
    tags: ["Negotiation", "B2B"],
    tier: "pro"
  },

  // Category: Email & Messages (8 pro prompts)
  {
    id: "prompt-64",
    title: "The SaaS Welcome Onboarding Sequence",
    category: "Email & Messages",
    useCase: "Design a 5-step email sequence that activates new users after signup.",
    prompt: `Create a 5-part customer onboarding email sequence for [SAAS]. Focus on driving user activation (getting them to perform [AHA_MOMENT]) within the first 7 days.`,
    optionalUpgrade: "Include custom subject lines with high open rates.",
    tags: ["Onboarding", "Email"],
    tier: "pro"
  },
  {
    id: "prompt-65",
    title: "The Abandoned Checkout Recovery Cadence",
    category: "Email & Messages",
    useCase: "Win back customers who left your checkout page without buying.",
    prompt: `Generate a 3-part abandoned checkout email sequence for [PRODUCT]. Send at 1 hour, 12 hours, and 24 hours. Inject psychological triggers like urgency and social proof.`,
    optionalUpgrade: "Integrate a personalized coupon link trigger.",
    tags: ["Recovery", "E-commerce"],
    tier: "pro"
  },
  {
    id: "prompt-66",
    title: "The 'Hype' Launch Announcement Campaign",
    category: "Email & Messages",
    useCase: "Generate massive pre-launch hype for a new SaaS, service, or community.",
    prompt: `Draft a 4-part email launch sequence for [PRODUCT]. Step 1: Teaser (The secret project), Step 2: The Origin (Why we built this), Step 3: Open Cart (Limited access), Step 4: Final Call.`,
    optionalUpgrade: "Include social media hype post templates.",
    tags: ["Launch", "Campaign"],
    tier: "pro"
  },
  {
    id: "prompt-67",
    title: "Affiliate Partner Recruitment Swipe File",
    category: "Email & Messages",
    useCase: "Recruit top-tier affiliate partners to promote your product to their audience.",
    prompt: `Write an outbound outreach email sequence recruiting creators to promote [PRODUCT_NAME]. Highlight our high-converting landing page and 30% recurring commissions.`,
    optionalUpgrade: "Provide sample copy templates they can send to their list.",
    tags: ["Affiliates", "Outreach"],
    tier: "pro"
  },
  {
    id: "prompt-68",
    title: "The Re-engagement Win-Back Campaign",
    category: "Email & Messages",
    useCase: "Clean up your email list by win-backing or unsubscribing inactive users.",
    prompt: `Write a 2-step win-back campaign targeting email subscribers who haven't opened an email in 90 days. Focus on a direct, personal, raw email checking if they still care about [TOPIC].`,
    optionalUpgrade: "Add automated tags management rules.",
    tags: ["Winback", "List Cleaning"],
    tier: "pro"
  },
  {
    id: "prompt-69",
    title: "Feature Release Hype Email",
    category: "Email & Messages",
    useCase: "Explain complex technical product updates in an engaging, value-first way.",
    prompt: `Write a product update announcement email for [SAAS]. We are launching [FEATURE]. Explain what it is, why we built it, and how it saves them time or money immediately.`,
    optionalUpgrade: "Include visual graphic and video tutorial hooks.",
    tags: ["Product", "Updates"],
    tier: "pro"
  },
  {
    id: "prompt-70",
    title: "The Viral Referral Milestone Sequence",
    category: "Email & Messages",
    useCase: "Encourage users to invite friends by notifying them of milestones reached.",
    prompt: `Draft 3 short email templates sent to referrers when: 1. They sign up for the referral program, 2. They earn their first reward, 3. They are 1 invite away from a premium reward.`,
    optionalUpgrade: "Add reward tier copy inspiration.",
    tags: ["Referral", "Growth"],
    tier: "pro"
  },
  {
    id: "prompt-71",
    title: "SaaS Price Increase Transition Coping Copy",
    category: "Email & Messages",
    useCase: "Announce pricing increases without causing massive user cancellations.",
    prompt: `Write a price increase announcement email for [SAAS]. Explain that we are raising pricing from [OLD_PRICE] to [NEW_PRICE] for premium upgrades, grandfathering existing loyal users.`,
    optionalUpgrade: "Provide customer support response scripts for complaints.",
    tags: ["Pricing", "Branding"],
    tier: "pro"
  },

  // Category: Money & Pricing (8 pro prompts)
  {
    id: "prompt-72",
    title: "Dynamic Usage-Based Monetization Framework",
    category: "Money & Pricing",
    useCase: "Align pricing with consumer habits to maximize revenue growth.",
    prompt: `Design a usage-based or pay-as-you-go pricing scheme for [PRODUCT]. Define the core metered metric (API calls, storage, tokens) and suggest tiered rates.`,
    optionalUpgrade: "Provide credit card pre-authorization strategy advice.",
    tags: ["Pricing", "SaaS"],
    tier: "pro"
  },
  {
    id: "prompt-73",
    title: "Enterprise Deal Value Multiplier",
    category: "Money & Pricing",
    useCase: "Upsell premium SLAs, security setups, and dedicated support to corporate buyers.",
    prompt: `I am pitching [PRODUCT] to a large enterprise client. Outline 5 premium enterprise add-ons (SLA guarantees, custom training, SSO, dedicated account manager) we can charge for.`,
    optionalUpgrade: "Write standard enterprise SLA pricing guidelines.",
    tags: ["Enterprise", "SaaS"],
    tier: "pro"
  },
  {
    id: "prompt-74",
    title: "SaaS Unit Economics Auditing Form",
    category: "Money & Pricing",
    useCase: "Audit LTV, CAC, payback period, and churn rate to confirm your business is healthy.",
    prompt: `Act as a venture capital analyst. Design a framework to audit the unit economics of [SAAS_TYPE] with metrics: [METRICS]. Tell me if our business model is healthy or dangerously inefficient.`,
    optionalUpgrade: "Provide payback period target metrics.",
    tags: ["Metrics", "Finance"],
    tier: "pro"
  },
  {
    id: "prompt-75",
    title: "The Freemium to Paid Upgrades Optimizer",
    category: "Money & Pricing",
    useCase: "Transition free users to paid packages without causing community backlash.",
    prompt: `My product [NAME] operates a freemium model. What are 5 high-converting strategies to transition free tier power users to paid subscription tiers?`,
    optionalUpgrade: "Include trigger notification copy ideas.",
    tags: ["Freemium", "Monetization"],
    tier: "pro"
  },
  {
    id: "prompt-76",
    title: "Agency Premium Value-Based Pricing Calculator",
    category: "Money & Pricing",
    useCase: "Quote prices based on the business value you generate, not the hours you work.",
    prompt: `Act as a value-based pricing expert. I am pitching a custom project [PROJECT_SUMMARY] to a corporate client. Generate a pricing proposal outline based on value generated rather than hourly rates.`,
    optionalUpgrade: "Add 3 risk-sharing partnership proposals.",
    tags: ["Pricing", "Agency"],
    tier: "pro"
  },
  {
    id: "prompt-77",
    title: "The 'Pay What You Want' Campaign Blueprint",
    category: "Money & Pricing",
    useCase: "Generate massive launch hype by letting users choose their price point.",
    prompt: `Help me structure a limited-time 'Pay What You Want' launch campaign for [PRODUCT]. Detail default anchors, charity contributions, and limited seat availability strategies.`,
    optionalUpgrade: "Provide email swipe templates.",
    tags: ["Offers", "Monetization"],
    tier: "pro"
  },
  {
    id: "prompt-78",
    title: "SaaS Expansion Revenue Strategy",
    category: "Money & Pricing",
    useCase: "Increase MRR from current customers without having to buy more traffic.",
    prompt: `What are 5 actionable expansion revenue strategies for [SAAS] to upsell, cross-sell, or sell usage-based add-ons to existing paying subscribers?`,
    optionalUpgrade: "Draft expansion promotion emails.",
    tags: ["MRR", "Growth"],
    tier: "pro"
  },
  {
    id: "prompt-79",
    title: "Indie Hacker Sponsor Outbound Deck Outline",
    category: "Money & Pricing",
    useCase: "Secure premium newsletter, podcast, or side-project sponsorships.",
    prompt: `Draft a sponsorship pitch letter to secure newsletter sponsors for [NEWSLETTER]. Outline audience metrics, available ad layouts, pricing tiers, and previous performance.`,
    optionalUpgrade: "Include followup email sequences.",
    tags: ["Sponsorship", "Monetization"],
    tier: "pro"
  },

  // Category: Operations (8 pro prompts)
  {
    id: "prompt-80",
    title: "The Solopreneur 4-Hour Workweek Matrix",
    category: "Operations",
    useCase: "Delegate, automate, or eliminate tasks to free up 20 hours a week.",
    prompt: `I am a solopreneur running [BUSINESS]. I spend my week on [TASKS]. Audit my week using the Eisenhower Matrix and suggest how I can delegate or automate 50% of it.`,
    optionalUpgrade: "Add system task monitoring checklists.",
    tags: ["Operations", "Productivity"],
    tier: "pro"
  },
  {
    id: "prompt-81",
    title: "Standard Contractor Onboarding Guide",
    category: "Operations",
    useCase: "Hire and onboard new virtual assistants, developers, or editors in 24 hours.",
    prompt: `Draft an onboarding guide for a new virtual assistant joining [BUSINESS]. Detail communications protocols, workspace safety standards, and project review parameters.`,
    optionalUpgrade: "Include a sample confidentiality agreement (NDA) outline.",
    tags: ["Team", "Onboarding"],
    tier: "pro"
  },
  {
    id: "prompt-82",
    title: "Enterprise SOC2 Compliance Audit Roadmap",
    category: "Operations",
    useCase: "Get your startup ready for security compliance to close enterprise deals.",
    prompt: `Act as a security compliance consultant. Design a step-by-step roadmap for a startup [SAAS] to prepare for SOC2 Type II compliance in 90 days.`,
    optionalUpgrade: "Include sample data access protocols.",
    tags: ["Compliance", "Security"],
    tier: "pro"
  },
  {
    id: "prompt-83",
    title: "The Agile Sprint Planner for Small Teams",
    category: "Operations",
    useCase: "Keep your product team building at high speed without wasting time in long meetings.",
    prompt: `Design a bi-weekly agile development cycle framework for our small software engineering team of 3 developers building [PRODUCT]. Highlight backlog grooming and review stages.`,
    optionalUpgrade: "Suggest daily standup Slack templates.",
    tags: ["Agile", "Management"],
    tier: "pro"
  },
  {
    id: "prompt-84",
    title: "Tech Stack Cost Reduction Review",
    category: "Operations",
    useCase: "Audit and eliminate expensive SaaS tools to increase your profit margins.",
    prompt: `Act as a fractional CFO. Audit my current business tech stack: [STACK_DETAILS]. Tell me how we can replace or negotiate down these subscriptions to double our operating margins.`,
    optionalUpgrade: "Draft software termination messages.",
    tags: ["Finance", "SaaS Audit"],
    tier: "pro"
  },
  {
    id: "prompt-85",
    title: "Crisis Communications Protocol Outlines",
    category: "Operations",
    useCase: "Prepare responses for software downtime or database security issues.",
    prompt: `Create a Crisis Communications handbook for [SAAS]. Write pre-approved statements for: 1. Database downtime, 2. Security compromise fears, 3. Unintentional overcharging.`,
    optionalUpgrade: "Add public relations press templates.",
    tags: ["Crisis", "Operations"],
    tier: "pro"
  },
  {
    id: "prompt-86",
    title: "The Legal Entity Setup Checklist",
    category: "Operations",
    useCase: "Choose the optimal legal setup (LLC, C-Corp, etc.) for tax savings and investment.",
    prompt: `Help me evaluate setting up a business entity for [STARTUP] catering to global markets. Compare US LLC vs Delaware C-Corp vs UK Ltd for taxes, costs, and investment.`,
    optionalUpgrade: "Provide standard vesting schedules parameters.",
    tags: ["Legal", "Startup"],
    tier: "pro"
  },
  {
    id: "prompt-87",
    title: "Customer Support Escalation Triage Matrix",
    category: "Operations",
    useCase: "Sort support tickets so your team resolves high-priority requests first.",
    prompt: `Create a customer support escalation policy for [SAAS]. Define Tier 1 (general inquiry), Tier 2 (billing/account), and Tier 3 (critical bug) workflows and response timers.`,
    optionalUpgrade: "Write standard polite customer support macros.",
    tags: ["Support", "Operations"],
    tier: "pro"
  },

  // Category: AI Automation (8 pro prompts)
  {
    id: "prompt-88",
    title: "The AI Customer Support Bot Prompt Engine",
    category: "AI Automation",
    useCase: "Write instructions for a custom AI chatbot that resolves support questions using your docs.",
    prompt: `You are an AI prompt engineer. Draft a system instructions prompt for an AI customer support agent for [SAAS]. Set boundaries to avoid hallucinating pricing or making unauthorized refunds.`,
    optionalUpgrade: "Add conversational tone control parameters.",
    tags: ["AI", "Support Bot"],
    tier: "pro"
  },
  {
    id: "prompt-89",
    title: "The Make.com Automated Blog Writer",
    category: "AI Automation",
    useCase: "Automate blog post publishing from Google Docs directly to WordPress.",
    prompt: `Design a Make.com (Integromat) scenario to fetch finished strategies from [SYSTEM], route to Gemini for SEO optimization, and auto-draft to [CMS]. Detail every step.`,
    optionalUpgrade: "Provide JSON validation schema schemas.",
    tags: ["Make", "Automation"],
    tier: "pro"
  },
  {
    id: "prompt-90",
    title: "AI-Powered Lead Enrichment Agent",
    category: "AI Automation",
    useCase: "Automatically research and score leads using automated workflows.",
    prompt: `Create a detailed blueprint for an automated AI lead enrichment agent. When a new email signs up, search Twitter/LinkedIn, extract company size, and categorize as SMB/Enterprise.`,
    optionalUpgrade: "Add CRM routing automation steps.",
    tags: ["Enrichment", "AI Sales"],
    tier: "pro"
  },
  {
    id: "prompt-91",
    title: "Automated Slack Metric Broadcast Channel",
    category: "AI Automation",
    useCase: "Broadcast daily revenue, active users, and signup counts to your team.",
    prompt: `Design an automated pipeline that pulls metrics from Stripe and database, formats them into a clean Slack message block, and publishes to #metrics every morning at 9 AM.`,
    optionalUpgrade: "Add target milestone congrats blocks.",
    tags: ["Slack", "KPIs"],
    tier: "pro"
  },
  {
    id: "prompt-92",
    title: "AI Ad Creative Script Generator Prompt",
    category: "AI Automation",
    useCase: "Generate 50 distinct ad scripts from a single product description.",
    prompt: `Draft a system instructions prompt for an AI agent whose sole job is to ingest a product description [PRODUCT] and output 10 distinct, highly-converting Meta video ad script structures.`,
    optionalUpgrade: "Include hook variation arrays.",
    tags: ["AI", "Ad Scripts"],
    tier: "pro"
  },
  {
    id: "prompt-93",
    title: "The Make.com Auto-Invoice & Bookkeeper Setup",
    category: "AI Automation",
    useCase: "Automate accounting by connecting your payment gateway directly to QuickBooks.",
    prompt: `Design a Make.com flow to synchronize daily Stripe transactions with [ACCOUNTING_TOOL]. Outline tax categorization rules and custom currency conversion handling.`,
    optionalUpgrade: "Provide sample webhook structures.",
    tags: ["Accounting", "Make"],
    tier: "pro"
  },
  {
    id: "prompt-94",
    title: "The Automated Competitor Price Tracker",
    category: "AI Automation",
    useCase: "Scrape and monitor competitor pricing models to stay competitive.",
    prompt: `Design a low-code automation routine that uses Apify or scrapers to extract competitor pricing pages weekly, flags differences, and notifies Slack.`,
    optionalUpgrade: "Draft reaction advisory alerts.",
    tags: ["Scraping", "Competitors"],
    tier: "pro"
  },
  {
    id: "prompt-95",
    title: "Automated Customer Review Outreach Sequence",
    category: "AI Automation",
    useCase: "Automatically ask active software users for G2 or Trustpilot reviews.",
    prompt: `Create a Zapier sequence that triggers when a user reaches [AHA_MOMENT] inside [SAAS]. Send an email request for reviews, offering an Amazon gift card to active contributors.`,
    optionalUpgrade: "Draft high-converting reviewer emails.",
    tags: ["Reviews", "Growth"],
    tier: "pro"
  },

  // Category: Founder Decision-Making (6 pro prompts)
  {
    id: "prompt-96",
    title: "The Opportunity Cost Audit Worksheet",
    category: "Founder Decision-Making",
    useCase: "Calculate the exact cost of distraction before starting a new side-project.",
    prompt: `Act as a peak performance business analyst. Evaluate my dilemma: [DILEMMA]. Calculate opportunity costs, developer time hours, and focus distraction coefficients.`,
    optionalUpgrade: "Add visual attention-allocation charts.",
    tags: ["Decisions", "Productivity"],
    tier: "pro"
  },
  {
    id: "prompt-97",
    title: "The Angel Investor / VC Screening Tool",
    category: "Founder Decision-Making",
    useCase: "Determine if an investor is a strategic partner or a major cap-table risk.",
    prompt: `I have received a term sheet from [INVESTOR_TYPE]. Help me evaluate their reputation, capital efficiency, board-control demands, and how they behave when things go wrong.`,
    optionalUpgrade: "Add dilution projection formulas.",
    tags: ["VC", "Angel"],
    tier: "pro"
  },
  {
    id: "prompt-98",
    title: "First-Principles Pricing Optimization Model",
    category: "Founder Decision-Making",
    useCase: "Decide whether to raise pricing by evaluating unit economics and customer price limits.",
    prompt: `We are thinking of raising price on [PRODUCT] by [PERCENTAGE]. Help us evaluate the price elasticity, risk of churn, impact on LTV, and how to frame the update to customers.`,
    optionalUpgrade: "Include pricing announcement emails.",
    tags: ["Pricing", "Decisions"],
    tier: "pro"
  },
  {
    id: "prompt-99",
    title: "The SaaS Buy vs. Build Audit",
    category: "Founder Decision-Making",
    useCase: "Evaluate whether to build custom software modules or buy pre-existing tools.",
    prompt: `We are deciding whether to build a custom in-house [MODULE] or integrate a third-party tool like [TOOL_NAME] for $150/mo. Act as CTO and analyze building costs vs subscription fees.`,
    optionalUpgrade: "Add maintenance expense projections.",
    tags: ["CTO", "Tech Stack"],
    tier: "pro"
  },
  {
    id: "prompt-100",
    title: "The Equity Allocation Advisor",
    category: "Founder Decision-Making",
    useCase: "Calculate fair equity shares for early employees and key advisors.",
    prompt: `Our startup is hiring a [ROLE/ADVISOR]. Help me calculate a fair equity offer based on their experience [XP], salary trade-offs, and expected company impact.`,
    optionalUpgrade: "Include a standard vesting schedule parameters sheet.",
    tags: ["Equity", "Hiring"],
    tier: "pro"
  },
  {
    id: "prompt-101",
    title: "The Final 'Should I Quit?' Venture Assessment",
    category: "Founder Decision-Making",
    useCase: "Perform an objective audit of an underperforming project before shutting it down.",
    prompt: `Act as an objective business auditor. Help me evaluate whether to shut down, sell, or double down on [PROJECT] which has generated [REVENUE] in [TIMEFRAME] with [EFFORT_HOURS].`,
    optionalUpgrade: "Draft exit, sale, or wind-down communication templates.",
    tags: ["Audit", "Startup"],
    tier: "pro"
  }
];
