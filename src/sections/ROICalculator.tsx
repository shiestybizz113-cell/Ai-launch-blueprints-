import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Layers, 
  Percent, 
  RotateCcw, 
  Activity, 
  Zap, 
  Target, 
  Briefcase,
  HelpCircle,
  FileSpreadsheet
} from 'lucide-react';
import { toast } from 'sonner';

interface MonthData {
  monthName: string;
  projectedNewUsers: number;
  projectedTotalUsers: number;
  projectedRevenue: number;
  projectedCosts: number;
  projectedProfit: number;
  
  actualNewUsers: number;
  actualTotalUsers: number;
  actualRevenue: number;
  actualCosts: number;
  actualProfit: number;
}

export function ROICalculator() {
  // Input states
  const [acv, setAcv] = useState<number>(49); // Average contract/subscription value per month
  const [opex, setOpex] = useState<number>(2500); // Hosting + software + operational cost
  const [marketing, setMarketing] = useState<number>(1500); // Ad budgets/marketing costs
  const [initialAcquisition, setInitialAcquisition] = useState<number>(40); // Month 1 base new customers
  const [momGrowth, setMomGrowth] = useState<number>(15); // Month-over-Month acquisition growth rate (%)
  
  // Actual monthly custom acquisitions (Month 1 to 6)
  const [actualAcquisitions, setActualAcquisitions] = useState<number[]>([35, 48, 42, 60, 75, 95]);

  // Handle manual input updates for Actual Acquisitions
  const handleActualChange = (index: number, val: string) => {
    const parsed = parseInt(val) || 0;
    const updated = [...actualAcquisitions];
    updated[index] = parsed;
    setActualAcquisitions(updated);
  };

  // Simulation Presets to easily populate actual numbers
  const applyPreset = (presetType: 'conservative' | 'hype' | 'unstable') => {
    let presetValues: number[] = [];
    switch (presetType) {
      case 'conservative':
        presetValues = [25, 30, 32, 38, 42, 45];
        toast.info("Applied 'Conservative Growth' actuals preset");
        break;
      case 'hype':
        presetValues = [50, 75, 110, 160, 240, 350];
        toast.success("Applied 'Hyper-Growth Scale' actuals preset!");
        break;
      case 'unstable':
        presetValues = [45, 15, 60, 20, 80, 110];
        toast.warning("Applied 'Volatile/Spiky Market' actuals preset");
        break;
    }
    setActualAcquisitions(presetValues);
  };

  // Calculate 6-month projections and comparison metrics
  const calculatedData = useMemo<MonthData[]>(() => {
    const months = ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6'];
    const dataList: MonthData[] = [];
    
    let cumProjectedUsers = 0;
    let cumActualUsers = 0;

    for (let i = 0; i < 6; i++) {
      // PROJECTIONS
      // MoM compounding for projected acquisitions
      const projNewUsers = i === 0 
        ? initialAcquisition 
        : Math.round(initialAcquisition * Math.pow(1 + momGrowth / 100, i));
      
      cumProjectedUsers += projNewUsers;
      const projectedRevenue = cumProjectedUsers * acv;
      const projectedCosts = opex + marketing;
      const projectedProfit = projectedRevenue - projectedCosts;

      // ACTUALS
      const actNewUsers = actualAcquisitions[i] !== undefined ? actualAcquisitions[i] : 0;
      cumActualUsers += actNewUsers;
      const actualRevenue = cumActualUsers * acv;
      const actualCosts = opex + (marketing * (actNewUsers / (projNewUsers || 1))); // assume minor scaling of marketing cost based on performance
      const roundedActualCosts = Math.round(actualCosts);
      const actualProfit = actualRevenue - roundedActualCosts;

      dataList.push({
        monthName: months[i],
        projectedNewUsers: projNewUsers,
        projectedTotalUsers: cumProjectedUsers,
        projectedRevenue,
        projectedCosts,
        projectedProfit,
        
        actualNewUsers: actNewUsers,
        actualTotalUsers: cumActualUsers,
        actualRevenue,
        actualCosts: roundedActualCosts,
        actualProfit
      });
    }

    return dataList;
  }, [acv, opex, marketing, initialAcquisition, momGrowth, actualAcquisitions]);

  // Overall Cumulative Financial Aggregates
  const stats = useMemo(() => {
    const totalProjRevenue = calculatedData.reduce((acc, d) => acc + d.projectedRevenue, 0);
    const totalProjCosts = calculatedData.reduce((acc, d) => acc + d.projectedCosts, 0);
    const totalProjProfit = totalProjRevenue - totalProjCosts;
    const projRoi = totalProjCosts > 0 ? (totalProjProfit / totalProjCosts) * 100 : 0;

    const totalActualRevenue = calculatedData.reduce((acc, d) => acc + d.actualRevenue, 0);
    const totalActualCosts = calculatedData.reduce((acc, d) => acc + d.actualCosts, 0);
    const totalActualProfit = totalActualRevenue - totalActualCosts;
    const actualRoi = totalActualCosts > 0 ? (totalActualProfit / totalActualCosts) * 100 : 0;

    // Find break-even month index
    const projBreakEvenIdx = calculatedData.findIndex(d => d.projectedProfit > 0);
    const actualBreakEvenIdx = calculatedData.findIndex(d => d.actualProfit > 0);

    const formatBreakEven = (idx: number) => {
      if (idx === -1) return 'Beyond Month 6';
      return `Month ${idx + 1}`;
    };

    return {
      totalProjRevenue,
      totalProjCosts,
      totalProjProfit,
      projRoi,
      
      totalActualRevenue,
      totalActualCosts,
      totalActualProfit,
      actualRoi,
      
      projBreakEven: formatBreakEven(projBreakEvenIdx),
      actualBreakEven: formatBreakEven(actualBreakEvenIdx)
    };
  }, [calculatedData]);

  // Reset inputs to default healthy SaaS settings
  const handleReset = () => {
    setAcv(49);
    setOpex(2500);
    setMarketing(1500);
    setInitialAcquisition(40);
    setMomGrowth(15);
    setActualAcquisitions([35, 48, 42, 60, 75, 95]);
    toast.success("All metrics reset to healthy SaaS baseline standards");
  };

  return (
    <div id="roi-calculator-container" className="space-y-10">
      {/* Title & Introduction header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 id="roi-title" className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Financial Runway & ROI Matrix
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 max-w-2xl">
            Simulate your product’s customer accumulation, revenue trajectory, operational break-even, and evaluate actual performance against projected goals.
          </p>
        </div>
        
        <button
          id="btn-roi-reset"
          onClick={handleReset}
          className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all shadow-sm cursor-pointer border border-gray-200/50 dark:border-gray-700/50"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Inputs Section */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Projections Matrix Inputs (Sidebar) */}
        <div id="roi-inputs-column" className="xl:col-span-5 space-y-6">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 dark:text-blue-400">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900 dark:text-white text-base">Projection Variables</h3>
                <p className="text-[11px] text-gray-400">Establish the business baseline modeling parameters.</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Average Customer Value */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-gray-700 dark:text-gray-300">
                    Average Contract/Sub Value (Monthly)
                  </label>
                  <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">${acv}/mo</span>
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="input-acv"
                    type="number"
                    value={acv}
                    onChange={(e) => setAcv(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl font-medium focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* OPEX */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-gray-700 dark:text-gray-300">
                    Monthly Operating Cost (Dev, Hosting, Admin)
                  </label>
                  <span className="font-mono text-red-500 font-bold">${opex}/mo</span>
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="input-opex"
                    type="number"
                    value={opex}
                    onChange={(e) => setOpex(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl font-medium focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Marketing budget */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-gray-700 dark:text-gray-300">
                    Monthly Growth/Ad Budget (CAC)
                  </label>
                  <span className="font-mono text-purple-500 font-bold">${marketing}/mo</span>
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="input-marketing"
                    type="number"
                    value={marketing}
                    onChange={(e) => setMarketing(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl font-medium focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Initial Customer Acquisitions */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-gray-700 dark:text-gray-300">
                    Month 1 Initial Customer Acquisition
                  </label>
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{initialAcquisition} users</span>
                </div>
                <input
                  id="range-initial-acquisition"
                  type="range"
                  min="5"
                  max="200"
                  step="5"
                  value={initialAcquisition}
                  onChange={(e) => setInitialAcquisition(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* MoM Growth Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-bold text-gray-700 dark:text-gray-300">
                    Acquisition compounding MoM Growth
                  </label>
                  <span className="font-mono text-emerald-500 font-bold">+{momGrowth}%</span>
                </div>
                <input
                  id="range-mom-growth"
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={momGrowth}
                  onChange={(e) => setMomGrowth(parseInt(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Actuals Real-World Intake Sandbox */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl text-emerald-600 dark:text-emerald-400">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-sm">Actual Monthly Acquisitions</h3>
                  <p className="text-[10px] text-gray-400">Customize or simulate real performance.</p>
                </div>
              </div>
            </div>

            {/* Presets Row */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                id="btn-preset-conservative"
                onClick={() => applyPreset('conservative')}
                className="py-1.5 px-2 bg-gray-100 dark:bg-gray-800 text-[10px] font-bold text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer text-center"
              >
                Conservative
              </button>
              <button
                id="btn-preset-hype"
                onClick={() => applyPreset('hype')}
                className="py-1.5 px-2 bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-600 dark:text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-all cursor-pointer text-center"
              >
                Hyper-Growth
              </button>
              <button
                id="btn-preset-volatile"
                onClick={() => applyPreset('unstable')}
                className="py-1.5 px-2 bg-amber-500/10 border border-amber-500/20 text-[10px] font-black text-amber-600 dark:text-amber-400 rounded-lg hover:bg-amber-500/20 transition-all cursor-pointer text-center"
              >
                Volatile/Spiky
              </button>
            </div>

            {/* Manual Months Grid */}
            <div className="grid grid-cols-3 gap-3">
              {actualAcquisitions.map((val, idx) => (
                <div key={idx} className="space-y-1">
                  <label className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest block">
                    Month {idx + 1}
                  </label>
                  <input
                    id={`input-actual-m${idx}`}
                    type="number"
                    value={val}
                    onChange={(e) => handleActualChange(idx, e.target.value)}
                    className="w-full text-center py-1.5 text-xs bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard KPIs and Grouped Recharts Visualizer */}
        <div id="roi-visualizer-column" className="xl:col-span-7 space-y-6">
          
          {/* Grid of aggregated outcome cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Break-Even Projected vs Actual */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Break-Even Point</span>
              <div className="mt-2 space-y-1">
                <div className="text-sm font-bold text-gray-900 dark:text-white flex items-center justify-between">
                  <span>Proj:</span>
                  <span className="text-blue-600 dark:text-blue-400 font-mono text-xs">{stats.projBreakEven}</span>
                </div>
                <div className="text-sm font-bold text-gray-900 dark:text-white flex items-center justify-between">
                  <span>Actual:</span>
                  <span className="text-emerald-500 font-mono text-xs">{stats.actualBreakEven}</span>
                </div>
              </div>
            </div>

            {/* Cumulative Projected Revenue vs Actual */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">6-Month Revenue</span>
              <div className="mt-2 space-y-1">
                <div className="text-xs text-gray-500 flex items-center justify-between">
                  <span>Proj:</span>
                  <span className="font-mono text-gray-900 dark:text-white font-semibold">${stats.totalProjRevenue.toLocaleString()}</span>
                </div>
                <div className="text-sm font-bold text-gray-900 dark:text-white flex items-center justify-between">
                  <span>Actual:</span>
                  <span className="font-mono text-emerald-500">${stats.totalActualRevenue.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Cumulative Expenses */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">6-Month Expenses</span>
              <div className="mt-2 space-y-1">
                <div className="text-xs text-gray-500 flex items-center justify-between">
                  <span>Proj:</span>
                  <span className="font-mono text-gray-900 dark:text-white font-semibold">${stats.totalProjCosts.toLocaleString()}</span>
                </div>
                <div className="text-sm font-bold text-gray-900 dark:text-white flex items-center justify-between">
                  <span>Actual:</span>
                  <span className="font-mono text-red-500">${stats.totalActualCosts.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* ROI percentage comparison */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider">Net Growth ROI %</span>
              <div className="mt-2 space-y-1">
                <div className="text-xs text-gray-500 flex items-center justify-between">
                  <span>Proj:</span>
                  <span className="font-mono text-gray-900 dark:text-white font-semibold">
                    {stats.projRoi.toFixed(0)}%
                  </span>
                </div>
                <div className="text-sm font-bold text-gray-900 dark:text-white flex items-center justify-between">
                  <span>Actual:</span>
                  <span className={`font-mono flex items-center gap-0.5 ${stats.totalActualProfit >= stats.totalProjProfit ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {stats.totalActualProfit >= stats.totalProjProfit ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    {stats.actualRoi.toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Composed Chart Visualizer */}
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-gray-900 dark:text-white text-base">Growth Trajectory comparison</h3>
                <p className="text-[11px] text-gray-400">Comparing projected (blue) vs actual (green) monthly revenue curves.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 mr-2">Projected</span>
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">Actual</span>
              </div>
            </div>

            {/* Recharts Container */}
            <div className="h-80 w-full font-mono text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={calculatedData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" className="dark:stroke-gray-800" />
                  <XAxis 
                    dataKey="monthName" 
                    stroke="#9ca3af" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(val) => `$${val}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      borderRadius: '12px', 
                      border: 'none', 
                      color: '#ffffff',
                      fontSize: '11px',
                      fontFamily: 'monospace' 
                    }} 
                  />
                  <Legend verticalAlign="bottom" height={36} />
                  
                  {/* Projected monthly revenue represented as clear slate blue column */}
                  <Bar 
                    name="Projected Monthly Revenue" 
                    dataKey="projectedRevenue" 
                    fill="#3b82f6" 
                    radius={[6, 6, 0, 0]} 
                    maxBarSize={30} 
                  />
                  
                  {/* Actual monthly revenue represented as vivid emerald column */}
                  <Bar 
                    name="Actual Monthly Revenue" 
                    dataKey="actualRevenue" 
                    fill="#10b981" 
                    radius={[6, 6, 0, 0]} 
                    maxBarSize={30} 
                  />
                  
                  {/* Line representing cumulative Actual Profit */}
                  <Line 
                    name="Actual Net Profit" 
                    type="monotone" 
                    dataKey="actualProfit" 
                    stroke="#a855f7" 
                    strokeWidth={3} 
                    dot={{ r: 4 }} 
                    activeDot={{ r: 6 }} 
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            
            {/* Growth Disclaimer footer aligned to "No fake claims of guaranteed money" */}
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[10px] text-gray-400 font-mono">
              <div className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-blue-500" />
                <span>Simulations are for educational strategy assessment only.</span>
              </div>
              <span>Powered by Empire Tool Vault</span>
            </div>
          </div>
        </div>

      </div>

      {/* Grid Comparison Matrix breakdown */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-gray-500" />
            <h3 className="font-extrabold text-gray-900 dark:text-white text-base">Runway Details (Projected vs. Actual)</h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 text-gray-400 font-mono">
                <th className="py-3 px-4 font-bold uppercase tracking-wider">Timeline</th>
                <th className="py-3 px-4 font-bold uppercase tracking-wider text-right">Proj. Customers</th>
                <th className="py-3 px-4 font-bold uppercase tracking-wider text-right">Act. Customers</th>
                <th className="py-3 px-4 font-bold uppercase tracking-wider text-right">Proj. Revenue</th>
                <th className="py-3 px-4 font-bold uppercase tracking-wider text-right">Act. Revenue</th>
                <th className="py-3 px-4 font-bold uppercase tracking-wider text-right">Proj. Net Profit</th>
                <th className="py-3 px-4 font-bold uppercase tracking-wider text-right">Act. Net Profit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
              {calculatedData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 dark:hover:bg-gray-800/10 transition-all">
                  <td className="py-3.5 px-4 font-bold text-gray-700 dark:text-gray-300">{row.monthName}</td>
                  <td className="py-3.5 px-4 text-right text-gray-600 dark:text-gray-400">{row.projectedTotalUsers}</td>
                  <td className="py-3.5 px-4 text-right text-gray-900 dark:text-white font-bold">{row.actualTotalUsers}</td>
                  <td className="py-3.5 px-4 text-right text-blue-600 dark:text-blue-400 font-bold">${row.projectedRevenue.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-right text-emerald-500 font-bold">${row.actualRevenue.toLocaleString()}</td>
                  <td className={`py-3.5 px-4 text-right font-bold ${row.projectedProfit >= 0 ? 'text-gray-900 dark:text-white' : 'text-gray-400'}`}>
                    ${row.projectedProfit.toLocaleString()}
                  </td>
                  <td className={`py-3.5 px-4 text-right font-bold ${row.actualProfit >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                    ${row.actualProfit.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
