import { Users, UserPlus, CreditCard, DollarSign, Clock, Activity, TrendingUp, ArrowUpRight, FileText } from 'lucide-react';
import { QuickActions } from '../components/QuickActions';
import { SectionId } from '../App';
import { jsPDF } from 'jspdf';
import { toast } from 'sonner';

export interface ExportLog {
  id: string;
  fileType: string;
  timestamp: string;
  sectionName: string;
}

export function AnalyticsDashboard({ 
  setActiveSection,
  recentExports = [],
  onLogExport
}: { 
  setActiveSection: (id: SectionId) => void;
  recentExports: ExportLog[];
  onLogExport?: (fileType: string, sectionName: string) => void;
}) {
  const generateMonthlyReport = () => {
    try {
      const doc = new jsPDF();
      doc.text("Monthly Account Usage Summary", 10, 10);
      doc.text(`Report for the last 30 days`, 10, 20);
      doc.line(10, 25, 200, 25);
      doc.text(`Credits Consumed: 1,450`, 10, 40);
      doc.text(`Referral Earnings: $750.00`, 10, 50);
      doc.text(`Subscription Activity: Active (Enterprise)`, 10, 60);
      
      const fileName = "monthly-report.pdf";
      doc.save(fileName);

      if (onLogExport) {
        onLogExport('PDF', 'Monthly Account Report');
      }

      const pdfBlob = doc.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);

      toast.success("Monthly Report exported successfully!", {
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
      toast.error("Failed to generate monthly report.");
    }
  };

  return (
    <div className="space-y-6">
        <div className='flex justify-between items-center'>
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Analytics Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400">Real-time performance metrics and conversion tracking.</p>
            </div>
            <button onClick={generateMonthlyReport} className="flex items-center gap-2 p-3 bg-blue-600 text-white rounded-xl">
                <FileText className="w-4 h-4" /> Generate Monthly Report
            </button>
        </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Visitors', value: '342', trend: '+12%', icon: Users, color: 'text-blue-600 dark:text-blue-400' },
          { label: 'Signups', value: '45', trend: '+18%', icon: UserPlus, color: 'text-green-600 dark:text-green-400' },
          { label: 'Paid Users', value: '5', trend: 'New', icon: CreditCard, color: 'text-purple-600 dark:text-purple-400' },
          { label: 'MRR', value: '$245', trend: '+22%', icon: DollarSign, color: 'text-yellow-600 dark:text-yellow-400' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="flex items-center text-xs font-medium text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                {stat.trend}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
          </div>
        ))}
      </div>
      {/* ROI & Time Saved - Value Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
          <div className="absolute -right-8 -bottom-8 opacity-10">
            <Clock className="w-48 h-48" />
          </div>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Productivity Impact
          </h3>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-black">142</span>
            <span className="text-xl font-medium mb-1 opacity-80">Hours Saved</span>
          </div>
          <p className="text-indigo-100 text-sm">
            Based on average developer time saved by generating UI components and optimizing prompts this month.
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
          <div className="absolute -right-8 -bottom-8 opacity-10">
            <TrendingUp className="w-48 h-48" />
          </div>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Financial ROI
          </h3>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-black">$14,200</span>
            <span className="text-xl font-medium mb-1 opacity-80">Value Generated</span>
          </div>
          <p className="text-emerald-100 text-sm">
            Estimated market value of manual design & strategy work automated by the platform.
          </p>
        </div>
      </div>
        </div>
        <div className="lg:col-span-1">
            <QuickActions setActiveSection={setActiveSection} />
        </div>
      </div>

      {/* ROI & Time Saved - Value Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
          <div className="absolute -right-8 -bottom-8 opacity-10">
            <Clock className="w-48 h-48" />
          </div>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Productivity Impact
          </h3>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-black">142</span>
            <span className="text-xl font-medium mb-1 opacity-80">Hours Saved</span>
          </div>
          <p className="text-indigo-100 text-sm">
            Based on average developer time saved by generating UI components and optimizing prompts this month.
          </p>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
          <div className="absolute -right-8 -bottom-8 opacity-10">
            <TrendingUp className="w-48 h-48" />
          </div>
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Financial ROI
          </h3>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-4xl font-black">$14,200</span>
            <span className="text-xl font-medium mb-1 opacity-80">Value Generated</span>
          </div>
          <p className="text-emerald-100 text-sm">
            Estimated market value of manual design & strategy work automated by the platform.
          </p>
        </div>
      </div>

      {/* Goal Progress */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Goal Progress</h3>
        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">Visitors (500 target)</span>
              <span className="text-gray-500 dark:text-gray-400">342 / 500 (68%)</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium text-gray-700 dark:text-gray-300">Signups (50 target)</span>
              <span className="text-gray-500 dark:text-gray-400">45 / 50 (90%)</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '90%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Over Time & Session Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activity Over Time</h3>
          <div className="space-y-3">
            {[
              { time: '1-2 PM', visitors: 89, signups: 12 },
              { time: '2-3 PM', visitors: 123, signups: 18 },
              { time: '3-4 PM', visitors: 95, signups: 10 },
              { time: '4-5 PM', visitors: 35, signups: 5 },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400 w-20">{row.time}</span>
                <div className="flex-1 px-4 flex items-center gap-4">
                  <div className="flex items-center gap-2 w-1/2">
                    <div className="h-2 bg-blue-100 dark:bg-blue-900/50 rounded-full flex-1 overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${(row.visitors / 150) * 100}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-300 w-8">{row.visitors}</span>
                  </div>
                  <div className="flex items-center gap-2 w-1/2">
                    <div className="h-2 bg-green-100 dark:bg-green-900/50 rounded-full flex-1 overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${(row.signups / 25) * 100}%` }}></div>
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-300 w-6">{row.signups}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Session Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Avg Session', value: '3m 45s', icon: Clock },
              { label: 'Bounce Rate', value: '32%', icon: Activity },
              { label: 'Conversion', value: '8.5%', icon: TrendingUp },
              { label: 'CAC', value: '$15.00', icon: DollarSign },
            ].map((metric, i) => (
              <div key={i} className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                  <metric.icon className="w-4 h-4" />
                  <span className="text-xs font-medium uppercase tracking-wider">{metric.label}</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom 3 Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Traffic Source */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Traffic Source</h3>
          <ul className="space-y-3">
            {[
              { source: 'Product Hunt', count: 156 },
              { source: 'Twitter', count: 98 },
              { source: 'Direct', count: 56 },
              { source: 'Google', count: 22 },
              { source: 'Other', count: 10 },
            ].map((item, i) => (
              <li key={i} className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-300">{item.source}</span>
                <span className="font-medium text-gray-900 dark:text-white">{item.count}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Signups */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Recent Signups</h3>
          <ul className="space-y-3">
            {[
              { email: 'alice@example.com', time: '2 min ago' },
              { email: 'bob@startup.io', time: '5 min ago' },
              { email: 'carol@tech.co', time: '9 min ago' },
              { email: 'dave@agency.net', time: '12 min ago' },
              { email: 'eve@studio.design', time: '15 min ago' },
            ].map((item, i) => (
              <li key={i} className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-300 truncate pr-2">{item.email}</span>
                <span className="text-xs text-gray-400 whitespace-nowrap">{item.time}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Top Sections */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Top Sections</h3>
          <ul className="space-y-3">
            {[
              { section: 'Market Validation', views: 89 },
              { section: 'Product Positioning', views: 76 },
              { section: 'Launch Execution', views: 62 },
              { section: 'Revenue Models', views: 54 },
            ].map((item, i) => (
              <li key={i} className="flex justify-between items-center text-sm">
                <span className="text-gray-600 dark:text-gray-300 truncate pr-2">{item.section}</span>
                <span className="font-medium text-gray-900 dark:text-white">{item.views}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Exports Log */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-3 border-b border-gray-100 dark:border-gray-700/50">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Recent Exports Log
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Dynamic audit trail tracking all generated blueprints and assets in this session.</p>
          </div>
          <span className="self-start sm:self-center text-xs font-semibold px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full border border-blue-100/50 dark:border-blue-900/30">
            {recentExports.length} export{recentExports.length === 1 ? '' : 's'} recorded
          </span>
        </div>
        
        {recentExports.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400 text-sm">
            <p className="font-medium">No export activities tracked yet.</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Export active blueprints via the header button to start recording.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead>
                <tr className="text-xs font-semibold uppercase tracking-wider text-gray-400 bg-gray-50/50 dark:bg-gray-900/40">
                  <th className="p-3.5 rounded-l-lg border-b border-gray-100 dark:border-gray-700/50">File Type</th>
                  <th className="p-3.5 border-b border-gray-100 dark:border-gray-700/50">Section Name</th>
                  <th className="p-3.5 rounded-r-lg border-b border-gray-100 dark:border-gray-700/50">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/50">
                {recentExports.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-700/10 transition-colors">
                    <td className="p-3.5 font-semibold">
                      <span className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider ${
                        log.fileType === 'PDF' 
                          ? 'bg-red-50 dark:bg-red-900/25 text-red-600 dark:text-red-400 border border-red-100/50 dark:border-red-900/30' 
                          : 'bg-emerald-50 dark:bg-emerald-900/25 text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/30'
                      }`}>
                        {log.fileType}
                      </span>
                    </td>
                    <td className="p-3.5 text-gray-700 dark:text-gray-200 font-medium">
                      {log.sectionName}
                    </td>
                    <td className="p-3.5 text-xs text-gray-500 dark:text-gray-400 font-mono">
                      {log.timestamp}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
