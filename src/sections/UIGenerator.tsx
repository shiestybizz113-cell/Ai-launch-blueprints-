import React, { useState, useEffect } from 'react';
import { Wand2, Copy, Download, Sparkles, LayoutDashboard, DollarSign, Rocket, Palette, ChevronRight, Lock, Loader2, Code2, Play, CheckCircle2, ShieldAlert, ArrowRight, Star, User, Settings, Activity, Zap, Undo2, Redo2, MousePointer2, Focus, HandMetal, Ban, Terminal, Briefcase, UserPlus, Search, Filter, X, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Variation } from '../App';
import { Paywall } from '../components/Paywall';
import { BrandKitPanel } from '../components/BrandKitPanel';
import { BrandKit, DEFAULT_BRAND_KIT } from '../types/brand-kit';
import prettier from 'prettier/standalone';
import * as babelPlugin from 'prettier/plugins/babel';
import * as estreePlugin from 'prettier/plugins/estree';
import { LiveProvider, LiveError, LivePreview } from 'react-live';

// Calls Gemini through the server proxy so the API key stays server-side.
// Returns the same shape the client code relies on ({ text, candidates }).
async function generateContent(payload: {
  model: string;
  contents: any;
  config?: Record<string, any>;
}): Promise<{ text: string; candidates: any[] }> {
  const res = await fetch('/api/gemini/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Gemini request failed (${res.status})`);
  }
  return res.json();
}

interface UIGeneratorProps {
  variation: Variation;
  tier: 'free' | 'pro' | 'enterprise';
  onUpgrade: (tier: 'pro' | 'enterprise') => void;
  credits: number;
  spendCredits: (amount: number) => boolean;
}

const promptCategories = [
  {
    icon: Palette,
    title: "Design Prompts",
    prompts: [
      "Pricing page that converts",
      "Hero section with video background",
      "Feature comparison table",
      "Customer testimonials carousel",
      "Modern dark-mode footer"
    ]
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard & Data Viz",
    prompts: [
      "Real-time analytics dashboard",
      "User activity heatmap",
      "Revenue & MRR line charts",
      "Interactive data table with sparklines",
      "Multi-series bar graph for churn"
    ]
  },
  {
    icon: UserPlus,
    title: "Onboarding Flows",
    prompts: [
      "Multi-step onboarding wizard",
      "Feature highlight product tour",
      "Personality-quiz style signup",
      "Account setup progress tracker",
      "Welcome screen with video intro"
    ]
  },
  {
    icon: ShieldAlert,
    title: "Enterprise Security",
    prompts: [
      "Access control audit log",
      "RBAC permission matrix",
      "2FA / MFA setup screen",
      "IP Whitelist & Firewall manager",
      "Session history & device log"
    ]
  },
  {
    icon: DollarSign,
    title: "Monetization Prompts",
    prompts: [
      "Paywall / upgrade gate",
      "Tiered pricing comparison",
      "Invoice generator component",
      "Usage-based billing calculator"
    ]
  }
];

const sophisticatedPrompts = [
  {
    title: "Indie: Viral Onboarding Flow",
    desc: "Turn cold signup into 14-day trial. 34% conversion benchmark.",
    prompt: "Build an interactive 4-step onboarding flow for a productivity AI tool. Step 1: User name & role. Step 2: Feature selection with animated cards. Step 3: 'Magic Moment' simulation showing how the AI saves them 5 hours a week. Step 4: Referral link generation and CTAs. Use high-energy motivation copy and a progress bar.",
    track: "indie",
    industry: "Consumer SaaS",
    expectedCTA: "Claim My 5 Hours"
  },
  {
    title: "VC: SaaS Growth Dashboard",
    desc: "Win deals. Build trust with custom ROI calculator.",
    prompt: "Build a growth-focused analytics dashboard for a B2B SaaS. It must include: (1) A multi-series line chart showing MRR growth over 12 months, (2) A funnel conversion visualization (Lead -> Trial -> Paid), (3) A 'Retention Cohort' heatmap table, and (4) An interactive 'Burn Rate' calculator with sliders to simulate hiring vs revenue growth. High data density yet readable.",
    track: "vc",
    industry: "B2B Analytics",
    expectedCTA: "Export Growth Report"
  },
  {
    title: "Enterprise: Security & Compliance Center",
    desc: "Security-first governance. Real-time audit trails & user matrix.",
    prompt: "Design a high-security Enterprise Governance Panel. Features: (1) Audit Log with severity tags and IP tracking, (2) User Permission Matrix for RBAC (Owner, Editor, Viewer), (3) Two-Factor Authentication (2FA) status tracker for all teammates, and (4) Compliance Health Check (SOC2/GDPR) progress indicators. Sturdy, trustworthy, and scalable UI.",
    track: "enterprise",
    industry: "Cybersecurity",
    expectedCTA: "Renew Security Cert"
  },
];

const loadingSteps = [
  "Analyzing prompt intent & context...",
  "Retrieving design system tokens...",
  "Applying style preset aesthetics...",
  "Scaffolding React component structure...",
  "Applying Tailwind CSS utilities...",
  "Injecting Framer Motion animations...",
  "Optimizing accessibility (a11y)...",
  "Finalizing responsive layout...",
  "Compiling TypeScript..."
];

const STYLE_PRESETS = [
  { id: 'minimalist', label: 'Minimalist', desc: 'Clean, spacious, high trust', icon: Palette },
  { id: 'glassmorphism', label: 'Glassmorphism', desc: 'Modern, blurred translucency', icon: Sparkles },
  { id: 'neon-glow', label: 'Neon Glow', desc: 'High energy, dark cyber aesthetic', icon: Zap },
  { id: 'brutalist', label: 'Brutalist', desc: 'Raw, bold, high contrast', icon: Terminal },
  { id: 'corporate', label: 'Corporate', desc: 'Professional, structure-focused', icon: Briefcase },
  { id: 'playful', label: 'Playful', desc: 'Soft corners, vibrant, organic', icon: Star },
  { id: 'retro', label: 'Retro', desc: 'Vintage warm grains, 70s-80s', icon: Palette },
  { id: 'sci-fi', label: 'Sci-Fi', desc: 'Futuristic HUD, cyan-neon', icon: Rocket },
  { id: 'bauhaus', label: 'Bauhaus', desc: 'Geometric, primary colors, grids', icon: LayoutDashboard },
] as const;

type StylePresetId = typeof STYLE_PRESETS[number]['id'];

interface UIState {
  prompt: string;
  brandKit: BrandKit;
  stylePreset: StylePresetId;
  customError: string;
  generatedVariations: string[];
  selectedVariationIndex: number;
}

const SAMPLE_PROMPT = "A high-converting hero section for a B2B SaaS analytics platform. It should have a dark mode aesthetic with a glowing gradient background, a bold headline, a subheadline, two call-to-action buttons (one primary, one secondary), and a floating dashboard mockup on the right side.";

const AIImage = ({ prompt, className, aspectRatio = '16:9', quality = 'Standard', style = 'Photorealistic', lighting = 'Natural' }: { prompt: string; className?: string; aspectRatio?: string; quality?: string; style?: string; lighting?: string }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!prompt) return;
    const generate = async () => {
      setLoading(true);
      try {
        const response = await generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: `Professional high-quality UI image: ${prompt}. Artistic Style: ${style}, Quality: ${quality}, Lighting: ${lighting}. Aspect Ratio: ${aspectRatio}. Optimized for modern landing pages.` }] },
          config: { imageConfig: { aspectRatio: aspectRatio as any } }
        });
        
        if (response.candidates && response.candidates[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              setImageUrl(`data:image/png;base64,${part.inlineData.data}`);
              break;
            }
          }
        }
      } catch (err) {
        console.error("AI Image Generation failed", err);
        // Fallback to a nice placeholder
        setImageUrl(`https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80`);
      } finally {
        setLoading(false);
      }
    };
    generate();
  }, [prompt, aspectRatio]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg ${className}`}>
        <Sparkles className="w-6 h-6 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!imageUrl) return null;

  return (
    <img 
      src={imageUrl} 
      className={`object-cover rounded-lg shadow-sm ${className}`} 
      alt={prompt}
      referrerPolicy="no-referrer"
    />
  );
};

export function UIGenerator({ variation, tier, onUpgrade, credits, spendCredits }: UIGeneratorProps) {
  const [prompt, setPrompt] = useState('');
  const [generatedVariations, setGeneratedVariations] = useState<string[]>([]);
  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');
  const [error, setError] = useState('');
  
  // Undo/Redo State
  const [history, setHistory] = useState<UIState[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isUndoRedoing, setIsUndoRedoing] = useState(false);

  // Style Preset
  const [stylePreset, setStylePreset] = useState<StylePresetId>('minimalist');
  const [customError, setCustomError] = useState('An unexpected error occurred. Please check your input.');
  const [optimizeLoading, setOptimizeLoading] = useState(false);
  
  // Advanced Generation Params
  const [negativePrompt, setNegativePrompt] = useState('');
  const [styleWeight, setStyleWeight] = useState(0.8);
  const [imageAspectRatio, setImageAspectRatio] = useState('16:9');
  const [imageQuality, setImageQuality] = useState('HD');
  const [artisticStyle, setArtisticStyle] = useState('Photorealistic');
  const [lightingConditions, setLightingConditions] = useState('Natural');

  // Prompt Library Search State
  const [promptSearch, setPromptSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Library State
  interface SavedVersion {
    id: string;
    prompt: string;
    variations: string[];
    timestamp: number;
  }
  
  interface SavedComponent {
    id: string;
    name: string;
    prompt: string;
    variations: string[];
    timestamp: number;
    versions: SavedVersion[];
  }

  const [savedComponents, setSavedComponents] = useState<SavedComponent[]>(() => {
    const saved = localStorage.getItem('ui_library');
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      // Migration: ensure versions exist
      return parsed.map((c: any) => ({
        ...c,
        versions: c.versions || []
      }));
    } catch (err) {
      console.error("Error parsing ui_library:", err);
      return [];
    }
  });
  const [isLibraryOpen, setIsLibraryOpen] = useState(false);
  const [currentLibraryId, setCurrentLibraryId] = useState<string | null>(null);

  // Preview Settings
  const [viewportWidth, setViewportWidth] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [simulateError, setSimulateError] = useState(false);
  const [simulateHover, setSimulateHover] = useState(false);
  const [simulateFocus, setSimulateFocus] = useState(false);
  const [simulateActive, setSimulateActive] = useState(false);
  const [simulateDisabled, setSimulateDisabled] = useState(false);
  
  // Brand Kit State with persistence
  const [brandKit, setBrandKit] = useState<BrandKit>(() => {
    const saved = localStorage.getItem('brandKit');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error("Error parsing brandKit:", err);
      }
    }
    return DEFAULT_BRAND_KIT;
  });
  
  // Push to history
  const pushHistory = (newState: Partial<UIState>) => {
    if (isUndoRedoing) return;
    
    const currentState: UIState = {
      prompt,
      brandKit,
      stylePreset,
      customError,
      generatedVariations,
      selectedVariationIndex
    };

    const nextState = { ...currentState, ...newState };
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(nextState);
    
    // Limit history to 50 steps
    if (newHistory.length > 50) newHistory.shift();
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setIsUndoRedoing(true);
      const prevIndex = historyIndex - 1;
      const state = history[prevIndex];
      
      setPrompt(state.prompt);
      setBrandKit(state.brandKit);
      setStylePreset(state.stylePreset);
      setCustomError(state.customError);
      setGeneratedVariations(state.generatedVariations);
      setSelectedVariationIndex(state.selectedVariationIndex);
      
      setHistoryIndex(prevIndex);
      setTimeout(() => setIsUndoRedoing(false), 50);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setIsUndoRedoing(true);
      const nextIndex = historyIndex + 1;
      const state = history[nextIndex];
      
      setPrompt(state.prompt);
      setBrandKit(state.brandKit);
      setStylePreset(state.stylePreset);
      setCustomError(state.customError);
      setGeneratedVariations(state.generatedVariations);
      setSelectedVariationIndex(state.selectedVariationIndex);
      
      setHistoryIndex(nextIndex);
      setTimeout(() => setIsUndoRedoing(false), 50);
    }
  };

  // Initialize history on first load
  useEffect(() => {
    if (history.length === 0 && !loading) {
      pushHistory({});
    }
  }, []);
  
  // Refinement State
  const [refinementPrompt, setRefinementPrompt] = useState('');
  const [isRefining, setIsRefining] = useState(false);

  useEffect(() => {
    localStorage.setItem('brandKit', JSON.stringify(brandKit));
  }, [brandKit]);

  useEffect(() => {
    localStorage.setItem('ui_library', JSON.stringify(savedComponents));
  }, [savedComponents]);

  const generatedUI = generatedVariations[selectedVariationIndex] || '';

  const handleSave = () => {
    if (generatedVariations.length === 0) return;
    
    if (currentLibraryId) {
      // Add as version to existing component
      const updated = savedComponents.map(c => {
        if (c.id === currentLibraryId) {
          const newVersion: SavedVersion = {
            id: crypto.randomUUID(),
            prompt,
            variations: generatedVariations,
            timestamp: Date.now()
          };
          return {
            ...c,
            prompt, // Update latest prompt
            variations: generatedVariations, // Update latest variations
            timestamp: Date.now(),
            versions: [newVersion, ...(c.versions || [])]
          };
        }
        return c;
      });
      setSavedComponents(updated);
    } else {
      // Save as new component
      const newId = crypto.randomUUID();
      const firstVersion: SavedVersion = {
        id: crypto.randomUUID(),
        prompt,
        variations: generatedVariations,
        timestamp: Date.now()
      };
      const newComponent: SavedComponent = {
        id: newId,
        name: prompt.substring(0, 30) || 'Untitled Component',
        prompt,
        variations: generatedVariations,
        timestamp: Date.now(),
        versions: [firstVersion]
      };
      setSavedComponents([newComponent, ...savedComponents]);
      setCurrentLibraryId(newId);
    }
  };

  const loadFromLibrary = (comp: SavedComponent) => {
    setPrompt(comp.prompt);
    setGeneratedVariations(comp.variations);
    setSelectedVariationIndex(0);
    setCurrentLibraryId(comp.id);
    setIsLibraryOpen(false);
    setActiveTab('preview');
  };

  const revertToVersion = (compId: string, version: SavedVersion) => {
    const updated = savedComponents.map(c => {
      if (c.id === compId) {
        return {
          ...c,
          prompt: version.prompt,
          variations: version.variations,
          timestamp: Date.now()
        };
      }
      return c;
    });
    setSavedComponents(updated);
    
    // Also load it into active workspace
    setPrompt(version.prompt);
    setGeneratedVariations(version.variations);
    setSelectedVariationIndex(0);
  };

  const deleteFromLibrary = (id: string) => {
    setSavedComponents(savedComponents.filter(c => c.id !== id));
  };

  const viewportMap = {
    mobile: 'max-w-[375px]',
    tablet: 'max-w-[768px]',
    desktop: 'max-w-full'
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStepIndex((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 600);
    } else {
      setLoadingStepIndex(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleOptimizePrompt = async () => {
    if (!prompt.trim() || optimizeLoading) return;
    
    const cost = 5;
    if (credits < cost) {
      setError(`Insufficient credits. You need ${cost} CPU credits to optimize a prompt.`);
      return;
    }

    setOptimizeLoading(true);
    setError('');

    try {
      spendCredits(cost);

      const res = await generateContent({
        model: "gemini-3-flash-preview",
        contents: `
        You are a Prompt Engineering Expert. 
        Optimize the following user prompt for high-quality, professional React/Tailwind component generation. 
        The prompt should be descriptive, specify layout details, color schemes (based on the brand), and state behaviors.
        Keep it under 300 words.
        Return ONLY the optimized prompt text.
        
        Original User Prompt: ${prompt}
      `,
      });
      
      const optimized = res.text?.trim() || '';
      setPrompt(optimized);
      pushHistory({ prompt: optimized });
    } catch (err) {
      console.error("Optimization failed", err);
      setError("Failed to optimize prompt. Please try again.");
    } finally {
      setOptimizeLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt first.");
      return;
    }

    const cost = 10;
    if (credits < cost) {
      setError(`Insufficient credits. You need ${cost} credits to generate a component.`);
      return;
    }

    setError('');
    
    // Guardrail: Ensure the prompt is actually about UI generation
    const uiKeywords = ['button', 'card', 'dashboard', 'modal', 'ui', 'interface', 'page', 'layout', 'component', 'nav', 'header', 'footer', 'form', 'table', 'chart', 'pricing', 'hero', 'screen', 'app', 'design'];
    const isUIRelated = uiKeywords.some(kw => prompt.toLowerCase().includes(kw));
    
    if (!isUIRelated && prompt.length > 0) {
      setError("Prompt rejected: The UI Generator is strictly tuned for React/Tailwind component generation. Please describe a user interface element (e.g., 'dashboard', 'pricing card', 'navigation').");
      return;
    }

    setLoading(true);
    setGeneratedVariations([]);
    setSelectedVariationIndex(0);
    setActiveTab('preview');
    
    try {
      // Spend credits
      spendCredits(cost);

      const trackContext = variation === 'indie'
        ? "BUSINESS CONTEXT: You are designing for an Indie Hacker / Bootstrapped startup. Copywriting MUST be high-conversion, direct, and use FOMO (e.g., 'Limited spots', 'Lifetime deal'). Layouts should be bold and modern."
        : "BUSINESS CONTEXT: You are designing for a VC-backed Enterprise startup. Copywriting MUST build trust, emphasize security (SOC2, SSO, SLA), scalability, and ROI. Layouts should be highly professional, clean, and enterprise-grade.";

      const presetContext = {
        minimalist: "STYLE PRESET: Minimalist. Use lots of negative space, thin lines, subtle shadows, and a neutral color palette. Avoid heavy gradients or complex patterns.",
        glassmorphism: "STYLE PRESET: Glassmorphism. Use 'backdrop-blur-md', semi-transparent backgrounds ('bg-white/10' or 'bg-black/10'), and thin white borders to create a glassy, floating effect.",
        'neon-glow': "STYLE PRESET: Neon Glow. Use a dark background (#0a0a0a), vibrant neon borders, and 'shadow-[0_0_15px_rgba(...)]' to create a glowing cyber aesthetic. Use high-contrast gradients.",
        brutalist: "STYLE PRESET: Brutalist. Use thick black borders (4px+), hard shadows (no blur), high-contrast primary colors, and bold, oversized typography. No gradients.",
        corporate: "STYLE PRESET: Corporate. High structure, clear hierarchy, standard professional grids, and trustworthy blue/gray accents. Solid colors and standard shadows.",
        playful: "STYLE PRESET: Playful. Use large border radii ('rounded-[32px]'), soft organic shapes, vibrant pastel colors, and friendly, approachable typography.",
        retro: "STYLE PRESET: Retro. Use muted/warm tones, grainy textures, vintage serif typography, and decorative borders. 70s-80s aesthetics.",
        'sci-fi': "STYLE PRESET: Sci-Fi. Cyan/magenta neon, sharp geometric clip-paths, hexagonal patterns, and condensed sans-serif HUD-style typography.",
        bauhaus: "STYLE PRESET: Bauhaus. Geometric shapes, primary colors (Red/Blue/Yellow), thick black lines, and clean asymmetric grids. functionalist style.",
      }[stylePreset];

      const systemInstruction = `You are an expert React and Tailwind CSS developer. 
Generate 3 distinct variations of a single, self-contained React component based on the user's prompt.
Each variation should have a different aesthetic (e.g., Minimalist, High-Tech, Playful) while solving the same user problem.

The variations must be returned as a JSON object with keys "variation1", "variation2", and "variation3".
Each value must be the raw TypeScript React code for that variation.
The component in each code block must be the default export and named GeneratedComponent.
Do not use any external libraries other than 'react', 'lucide-react', and 'motion/react'.
IMPORTANT: If you use 'lucide-react', you may ONLY import and use these icons: CheckCircle2, Sparkles, ArrowRight, Star, User, Settings, Activity, Zap. Do not use any other icons.

${trackContext}
${presetContext}

BRANDING ENFORCEMENT:
- Primary Color: Use the hex color '${brandKit.primaryColor}' for primary buttons and main actions.
- Accent Color: Use the hex color '${brandKit.accentColor}' for secondary highlights, hover states, and decorative elements.
- Link Color: Use the hex color '${brandKit.linkColor}' for text links and simple navigation elements.
- Border Radius: Apply '${brandKit.borderRadius === 'sharp' ? 'rounded-none' : brandKit.borderRadius === 'medium' ? 'rounded-lg' : 'rounded-3xl'}' to components.
- Font Family: Use '${brandKit.fontFamily}' (assume it is available).
- Button Style: Implement buttons as '${brandKit.buttonStyle}'.
  - 'solid': High emphasis, filled background.
  - 'outline': Medium emphasis, transparent background with border.
  - 'ghost': Low emphasis, transparent background and border until hover.
- Input Appearance: Implement input fields as '${brandKit.inputStyle}'.
  - 'filled': Subtle background color (e.g., bg-gray-50), minimal border.
  - 'outlined': Transparent background with clear border.
  - 'underlined': Border on the bottom only (border-b-2).

STATE SIMULATION & ACCESSIBILITY:
- Props to support: 'isError' (boolean), 'errorMessage' (string), 'isHovered' (boolean), 'isFocused' (boolean), 'isActive' (boolean), 'isDisabled' (boolean).
- DISABLED STATE: When 'isDisabled' is true, all interactive elements (buttons, inputs) MUST use 'opacity-50 grayscale cursor-not-allowed pointer-events-none' and be physically disabled.
- ACCESSIBILITY: Use semantic HTML (<header>, <main>, <nav>, <button>, <label>). Add 'aria-label', 'aria-hidden', and 'role' attributes where appropriate.
- ERROR STATE: When 'isError' is true, highlights relevant elements with red borders (e.g., 'border-red-500') and display the 'errorMessage' (default: "${customError}") clearly using 'text-red-600'.
- FOCUS STATES: All interactive elements MUST have clear focus rings (e.g., 'focus:ring-2 focus:ring-offset-2 focus:ring-[${brandKit.primaryColor}]'). Simulate this visually if 'isFocused' is true.
- HOVER EFFECTS: Apply subtle scale and shadow effects to primary interactive elements on hover (e.g., 'transition-transform hover:scale-[1.02] hover:shadow-lg'). Simulate this visually if 'isHovered' is true.

ADVANCED PARAMETERS:
- Negative Prompt Context: Avoid generating elements that match: "${negativePrompt}".
- Style Weight: The user wants a style intensity of ${styleWeight * 100}%. Ensure designs are highly ${styleWeight > 0.5 ? 'opinionated' : 'conservative'} based on this.

IMAGES:
- Use the provided <AIImage prompt="description" aspectRatio="${imageAspectRatio}" quality="${imageQuality}" style="${artisticStyle}" lighting="${lightingConditions}" className="..." /> component for all images.
- The 'prompt' should describe the image content (e.g., "AI dashboard interface", "Robot assistant avatar").
- Supported aspectRatios: "1:1", "3:4", "4:3", "9:16", "16:9".
- This component uses Imagen to generate real, relevant AI-themed images.

Use Tailwind CSS classes for styling.
Return ONLY the raw JSON object. Do not include markdown formatting like \`\`\`json or \`\`\`.`;

      const response = await generateContent({
        model: "gemini-3.1-pro-preview",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7, // Higher temperature for more distinct variations
        }
      });

      let rawResponse = response.text || '';
      
      // Better JSON extraction
      rawResponse = rawResponse.trim();
      const firstBrace = rawResponse.indexOf('{');
      const lastBrace = rawResponse.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        rawResponse = rawResponse.substring(firstBrace, lastBrace + 1);
      }

      const parsed = JSON.parse(rawResponse);
      const variations = [parsed.variation1, parsed.variation2, parsed.variation3].filter(Boolean);

      const formattedVariations = await Promise.all(variations.map(async (v) => {
        try {
          return await prettier.format(v, {
            parser: 'babel-ts',
            plugins: [babelPlugin, estreePlugin],
            semi: true,
            singleQuote: true,
          });
        } catch (err) {
          console.error("Formatting failed for a variation", err);
          return v;
        }
      }));

      setGeneratedVariations(formattedVariations);
    } catch (err) {
      console.error("Generation failed", err);
      setError("Failed to generate UI. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefine = async () => {
    if (!refinementPrompt.trim()) return;
    setIsRefining(true);
    
    try {
      const trackContext = variation === 'indie'
        ? "BUSINESS CONTEXT: You are designing for an Indie Hacker / Bootstrapped startup. Copywriting MUST be high-conversion, direct, and use FOMO (e.g., 'Limited spots', 'Lifetime deal'). Layouts should be bold and modern."
        : "BUSINESS CONTEXT: You are designing for a VC-backed Enterprise startup. Copywriting MUST build trust, emphasize security (SOC2, SSO, SLA), scalability, and ROI. Layouts should be highly professional, clean, and enterprise-grade.";

      const presetContext = {
        minimalist: "STYLE PRESET: Minimalist. Use lots of negative space, thin lines, subtle shadows, and a neutral color palette. Avoid heavy gradients or complex patterns.",
        glassmorphism: "STYLE PRESET: Glassmorphism. Use 'backdrop-blur-md', semi-transparent backgrounds ('bg-white/10' or 'bg-black/10'), and thin white borders to create a glassy, floating effect.",
        'neon-glow': "STYLE PRESET: Neon Glow. Use a dark background (#0a0a0a), vibrant neon borders, and 'shadow-[0_0_15px_rgba(...)]' to create a glowing cyber aesthetic. Use high-contrast gradients.",
        brutalist: "STYLE PRESET: Brutalist. Use thick black borders (4px+), hard shadows (no blur), high-contrast primary colors, and bold, oversized typography. No gradients.",
        corporate: "STYLE PRESET: Corporate. High structure, clear hierarchy, standard professional grids, and trustworthy blue/gray accents. Solid colors and standard shadows.",
        playful: "STYLE PRESET: Playful. Use large border radii ('rounded-[32px]'), soft organic shapes, vibrant pastel colors, and friendly, approachable typography.",
        retro: "STYLE PRESET: Retro. Use muted/warm tones, grainy textures, vintage serif typography, and decorative borders. 70s-80s aesthetics.",
        'sci-fi': "STYLE PRESET: Sci-Fi. Cyan/magenta neon, sharp geometric clip-paths, hexagonal patterns, and condensed sans-serif HUD-style typography.",
        bauhaus: "STYLE PRESET: Bauhaus. Geometric shapes, primary colors (Red/Blue/Yellow), thick black lines, and clean asymmetric grids. functionalist style.",
      }[stylePreset];

      const systemInstruction = `You are an expert React and Tailwind CSS developer. 
Generate a single, self-contained React component based on the user's prompt.
The component must be the default export and named GeneratedComponent.
Do not use any external libraries other than 'react', 'lucide-react', and 'motion/react'.
IMPORTANT: If you use 'lucide-react', you may ONLY import and use these icons: CheckCircle2, Sparkles, ArrowRight, Star, User, Settings, Activity, Zap. Do not use any other icons.

${trackContext}
${presetContext}

BRANDING ENFORCEMENT:
- Primary Color: Use the hex color '${brandKit.primaryColor}' for primary buttons and main actions.
- Accent Color: Use the hex color '${brandKit.accentColor}' for secondary highlights, hover states, and decorative elements.
- Link Color: Use the hex color '${brandKit.linkColor}' for text links and simple navigation elements.
- Border Radius: Apply '${brandKit.borderRadius === 'sharp' ? 'rounded-none' : brandKit.borderRadius === 'medium' ? 'rounded-lg' : 'rounded-3xl'}' to components.
- Font Family: Use '${brandKit.fontFamily}' (assume it is available).
- Button Style: Implement buttons as '${brandKit.buttonStyle}'.
  - 'solid': High emphasis, filled background.
  - 'outline': Medium emphasis, transparent background with border.
  - 'ghost': Low emphasis, transparent background and border until hover.
- Input Appearance: Implement input fields as '${brandKit.inputStyle}'.
  - 'filled': Subtle background color (e.g., bg-gray-50), minimal border.
  - 'outlined': Transparent background with clear border.
  - 'underlined': Border on the bottom only (border-b-2).

STATE SIMULATION & ACCESSIBILITY:
- Props to support: 'isError' (boolean), 'errorMessage' (string), 'isHovered' (boolean), 'isFocused' (boolean), 'isActive' (boolean), 'isDisabled' (boolean).
- DISABLED STATE: When 'isDisabled' is true, all interactive elements (buttons, inputs) MUST use 'opacity-50 grayscale cursor-not-allowed pointer-events-none' and be physically disabled.
- ACCESSIBILITY: Use semantic HTML (<header>, <main>, <nav>, <button>, <label>). Add 'aria-label', 'aria-hidden', and 'role' attributes where appropriate.
- ERROR STATE: When 'isError' is true, highlights relevant elements with red borders (e.g., 'border-red-500') and display the 'errorMessage' (default: "${customError}") clearly using 'text-red-600'.
- FOCUS STATES: All interactive elements MUST have clear focus rings (e.g., 'focus:ring-2 focus:ring-offset-2 focus:ring-[${brandKit.primaryColor}]'). Simulate this visually if 'isFocused' is true.
- HOVER EFFECTS: Apply subtle scale and shadow effects to primary interactive elements on hover (e.g., 'transition-transform hover:scale-[1.02] hover:shadow-lg'). Simulate this visually if 'isHovered' is true.

ADVANCED PARAMETERS:
- Negative Prompt Context: Avoid generating elements that match: "${negativePrompt}".
- Style Weight: The user wants a style intensity of ${styleWeight * 100}%. Ensure designs are highly ${styleWeight > 0.5 ? 'opinionated' : 'conservative'} based on this.

IMAGES:
- Use the provided <AIImage prompt="description" aspectRatio="${imageAspectRatio}" quality="${imageQuality}" style="${artisticStyle}" lighting="${lightingConditions}" className="..." /> component for all images.
- The 'prompt' should describe the image content (e.g., "AI dashboard interface", "Robot assistant avatar").
- Supported aspectRatios: "1:1", "3:4", "4:3", "9:16", "16:9".
- This component uses Imagen to generate real, relevant AI-themed images.

Use Tailwind CSS classes for styling.
Return ONLY the raw TypeScript React code. Do not include markdown formatting like \`\`\`tsx or \`\`\`.
Do not include any explanations.`;

      const response = await generateContent({
        model: "gemini-3.1-pro-preview",
        contents: `Here is the existing React component code:\n\n${generatedUI}\n\nUser Request to modify this code: ${refinementPrompt}\n\nReturn the complete updated React code.`,
        config: {
          systemInstruction,
          temperature: 0.2,
        }
      });

      let rawCode = response.text || '';
      
      // Better code extraction
      rawCode = rawCode.trim();
      if (rawCode.startsWith('```')) {
        rawCode = rawCode.replace(/^```[a-z]*\n/i, '').replace(/\n```$/i, '');
      }
      rawCode = rawCode.trim();

      try {
        const formattedCode = await prettier.format(rawCode, {
          parser: 'babel-ts',
          plugins: [babelPlugin, estreePlugin],
          semi: true,
          singleQuote: true,
        });
        
        const newVariations = [...generatedVariations];
        newVariations[selectedVariationIndex] = formattedCode;
        setGeneratedVariations(newVariations);
      } catch (err) {
        console.error("Formatting failed", err);
        const newVariations = [...generatedVariations];
        newVariations[selectedVariationIndex] = rawCode;
        setGeneratedVariations(newVariations);
      }
      setRefinementPrompt('');
    } catch (err) {
      console.error("Refinement failed", err);
    } finally {
      setIsRefining(false);
    }
  };

  const handleDownload = () => {
    if (!generatedUI) return;
    const blob = new Blob([generatedUI], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'GeneratedComponent.tsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const updateStylePreset = (id: StylePresetId) => {
    pushHistory({ stylePreset: id });
    setStylePreset(id);
  };

  const updateCustomError = (val: string) => {
    pushHistory({ customError: val });
    setCustomError(val);
  };

  const filteredSophisticated = sophisticatedPrompts.filter(sp => {
    const matchesSearch = sp.title.toLowerCase().includes(promptSearch.toLowerCase()) || 
                          sp.desc.toLowerCase().includes(promptSearch.toLowerCase()) ||
                          sp.prompt.toLowerCase().includes(promptSearch.toLowerCase()) ||
                          sp.industry.toLowerCase().includes(promptSearch.toLowerCase());
    const matchesCategory = selectedCategory ? sp.track.toLowerCase() === selectedCategory.toLowerCase() : true;
    return matchesSearch && matchesCategory;
  });

  const filteredCategories = promptCategories.filter(cat => {
    const matchesCategorySelection = selectedCategory ? cat.title.toLowerCase() === selectedCategory.toLowerCase() : true;
    const matchesAnyPromptInCat = cat.prompts.some(p => p.toLowerCase().includes(promptSearch.toLowerCase()));
    
    // If a category is explicitly selected, show it if it has matching prompts or if search is empty
    if (selectedCategory) {
      return matchesCategorySelection && (promptSearch === '' || matchesAnyPromptInCat);
    }
    // If no category is selected, only show categories that have results for the current search
    return promptSearch === '' ? true : matchesAnyPromptInCat;
  }).map(cat => ({
    ...cat,
    prompts: cat.prompts.filter(p => p.toLowerCase().includes(promptSearch.toLowerCase()))
  })).filter(cat => cat.prompts.length > 0);

  const availableCategories = Array.from(new Set([
    ...sophisticatedPrompts.map(sp => sp.track),
    ...promptCategories.map(cat => cat.title)
  ]));

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Instant UI Generator</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate production-ready React components tailored to your launch track.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-1 shadow-sm">
            <button 
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Undo"
            >
              <Undo2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
            <button 
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              title="Redo"
            >
              <Redo2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
          <button
            onClick={() => setIsLibraryOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm font-medium"
          >
            <LayoutDashboard className="w-4 h-4" />
            My Library ({savedComponents.length})
          </button>
        </div>
      </div>

      {/* Generator Input */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-sm relative overflow-hidden">
        {/* Subtle glowing background */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none" />
        
        {/* Brand Kit & Style Presets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 relative z-10">
          <BrandKitPanel 
            kit={brandKit} 
            updateKit={(k, v) => {
              const newKit = { ...brandKit, [k]: v };
              pushHistory({ brandKit: newKit });
              setBrandKit(newKit);
            }} 
            setBrandKit={(newKit) => {
              pushHistory({ brandKit: newKit });
              setBrandKit(newKit);
            }}
          />
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" /> Style Preset
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {STYLE_PRESETS.map((p) => {
                const Icon = p.icon;
                const isActive = stylePreset === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => updateStylePreset(p.id)}
                    className={`flex flex-col items-center p-2.5 rounded-xl border-2 transition-all text-center group ${
                      isActive 
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20' 
                        : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-black/20 hover:border-blue-400 dark:hover:border-blue-600'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-1.5 transition-colors ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 group-hover:text-blue-500'}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-tight leading-tight ${isActive ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'}`}>{p.label}</span>
                  </button>
                );
              })}
            </div>
            
            <div className="pt-2">
               <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2 mb-2">
                <ShieldAlert className="w-4 h-4 text-red-500" /> Custom Error Message
              </h3>
              <input 
                type="text"
                value={customError}
                onChange={(e) => updateCustomError(e.target.value)}
                placeholder="e.g. 'Invalid email address', 'Form submission failed'"
                className="w-full px-4 py-2 bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 flex justify-between items-end mb-2">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">Component Description</label>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleOptimizePrompt}
              disabled={optimizeLoading || !prompt.trim()}
              className="text-xs text-purple-600 dark:text-purple-400 hover:underline font-black flex items-center gap-1 uppercase tracking-widest disabled:opacity-50"
            >
              {optimizeLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
              {optimizeLoading ? 'Optimizing...' : 'Smart Optimize (5 CPU)'}
            </button>
            <button 
              onClick={() => setPrompt(SAMPLE_PROMPT)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3" /> Try sample
            </button>
          </div>
        </div>

        <textarea 
          value={prompt} 
          onChange={(e) => { 
            const val = e.target.value;
            setPrompt(val); 
            setError(''); 
            // Debounced history push for prompt would be better, but for simplicity:
            if (val.endsWith(' ')) pushHistory({ prompt: val });
          }}
          placeholder="Describe the UI component you want to generate. Be specific about the industry, style, and features (e.g., 'A modern SaaS pricing table for a fintech startup with 3 tiers, a toggle for annual billing, and a dark mode aesthetic')."
          className={`relative z-10 w-full h-36 p-4 border ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'} rounded-xl bg-gray-50 dark:bg-black/50 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent resize-none mb-4 placeholder-gray-400 dark:placeholder-gray-600`}
        />

        {/* Advanced Prompt Options */}
        <div className="relative z-10 mb-6 bg-gray-50 dark:bg-gray-800/30 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Settings className="w-3 h-3" /> Advanced Generation Parameters
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-6">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-1.5 tracking-wider">Negative Prompt</label>
              <input 
                type="text"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="Avoid blurry, low resolution, crowded, messy text..."
                className="w-full px-3 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-1.5 tracking-wider">Style Weight ({styleWeight})</label>
              <input 
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={styleWeight}
                onChange={(e) => setStyleWeight(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:col-span-3 pt-2 border-t border-gray-200 dark:border-gray-800">
              <div>
                <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-1.5 tracking-wider">Aspect Ratio</label>
                <select 
                  value={imageAspectRatio}
                  onChange={(e) => setImageAspectRatio(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-[10px]"
                >
                  <option value="1:1">1:1 Square</option>
                  <option value="16:9">16:9 Cinema</option>
                  <option value="4:3">4:3 Classic</option>
                  <option value="21:9">21:9 Wide</option>
                  <option value="9:16">9:16 Story</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-1.5 tracking-wider">Quality</label>
                <select 
                  value={imageQuality}
                  onChange={(e) => setImageQuality(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-[10px]"
                >
                  <option value="Standard">Standard</option>
                  <option value="HD">HD Definition</option>
                  <option value="4K">4K Ultra HD</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-1.5 tracking-wider">Artistic Style</label>
                <select 
                  value={artisticStyle}
                  onChange={(e) => setArtisticStyle(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-[10px]"
                >
                  <option value="Photorealistic">Photorealistic</option>
                  <option value="Digital Art">Digital Art</option>
                  <option value="Isometric">Isometric 3D</option>
                  <option value="Minimalist">Minimalist</option>
                  <option value="Claymorphism">Claymorphism</option>
                  <option value="Oil Painting">Oil Painting</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase mb-1.5 tracking-wider">Lighting</label>
                <select 
                  value={lightingConditions}
                  onChange={(e) => setLightingConditions(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-[10px]"
                >
                  <option value="Natural">Natural Light</option>
                  <option value="Studio">Studio Light</option>
                  <option value="Cinematic">Cinematic</option>
                  <option value="Neon">Neon / Cyber</option>
                  <option value="Soft">Soft Ambient</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {error && (
          <p className="relative z-10 text-red-500 text-sm mb-4 flex items-center gap-1">
            <ShieldAlert className="w-4 h-4" /> {error}
          </p>
        )}

        <button
          onClick={handleGenerate}
          disabled={loading || !prompt.trim()}
          className="relative z-10 w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-400 dark:disabled:bg-gray-800 text-white font-semibold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] disabled:shadow-none mt-2"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Sparkles className="w-5 h-5" />
          )}
          {loading ? 'Synthesizing UI...' : 'Generate Component'}
        </button>
      </div>

      {/* Loading State */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-gray-950 border border-gray-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 animate-pulse" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-[scan_2s_ease-in-out_infinite]" />
            
            <div className="relative z-10 flex flex-col items-center justify-center py-8">
              <div className="w-16 h-16 relative mb-8">
                <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-spin" />
                <div className="absolute inset-2 border-r-2 border-purple-500 rounded-full animate-spin animation-delay-150" />
                <div className="absolute inset-4 border-b-2 border-cyan-500 rounded-full animate-spin animation-delay-300" />
                <Code2 className="absolute inset-0 m-auto w-6 h-6 text-blue-400" />
              </div>
              
              <div className="w-full max-w-md space-y-3">
                {loadingSteps.map((step, index) => {
                  const isCompleted = index < loadingStepIndex;
                  const isCurrent = index === loadingStepIndex;
                  const isPending = index > loadingStepIndex;
                  
                  return (
                    <motion.div 
                      key={step}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: isPending ? 0.3 : 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-center gap-3 text-sm font-mono ${isCurrent ? 'text-blue-400' : isCompleted ? 'text-green-400' : 'text-gray-500'}`}
                    >
                      <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                        {isCompleted && <CheckCircle2 className="w-4 h-4" />}
                        {isCurrent && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isPending && <div className="w-1.5 h-1.5 rounded-full bg-gray-600" />}
                      </div>
                      <span>{step}</span>
                    </motion.div>
                  )
                })}
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-md mt-8 bg-gray-800 rounded-full h-1.5 overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.max(5, (loadingStepIndex / (loadingSteps.length - 1)) * 100)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Generated Output */}
      {generatedVariations.length > 0 && !loading && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-2xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black/40 gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex gap-2 p-1 bg-gray-200 dark:bg-gray-800 rounded-lg w-fit">
                <button 
                  onClick={() => setActiveTab('preview')}
                  className={`text-sm font-medium px-4 py-1.5 rounded-md transition-all flex items-center gap-2 ${activeTab === 'preview' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                >
                  <Play className="w-4 h-4" />
                  Preview
                </button>
                <button 
                  onClick={() => setActiveTab('code')}
                  className={`text-sm font-medium px-4 py-1.5 rounded-md transition-all flex items-center gap-2 ${activeTab === 'code' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'}`}
                >
                  <Code2 className="w-4 h-4" />
                  Code {tier === 'free' && <Lock className="w-3 h-3 text-amber-500" />}
                </button>
              </div>

              {/* Variation Selector */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Variations</span>
                <div className="flex gap-2">
                  {generatedVariations.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedVariationIndex(idx)}
                      className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                        selectedVariationIndex === idx 
                          ? 'bg-blue-600 text-white shadow-lg scale-110' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {activeTab === 'preview' && (
                <div className="flex items-center gap-2 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-x-auto no-scrollbar max-w-[300px] sm:max-w-none">
                  {/* Viewport Controls */}
                  <div className="flex items-center gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
                    <button 
                      onClick={() => setViewportWidth('mobile')}
                      className={`p-1.5 rounded-md transition-all ${viewportWidth === 'mobile' ? 'bg-white dark:bg-gray-700 text-blue-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                      title="Mobile View"
                    >
                      <div className="w-4 h-6 border-2 border-current rounded-sm" />
                    </button>
                    <button 
                      onClick={() => setViewportWidth('tablet')}
                      className={`p-1.5 rounded-md transition-all ${viewportWidth === 'tablet' ? 'bg-white dark:bg-gray-700 text-blue-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                      title="Tablet View"
                    >
                      <div className="w-6 h-4 border-2 border-current rounded-sm" />
                    </button>
                    <button 
                      onClick={() => setViewportWidth('desktop')}
                      className={`p-1.5 rounded-md transition-all ${viewportWidth === 'desktop' ? 'bg-white dark:bg-gray-700 text-blue-500 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                      title="Desktop View"
                    >
                      <div className="w-7 h-5 border-2 border-current rounded-sm border-b-4" />
                    </button>
                  </div>
                  
                  {/* Interaction Simulators */}
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => setSimulateHover(!simulateHover)}
                      className={`p-1.5 rounded-md transition-all ${simulateHover ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-blue-500'}`}
                      title="Simulate Hover"
                    >
                      <MousePointer2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setSimulateFocus(!simulateFocus)}
                      className={`p-1.5 rounded-md transition-all ${simulateFocus ? 'bg-indigo-500 text-white' : 'text-gray-400 hover:text-indigo-500'}`}
                      title="Simulate Focus"
                    >
                      <Focus className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setSimulateActive(!simulateActive)}
                      className={`p-1.5 rounded-md transition-all ${simulateActive ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-purple-500'}`}
                      title="Simulate Active/Pressed"
                    >
                      <HandMetal className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setSimulateDisabled(!simulateDisabled)}
                      className={`p-1.5 rounded-md transition-all ${simulateDisabled ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-gray-600'}`}
                      title="Simulate Disabled"
                    >
                      <Ban className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => setSimulateError(!simulateError)}
                      className={`px-2 py-1 rounded transition-all text-[10px] font-bold ${simulateError ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-red-500'}`}
                      title="Simulate Error State"
                    >
                      ERR
                    </button>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <button 
                  onClick={handleSave}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  Save to Library
                </button>
                {activeTab === 'code' && tier !== 'free' && (
                  <>
                    <button 
                      onClick={() => navigator.clipboard.writeText(generatedUI)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                    <button 
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors text-sm font-medium shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                    >
                      <Download className="w-4 h-4" />
                      Download .tsx
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-0">
            {activeTab === 'preview' ? (
              <div className="border-t border-gray-200 dark:border-gray-800 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] dark:bg-gray-950 flex flex-col items-center min-h-[500px] p-8 relative overflow-hidden">
                {/* Decorative background elements for the preview canvas */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-900/0 to-gray-900/0 pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
                
                <div className={`relative z-10 w-full transition-all duration-300 ease-in-out ${viewportMap[viewportWidth]} bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800`}>
                  <div className="flex-1 w-full overflow-auto flex items-center justify-center p-4 min-h-[400px]">
                    <LiveProvider 
                      code={`${generatedUI.replace(/import .* from .*/g, '').replace(/export default /g, '').trim()}\nrender(<GeneratedComponent isError={${simulateError}} errorMessage="${customError}" isHovered={${simulateHover}} isFocused={${simulateFocus}} isActive={${simulateActive}} isDisabled={${simulateDisabled}} />);`} 
                      scope={{ React, useState, useEffect, motion, CheckCircle2, Sparkles, ArrowRight, Star, User, Settings, Activity, Zap, AIImage }}
                      noInline={true}
                    >
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <LivePreview className="w-full flex justify-center" />
                        <LiveError className="text-red-400 text-xs p-4 bg-red-950/50 border border-red-900 rounded-xl mt-4 w-full max-w-2xl overflow-auto" />
                      </div>
                    </LiveProvider>
                  </div>
                </div>
                  
                  {/* Chat Refinement */}
                  <div className="w-full max-w-3xl p-4 mt-4 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
                    <div className="relative">
                      <input
                        type="text"
                        value={refinementPrompt}
                        onChange={(e) => setRefinementPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleRefine()}
                        placeholder="Tweak this design (e.g., 'Make the button larger', 'Change to a dark theme')..."
                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500"
                      />
                      <button
                        onClick={handleRefine}
                        disabled={isRefining || !refinementPrompt.trim()}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-400 dark:disabled:bg-gray-700 text-white rounded-lg transition-colors"
                      >
                        {isRefining ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
            ) : (
              tier === 'free' ? (
                <div className="py-12 bg-gray-950">
                  <Paywall onUpgrade={onUpgrade} title="Generated React Code" />
                </div>
              ) : (
                <pre className="bg-gray-950 text-blue-300 p-6 overflow-x-auto text-sm font-mono m-0">
                  <code>{generatedUI}</code>
                </pre>
              )
            )}
          </div>
        </motion.div>
      )}

      {/* Library Modal */}
      <AnimatePresence>
        {isLibraryOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5 text-blue-500" />
                  My Saved Components
                </h2>
                <button 
                  onClick={() => setIsLibraryOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Zap className="w-5 h-5 text-gray-500 rotate-45" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                {savedComponents.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Code2 className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400">No saved components yet. Generate and save some!</p>
                  </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {savedComponents.map((comp) => (
                        <div 
                          key={comp.id}
                          className="group bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:border-blue-500 transition-all flex flex-col"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-gray-900 dark:text-white truncate pr-4">{comp.name}</h3>
                            <button 
                              onClick={() => deleteFromLibrary(comp.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Zap className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 h-8">
                            {comp.prompt}
                          </p>
                          
                          {/* Versions Accordion */}
                          {comp.versions && comp.versions.length > 0 && (
                            <div className="mt-2 mb-4">
                              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                                <Undo2 className="w-3 h-3" /> Version History ({comp.versions.length})
                              </h4>
                              <div className="flex flex-col gap-1 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
                                {comp.versions.map((ver, vIdx) => (
                                  <button
                                    key={ver.id}
                                    onClick={() => revertToVersion(comp.id, ver)}
                                    className="flex items-center justify-between p-1.5 rounded bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-blue-500 transition-all text-left"
                                  >
                                    <div className="flex flex-col">
                                      <span className="text-[10px] font-medium text-gray-700 dark:text-gray-300">
                                        Version {comp.versions.length - vIdx}
                                      </span>
                                      <span className="text-[8px] text-gray-400">
                                        {new Date(ver.timestamp).toLocaleString()}
                                      </span>
                                    </div>
                                    <Undo2 className="w-3 h-3 text-gray-400 group-hover:text-blue-500" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="mt-auto flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-800">
                            <span className="text-[10px] text-gray-400">
                              Updated {new Intl.RelativeTimeFormat('en', { style: 'short' }).format(Math.round((comp.timestamp - Date.now()) / (1000 * 60 * 60 * 24)), 'day')}
                            </span>
                            <button 
                              onClick={() => loadFromLibrary(comp)}
                              className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-500 transition-colors"
                            >
                              Load Latest
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Prompt Library */}
      <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              Prompt Library
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Discover and use pre-vetted design blueprints.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text"
                value={promptSearch}
                onChange={(e) => setPromptSearch(e.target.value)}
                placeholder="Search blueprints..."
                className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-full sm:w-64"
              />
              {promptSearch && (
                <button 
                  onClick={() => setPromptSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <X className="w-3 h-3 text-gray-400" />
                </button>
              )}
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <select 
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="pl-10 pr-8 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer min-w-[140px]"
              >
                <option value="">All Tracks</option>
                {availableCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {filteredSophisticated.length === 0 && filteredCategories.length === 0 && (
          <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No blueprints found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={() => { setPromptSearch(''); setSelectedCategory(null); }}
              className="mt-4 text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Sophisticated Prompts */}
        {filteredSophisticated.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Sophisticated Blueprints</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSophisticated.map((sp, i) => (
                <div 
                  key={i} 
                  onClick={() => {
                    setPrompt(sp.prompt);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/50 rounded-xl p-5 cursor-pointer hover:shadow-lg transition-all group relative overflow-hidden h-full flex flex-col"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-blue-900 dark:text-blue-100 line-clamp-1">{sp.title}</h4>
                    <span className="text-[10px] font-bold uppercase tracking-tighter px-2 py-0.5 bg-blue-100 dark:bg-blue-800/50 text-blue-700 dark:text-blue-300 rounded-lg">
                      {sp.track}
                    </span>
                  </div>
                  <p className="text-sm text-blue-800/70 dark:text-blue-200/70 mb-4 flex-grow line-clamp-3">{sp.desc}</p>
                  <div className="flex items-center text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 pt-4 border-t border-blue-200/30">
                    Use blueprint <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Prompts */}
        {filteredCategories.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Quick Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map((category, i) => {
                const Icon = category.icon;
                return (
                  <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white uppercase tracking-tight text-xs">{category.title}</h4>
                    </div>
                    <ul className="space-y-1">
                      {category.prompts.map((p, j) => (
                        <li key={j}>
                          <button 
                            onClick={() => {
                              setPrompt(p);
                              window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-between group"
                          >
                            <span className="truncate">{p}</span>
                            <Plus className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
