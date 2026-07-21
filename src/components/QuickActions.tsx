import { useState } from 'react';
import { SectionId } from '../App';
import { Target, BarChart3, Users, Zap } from 'lucide-react';

export function QuickActions({ setActiveSection }: { setActiveSection: (id: SectionId) => void }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
      <h3 className="font-bold text-gray-900 dark:text-white">Quick Actions</h3>
      <div className="grid grid-cols-1 gap-2">
        <button onClick={() => setActiveSection('engine')} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"><Zap className="w-4 h-4"/> Generate New Blueprint</button>
        <button onClick={() => setActiveSection('roi')} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"><BarChart3 className="w-4 h-4"/> Calculate ROI</button>
        <button onClick={() => setActiveSection('team')} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"><Users className="w-4 h-4"/> Update Team Status</button>
      </div>
    </div>
  );
}
