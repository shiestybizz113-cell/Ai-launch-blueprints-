import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Save, AlertCircle, Sparkles, CheckSquare, RefreshCw, Wand2, Copy, Check, Brain, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

interface SectionDraftNotepadProps {
  activeSection: string;
}

export function SectionDraftNotepad({ activeSection }: SectionDraftNotepadProps) {
  const [draftText, setDraftText] = useState('');
  const [lastSubmited, setLastSubmitted] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(true);

  // Gemini optimization states
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizedAdvice, setOptimizedAdvice] = useState<string | null>(null);
  const [copiedAdvice, setCopiedAdvice] = useState(false);

  // Map of machine-readable section IDs to user-friendly titles
  const sectionTitleMap: Record<string, string> = {
    market: 'Market Validation Strategy',
    positioning: 'Product Positioning Objectives',
    revenue: 'Revenue & Monetization Strategy',
    launch: 'Launch Execution Plan',
    marketing: 'Marketing & Sales Channels',
    finance: 'Financial Projections Model',
    risk: 'Risk Assessment & Contingencies',
    monetization: 'Platform Monetization Scheme',
    cases: 'Case Studies Platform',
    templates: 'Downloadable Resources',
    engine: 'AI Content Engine Outline',
    analytics: 'Analytics Custom KPI Board',
    prompts: 'AI Prompts Custom List',
    generator: 'UI Blueprint Builder Prompts',
    rewards: 'Affiliate Scheme Notes',
    roi: 'ROI Calculator Scenarios',
    team: 'Team Access Permissions',
    settings: 'Settings & White Label Ideas',
    roadmap: 'GTM Interactive Timeline Outline'
  };

  const sectionName = sectionTitleMap[activeSection] || activeSection;

  // Load from draft or official save
  useEffect(() => {
    const draftKey = `unsaved_draft_${activeSection}`;
    const savedKey = `official_blueprint_${activeSection}`;
    
    const unsavedDraft = localStorage.getItem(draftKey);
    const savedContent = localStorage.getItem(savedKey);

    if (unsavedDraft) {
      setDraftText(unsavedDraft);
      setIsSaved(unsavedDraft === savedContent);
    } else if (savedContent) {
      setDraftText(savedContent);
      setIsSaved(true);
    } else {
      setDraftText('');
      setIsSaved(true);
    }

    if (savedContent) {
      setLastSubmitted(savedContent);
    } else {
      setLastSubmitted(null);
    }

    // Reset advisor advice on section pivot
    setOptimizedAdvice(null);
  }, [activeSection]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVal = e.target.value;
    setDraftText(newVal);

    const draftKey = `unsaved_draft_${activeSection}`;
    const savedKey = `official_blueprint_${activeSection}`;
    const officiallySaved = localStorage.getItem(savedKey) || '';

    localStorage.setItem(draftKey, newVal);
    setIsSaved(newVal === officiallySaved);
  };

  const saveToBlueprint = () => {
    const savedKey = `official_blueprint_${activeSection}`;
    const draftKey = `unsaved_draft_${activeSection}`;

    localStorage.setItem(savedKey, draftText);
    localStorage.setItem(draftKey, draftText); // Synced now
    setLastSubmitted(draftText);
    setIsSaved(true);

    toast.success("Draft integrated successfully!", {
      description: `Your custom strategy inputs for "${sectionName}" have been committed to the master blueprint.`,
    });
  };

  const handleOptimizeWithGemini = async () => {
    if (!draftText || !draftText.trim()) {
      toast.error("Please insert initial draft strategy thoughts first!", {
        description: "Gemini requires base raw notes or objectives to synthesize professional recommendations."
      });
      return;
    }

    setIsOptimizing(true);
    try {
      const response = await fetch('/api/gemini/optimize-blueprint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: draftText,
          sectionName: sectionName
        })
      });

      if (!response.ok) {
        throw new Error('GTM Optimizer response was not OK');
      }

      const data = await response.json();
      setOptimizedAdvice(data.optimized);

      if (data.isMock) {
        toast.info("Generated high-fidelity blueprint optimization guidelines", {
          description: "Provide process GEMINI_API_KEY inside the Secrets panel to activate live-reasoning."
        });
      } else {
        toast.success("GTM Strategy generated!", {
          description: "Gemini 3.5 Flash successfully synthesized elite recommendations based on your objectives."
        });
      }
    } catch (e: any) {
      console.error(e);
      toast.error("Failed to generate advisor advice.");
    } finally {
      setIsOptimizing(false);
    }
  };

  const applyOptimizedToDraft = () => {
    if (!optimizedAdvice) return;
    
    // Strip markdown headers if they are redundant, or insert it beautifully
    setDraftText(optimizedAdvice);
    setIsSaved(false);

    const draftKey = `unsaved_draft_${activeSection}`;
    localStorage.setItem(draftKey, optimizedAdvice);

    toast.success("Optimization added to workspace!", {
      description: "You can make further adjustments in the text block or publish directly to the master blueprint layout."
    });
  };

  const copyAdviceToClipboard = () => {
    if (!optimizedAdvice) return;
    navigator.clipboard.writeText(optimizedAdvice);
    setCopiedAdvice(true);
    setTimeout(() => setCopiedAdvice(false), 2000);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="mt-12 bg-white/60 dark:bg-gray-900/40 backdrop-blur-xl border border-gray-200/50 dark:border-gray-800/50 rounded-3xl p-6 shadow-xl relative overflow-hidden">
      
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800/80 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Brain className="w-5 h-5 text-blue-600 animate-pulse" />
            <h3 className="font-bold text-base text-gray-900 dark:text-white">Custom Launch Strategy Blueprint Notes</h3>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Customize target objectives, strategic outcomes, or execution bullet points for **{sectionName}**.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-end lg:self-auto">
          {!isSaved && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-xl text-[10px] font-black tracking-wider uppercase flex items-center gap-1.5"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Unsaved Changes</span>
            </motion.div>
          )}

          {/* Gemini advisor trigger */}
          <button
            onClick={handleOptimizeWithGemini}
            disabled={isOptimizing}
            className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-98 text-white rounded-xl text-xs font-black shadow-md shadow-blue-500/10 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isOptimizing ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Wand2 className="w-4 h-4 text-blue-100 animate-pulse" />
            )}
            <span>{isOptimizing ? 'Synthesizing...' : 'Optimize with Gemini'}</span>
          </button>

          <button
            onClick={saveToBlueprint}
            disabled={isSaved}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              isSaved
                ? 'bg-gray-100 dark:bg-gray-800/80 text-gray-400'
                : 'bg-black dark:bg-white text-white dark:text-black hover:opacity-90 shadow-lg'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>Publish to Blueprint</span>
          </button>
        </div>
      </div>

      <div className="relative z-10">
        <textarea
          value={draftText}
          onChange={handleTextChange}
          placeholder={`Enter custom ideas, timeline checklists, or local criteria regarding "${sectionName}" here... (e.g. "We need to secure SOC2 compliance by Month 3, assigned to Devin.")`}
          className="w-full h-32 p-4 bg-gray-50/50 dark:bg-gray-950/40 border border-gray-200/50 dark:border-gray-800/50 rounded-2xl text-sm focus:outline-none focus:border-blue-500/50 transition-all font-sans text-gray-800 dark:text-gray-200 leading-relaxed resize-none cursor-text"
        />
        <div className="absolute right-3 bottom-3 flex items-center gap-1.5 text-[10px] text-gray-400 font-mono select-none">
          <span>{draftText.length} characters</span>
          <span>•</span>
          <span className={isSaved ? 'text-green-500 font-bold' : 'text-amber-500 font-bold'}>
            {isSaved ? 'Synced' : 'Autosaved Draft'}
          </span>
        </div>
      </div>

      {/* Embedded Advisor Output Area */}
      <AnimatePresence>
        {optimizedAdvice && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 border border-blue-500/15 dark:border-blue-400/20 bg-blue-50/20 dark:bg-blue-950/10 rounded-2xl p-5 relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-blue-500/10 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 tracking-wider">
                  Gemini Synthesis Advice
                </span>
                <span className="px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/40 text-[9px] text-blue-700 dark:text-blue-300 rounded font-black tracking-widest leading-none">
                  GEMINI-3.5-FLASH
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyAdviceToClipboard}
                  className="p-1 px-2 hover:bg-blue-100 dark:hover:bg-blue-950/40 rounded-lg text-[10px] grid grid-flow-col gap-1 items-center font-bold text-blue-700 dark:text-blue-300 transition-all cursor-pointer"
                >
                  {copiedAdvice ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>Copy raw</span>
                </button>
                <button
                  onClick={applyOptimizedToDraft}
                  className="px-3 py-1.5 bg-blue-600 text-white hover:bg-blue-700 rounded-lg text-[10px] font-black transition-all flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/5 hover:-y-0.5"
                >
                  <Wand2 className="w-3 h-3" />
                  <span>Apply to Workspace</span>
                </button>
              </div>
            </div>

            <div className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed font-sans prose dark:prose-invert max-w-full whitespace-pre-wrap">
              {optimizedAdvice}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {lastSubmited && (
        <div className="mt-4 p-3.5 bg-gray-50/50 dark:bg-black/30 rounded-2xl border border-gray-100 dark:border-gray-800/50 relative z-10">
          <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5 select-none">
            <CheckSquare className="w-3.5 h-3.5 text-blue-500" />
            <span>Master Blueprint Integrated Copy</span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-450 italic line-clamp-2">
            "{lastSubmited}"
          </p>
        </div>
      )}
    </div>
  );
}
