import React, { useState } from 'react';
import { Gift, Users, CreditCard, ExternalLink, Copy, Check, TrendingUp, DollarSign, History, Zap, Trophy, UserCheck, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { CreditUsage } from '../App';

interface AffiliateRewardsProps {
  stats: {
    referrals: number;
    earnedCredits: number;
    potentialEarnings: number;
    redeemedCash: number;
    profileCompleted: boolean;
    dailyLogins: number;
  };
  history: CreditUsage[];
  onRedeem: (amount: number, type: 'cash' | 'feature', description: string) => boolean;
  onEarn: (amount: number, action: string) => void;
  onPurchase: (amount: number, credits: number) => Promise<void>;
  setRewardStats: React.Dispatch<React.SetStateAction<any>>;
}

export function AffiliateRewards({ stats, history, onRedeem, onEarn, onPurchase, setRewardStats }: AffiliateRewardsProps) {
  const [copied, setCopied] = useState(false);
  const [redemptionSuccess, setRedemptionSuccess] = useState<string | null>(null);
  const referralLink = "https://ai-blueprint.io/ref/founder123";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRedeem = (amount: number, type: 'cash' | 'feature', description: string) => {
    const success = onRedeem(amount, type, description);
    if (success) {
      setRedemptionSuccess(`Successfully redeemed ${amount} credits for ${description}!`);
      setTimeout(() => setRedemptionSuccess(null), 3000);
    }
  };

  const completeProfile = () => {
    if (!stats.profileCompleted) {
      onEarn(250, 'Completed User Profile');
      setRewardStats((prev: any) => ({ ...prev, profileCompleted: true }));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Rewards & Growth Center</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your credits, refer friends, and earn real-world rewards.</p>
        </div>
        {redemptionSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-lg border border-green-200 dark:border-green-800 text-sm font-medium"
          >
            {redemptionSuccess}
          </motion.div>
        )}
      </div>

      {/* Buy Credits & Stripe Section (High-End Addition) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { color: 'blue', price: 20, credits: 100, label: 'Starter Pack', desc: '100 premium credits', icon: Zap },
          { color: 'indigo', price: 49, credits: 300, label: 'Pro Volume', desc: '300 premium credits', icon: TrendingUp },
          { color: 'purple', price: 149, credits: 1200, label: 'Enterprise Fleet', desc: '1200 premium credits', icon: Trophy },
        ].map((pkg, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -5 }}
            className={`bg-white dark:bg-gray-900 border-2 border-transparent hover:border-${pkg.color}-500 transition-all rounded-3xl p-8 shadow-sm flex flex-col items-center text-center relative overflow-hidden group`}
          >
            <div className={`absolute -top-4 -right-4 w-24 h-24 bg-${pkg.color}-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform`}></div>
            <div className={`p-4 rounded-2xl bg-${pkg.color}-50 dark:bg-${pkg.color}-900/30 text-${pkg.color}-600 mb-4`}>
              <pkg.icon className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">{pkg.label}</h3>
            <div className="text-xs text-gray-400 mb-4">{pkg.desc}</div>
            <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
              ${pkg.price}
            </div>
            <button 
              onClick={() => onPurchase(pkg.price, pkg.credits)}
              className={`w-full py-4 rounded-2xl font-bold bg-${pkg.color}-600 hover:bg-${pkg.color}-700 text-white shadow-lg shadow-${pkg.color}-500/20 transition-all active:scale-95`}
            >
              Buy Credits
            </button>
          </motion.div>
        ))}
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Referrals', value: stats.referrals, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20' },
          { label: 'Credits Earned', value: stats.earnedCredits, icon: Gift, color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-900/20' },
          { label: 'Cash Redeemed', value: `$${stats.redeemedCash.toFixed(2)}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20' },
          { label: 'Pending Payouts', value: `$${(stats.potentialEarnings - stats.redeemedCash).toFixed(2)}`, icon: CreditCard, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-900/20' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">{stat.label}</h3>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Referral Link & Viral Loop */}
      <div className="bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl opacity-50"></div>
        <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-bold mb-4">
              <Zap className="w-3 h-3 fill-white" />
              REFERRAL PROGRAM ACTIVE
            </div>
            <h2 className="text-3xl font-bold mb-4">Invite others, earn 20% lifetime commission.</h2>
            <p className="text-indigo-100 mb-8 max-w-lg">
              Give your friends 50 free credits. You get <span className="font-bold text-white">100 credits</span> for every signup and <span className="font-bold text-white">20% of every payment</span> they ever make.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <div className="flex-1 bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-4 flex items-center justify-between gap-4 w-full">
                <code className="text-sm font-mono truncate">{referralLink}</code>
                <button 
                  onClick={handleCopy}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Copy link"
                >
                  {copied ? <Check className="w-5 h-5 text-green-300" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              <button className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-700 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-lg active:scale-95">
                Share Now
              </button>
            </div>
          </div>
          <div className="hidden lg:block w-48 h-48 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/30 animate-pulse">
            <Trophy className="w-24 h-24 text-white" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Gamification & Quests */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Quick Actions & Quests
              </h3>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                {stats.profileCompleted ? '1/1 Daily quests' : '0/1 Daily quests'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button 
                onClick={completeProfile}
                disabled={stats.profileCompleted}
                className={`p-6 rounded-2xl border text-left transition-all flex items-start gap-4 ${stats.profileCompleted ? 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-800 opacity-60' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500'}`}
              >
                <div className={`p-3 rounded-xl ${stats.profileCompleted ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white mb-1">Complete Profile</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Fill in your information to personalize your AI experience.</div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600">
                    {stats.profileCompleted ? <><Check className="w-3 h-3" /> COMPLETED</> : '+ 250 CREDITS'}
                  </div>
                </div>
              </button>

              <div className="p-6 rounded-2xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 dark:text-white mb-1">Daily Login Streak</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Day {stats.dailyLogins} / 7 active streak.</div>
                  <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-orange-500" style={{ width: `${(stats.dailyLogins / 7) * 100}%` }}></div>
                  </div>
                  <div className="text-xs font-bold text-orange-600 uppercase tracking-tighter">Next: +50 CREDITS (Tomorrow)</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800">
              <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-widest">Milestones reached</h4>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: 'First Component', icon: Zap, status: 'unlocked' },
                  { label: '10x Generator', icon: Trophy, status: 'unlocked' },
                  { label: 'Early Adopter', icon: Gift, status: 'unlocked' },
                  { label: 'Viral Creator', icon: Users, status: 'locked' },
                ].map((m, i) => (
                  <div key={i} className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-medium ${m.status === 'unlocked' ? 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-800 dark:text-amber-400' : 'bg-gray-50 border-gray-100 text-gray-400 dark:bg-gray-800 dark:border-gray-700 opacity-50'}`}>
                    <m.icon className="w-3.5 h-3.5" />
                    {m.label}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Credit Usage History */}
          <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden">
            <div className="p-8 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <History className="w-5 h-5 text-gray-400" />
                Credit Usage History
              </h3>
              <button className="text-sm font-medium text-blue-600">Export CSV</button>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {history.length > 0 ? (
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-gray-50 dark:bg-gray-800 text-xs text-gray-500 uppercase tracking-widest z-10">
                    <tr>
                      <th className="px-8 py-3 font-semibold">Action / Event</th>
                      <th className="px-8 py-3 font-semibold text-right">Amount</th>
                      <th className="px-8 py-3 font-semibold text-right">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {history.map((entry) => (
                      <tr key={entry.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-lg ${
                              entry.type === 'earn' ? 'bg-green-100 text-green-600' : 
                              entry.type === 'consume' ? 'bg-red-100 text-red-600' : 
                              'bg-purple-100 text-purple-600'
                            }`}>
                              {entry.type === 'earn' ? <TrendingUp className="w-4 h-4" /> : entry.type === 'consume' ? <Zap className="w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">{entry.action}</span>
                          </div>
                        </td>
                        <td className={`px-8 py-4 text-sm font-bold text-right ${
                          entry.type === 'earn' ? 'text-green-600' : 
                          entry.type === 'consume' ? 'text-red-600' : 
                          'text-purple-600'
                        }`}>
                          {entry.type === 'earn' ? '+' : '-'}{entry.amount}
                        </td>
                        <td className="px-8 py-4 text-sm text-gray-500 text-right font-mono">
                          {new Date(entry.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-12 text-center text-gray-500">No history yet. Start exploring to earn and spend credits.</div>
              )}
            </div>
          </section>
        </div>

        {/* Redemption Options */}
        <div className="space-y-8">
          <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-8 sticky top-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-500" />
              Redeem Credits
            </h3>
            
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-4 rounded-2xl mb-6">
                <div className="text-xs text-blue-600 dark:text-blue-400 font-bold uppercase mb-1">Conversion Rate</div>
                <div className="text-blue-900 dark:text-blue-200 font-semibold">100 Credits = $20.00 USD</div>
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Withdrawal</h4>
                <button 
                  onClick={() => handleRedeem(500, 'cash', '$100.00 Payout')}
                  className="w-full group p-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all bg-white dark:bg-gray-800 flex items-center justify-between"
                >
                  <div className="text-left">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">$100.00 PayPal</div>
                    <div className="text-xs text-gray-500">Requires 500 units</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                </button>
                <button 
                  onClick={() => handleRedeem(2000, 'cash', '$400.00 Payout')}
                  className="w-full group p-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 transition-all bg-white dark:bg-gray-800 flex items-center justify-between"
                >
                  <div className="text-left">
                    <div className="text-sm font-bold text-gray-900 dark:text-white">$400.00 PayPal</div>
                    <div className="text-xs text-gray-500">Requires 2,000 units</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-blue-500 transition-colors" />
                </button>
              </div>

              <div className="space-y-4 pt-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Premium Features</h4>
                <button 
                   onClick={() => handleRedeem(1000, 'feature', 'API Early Access')}
                   className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-all bg-white dark:bg-gray-800 text-left"
                >
                  <div className="text-sm font-bold text-gray-900 dark:text-white">Beta API Access</div>
                  <div className="text-xs text-gray-500 italic">Self-hostable endpoint access.</div>
                  <div className="mt-2 text-[10px] font-bold text-purple-600 uppercase">1,000 CREDITS</div>
                </button>
                <button 
                  onClick={() => handleRedeem(5000, 'feature', 'Custom Model Slot')}
                  className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-all bg-white dark:bg-gray-800 text-left"
                >
                  <div className="text-sm font-bold text-gray-900 dark:text-white">Custom Model Slot</div>
                  <div className="text-xs text-gray-500 italic">Train on your proprietary data.</div>
                  <div className="mt-2 text-[10px] font-bold text-purple-600 uppercase">5,000 CREDITS</div>
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
