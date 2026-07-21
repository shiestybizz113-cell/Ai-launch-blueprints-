# AI Product Catalyst

> **A Practical AI Business Command Center for Creators, Founders, Artists, Small Businesses, and Solo Builders.**  
> *Powered by Empire Tool Vault*

AI Product Catalyst is a comprehensive, production-ready full-stack workspace designed to help builders translate raw ideas into fully structured, market-validated ventures. Instead of struggling with disorganized docs, founders can rapidly model their business plan, draft interactive launch blueprints, simulate compound SaaS/product ROI models, generate dynamic content campaigns, and configure a fully structured prompt-engineering repository.

---

## 🏛️ Project Purpose & Scope

Every solo builder, creator, and startup founder encounters the same roadblock: turning an initial spark into a coherent execution blueprint. **AI Product Catalyst** acts as your business strategist, financial planner, copywriter, and developer playground combined into one streamlined portal. It guides you step-by-step through:
1. **Business Clarity**: Developing a lean-canvas venture plan.
2. **Offer Design**: Engineering highly compelling, high-ticket or recurring offers.
3. **Financial Trajectory**: Simulating Month-over-Month (MoM) user acquisition compounding and evaluating real-world performance against projections.
4. **Operations & Prompts**: Harnessing an exact library of 101 battle-tested business prompts to automate core daily tasks.

---

## 🚀 Key Features & Modules

- **101 GPT Prompts to Run Your Business (The Prompt Vault)**:
  - Structured, copyable, and exportable engineering templates across 11 key categories (from Offer Design and Money to Operations and AI Automation).
  - High-performance UI supporting granular search, tag matching, and category filtering.
  - Multi-tier support (15 starter prompts accessible to standard/free users, with the remainder securely locked under the **VIP Pro** tier).
  - Advanced export formats to instantly save prompts as clean Markdown (`.md`) or PDF.
- **Runway & Financial ROI Matrix**:
  - Recharts-powered interactive chart comparing **Projected vs. Actual Revenue Growth** over a 6-month compounding timeline.
  - Granular parameters modeling Customer Acquisition Value, Operational Cost, and CAC.
  - Interactive presets ("Conservative Growth", "Hyper-Scale", "Volatile Market") allowing founders to test stress scenarios.
- **Dynamic Launch Blueprint**:
  - Interactive planning chapters guiding founders from initial customer interviews and market validation through roadmap execution and risk mitigation.
- **Collaborative Virtual Cursors**:
  - Real-time multi-seat cursor rendering simulating collaborative team inputs for enterprise-level previews.
- **Workspace Customization & White-Label Panel**:
  - Configurable settings managing application currency, client brand kits, custom logo overlays, and monitoring live API latencies.
- **Session Recovery Guard**:
  - Built-in persistence layers tracking raw input states and drafting buffers. Detects unsaved strategy documents and allows prompt, one-click restoration on reload.

---

## 🛑 Portable & Clean Architecture (No-Firebase)

To guarantee high portability, low cold-starts, and containerized freedom, **AI Product Catalyst is built completely without Firebase, Firestore, or Firebase Auth**.

### Our Architecture Choices:
1. **Authentication State**: Handled using local memory structures and clean local storage adapters. Gating is governed by flexible tier configurations (`'free' | 'pro' | 'enterprise'`), which can be swapped with token-based web-token (JWT) verification instantly.
2. **Data Persistence**: Designed with a high-speed, local-first browser `localStorage` adapter. User progress, drafted blueprints, and settings survive active browser tab restarts automatically without database dependencies.
3. **Zero API Key Exposure**: Safe, server-side proxies (`server.ts`) handle both the Google Gemini SDK calls and Stripe transaction interfaces. Secure keys never reach the client's browser.
4. **The Migration Ready Adapter Plan**: 
   All database/authentication interactions are encapsulated behind a clean modular boundary. When scaling to a production relational database or authentication server (e.g. PostgreSQL, Redis, or custom OAuth), you only need to update the core adapter files in `/src/data` and `/src/components/Paywall.tsx` without touching visual client layouts.

---

## 🛠️ Local Development & Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or bun

### 2. Installation
Install all package dependencies securely:
```bash
npm install
```

### 3. Environment Configuration
Copy the sample environment file to configure your local credentials:
```bash
cp .env.example .env
```
Fill in the following values:
```env
# Google Gemini API key used securely on the Express server side
GEMINI_API_KEY=your_gemini_api_key_here

# (Optional) Stripe Secret key for payments
STRIPE_SECRET_KEY=your_stripe_secret_key_here
```

### 4. Running the App
Launch the Express + Vite full-stack developer environment:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Build & Production Deployment

AI Product Catalyst uses a state-of-the-art bundling flow optimized for production cloud containers (like Google Cloud Run):

1. **Frontend Assets Compilation**: Vite minifies assets, styles, and code split chunks into the static `/dist` directory.
2. **Server Bundling**: `esbuild` bundles the Express backend, resolving relative path imports and packaging everything into a standalone, highly-performant CommonJS build at `dist/server.cjs`.

### Build Command:
```bash
npm run build
```

### Start Command (Launches compiled production code):
```bash
npm run start
```

---

## 🤝 Contribution Guidelines

We highly encourage contributions to make AI Product Catalyst the most practical workspace for solo builders worldwide. When proposing changes:

1. **Keep the Interface Humble**: Avoid flashy, unrequested technical telemetry (port numbers, system coordinates, or ping statuses) in visual margins. Maintain standard, polished display typography with spacious padding.
2. **Preserve Current Modules (We Evolve, Never Delete)**: Never remove existing functional modules, financial calculators, custom prompts, or settings adapters unless explicitly discussed.
3. **Keep Code Fully Typed**: Write highly structured TypeScript interfaces for any new business model, export adapter, or state manager.
4. **Do Not Introduce Firebase**: Ensure any persistence or account level features are modeled as local-first or standard API client-server requests.

---

*AI Product Catalyst is owned and maintained by **Empire-1 / Empire Tool Vault**.*
