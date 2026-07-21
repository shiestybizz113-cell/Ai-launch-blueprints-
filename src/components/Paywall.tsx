import { Lock, CreditCard, CheckCircle2, Zap, Shield, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutForm } from './CheckoutForm';

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY?.trim();
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : Promise.resolve(null);

interface PaywallProps {
  onUpgrade: (tier: 'pro' | 'enterprise') => void;
  title: string;
  config: { currency?: string };
}

export function Paywall({ onUpgrade, title, config }: PaywallProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [amount, setAmount] = useState(0);

  const handleTierSelect = async (tier: 'pro' | 'enterprise', amount: number) => {
    const res = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency: config.currency || 'usd' }),
    });
    const data = await res.json();
    setClientSecret(data.clientSecret);
    setAmount(amount);
  };

  if (clientSecret) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <div className="p-8 bg-gray-900 rounded-2xl w-full max-w-lg mx-auto border border-white/10 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-6">Complete Payment</h2>
            <CheckoutForm amount={amount} onPaymentSuccess={() => onUpgrade('pro')} />
        </div>
      </Elements>
    );
  }

  return (
    <div className="relative flex flex-col items-center justify-center py-20 px-4 text-center overflow-hidden rounded-3xl bg-gray-950 border border-gray-800 shadow-2xl">
      {/* High-tech background effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full" />
          <div className="w-20 h-20 bg-gray-900/80 backdrop-blur-xl border border-white/10 text-blue-400 rounded-2xl flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(59,130,246,0.3)]">
            <Lock className="w-10 h-10" />
          </div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-400 mb-4 tracking-tight">
          Unlock {title}
        </h2>
        <p className="text-gray-400 max-w-lg mb-12 text-lg">
          You've reached a premium module. Upgrade your workspace to access advanced generation tools, financial models, and export capabilities.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full text-left">
          {/* Pro Tier */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="relative bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 shadow-xl flex flex-col"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-t-3xl" />
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-400" />
                  Pro Workspace
                </h3>
                <p className="text-gray-400 text-sm mt-1">For indie hackers & creators</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-white">$49</span>
                <span className="text-gray-500 text-sm">/mo</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1 mt-4">
              {['Instant UI Generation & Export', 'Financial Projections & Models', 'Risk Mitigation Playbooks', 'Downloadable Templates (CSV, JSON)'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => handleTierSelect('pro', 49)}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]"
            >
              <CreditCard className="w-5 h-5" />
              Upgrade to Pro
            </button>
          </motion.div>

          {/* Enterprise Tier */}
          <motion.div 
            whileHover={{ y: -5 }}
            className="relative bg-gradient-to-b from-gray-900 to-black border border-purple-500/30 rounded-3xl p-8 shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="absolute inset-0 bg-purple-500/5 pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600/20 blur-[50px] rounded-full pointer-events-none" />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-400" />
                  Enterprise
                </h3>
                <p className="text-purple-300/70 text-sm mt-1">For scaling teams & startups</p>
              </div>
              <div className="text-right">
                <span className="text-3xl font-bold text-white">$199</span>
                <span className="text-gray-500 text-sm">/mo</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-1 mt-4 relative z-10">
              {['Everything in Pro', 'Custom AI Model Fine-tuning', 'Advanced Monetization Strategies', 'Dedicated Account Manager', 'API Access & Webhooks'].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                  <Sparkles className="w-5 h-5 text-purple-500 flex-shrink-0" />
                  <span className={i === 0 ? "font-semibold text-white" : ""}>{item}</span>
                </li>
              ))}
            </ul>
            
            <button 
              onClick={() => handleTierSelect('enterprise', 199)}
              className="relative z-10 w-full bg-white hover:bg-gray-100 text-black font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              Upgrade to Enterprise
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
