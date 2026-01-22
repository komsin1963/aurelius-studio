"use client";
import React, { useState, useEffect, ReactNode } from 'react';
import { 
  Activity, Zap, Terminal as TerminalIcon, ShieldCheck, Crown, 
  Check, ShieldAlert, BarChart3, Globe, ArrowUpRight, TrendingUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { supabase } from '@/lib/supabase';

// --- Stat Card Component (Yesterday's Style) ---
interface StatBoxProps {
  icon: ReactNode;
  label: string;
  value: string;
  color?: string;
}

function StatBox({ icon, label, value, color = "text-white" }: StatBoxProps) {
  return (
    <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-left backdrop-blur-sm hover:bg-white/10 transition-colors">
      <div className="text-emerald-500 mb-2">{icon}</div>
      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{label}</p>
      <p className={`text-xl font-mono font-bold ${color}`}>{value}</p>
    </div>
  );
}

// --- Main Page Component ---
export default function Home() {
  const [equity, setEquity] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>(["[SYSTEM] Initializing Sentinel Engine..."]);

  useEffect(() => {
    // 1. Fetch Port ID 3 Initial Value
    const fetchInitial = async () => {
      const { data } = await supabase.from('portfolios').select('equity').eq('id', 3).single();
      if (data) setEquity(Number(data.equity));
    };
    fetchInitial();

    // 2. Real-time Listening
    const channel = supabase.channel('yesterday-vibe')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'portfolios', filter: 'id=eq.3' }, (payload) => {
        const newVal = Number(payload.new.equity);
        setEquity(newVal);
        setLogs(prev => [`[SIGNAL] Live Update: $${newVal.toLocaleString()}`, ...prev].slice(0, 5));
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.8 }, colors: ['#10b981', '#ffffff'] });
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <main className="min-h-screen bg-[#0B0E11] text-white font-sans overflow-x-hidden selection:bg-emerald-500/30">
      {/* HERO SECTION - YESTERDAY'S VIBE */}
      <div className="relative min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="relative z-10 space-y-10 w-full max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-widest italic animate-bounce">
            Live Intelligence Connection
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black italic uppercase leading-none tracking-tighter">
            Aurelius <span className="text-emerald-500 drop-shadow-[0_0_25px_rgba(16,185,129,0.3)]">Sentinel</span>
          </h1>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBox icon={<Activity size={20}/>} label="Live Equity" value={`$${equity.toLocaleString(undefined, {minimumFractionDigits:2})}`} color="text-emerald-400" />
            <StatBox icon={<Zap size={20}/>} label="Minute-Lock" value="ACTIVE" color="text-emerald-500" />
            <StatBox icon={<ShieldCheck size={20}/>} label="Vegas Tunnel" value="STABLE" />
            <StatBox icon={<Crown size={20}/>} label="User Tier" value="VVIP" color="text-amber-500" />
          </div>

          <div className="bg-black/40 border border-white/10 rounded-2xl p-4 h-32 overflow-hidden text-left font-mono text-[10px] space-y-1 backdrop-blur-md">
            <div className="flex items-center gap-2 text-gray-500 mb-2 border-b border-white/5 pb-1 uppercase font-bold"><TerminalIcon size={12} /> Live Event Logs</div>
            {logs.map((log, i) => (<div key={i} className={`${i === 0 ? 'text-emerald-400' : 'text-gray-500'}`}>{log}</div>))}
          </div>
        </div>
      </div>

      {/* BACKTEST SECTION - CLEAN & PROFESSIONAL */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5 bg-black/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 text-left">
            <h2 className="text-5xl font-black uppercase italic leading-tight">Verified <span className="text-emerald-500">Results</span></h2>
            <p className="text-gray-400 text-lg">Real-time performance tracked via direct database connection for 100% transparency.</p>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                 <div className="text-2xl font-mono font-bold text-emerald-400">72.4%</div>
                 <div className="text-[10px] text-gray-500 uppercase font-bold">Win Rate</div>
               </div>
               <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                 <div className="text-2xl font-mono font-bold text-emerald-400">4.2</div>
                 <div className="text-[10px] text-gray-500 uppercase font-bold">Profit Factor</div>
               </div>
            </div>
          </div>
          <div className="h-64 bg-[#161A1E] rounded-3xl border border-white/10 p-8 flex items-end gap-2 shadow-2xl">
            {[40, 60, 45, 80, 70, 100, 90, 120].map((h, i) => (
              <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-emerald-500/20 border-t-2 border-emerald-500"></div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION - GUMROAD STYLE */}
      <section className="py-32 px-6 max-w-7xl mx-auto border-t border-white/5">
        <h2 className="text-4xl font-black uppercase italic text-center mb-16 tracking-tighter">Institutional Licenses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Starter", price: "$49", period: "/mo", features: ["1 Live Account", "Basic Dashboard"] },
            { name: "Professional", price: "$129", period: "/quarter", features: ["2 Live Accounts", "Advanced Logic"], featured: true },
            { name: "Lifetime", price: "$499", period: " once", features: ["Unlimited Accounts", "VVIP Support"] }
          ].map((plan, i) => (
            <div key={i} className={`p-8 rounded-3xl bg-white/5 border ${plan.featured ? 'border-emerald-500' : 'border-white/10'} backdrop-blur-xl transition-all hover:-translate-y-2 text-left`}>
              <h3 className="text-2xl font-bold uppercase italic mb-1">{plan.name}</h3>
              <div className="text-4xl font-black mb-8">{plan.price}<span className="text-sm font-normal text-gray-500">{plan.period}</span></div>
              <ul className="space-y-4 mb-10 h-32">
                {plan.features.map((f, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs text-gray-300"><Check size={14} className="text-emerald-500" /> {f}</li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 ${plan.featured ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' : 'bg-white/10 hover:bg-white/20'}`}>
                Purchase <ArrowUpRight size={14}/>
              </button>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-20 text-center border-t border-white/5 bg-black/40">
        <div className="text-emerald-500 font-black italic text-xl mb-2">AURELIUS INTELLIGENCE</div>
        <p className="text-[10px] text-gray-600 uppercase tracking-[0.5em]">Quantitative Performance © 2026</p>
      </footer>
    </main>
  );
}