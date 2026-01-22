"use client"
import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TaleStudioPage() {
  // ปรับยอด Default เป็น $10 ตามมาตรฐานใหม่ของคุณคมศิลป์
  const [credits, setCredits] = useState<number>(10.00)
  const [userXp, setUserXp] = useState<number>(0)

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('profiles')
        .select('credits_thb, xp_points')
        .single()
      
      if (data) {
        setCredits(data.credits_thb)
        setUserXp(data.xp_points)
      }
    }
    fetchData()
  }, [])

  // สูตรคำนวณ: $10 = 100 XP
  const convertedXp = credits * 10

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-10">
      
      {/* 1. Tale Production Interface */}
      <section className="bg-[#0A0A0A] border border-gray-800 p-8 rounded-[3rem] shadow-2xl border-t-purple-500/30">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">
            Tale <span className="text-purple-500">SaaS</span>
          </h2>
          <span className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">By komsin</span>
        </div>
        
        <textarea 
          placeholder="ร่างพล็อตนิทานของคุณ..."
          className="w-full h-44 bg-black/40 border border-gray-900 rounded-3xl p-6 text-lg focus:border-purple-500 outline-none transition-all text-gray-300 mb-6"
        />
        
        <button className="w-full py-5 bg-gradient-to-r from-purple-700 to-purple-600 text-white rounded-2xl font-black text-lg hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all active:scale-[0.98]">
          GENERATE STORY ASSETS
        </button>
      </section>

      {/* 2. Sentinel Dashboard (Converted Stats) */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* กล่อง Credit ($10) */}
        <div className="bg-[#050505] border border-gray-900 p-8 rounded-[2.5rem] relative group overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
            <span className="text-5xl font-black text-white">$</span>
          </div>
          <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] mb-2 font-bold">System Liquidity</p>
          <p className="text-4xl font-mono font-bold text-white tracking-tighter">${credits.toFixed(2)}</p>
          <div className="mt-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] text-gray-600 uppercase">Sentinel Link Active</span>
          </div>
        </div>

        {/* กล่อง XP (100 XP) */}
        <div className="bg-gradient-to-br from-[#08181a] to-black border border-cyan-500/20 p-8 rounded-[2.5rem] relative group overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-125 transition-transform">
             <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-cyan-500">
                <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
             </svg>
          </div>
          <p className="text-[10px] text-cyan-500 uppercase tracking-[0.3em] mb-2 font-bold">Experience Power</p>
          <div className="flex items-baseline gap-2">
            <p className="text-4xl font-mono font-bold text-white tracking-tighter">
              {convertedXp.toFixed(0)}
            </p>
            <span className="text-sm text-cyan-700 font-black uppercase">XP</span>
          </div>
          <div className="h-1.5 w-full bg-gray-900 mt-5 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 w-full shadow-[0_0_15px_#06b6d4]"></div>
          </div>
        </div>

      </div>

      {/* Protocol Label */}
      <footer className="text-center">
        <p className="text-[9px] text-gray-700 uppercase tracking-[0.5em] font-medium">
          komsin.com Infrastructure • 10 XP / 1 USD Rate
        </p>
      </footer>
    </div>
  )
}