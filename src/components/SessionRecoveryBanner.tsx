import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, RotateCcw, Trash2, Key, History, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

interface UnsavedSession {
  sectionId: string;
  name: string;
  contentSnapshot: string;
}

interface SessionRecoveryBannerProps {
  activeSection: string;
  setActiveSection: (id: any) => void;
}

export function SessionRecoveryBanner({ activeSection, setActiveSection }: SessionRecoveryBannerProps) {
  const [unsavedDraft, setUnsavedDraft] = useState<UnsavedSession | null>(null);

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

  const scanForUnsavedDrafts = () => {
    // Scan all keys in localStorage for unsaved drafts
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('unsaved_draft_')) {
        const sectionId = key.replace('unsaved_draft_', '');
        const draftContent = localStorage.getItem(key) || '';
        const officialContent = localStorage.getItem(`official_blueprint_${sectionId}`) || '';

        // If there exists draft content, and it is unsaved (does not equal official content)
        if (draftContent && draftContent.trim() !== '' && draftContent !== officialContent) {
          setUnsavedDraft({
            sectionId,
            name: sectionTitleMap[sectionId] || sectionId,
            contentSnapshot: draftContent
          });
          return; // Show one banner at a time for clarity
        }
      }
    }
    setUnsavedDraft(null);
  };

  useEffect(() => {
    // Check on startup and whenever the active section changes (the user might have saved it, we re-verify)
    scanForUnsavedDrafts();
  }, [activeSection]);

  const handleRestore = () => {
    if (!unsavedDraft) return;

    // Direct user to that section so they can see the draft loaded in the editor
    setActiveSection(unsavedDraft.sectionId);

    toast.success("Session changes restored!", {
      description: `Pending work in "${unsavedDraft.name}" has been loaded into your active editor workspace.`,
      icon: <RotateCcw className="w-4 h-4 text-emerald-500" />
    });

    setUnsavedDraft(null);
  };

  const handleDiscard = () => {
    if (!unsavedDraft) return;

    // Overwrite the draft with the officially validated copy (or erase it)
    const draftKey = `unsaved_draft_${unsavedDraft.sectionId}`;
    const officialContent = localStorage.getItem(`official_blueprint_${unsavedDraft.sectionId}`) || '';
    
    if (officialContent) {
      localStorage.setItem(draftKey, officialContent);
    } else {
      localStorage.removeItem(draftKey);
    }

    toast.error("Unsaved session draft discarded", {
      description: "Proposed modifications have been reset back to default states.",
      icon: <Trash2 className="w-4 h-4 text-rose-500" />
    });

    setUnsavedDraft(null);
  };

  if (!unsavedDraft) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, height: 0 }}
        animate={{ opacity: 1, y: 0, height: 'auto' }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="mb-8 w-full bg-gradient-to-r from-amber-500/10 via-amber-600/5 to-amber-500/5 border border-amber-500/20 rounded-3xl p-5 shadow-lg relative overflow-hidden backdrop-blur-md"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 bg-amber-500/15 border border-amber-500/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <History className="w-5 h-5 text-amber-500 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest leading-none">
                  Session Recovery Auto-Detector
                </span>
                <span className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-ping" />
              </div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                Unsaved modifications detected in **{unsavedDraft.name}**
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-2xl leading-relaxed">
                You had unsaved changes from your previous workspace session ({unsavedDraft.contentSnapshot.length} characters drafted). Would you like to restore this session or discard it?
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end md:self-auto flex-shrink-0">
            <button
              onClick={handleRestore}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-black shadow-md shadow-amber-500/10 transition-all flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restore Workspace</span>
            </button>
            <button
              onClick={handleDiscard}
              className="px-3.5 py-2 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-500 dark:text-gray-400 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
              title="Permanently remove draft"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Discard</span>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
