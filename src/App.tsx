/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Loader2, X } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import { Joyride, Step } from 'react-joyride';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Layout } from './components/Layout';
import { MarketValidation } from './sections/MarketValidation';
import { ProductPositioning } from './sections/ProductPositioning';
import { RevenueModels } from './sections/RevenueModels';
import { LaunchExecution } from './sections/LaunchExecution';
import { MarketingSales } from './sections/MarketingSales';
import { FinancialProjections } from './sections/FinancialProjections';
import { RiskMitigation } from './sections/RiskMitigation';
import { AdvancedMonetization } from './sections/AdvancedMonetization';
import { CaseStudies } from './sections/CaseStudies';
import { Templates } from './sections/Templates';
import { ContentEngine } from './sections/ContentEngine';
import { AnalyticsDashboard, ExportLog } from './sections/AnalyticsDashboard';
import { PromptLibrary } from './sections/PromptLibrary';
import { UIGenerator } from './sections/UIGenerator';
import { AffiliateRewards } from './sections/AffiliateRewards';
import { ROICalculator } from './sections/ROICalculator';
import { TeamManagement } from './sections/TeamManagement';
import { Settings } from './sections/Settings';
import { RoadmapView } from './sections/RoadmapView';
import { usePerformance } from './hooks/usePerformance';
import { useDocumentMetadata } from './hooks/useDocumentMetadata';
import { Paywall } from './components/Paywall';
import { BulkExportModal } from './components/BulkExportModal';
import { ExportConfirmationModal } from './components/ExportConfirmationModal';

export type Variation = 'indie' | 'vc' | 'enterprise';
export type SectionId = 'market' | 'positioning' | 'revenue' | 'launch' | 'marketing' | 'finance' | 'risk' | 'monetization' | 'cases' | 'templates' | 'engine' | 'analytics' | 'prompts' | 'generator' | 'rewards' | 'roi' | 'team' | 'settings' | 'roadmap';
export type SubscriptionTier = 'free' | 'pro' | 'enterprise';

export interface CreditUsage {
  id: string;
  date: string;
  action: string;
  amount: number;
  type: 'consume' | 'earn' | 'redeem';
}

export default function App() {
  const [variation, setVariation] = useState<Variation>('indie');
  const [activeSection, setActiveSection] = useState<SectionId>('market');
  const [tier, setTier] = useState<SubscriptionTier>('free');
  const { latencies, trackLatency } = usePerformance();
  
  // Dynamically update document title and meta description tags based on active section
  useDocumentMetadata(activeSection);
  const [runTour, setRunTour] = useState(false);
  const [showBulkExport, setShowBulkExport] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [whiteLabelConfig, setWhiteLabelConfig] = useState({ enabled: false, logo: '', primaryColor: '' });

  const steps: Step[] = [
    { target: '.content-engine-btn', content: 'Manage AI content here.' },
    { target: '.ui-gen-btn', content: 'Generate UI components here.' },
    { target: '.roi-calc-btn', content: 'Calculate ROI.' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('app_state');
    if (saved) {
      try {
        const state = JSON.parse(saved);
        if (state.variation) setVariation(state.variation);
        if (state.activeSection) setActiveSection(state.activeSection);
        if (state.tier) setTier(state.tier);
      } catch (err) {
        console.error("Error parsing app state from localStorage:", err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('app_state', JSON.stringify({ variation, activeSection, tier }));
  }, [variation, activeSection, tier]);

  const [credits, setCredits] = useState(100);
  const [rewardStats, setRewardStats] = useState({
    referrals: 12,
    earnedCredits: 450,
    potentialEarnings: 1500,
    redeemedCash: 250,
    profileCompleted: false,
    dailyLogins: 1,
  });

  const [usageHistory, setUsageHistory] = useState<CreditUsage[]>([
    { id: '1', date: new Date().toISOString(), action: 'Welcome Bonus', amount: 100, type: 'earn' },
  ]);

  const [recentExports, setRecentExports] = useState<ExportLog[]>(() => {
    const saved = localStorage.getItem('recent_exports_log');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore parsing errors
      }
    }
    return [
      { id: '1', fileType: 'PDF', timestamp: new Date(Date.now() - 3600000 * 25).toLocaleString(), sectionName: 'Market Validation' },
      { id: '2', fileType: 'Markdown', timestamp: new Date(Date.now() - 3600000 * 48).toLocaleString(), sectionName: 'Product Positioning Guide' },
      { id: '3', fileType: 'PDF', timestamp: new Date(Date.now() - 3600000 * 72).toLocaleString(), sectionName: 'GTM Interactive Roadmap' },
    ];
  });

  const logExport = (fileType: string, sectionId: SectionId | string) => {
    const titleMap: Record<string, string> = {
      market: 'Market Validation',
      positioning: 'Product Positioning Guide',
      revenue: 'Pricing & Revenue Blueprint',
      launch: 'Launch Execution Plan',
      marketing: 'Marketing & Growth Playbook',
      finance: 'Financial Projections Model',
      risk: 'Risk Assessment & Mitigation',
      monetization: 'Advanced Monetization Blueprints',
      cases: 'Case Studies Platform',
      templates: 'Downloadable Templates',
      engine: 'AI Content Engine',
      analytics: 'Analytics & Insights Dashboard',
      prompts: 'AI Prompt Library',
      generator: 'UI Blueprint Generator',
      rewards: 'Affiliate Rewards Hub',
      roi: 'ROI Calculator Tool',
      team: 'Team Access & Invites',
      settings: 'Settings & Account Portal',
      roadmap: 'GTM Interactive Roadmap'
    };
    const sectionName = titleMap[sectionId] || sectionId;
    const newLog: ExportLog = {
      id: Math.random().toString(36).substr(2, 9),
      fileType,
      timestamp: new Date().toLocaleString(),
      sectionName
    };
    setRecentExports(prev => {
      const updated = [newLog, ...prev];
      localStorage.setItem('recent_exports_log', JSON.stringify(updated));
      return updated;
    });
  };
  
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminError, setAdminError] = useState('');
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [upgradeState, setUpgradeState] = useState<{show: boolean, tier: 'pro'|'enterprise'|null}>({show: false, tier: null});

  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === 'true') {
      const newCredits = parseInt(params.get('credits') || '0');
      if (newCredits > 0) {
        addCredits(newCredits, 'Credit Top-up');
        // Clear query params
        window.history.replaceState({}, document.title, "/");
      }
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid firing when composing in focused fields
      if (
        e.target instanceof HTMLInputElement || 
        e.target instanceof HTMLTextAreaElement || 
        (e.target as HTMLElement)?.hasAttribute('contenteditable')
      ) {
        return;
      }

      if (e.ctrlKey || e.metaKey) {
        const key = e.key.toLowerCase();
        let targetSection: SectionId | null = null;
        let label = '';

        switch (key) {
          case 'm':
            targetSection = 'market';
            label = 'Market Validation';
            break;
          case 'r':
            targetSection = 'revenue';
            label = 'Pricing & Revenue';
            break;
          case 'l':
            targetSection = 'launch';
            label = 'Launch Execution';
            break;
          case 'o':
            targetSection = 'roadmap';
            label = 'Interactive Roadmap';
            break;
          case 'p':
            targetSection = 'prompts';
            label = 'AI Prompt Library';
            break;
          case 'g':
            targetSection = 'generator';
            label = 'UI Blueprint Generator';
            break;
          case 'e':
            targetSection = 'engine';
            label = 'AI Content Engine';
            break;
          case 'a':
            targetSection = 'analytics';
            label = 'Analytics Dashboard';
            break;
          case 's':
            targetSection = 'settings';
            label = 'Settings';
            break;
        }

        if (targetSection) {
          e.preventDefault();
          setActiveSection(targetSection);
          toast.success(`Navigated to ${label}`);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleUpgrade = (selectedTier: 'pro' | 'enterprise') => {
    setUpgradeState({ show: true, tier: selectedTier });
    setTimeout(() => {
      setTier(selectedTier);
      setUpgradeState({ show: false, tier: null });
    }, 1500);
  };

  const handleAdminLogin = () => {
    setShowAdminModal(true);
  };

  const submitAdminLogin = () => {
    setAdminError('');
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!adminEmail.trim()) {
      setAdminError('Email is required.');
      return;
    }
    if (!emailRegex.test(adminEmail)) {
      setAdminError('Please enter a valid email address.');
      return;
    }

    setIsAdminLoading(true);

    // Simulate API delay
    setTimeout(() => {
      if (adminEmail.trim().toLowerCase() === 'manda@empire1.cloud') {
        setTier('enterprise');
        setCredits(999999);
        setShowAdminModal(false);
        setAdminEmail('');
        setAdminError('');
      } else {
        setAdminError('Unauthorized email address.');
      }
      setIsAdminLoading(false);
    }, 1500);
  };

  const spendCredits = (amount: number, action: string) => {
    if (credits >= amount) {
      setCredits(prev => prev - amount);
      const newEntry: CreditUsage = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
        action,
        amount,
        type: 'consume'
      };
      setUsageHistory(prev => [newEntry, ...prev]);
      return true;
    }
    return false;
  };

  const exportBlueprint = async () => {
    try {
      const element = document.querySelector(".content-area") as HTMLElement;
      if (!element) return;
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF();
      doc.addImage(imgData, 'PNG', 10, 10, 180, 150);
      
      const fileName = `${activeSection}-export.pdf`;
      doc.save(fileName);

      // Track export log
      logExport('PDF', activeSection);

      // Create object URL for dynamic opening
      const pdfBlob = doc.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);

      toast.success("PDF Blueprint exported successfully!", {
        description: `Your document "${fileName}" is downloaded.`,
        action: {
          label: "Open PDF",
          onClick: () => {
            const win = window.open();
            if (win) {
              win.document.write(`<iframe src="${blobUrl}" style="border:0; position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%;" allowfullscreen></iframe>`);
              win.document.title = fileName;
            } else {
              window.location.href = blobUrl;
            }
          }
        },
        duration: 8000
      });
    } catch (e) {
      console.error(e);
      toast.error("Failed to generate PDF Blueprint.");
    }
  };

  const exportMarkdownBlueprint = () => {
    try {
      const titleMap: Record<string, string> = {
        market: 'Market Validation Blueprint',
        positioning: 'Product Positioning Guide',
        revenue: 'Pricing & Revenue Models',
        launch: 'Launch Execution Plan',
        marketing: 'Marketing & Growth Playbook',
        finance: 'Financial Projections Model',
        risk: 'Risk Assessment & Mitigation',
        monetization: 'Advanced Monetization Blueprints',
        cases: 'Case Studies',
        templates: 'Resource Templates',
        engine: 'Content Strategy Engine',
        analytics: 'Analytics & Insights Dashboard',
        prompts: 'AI Prompt Library',
        generator: 'UI Blueprint Generator',
        rewards: 'Affiliate Rewards Hub',
        roi: 'ROI Calculator Tool',
        team: 'Team Access & Invites',
        settings: 'Settings Portal',
        roadmap: 'GTM Launch Roadmap'
      };
      const name = titleMap[activeSection] || 'AI Launch Blueprint';
      
      const content = `# ${name}

Generated on: ${new Date().toLocaleString()}
Section Status: Complete
Compliance Standard: Approved / SOC2 ISO27001 Ready

---

## Strategic Blueprint Content

### Phase Objectives
- Maximize growth loops through seamless visual UI blueprints.
- Iterate based on real-time feedback and customer acquisition cost analytics.
- Mitigate risks using robust scenario assessment models.

### Action Plan
1. Validate product-market assumptions under simulated traffic scenarios.
2. Formulate pricing schemes prioritizing user lifetime value (LTV).
3. Execute high-volume programmatic campaign rollouts.
`;
      const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      const fileName = `${activeSection}-export.md`;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      logExport('Markdown', activeSection);

      toast.success("Markdown Blueprint exported successfully!", {
        description: `Your document "${fileName}" is downloaded.`,
        action: {
          label: "Open MD",
          onClick: () => {
            const win = window.open();
            if (win) {
              win.document.write(`<pre style="word-wrap: break-word; white-space: pre-wrap; font-family: monospace; padding: 24px; background: #0c0c0d; color: #f4f4f5; line-height: 1.6; font-size: 14px;">${content}</pre>`);
              win.document.title = fileName;
            } else {
              window.location.href = blobUrl;
            }
          }
        },
        duration: 8000
      });
    } catch (e) {
      console.error(e);
      toast.error("Failed to generate Markdown export.");
    }
  };

  const addCredits = (amount: number, action: string) => {
    setCredits(prev => prev + amount);
    const newEntry: CreditUsage = {
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
      action,
      amount,
      type: 'earn'
    };
    setUsageHistory(prev => [newEntry, ...prev]);
  };

  const redeemCredits = (amount: number, type: 'cash' | 'feature', description: string) => {
    if (credits >= amount) {
      setCredits(prev => prev - amount);
      const newEntry: CreditUsage = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
        action: `Redeemed: ${description}`,
        amount,
        type: 'redeem'
      };
      setUsageHistory(prev => [newEntry, ...prev]);
      
      if (type === 'cash') {
        const cashValue = (amount / 100 * 20).toFixed(2); // $20 per 100 credits
        setRewardStats(prev => ({
          ...prev,
          redeemedCash: prev.redeemedCash + parseFloat(cashValue)
        }));
      }
      return true;
    }
    return false;
  };

  const handlePurchaseCredits = async (amount: number, creditCount: number) => {
    setCheckoutLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount, credits: creditCount }),
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error(data.error || 'Checkout failed');
      }
    } catch (err) {
      console.error(err);
      alert('Stripe configuration missing or error processing request.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const renderSection = () => {
    // Premium sections
    if (tier === 'free' && ['finance', 'risk', 'monetization', 'templates', 'engine', 'analytics', 'roi', 'team'].includes(activeSection)) {
      const titles: Record<string, string> = {
        'finance': 'Financial Projections',
        'risk': 'Risk Mitigation',
        'monetization': 'Platform Monetization',
        'templates': 'Downloadable Templates',
        'engine': 'AI Content Engine',
        'analytics': 'Analytics Dashboard'
      };
      return <Paywall onUpgrade={handleUpgrade} title={titles[activeSection] || 'Premium Content'} config={whiteLabelConfig} />;
    }

    switch (activeSection) {
      case 'market': return <MarketValidation variation={variation} />;
      case 'positioning': return <ProductPositioning variation={variation} />;
      case 'revenue': return <RevenueModels variation={variation} />;
      case 'launch': return <LaunchExecution variation={variation} />;
      case 'marketing': return <MarketingSales variation={variation} />;
      case 'finance': return <FinancialProjections variation={variation} />;
      case 'risk': return <RiskMitigation variation={variation} />;
      case 'monetization': return <AdvancedMonetization />;
      case 'cases': return <CaseStudies />;
      case 'templates': return <Templates />;
      case 'engine': return <ContentEngine />;
      case 'analytics': return <AnalyticsDashboard setActiveSection={setActiveSection} recentExports={recentExports} onLogExport={logExport} />;
      case 'prompts': return <PromptLibrary tier={tier} onUpgrade={handleUpgrade} />;
      case 'generator': return <UIGenerator variation={variation} tier={tier} onUpgrade={handleUpgrade} credits={credits} spendCredits={(amount) => spendCredits(amount, 'Component Generation')} />;
      case 'rewards': return <AffiliateRewards stats={rewardStats} history={usageHistory} onRedeem={redeemCredits} onEarn={addCredits} setRewardStats={setRewardStats} onPurchase={handlePurchaseCredits} />;
      case 'roi': return <ROICalculator />;
      case 'team': return <TeamManagement />;
      case 'settings': return <Settings config={whiteLabelConfig} setConfig={setWhiteLabelConfig} latencies={latencies} tier={tier} onLogExport={logExport} />;
      case 'roadmap': return <RoadmapView />;
      default: return <MarketValidation variation={variation} />;
    }
  };

  return (
    <>
      <Toaster position="bottom-right" richColors />
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        showProgress
        showSkipButton
        callback={(data) => {
          if (data.status === 'finished' || data.status === 'skipped') setRunTour(false);
        }}
      />
      <BulkExportModal isOpen={showBulkExport} onClose={() => setShowBulkExport(false)} sections={['market', 'positioning', 'revenue']} />
      <ExportConfirmationModal 
        isOpen={showExportModal} 
        onClose={() => setShowExportModal(false)}
        fileSize="~1.2MB"
        onConfirm={(format) => {
            if (format === 'pdf') exportBlueprint();
            setShowExportModal(false);
        }}
      />
      <Layout 
        variation={variation} 
        setVariation={setVariation}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        tier={tier}
        onAdminLogin={handleAdminLogin}
        credits={credits}
        exportBlueprint={() => setShowExportModal(true)}
        whiteLabelConfig={whiteLabelConfig}
        setWhiteLabelConfig={setWhiteLabelConfig}
        onStartTour={() => setRunTour(true)}
      >
        {renderSection()}
      </Layout>

      {/* Admin Modal */}
      {showAdminModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          aria-hidden={!showAdminModal}
        >
          <div 
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-modal-title"
          >
            <button
              onClick={() => {
                if (!isAdminLoading) {
                  setShowAdminModal(false);
                  setAdminError('');
                  setAdminEmail('');
                }
              }}
              className="absolute top-4 right-4 p-1 rounded-full text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Close modal"
              disabled={isAdminLoading}
            >
              <X className="w-5 h-5" />
            </button>

            <h3 id="admin-modal-title" className="text-xl font-bold text-gray-900 dark:text-white mb-4">Owner Access</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">Enter your administrator email to unlock all Enterprise features.</p>
            <div className="space-y-1">
              <label htmlFor="admin-email" className="sr-only">Administrator Email</label>
              <input 
                id="admin-email"
                type="email" 
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                onKeyDown={(e) => e.key === 'Enter' && !isAdminLoading && submitAdminLogin()}
                disabled={isAdminLoading}
                aria-invalid={!!adminError}
                aria-describedby={adminError ? "admin-error" : undefined}
                required
              />
              {adminError && <p id="admin-error" className="text-red-500 text-sm mb-4" role="alert">{adminError}</p>}
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                onClick={() => {
                  setShowAdminModal(false);
                  setAdminError('');
                  setAdminEmail('');
                }} 
                className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
                disabled={isAdminLoading}
              >
                Cancel
              </button>
              <button 
                onClick={submitAdminLogin} 
                disabled={isAdminLoading}
                className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-all flex items-center gap-2 font-medium disabled:opacity-75 disabled:cursor-not-allowed min-w-[100px] justify-center"
              >
                {isAdminLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Checking...</span>
                  </>
                ) : (
                  <span>Unlock</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Processing Modal */}
      {upgradeState.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 w-full max-w-sm shadow-2xl flex flex-col items-center text-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Processing Payment...</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">Upgrading you to {upgradeState.tier === 'enterprise' ? 'Enterprise' : 'Pro'} tier.</p>
          </div>
        </div>
      )}
    </>
  );
}



