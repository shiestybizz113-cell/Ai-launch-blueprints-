import { useState } from 'react';
import { motion } from 'motion/react';
import { Palette, FileText } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { jsPDF } from 'jspdf';
import { toast } from 'sonner';

export function Settings({ config, setConfig, latencies, tier, onLogExport }: { config: any, setConfig: (c: any) => void, latencies: number[], tier: string, onLogExport?: (fileType: string, sectionName: string) => void }) {
  const data = latencies.map((val, i) => ({ name: i, val }));
  
  const auditLogs = [
    { id: 1, action: 'Blueprint deleted: "Pivoting Strategy"', timestamp: '2026-06-09 10:00', actorId: 'admin_01' },
    { id: 2, action: 'Role changed: "Marketing Manager" -> "Admin"', timestamp: '2026-06-09 11:30', actorId: 'admin_01' },
    { id: 3, action: 'API key regenerated', timestamp: '2026-06-09 14:00', actorId: 'user_45' },
  ];

  const exportPDF = () => {
    try {
      const doc = new jsPDF();
      doc.text("Account Usage Summary", 10, 10);
      doc.text(`Credits Consumed: ${Math.floor(Math.random() * 1000)}`, 10, 20);
      doc.text(`Referral Earnings: $${Math.floor(Math.random() * 500)}`, 10, 30);
      doc.text(`Currency: ${config.currency || 'USD'}`, 10, 40);
      
      const fileName = "usage-summary.pdf";
      doc.save(fileName);

      if (onLogExport) {
        onLogExport('PDF', 'settings');
      }

      const pdfBlob = doc.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);

      toast.success("Account Usage Summary exported successfully!", {
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
      toast.error("Failed to generate account summary PDF.");
    }
  };

  return (
    <div className="space-y-10 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h2>
      
      <div className="p-4 border rounded-xl dark:border-gray-700">
        <h3 className="font-bold text-gray-900 dark:text-white mb-4">Reliability Monitor</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
             <LineChart data={data}>
                <XAxis dataKey="name" hide />
                <YAxis hide />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', color: '#fff', borderRadius: '8px' }} />
                <Line type="monotone" dataKey="val" stroke="#3b82f6" strokeWidth={2} />
             </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-xs text-gray-500 mt-2">API Latency (ms) • Overall Reliability: 99.9%</p>
      </div>

      <button onClick={exportPDF} className="flex items-center gap-2 p-3 bg-blue-600 text-white rounded-xl">
        <FileText className="w-4 h-4" /> Download Monthly Usage PDF
      </button>

      <div className="flex items-center gap-4">
        <label className="text-gray-700 dark:text-gray-300">Currency</label>
        <select value={config.currency || 'USD'} onChange={e => setConfig({...config, currency: e.target.value})} className="p-2 border rounded">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
        </select>
      </div>
      
      {tier === 'enterprise' && (
        <div className="mt-8">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Audit Log</h3>
            <div className="border rounded-xl">
                {auditLogs.map(log => (
                    <div key={log.id} className="p-3 border-b text-sm last:border-0 flex justify-between">
                        <span className='font-medium'>{log.action}</span>
                        <span className='text-gray-500'>{log.timestamp} | {log.actorId}</span>
                    </div>
                ))}
            </div>
        </div>
      )}

      {config.enabled && (
        <div className="space-y-4">
            <input placeholder="Logo URL" className="w-full p-2 border rounded" value={config.logo} onChange={e => setConfig({...config, logo: e.target.value})} />
            <input type="color" className="w-full h-10" value={config.primaryColor} onChange={e => setConfig({...config, primaryColor: e.target.value})} />
        </div>
      )}
    </div>
  );
}
