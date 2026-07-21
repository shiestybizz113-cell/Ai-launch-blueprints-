import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  Circle, 
  Flag, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  CheckSquare, 
  Square,
  Compass, 
  RefreshCw,
  Trophy
} from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface Phase {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  icon: any;
  color: string;
  tasks: Task[];
}

const INITIAL_PHASES: Phase[] = [
  {
    id: 'market_validation',
    title: 'Phase 1: Market Validation',
    subtitle: 'Foundation & Audience Alignment',
    duration: 'Weeks 1 - 2',
    description: 'Ensure that a real pain-point exists and that the target audience is ready to pay for a solution before building the product.',
    icon: Compass,
    color: 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20',
    tasks: [
      { id: 'mv-1', text: 'Define 3 core customer persona profiles and draft initial problem hypotheses', completed: false },
      { id: 'mv-2', text: 'Create standard problem-solution matrix validating pain-points intensity', completed: false },
      { id: 'mv-3', text: 'Set up a high-converting validation page or micro-survey with email capture', completed: false },
      { id: 'mv-4', text: 'Generate early-stage user attention by promoting organically in targeted communities', completed: false },
    ],
  },
  {
    id: 'product_positioning',
    title: 'Phase 2: Product Positioning',
    subtitle: 'Competitive Advantage & Core Pitch',
    duration: 'Week 3',
    description: 'Deconstruct existing market options, construct an unshakeable unique value proposition, and align copywriting with customer triggers.',
    icon: Sparkles,
    color: 'border-indigo-500/30 text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/20',
    tasks: [
      { id: 'pp-1', text: 'Execute feature competitive analysis mapping competitors price and offerings', completed: false },
      { id: 'pp-2', text: 'Determine the definitive "Unfair Advantage" (speed, unique integrations, quality)', completed: false },
      { id: 'pp-3', text: 'Formulate dual positioning matrix focusing on clear, outcome-centered messaging', completed: false },
      { id: 'pp-4', text: 'Prepare baseline brand definitions and product story framework', completed: false },
    ],
  },
  {
    id: 'revenue_models',
    title: 'Phase 3: Revenue & Monetization Strategy',
    subtitle: 'Unit Economics & Checkout Setup',
    duration: 'Week 4',
    description: 'Pick robust pricing strategies customized for the target audience scale, define tier inclusions, and deploy real payment checkout integrations.',
    icon: CheckCircle2,
    color: 'border-amber-500/30 text-amber-600 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/20',
    tasks: [
      { id: 'rm-1', text: 'Set primary model details (Flat SaaS, Credit Buy, or Usage-based Hybrid)', completed: false },
      { id: 'rm-2', text: 'Draft tiered monetization pricing: Entry, Growth, and Enterprise-focused seats', completed: false },
      { id: 'rm-3', text: 'Integrate Stripe Payment Gateway and test secure dynamic checkout flows', completed: false },
      { id: 'rm-4', text: 'Define local regional currency variations for key target geographic markets', completed: false },
    ],
  },
  {
    id: 'launch_execution',
    title: 'Phase 4: Launch & Distribution Launchpad',
    subtitle: 'Audience Activation & Go-To-Market',
    duration: 'Weeks 5 - 6',
    description: 'Collect high-intent warm leads, execute early beta runs to polish interaction design, and launch live across key aggregation channels.',
    icon: Flag,
    color: 'border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-50/50 dark:bg-rose-950/20',
    tasks: [
      { id: 'le-1', text: 'Warm up a launch priority mail list aiming for 100+ opt-in prospective clients', completed: false },
      { id: 'le-2', text: 'Publish a public product countdown on dynamic lists (Product Hunt, Betalist)', completed: false },
      { id: 'le-3', text: 'Assemble rich multi-format marketing mockups, videos, and launcher collateral', completed: false },
      { id: 'le-4', text: 'Initiate beta testing cohorts evaluating flow speed, bugs, and product value', completed: false },
    ],
  },
  {
    id: 'organic_growth',
    title: 'Phase 5: Scale Engine & Organic Growth',
    subtitle: 'SEO Scaling & Affiliate Networks',
    duration: 'Ongoing',
    description: 'Scale organic customer acquisition workflows through programmatic content generators, referral rewards, and viral distribution loops.',
    icon: Trophy,
    color: 'border-sky-500/30 text-sky-600 dark:text-sky-400 bg-sky-50/50 dark:bg-sky-950/20',
    tasks: [
      { id: 'og-1', text: 'Deploy search-optimized SEO templates indexing core niche longtail keywords', completed: false },
      { id: 'og-2', text: 'Configure and test the public Affiliate Dashboard and automatic share rewards', completed: false },
      { id: 'og-3', text: 'Establish automatic cross-platform social triggers for real-time organic publishing', completed: false },
      { id: 'og-4', text: 'Embed transparent customer validation metrics to foster loyalty and confidence', completed: false },
    ],
  },
];

export function RoadmapView() {
  const [phases, setPhases] = useState<Phase[]>(() => {
    const saved = localStorage.getItem('launch_roadmap_phases');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse roadmap phases, falling back to default', e);
      }
    }
    return INITIAL_PHASES;
  });

  useEffect(() => {
    localStorage.setItem('launch_roadmap_phases', JSON.stringify(phases));
  }, [phases]);

  const toggleTask = (phaseId: string, taskId: string) => {
    setPhases(prevPhases => 
      prevPhases.map(phase => {
        if (phase.id !== phaseId) return phase;
        return {
          ...phase,
          tasks: phase.tasks.map(task => {
            if (task.id !== taskId) return task;
            return { ...task, completed: !task.completed };
          })
        };
      })
    );
  };

  const resetRoadmap = () => {
    if (window.confirm("Are you sure you want to reset all progress markers back to incomplete?")) {
      setPhases(INITIAL_PHASES);
    }
  };

  // Calculations
  const totalTasks = phases.reduce((acc, phase) => acc + phase.tasks.length, 0);
  const completedTasks = phases.reduce(
    (acc, phase) => acc + phase.tasks.filter(t => t.completed).length, 
    0
  );
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="space-y-8 p-1">
      {/* Header section with Stats block */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white dark:bg-gray-900 p-6 md:p-8 rounded-3xl border border-gray-200/60 dark:border-gray-800/60 shadow-sm">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 dark:text-blue-300 dark:bg-blue-900/30 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            <span>Structured GTM Timeline</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-950 dark:text-white tracking-tight">
            Launch Roadmap
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            From validating the initial problem statement to scaling organic acquisition channels. Mark off tasks as you execute each milestone along your launch path.
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-gray-50 dark:bg-gray-950/40 p-5 rounded-2xl border border-gray-100 dark:border-gray-800/80 min-w-[260px] flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Overall Progress</span>
            <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400">{progressPercentage}%</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2.5 mb-4 overflow-hidden">
            <motion.div 
              className="bg-blue-600 dark:bg-blue-500 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>{completedTasks} of {totalTasks} milestones met</span>
            <button 
              onClick={resetRoadmap}
              className="flex items-center gap-1 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold transition"
            >
              <RefreshCw className="w-3 h-3" />
              Reset All
            </button>
          </div>
        </div>
      </div>

      {/* The Timeline Canvas */}
      <div className="relative pl-4 sm:pl-8 py-4 space-y-12">
        {/* Continuous Connecting Line */}
        <div className="absolute left-[23px] sm:left-[39px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500 via-amber-500 via-rose-500 to-sky-500 opacity-30 dark:opacity-20" />

        {phases.map((phase, phaseIndex) => {
          const PhaseIcon = phase.icon;
          const phaseCompletedCount = phase.tasks.filter(t => t.completed).length;
          const phaseTotalCount = phase.tasks.length;
          const isPhaseDone = phaseCompletedCount === phaseTotalCount && phaseTotalCount > 0;

          return (
            <motion.div 
              key={phase.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: phaseIndex * 0.1, duration: 0.4 }}
              className="relative flex gap-6 sm:gap-10"
            >
              {/* Timeline Marker Node */}
              <div className="relative z-10 flex-shrink-0">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border transition-all duration-300 shadow-sm ${
                  isPhaseDone 
                    ? 'bg-blue-600 border-blue-600 text-white dark:bg-blue-500 dark:border-blue-500 shadow-blue-500/10' 
                    : phase.color
                }`}>
                  {isPhaseDone ? (
                    <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8" />
                  ) : (
                    <PhaseIcon className="w-5 h-5 sm:w-7 sm:h-7" />
                  )}
                </div>
                {/* Visual Connector tag for Phase Counter */}
                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-[10px] font-black w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                  {phaseCompletedCount}/{phaseTotalCount}
                </div>
              </div>

              {/* Main Phase Content Card */}
              <div className="flex-1 bg-white dark:bg-gray-950 border border-gray-200/70 dark:border-gray-850/70 rounded-3xl p-6 sm:p-8 hover:border-blue-500/20 dark:hover:border-blue-500/20 transition-all shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800/80">
                  <div>
                    <span className="text-[11px] font-extrabold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                      {phase.subtitle}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mt-1">
                      {phase.title}
                    </h2>
                  </div>
                  
                  {/* Time Badge */}
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 w-fit h-fit text-xs font-semibold text-gray-500 dark:text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{phase.duration}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {phase.description}
                </p>

                {/* Subtasks Checklists */}
                <div className="space-y-3">
                  <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.1em] mb-4">Milestone Executables</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {phase.tasks.map(task => (
                      <button
                        key={task.id}
                        onClick={() => toggleTask(phase.id, task.id)}
                        className={`group w-full flex items-start text-left gap-3.5 p-4 rounded-2xl border transition-all duration-200 ${
                          task.completed 
                            ? 'bg-blue-50/20 border-blue-500/30 text-gray-900 dark:bg-blue-950/10 dark:border-blue-500/30 dark:text-gray-100' 
                            : 'bg-gray-50/40 border-gray-150/40 text-gray-600 hover:bg-gray-50 dark:bg-gray-900/30 dark:border-gray-800/40 dark:text-gray-300 dark:hover:bg-gray-900/60'
                        }`}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {task.completed ? (
                            <CheckSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          ) : (
                            <Square className="w-5 h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 transition-colors" />
                          )}
                        </div>
                        <span className={`text-[13px] leading-relaxed transition-all ${task.completed ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
                          {task.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pro tip or next steps banner */}
      <div className="bg-gradient-to-r from-blue-600/5 to-indigo-600/5 border border-blue-500/10 p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            Launch Tip: Build in Public
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Completing Phase 1 and Phase 2 sets up the highest probability of launching successfully. Share your roadmap achievements on social media platforms to foster early user trust!
          </p>
        </div>
        <div className="text-gray-400 dark:text-gray-500 text-xs hidden md:block">
          Step shortcuts mapped per menu category.
        </div>
      </div>
    </div>
  );
}
