import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, MousePointer2, Sparkles, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

interface Cursor {
  id: string;
  name: string;
  role: string;
  color: string;
  bgColor: string;
  x: number;
  y: number;
  activeSection: string;
  statusText: string;
}

const TEAM_MEMBERS = [
  { id: '1', name: 'Sarah Jenkins', role: 'GTM Lead', color: '#8B5CF6', bgColor: 'bg-purple-600', sections: ['market', 'positioning', 'marketing', 'roadmap'] },
  { id: '2', name: 'David K.', role: 'Lead Architect', color: '#10B981', bgColor: 'bg-emerald-600', sections: ['generator', 'launch', 'risk'] },
  { id: '3', name: 'Marcus Chen', role: 'VP Operations', color: '#3B82F6', bgColor: 'bg-blue-600', sections: ['finance', 'revenue', 'analytics', 'settings'] },
];

const CURSOR_PHRASES = [
  'Refining strategy...',
  'Analyzing competitors...',
  'Simulating projections...',
  'Checking SOC2 security checklists...',
  'Verifying SaaS unit economics...',
  'Updating blueprint parameters...',
];

export function CollaborativeCursors({ activeSection }: { activeSection: string }) {
  const [cursors, setCursors] = useState<Cursor[]>([]);
  const [activeLogs, setActiveLogs] = useState<{ id: string; text: string; time: string }[]>([]);

  useEffect(() => {
    // Initialize cursors at random points
    const initial = TEAM_MEMBERS.map(member => {
      const sectionName = member.sections[Math.floor(Math.random() * member.sections.length)];
      return {
        id: member.id,
        name: member.name,
        role: member.role,
        color: member.color,
        bgColor: member.bgColor,
        x: Math.random() * 80 + 10, // percentages
        y: Math.random() * 80 + 10,
        activeSection: sectionName,
        statusText: 'Reviewing...',
      };
    });
    setCursors(initial);
  }, []);

  // Update cursor positions & actions dynamically
  useEffect(() => {
    const interval = setInterval(() => {
      setCursors(prev =>
        prev.map(c => {
          // 40% chance of shifting position
          const changePos = Math.random() < 0.4;
          const statusChange = Math.random() < 0.15;
          
          let newX = c.x;
          let newY = c.y;
          if (changePos) {
            newX = Math.max(10, Math.min(90, c.x + (Math.random() * 20 - 10)));
            newY = Math.max(10, Math.min(90, c.y + (Math.random() * 20 - 10)));
          }

          let newStatus = c.statusText;
          if (statusChange) {
            newStatus = CURSOR_PHRASES[Math.floor(Math.random() * CURSOR_PHRASES.length)];
          }

          // 5% chance of simulating a "click" action triggering a log
          if (Math.random() < 0.05) {
            const actions = [
              `validated a checklist task`,
              `saved a blueprint state`,
              `highlighted pricing tier`,
              `rendered draft notes`,
            ];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            
            setActiveLogs(old => [
              { id: Math.random().toString(), text: `${c.name} (${c.role}) ${randomAction}`, time: timeStr },
              ...old.slice(0, 4)
            ]);
          }

          return {
            ...c,
            x: newX,
            y: newY,
            statusText: newStatus,
          };
        })
      );
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full pointer-events-none">
      {/* Cursors Container */}
      <div className="absolute inset-0 z-40 overflow-hidden">
        {cursors.map(c => (
          <div
            key={c.id}
            className="absolute transition-all duration-1000 ease-out"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
            }}
          >
            {/* The Cursor Pin */}
            <div className="relative flex flex-col items-start">
              <MousePointer2
                className="w-5 h-5 drop-shadow-md transform -rotate-12 transition-transform duration-300 hover:scale-110 active:scale-95"
                style={{
                  color: c.color,
                  fill: c.color,
                }}
              />
              {/* Tooltip Card */}
              <div
                className="ml-4 mt-1 bg-white dark:bg-gray-950/95 border border-gray-100 dark:border-gray-800/80 rounded-xl px-2.5 py-1.5 shadow-xl flex flex-col gap-0.5 max-w-[150px] backdrop-blur-md"
              >
                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-black text-gray-900 dark:text-white leading-none whitespace-nowrap">
                    {c.name}
                  </span>
                  <span className={`w-1.5 h-1.5 rounded-full ${c.bgColor} animate-ping`} />
                </div>
                <span className="text-[9px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                  {c.role}
                </span>
                <span className="text-[9px] font-medium text-blue-600 dark:text-blue-400 truncate mt-0.5 border-t border-gray-105 dark:border-gray-900 pt-0.5">
                  {c.statusText}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Collaboration Live Activity Feed - bottom right float */}
      <div className="fixed bottom-6 right-6 z-50 pointer-events-auto bg-white/90 dark:bg-gray-950/90 backdrop-blur-xl border border-gray-200/65 dark:border-gray-800/65 rounded-2xl p-4 shadow-2xl max-w-sm w-80 animate-in fade-in slide-in-from-bottom-5 duration-300">
        <div className="flex items-center justify-between gap-3 mb-2.5 pb-1.5 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-blue-500" />
            <h4 className="text-xs font-bold text-gray-900 dark:text-white">Active Teammates (Enterprise)</h4>
          </div>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-relaxed mb-3">
          Simulated multi-seat environment. Collaborative changes automatically synchronizing.
        </p>
        <div className="space-y-2">
          {activeLogs.length === 0 ? (
            <div className="text-[10px] text-gray-400 dark:text-gray-500 italic py-1">
              Establishing collaborative connection...
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {activeLogs.map(log => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: 20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 'auto' }}
                  exit={{ opacity: 0, x: -25 }}
                  className="flex items-start justify-between gap-2 text-[10px] text-gray-650 dark:text-gray-350"
                >
                  <span className="leading-tight">{log.text}</span>
                  <span className="text-[8px] font-mono text-gray-400">{log.time}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
