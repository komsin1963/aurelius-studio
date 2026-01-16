'use client';

import { Zap, Crown, Check, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function TopUpPage() {
  const plans = [
    { name: 'Starter', credits: '50', price: '฿199', icon: <Zap size={24} className="text-cyan-400" /> },
    { name: 'Professional', credits: '200', price: '฿599', icon: <Zap size={24} className="text-yellow-400" />, popular: true },
    { name: 'Elite Studio', credits: '500', price: '฿1,290', icon: <Crown size={24} className="text-fuchsia-500" /> },
  ];

  return (
    <div className="min-h-screen bg-[#020205] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-white mb-10 transition-all font-black text-[10px] uppercase tracking-[0.3em]">
          <ArrowLeft size={16} /> Back to Control Room
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4">
            Recharge <span className="text-cyan-500">Credits</span>
          </h1>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.5em]">เพิ่มพลังให้จินตนาการของคุณด้วย Aurelius Credits</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div key={i} className={`relative p-1 rounded-[3rem] ${plan.popular ? 'bg-gradient-to-b from-cyan-500 to-fuchsia-600' : 'bg-white/5'}`}>
              <div className="bg-[#0b0b12] rounded-[2.9rem] p-10 h-full flex flex-col">
                {plan.popular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-cyan-500 text-black px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">Most Popular</span>}
                <div className="mb-8">{plan.icon}</div>
                <h3 className="text-2xl font-black italic uppercase mb-2">{plan.name}</h3>
                <div className="text-5xl font-black italic mb-6">{plan.credits} <span className="text-xs not-italic text-slate-500">XP</span></div>
                <div className="text-2xl font-bold text-cyan-400 mb-8">{plan.price}</div>
                
                <ul className="space-y-4 mb-10 flex-grow text-left">
                  <li className="flex items-center gap-3 text-[10px] font-bold uppercase text-slate-400"><Check size={14} className="text-cyan-500" /> High-Speed Generation</li>
                  <li className="flex items-center gap-3 text-[10px] font-bold uppercase text-slate-400"><Check size={14} className="text-cyan-500" /> No Watermark</li>
                  <li className="flex items-center gap-3 text-[10px] font-bold uppercase text-slate-400"><Check size={14} className="text-cyan-500" /> Priority Support</li>
                </ul>

                <button className="w-full py-5 rounded-2xl bg-white text-black font-black uppercase text-[10px] tracking-[0.2em] hover:bg-cyan-500 transition-all flex items-center justify-center gap-2">
                  Purchase Now <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}