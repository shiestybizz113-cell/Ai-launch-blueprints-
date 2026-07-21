import { useState } from 'react';
import { Variation, SectionId } from '../App';
import { CollaborativeCursors } from './CollaborativeCursors';
import { SessionRecoveryBanner } from './SessionRecoveryBanner';
import { SectionDraftNotepad } from './SectionDraftNotepad';
import { 
  Rocket, 
  Target, 
  CircleDollarSign, 
  CalendarDays, 
  Megaphone, 
  LineChart, 
  ShieldAlert,
  Building2,
  Briefcase,
  User,
  Sun,
  Moon,
  Lock,
  Users,
  Download,
  TrendingUp,
  BarChart3,
  Cpu,
  Terminal,
  Wand2,
  Key,
  Gift,
  Zap,
  Search,
  Palette,
  Map,
  Keyboard
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface LayoutProps {
  variation: Variation;
  setVariation: (v: Variation) => void;
  activeSection: SectionId;
  setActiveSection: (s: SectionId) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  tier: 'free' | 'pro' | 'enterprise';
  onAdminLogin: () => void;
  credits: number;
  children: React.ReactNode;
  exportBlueprint: () => void;
  whiteLabelConfig: { enabled: boolean; logo: string; primaryColor: string };
  setWhiteLabelConfig: (c: { enabled: boolean; logo: string; primaryColor: string }) => void;
  onStartTour: () => void;
}

const SECTIONS: { id: SectionId; label: string; icon: React.ElementType; isPremium?: boolean }[] = [
  { id: 'market', label: '1. Market Validation', icon: Target },
  { id: 'positioning', label: '2. Product Positioning', icon: Rocket },
  { id: 'revenue', label: '3. Revenue Models', icon: CircleDollarSign },
  { id: 'launch', label: '4. Launch Execution', icon: CalendarDays },
  { id: 'marketing', label: '5. Marketing & Sales', icon: Megaphone },
  { id: 'finance', label: '6. Financial Projections', icon: LineChart, isPremium: true },
  { id: 'risk', label: '7. Risk Mitigation', icon: ShieldAlert, isPremium: true },
];

const EXTRA_SECTIONS: { id: SectionId; label: string; icon: React.ElementType; isPremium?: boolean }[] = [
  { id: 'roadmap', label: 'Interactive Roadmap', icon: Map },
  { id: 'cases', label: 'Case Studies', icon: Users },
  { id: 'templates', label: 'Downloadable Templates', icon: Download, isPremium: true },
  { id: 'prompts', label: 'AI Prompt Library', icon: Terminal, isPremium: true },
  { id: 'generator', label: 'Instant UI Generator', icon: Wand2, isPremium: true },
  { id: 'rewards', label: 'Affiliate & Rewards', icon: Gift, isPremium: false },
  { id: 'monetization', label: 'Platform Monetization', icon: TrendingUp, isPremium: true },
];

const ADMIN_SECTIONS: { id: SectionId; label: string; icon: React.ElementType; isPremium?: boolean; className?: string }[] = [
  { id: 'analytics', label: 'Analytics Dashboard', icon: BarChart3, isPremium: true },
  { id: 'engine', label: 'AI Content Engine', icon: Cpu, isPremium: true, className: 'content-engine-btn' },
  { id: 'roi', label: 'ROI Calculator', icon: Cpu, isPremium: true, className: 'roi-calc-btn' },
  { id: 'team', label: 'Team Management', icon: Users, isPremium: true },
  { id: 'settings', label: 'Settings', icon: Palette, isPremium: false },
];

const VARIATIONS: { id: Variation; label: string; icon: React.ElementType; desc: string }[] = [
  { id: 'indie', label: 'Indie Hacker', icon: User, desc: 'Solo creator, <$10K budget' },
  { id: 'vc', label: 'VC-Backed Startup', icon: Briefcase, desc: 'Team of 10+, $2M+ runway' },
  { id: 'enterprise', label: 'Enterprise', icon: Building2, desc: 'Internal AI tool launch' },
];

export function Layout({ variation, setVariation, activeSection, setActiveSection, isDarkMode, toggleDarkMode, tier, onAdminLogin, credits, children, exportBlueprint, whiteLabelConfig, setWhiteLabelConfig, onStartTour }: LayoutProps) {
  const [showShortcuts, setShowShortcuts] = useState(false);
  return (
    <div className="flex h-screen bg-[#FDFDFF] dark:bg-[#05050A] text-gray-900 dark:text-gray-100 font-sans overflow-hidden transition-colors duration-200" style={whiteLabelConfig.enabled ? { '--color-primary': whiteLabelConfig.primaryColor } as React.CSSProperties : {}}>
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 dark:bg-purple-600/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Sidebar - Glassmorphism */}
      <aside className="w-72 bg-white/70 dark:bg-gray-900/50 backdrop-blur-xl border-r border-gray-200/50 dark:border-gray-800/50 flex flex-col h-full flex-shrink-0 z-20 transition-all duration-300">
        <div className="p-8 border-b border-gray-200/30 dark:border-gray-800/30">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-1"
          >
            <div className="w-8 h-8 bg-black dark:bg-white rounded-xl flex items-center justify-center overflow-hidden">
               {whiteLabelConfig.enabled && whiteLabelConfig.logo ? (
                 <img src={whiteLabelConfig.logo} alt="Logo" referrerPolicy="no-referrer" />
               ) : (
                 <img src="/src/assets/images/empire_logo_refined_1784598370038.jpg" alt="AI Product Catalyst Logo" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
               )}
            </div>
            <h1 className="text-lg font-black tracking-tighter text-gray-900 dark:text-white leading-none">
              {!whiteLabelConfig.enabled && <>AI PRODUCT <br/><span className="text-blue-600">CATALYST</span></>}
            </h1>
          </motion.div>
          {tier !== 'free' && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={cn("mt-4 inline-flex items-center gap-1.5 px-3 py-1 text-white text-[10px] font-black rounded-lg shadow-lg", tier === 'enterprise' ? "bg-gradient-to-r from-purple-600 to-pink-600" : "bg-gradient-to-r from-blue-600 to-indigo-600")}
            >
              <Zap className="w-3 h-3 fill-white" />
              <span className="uppercase tracking-[0.1em]">{tier} ACCESS</span>
            </motion.div>
          )}
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-8 scrollbar-hide">
          <div className="space-y-4">
            <div>
              <h3 className="px-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-3">Core Modules</h3>
              <div className="space-y-1">
                {SECTIONS.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  const showLock = section.isPremium && tier === 'free';
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      title={showLock ? "Unlock - Upgrade to Access" : ""}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-2xl text-[13px] font-bold transition-all text-left relative overflow-hidden",
                        isActive 
                          ? "text-blue-700 dark:text-white" 
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                      )}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="sidebar-active"
                          className="absolute inset-0 bg-blue-600/5 dark:bg-white/5 border border-blue-600/10 dark:border-white/10"
                          initial={false}
                          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        />
                      )}
                      <div className="flex items-center gap-3 relative z-10">
                        <Icon className={cn("w-4.5 h-4.5", isActive ? "text-blue-600 dark:text-white" : "text-gray-400 dark:text-gray-500")} />
                        {section.label}
                      </div>
                      {showLock && <Lock className="w-3 h-3 text-gray-300 dark:text-gray-600 relative z-10" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="px-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-3">Launch Toolkit</h3>
              <div className="space-y-1">
                {EXTRA_SECTIONS.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  const showLock = section.isPremium && tier === 'free';
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      title={showLock ? "Unlock - Upgrade to Access" : ""}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-2xl text-[13px] font-bold transition-all text-left relative overflow-hidden",
                        isActive 
                          ? "text-blue-700 dark:text-white" 
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                      )}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="sidebar-active-2"
                          className="absolute inset-0 bg-blue-600/5 dark:bg-white/5 border border-blue-600/10 dark:border-white/10"
                          initial={false}
                          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        />
                      )}
                      <div className="flex items-center gap-3 relative z-10">
                        <Icon className={cn("w-4.5 h-4.5", isActive ? "text-blue-600 dark:text-white" : "text-gray-400 dark:text-gray-500")} />
                        {section.label}
                      </div>
                      {showLock && <Lock className="w-3 h-3 text-gray-300 dark:text-gray-600 relative z-10" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="px-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-3">Admin</h3>
              <div className="space-y-1">
                {ADMIN_SECTIONS.map((section) => {
                  const Icon = section.icon;
                  const isActive = activeSection === section.id;
                  const showLock = section.isPremium && tier === 'free';
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      title={showLock ? "Unlock - Upgrade to Access" : ""}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-2xl text-[13px] font-bold transition-all text-left relative overflow-hidden",
                        isActive 
                          ? "text-blue-700 dark:text-white" 
                          : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200",
                        section.className
                      )}
                    >
                      {isActive && (
                        <motion.div 
                          layoutId="sidebar-active-3"
                          className="absolute inset-0 bg-blue-600/5 dark:bg-white/5 border border-blue-600/10 dark:border-white/10"
                          initial={false}
                          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        />
                      )}
                      <div className="flex items-center gap-3 relative z-10">
                        <Icon className={cn("w-4.5 h-4.5", isActive ? "text-blue-600 dark:text-white" : "text-gray-400 dark:text-gray-500")} />
                        {section.label}
                      </div>
                      {showLock && <Lock className="w-3 h-3 text-gray-300 dark:text-gray-600 relative z-10" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>
        <div className="p-6 border-t border-gray-200/30 dark:border-gray-800/30 bg-gray-50/50 dark:bg-black/20">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Operator</span>
              <span className="text-xs font-bold text-gray-900 dark:text-white truncate max-w-[140px]">AI Founder v1.0</span>
            </div>
            {tier === 'free' && (
              <button 
                onClick={onAdminLogin}
                className="p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-400 hover:text-blue-600 transition-all shadow-sm cursor-pointer"
                title="Identity Login"
              >
                <Key className="w-4 h-4" />
              </button>
            )}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200/20 dark:border-gray-800/20 flex items-center justify-center gap-1.5 text-[10px] text-gray-400 dark:text-gray-500 font-mono select-none">
            <span>Powered by</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">Empire Tool Vault</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
        <header className="bg-white/40 dark:bg-gray-950/40 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50 px-12 py-6 flex-shrink-0 z-10">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Architecture</span>
                <div className="flex p-1 bg-gray-100/50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
                  {VARIATIONS.map((v) => {
                    const isActive = variation === v.id;
                    const Icon = v.icon;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setVariation(v.id)}
                        className={cn(
                          "px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2",
                          isActive 
                            ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-white shadow-sm" 
                            : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
                        )}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {v.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Search..." className="pl-9 pr-3 py-2 bg-gray-100/50 dark:bg-gray-800/50 rounded-xl text-xs w-48 transition-all focus:w-64 focus:outline-none" />
              </div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-end group cursor-pointer"
                onClick={() => setActiveSection('rewards')}
              >
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Asset Balance</span>
                <div className="flex items-center gap-3 px-4 py-2 bg-black dark:bg-white rounded-2xl shadow-xl transition-all">
                  <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-black text-white dark:text-black">{credits.toLocaleString()} CPU</span>
                </div>
              </motion.div>
              
              <div className="h-10 w-[1px] bg-gray-200 dark:border-gray-800 mx-2"></div>

              <button
                onClick={toggleDarkMode}
                className="w-10 h-10 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 flex items-center justify-center text-gray-500 hover:bg-white dark:hover:bg-gray-800 transition-all shadow-sm"
              >
                {isDarkMode ? <Sun className="w-4 h-4 font-bold" /> : <Moon className="w-4 h-4 font-bold" />}
              </button>
              <button
                onClick={onStartTour}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-xl text-xs font-bold"
              >
                Tour
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowShortcuts(!showShortcuts)}
                  className="px-3.5 py-2 border border-gray-200/60 dark:border-gray-800/60 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
                  title="Keyboard Shortcuts Guide"
                >
                  <Keyboard className="w-3.5 h-3.5" />
                  <span>Keys</span>
                </button>

                {showShortcuts && (
                  <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-2xl z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                    <div className="flex items-center justify-between mb-3 border-b border-gray-100 dark:border-gray-800 pb-2">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-gray-900 dark:text-white">
                        <Keyboard className="w-3.5 h-3.5 text-blue-600" />
                        <span>Quick Shortcuts</span>
                      </div>
                      <button 
                        onClick={() => setShowShortcuts(false)}
                        className="text-[10px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 font-bold"
                      >
                        Close
                      </button>
                    </div>
                    <p className="text-[10px] text-gray-500 mb-3 leading-relaxed">Navigate instantly from anywhere using keys (preserves input state):</p>
                    <div className="space-y-2">
                      {[
                        { keys: 'Ctrl + M', label: 'Market Validation' },
                        { keys: 'Ctrl + R', label: 'Pricing & Revenue' },
                        { keys: 'Ctrl + L', label: 'Launch Execution' },
                        { keys: 'Ctrl + O', label: 'Interactive Roadmap' },
                        { keys: 'Ctrl + P', label: 'AI Prompt Library' },
                        { keys: 'Ctrl + G', label: 'UI Blueprint Generator' },
                        { keys: 'Ctrl + E', label: 'AI Content Engine' },
                        { keys: 'Ctrl + A', label: 'Analytics Dashboard' },
                        { keys: 'Ctrl + S', label: 'Settings' },
                      ].map((shortcut, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <span className="text-gray-650 dark:text-gray-450 font-medium text-[11px]">{shortcut.label}</span>
                          <kbd className="px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-[9px] font-mono text-gray-500 font-bold shadow-sm">
                            {shortcut.keys}
                          </kbd>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <button
                onClick={exportBlueprint}
                className="w-10 h-10 rounded-2xl border border-gray-200/50 dark:border-gray-800/50 flex items-center justify-center text-gray-500 hover:bg-white dark:hover:bg-gray-800 transition-all shadow-sm"
                title="Export as PDF"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-12 scrollbar-hide relative">
          {variation === 'enterprise' && <CollaborativeCursors activeSection={activeSection} />}
          <div className="max-w-5xl mx-auto pb-32 content-area">
            <SessionRecoveryBanner activeSection={activeSection} setActiveSection={setActiveSection} />
            <motion.div
              key={`${activeSection}-${variation}`}
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {children}
            </motion.div>
            <SectionDraftNotepad activeSection={activeSection} />
            
            {/* Elegant Layout Footer */}
            <footer className="mt-16 pt-8 border-t border-gray-200/40 dark:border-gray-800/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-400 dark:text-gray-500 font-mono select-none">
              <div>© {new Date().getFullYear()} AI Product Catalyst. All rights reserved.</div>
              <div className="flex items-center gap-1.5">
                <span>Powered by</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">Empire Tool Vault</span>
              </div>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}


