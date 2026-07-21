import React, { useState } from 'react';
import { FileJson, FileSpreadsheet, FileText, Download, Eye, X } from 'lucide-react';
import { INDIE_HACKER_BLUEPRINT } from '../data/blueprints';
import Markdown from 'react-markdown';

const templates = [
  {
    title: 'Financial Projections Model',
    description: 'A comprehensive 3-year financial model including CAC, LTV, and unit economics.',
    format: 'CSV',
    icon: FileSpreadsheet,
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-100 dark:bg-green-900/30'
  },
  {
    title: 'Competitive Analysis Matrix',
    description: 'Evaluate competitors on speed, cost, ease of use, and AI defensibility.',
    format: 'JSON',
    icon: FileJson,
    color: 'text-yellow-600 dark:text-yellow-400',
    bg: 'bg-yellow-100 dark:bg-yellow-900/30'
  },
  {
    title: 'Cold Outreach Email Sequence',
    description: '5-part email sequence for customer discovery and B2B sales.',
    format: 'Notion',
    icon: FileText,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-100 dark:bg-blue-900/30'
  },
  {
    title: 'Launch Day Playbook',
    description: 'Hour-by-hour checklist for Product Hunt, Twitter, and email marketing.',
    format: 'Notion',
    icon: FileText,
    color: 'text-purple-600 dark:text-purple-400',
    bg: 'bg-purple-100 dark:bg-purple-900/30'
  },
  {
    title: 'Indie Hacker AI Blueprint',
    description: 'Comprehensive guide for solo solo founders on lean AI product launch and monetization with <$10k budget.',
    format: 'Markdown',
    icon: FileText,
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-100 dark:bg-orange-900/30'
  }
];

export function Templates() {
  const [viewingTemplate, setViewingTemplate] = useState<string | null>(null);

  const handleDownload = (template: typeof templates[0]) => {
    let content = '';
    let mimeType = 'text/plain';
    let extension = 'txt';

    if (template.title === 'Indie Hacker AI Blueprint') {
      content = INDIE_HACKER_BLUEPRINT;
      mimeType = 'text/markdown';
      extension = 'md';
    } else if (template.format === 'CSV') {
      content = 'Year,Metric,Value\n2026,CAC,$50\n2026,LTV,$500\n2026,Payback,3 months';
      mimeType = 'text/csv';
      extension = 'csv';
    } else if (template.format === 'JSON') {
      content = JSON.stringify({
        competitors: [
          { name: 'Competitor A', speed: 'High', cost: 'Low', defensibility: 'Medium' }
        ]
      }, null, 2);
      mimeType = 'application/json';
      extension = 'json';
    } else {
      content = `# ${template.title}\n\n${template.description}\n\nThis is a placeholder for the Notion template content. Duplicate this to your workspace for full access.`;
      mimeType = 'text/markdown';
      extension = 'md';
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.title.toLowerCase().replace(/\s+/g, '-')}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Downloadable Templates</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Ready-to-use templates to accelerate your AI product launch. Export to CSV, JSON, or duplicate to your Notion workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template, i) => {
          const Icon = template.icon;
          return (
            <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 flex flex-col h-full transition-shadow hover:shadow-md">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${template.bg} ${template.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                  {template.format}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{template.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-1">
                {template.description}
              </p>
              <div className="flex gap-2">
                <button 
                  onClick={() => handleDownload(template)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
                {template.format === 'Markdown' && (
                  <button 
                    onClick={() => setViewingTemplate(INDIE_HACKER_BLUEPRINT)}
                    className="flex items-center justify-center p-2 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg transition-colors border border-gray-200 dark:border-gray-600"
                    title="View Online"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                )}
              </div>

              {viewingTemplate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                  <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-gray-200 dark:border-gray-800">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-white dark:bg-gray-900 sticky top-0">
                      <h3 className="font-bold text-gray-900 dark:text-white">Blueprint Viewer</h3>
                      <button onClick={() => setViewingTemplate(null)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-8 prose dark:prose-invert max-w-none">
                      <Markdown>{viewingTemplate}</Markdown>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
