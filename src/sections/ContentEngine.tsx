import { useState } from 'react';
import { RefreshCw, Calendar, TrendingUp, Edit3, Clock, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ContentItem {
  id: string;
  title: string;
  status: 'published' | 'scheduled' | 'regeneration_needed';
  metrics: { views: number; engagement: number };
  nextUpdate: string;
  industry: string;
  complexity: 'Low' | 'Medium' | 'High';
}

const initialContent: ContentItem[] = [
  { id: '1', title: 'Market Validation Framework', status: 'published', metrics: { views: 45230, engagement: 85 }, nextUpdate: '2026-05-01', industry: 'SaaS', complexity: 'Low' },
  { id: '2', title: 'Product Positioning Guide', status: 'scheduled', metrics: { views: 12500, engagement: 78 }, nextUpdate: '2026-05-15', industry: 'FinTech', complexity: 'Medium' },
  { id: '3', title: 'Revenue Model Blueprints', status: 'regeneration_needed', metrics: { views: 32000, engagement: 92 }, nextUpdate: 'Immediate', industry: 'Healthcare', complexity: 'High' },
];

export function ContentEngine() {
  const [contentItems, setContentItems] = useState<ContentItem[]>(initialContent);
  const [isRegenerating, setIsRegenerating] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState<string | null>(null);

  const handleRegenerate = (id: string) => {
    setIsRegenerating(id);
    setTimeout(() => {
      setContentItems(prev => prev.map(item => item.id === id ? { ...item, status: 'published', nextUpdate: '2026-06-01' } : item));
      setIsRegenerating(null);
    }, 2000);
  };

  return (
    <div className="space-y-8 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Content Engine</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage, regenerate, and monitor your AI-driven content strategy.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Edit3 className="w-4 h-4" /> Create New Content
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contentItems.map(item => (
          <motion.div 
            key={item.id} 
            className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
              <span className={`px-2 py-1 text-xs rounded-full ${item.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {item.status.replace('_', ' ')}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-[10px] font-bold">{item.industry}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.complexity === 'High' ? 'bg-red-100 text-red-700' : item.complexity === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>{item.complexity}</span>
            </div>
            
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-6">
              <div className="flex items-center gap-1"><TrendingUp className="w-4 h-4" /> {item.metrics.views.toLocaleString()} views</div>
              <div className="flex items-center gap-1"><Clock className="w-4 h-4" /> {item.nextUpdate}</div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => handleRegenerate(item.id)}
                disabled={isRegenerating === item.id}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
              >
                {isRegenerating === item.id ? '...' : <RefreshCw className="w-4 h-4" />}
                {!isRegenerating && 'Regenerate'}
              </button>
              <button 
                onClick={() => setShowHistory(item.id)}
                className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <Clock className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      {showHistory && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/50" onClick={() => setShowHistory(null)}>
          <div className="w-80 bg-white dark:bg-gray-800 p-6 h-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-black mb-4">Version History</h3>
            <p className="text-gray-500 text-sm">No previous versions saved.</p>
          </div>
        </div>
      )}
    </div>
  );
}
