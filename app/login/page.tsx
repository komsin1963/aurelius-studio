'use client';

import React, { useState } from 'react';
import {
  ShieldCheck, Lock, User, Eye, EyeOff,
  ArrowRight, Cpu
} from 'lucide-react';

export default function AccessGate() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="fixed inset-0 bg-black text-white overflow-hidden font-sans selection:bg-cyan-500/30">

      {/* === VOID BASE (กันพื้นขาว 100%) === */}
      <div className="absolute inset-0 bg-[#020205]" />

      {/* === VIDEO BACKGROUND === */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay loop muted playsInline
          className="w-full h-full object-cover opacity-15 brightness-50 contrast-125"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-blue-and-white-lines-2142-large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark Control Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80" />
      </div>

      {/* === ACCESS CARD === */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="w-full max-w-lg">

          <div className="
            relative overflow-hidden
            bg-black/50 backdrop-blur-2xl
            border border-white/10
            rounded-[3rem]
            p-12
            shadow-[0_40px_120px_rgba(0,0,0,0.9)]
          ">

            {/* HEADER */}
            <div className="text-center mb-12">
              <h1 className="
                text-3xl font-black italic uppercase
                tracking-[0.6em]
                drop-shadow-[0_0_18px_rgba(0,255,255,0.6)]
              ">
                Aurelius <span className="opacity-40 font-light">Access</span>
              </h1>

              <div className="mt-4 flex items-center justify-center gap-3">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#22d3ee]" />
                <span className="text-[10px] tracking-[0.5em] font-mono text-cyan-400 uppercase">
                  Secure_Protocol_Active
                </span>
              </div>
            </div>

            {/* INPUTS */}
            <div className="space-y-7">

              {/* USER */}
              <div>
                <label className="block ml-6 mb-3 text-[9px] tracking-[0.4em] uppercase italic text-slate-400">
                  Identity_Sequence
                </label>
                <div className="relative">
                  <User size={18} className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    className="
                      w-full py-5 pl-16 pr-8 rounded-full
                      bg-black/60
                      border border-white/10
                      text-cyan-100 font-mono text-[13px]
                      placeholder:text-slate-600
                      focus:outline-none
                      focus:border-cyan-400/40
                      focus:ring-1 focus:ring-cyan-500/10
                      transition-all
                    "
                    placeholder="ID_SEQUENCE_REQUIRED"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block ml-6 mb-3 text-[9px] tracking-[0.4em] uppercase italic text-slate-400">
                  Access_Code
                </label>
                <div className="relative">
                  <Lock size={18} className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="
                      w-full py-5 pl-16 pr-20 rounded-full
                      bg-black/60
                      border border-white/10
                      text-cyan-100 font-mono text-[13px]
                      placeholder:text-slate-600
                      focus:outline-none
                      focus:border-cyan-400/40
                      focus:ring-1 focus:ring-cyan-500/10
                      transition-all
                    "
                    placeholder="********"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* ACTION */}
              <button className="
                w-full mt-10 py-6 rounded-full
                bg-cyan-500/10
                border border-cyan-400/40
                text-cyan-300 text-[12px]
                tracking-[0.6em] font-black italic
                hover:bg-cyan-400/20
                hover:shadow-[0_0_40px_rgba(0,255,255,0.45)]
                transition-all duration-700
                relative overflow-hidden
              ">
                <span className="flex items-center justify-center gap-3">
                  INITIALIZE_ACCESS
                  <ArrowRight size={18} />
                </span>
              </button>
            </div>

            {/* FOOTER */}
            <div className="mt-12 pt-8 border-t border-white/10 flex justify-between opacity-40">
              <div className="flex items-center gap-3 text-slate-400">
                <ShieldCheck size={16} />
                <span className="text-[9px] tracking-widest uppercase">
                  Encryption_v8.4
                </span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400">
                <Cpu size={14} />
                <span className="text-[9px] font-mono font-bold">
                  NODE:STABLE
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
