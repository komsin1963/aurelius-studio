"use client"
import React from 'react'
import Sidebar from '../components/Sidebar'

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      <Sidebar />

      <main className="pl-24 pr-8 min-h-screen flex flex-col relative z-10 font-sans">
        
        {/* --- MINIMALIST HEADER --- */}
        <header className="w-full max-w-[1600px] mx-auto pt-14 pb-8 flex justify-between items-end border-b border-white/5">
          <div className="flex flex-col leading-none">
            <h1 className="text-5xl font-black italic tracking-tighter text-white uppercase">
              Aurelius<span className="text-cyan-500">X</span>
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-[1px] w-4 bg-cyan-500/50"></div>
              <p className="text-[11px] font-bold tracking-[0.6em] text-gray-500 uppercase">
                komsin.com
              </p>
            </div>
          </div>

          <div className="text-right pb-1">
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-md border border-white/5">
              <div className="w-1.5 h-1.5 bg-[#00D88B] rounded-full animate-pulse"></div>
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-gray-400">Sentinel Active</span>
            </div>
          </div>
        </header>

        {/* --- MAIN CONTENT AREA --- */}
        <div className="flex-grow max-w-[1600px] w-full mx-auto py-12">
          {children}
        </div>

        {/* --- GLOBAL BASELINE FOOTER --- */}
        <footer className="w-full max-w-[1600px] mx-auto py-10 border-t border-white/5 flex justify-center items-center">
          <p className="text-[10px] font-black uppercase tracking-[0.6em] italic text-gray-700">
            BY KOMSIN • SENTINEL PROTOCOL
          </p>
        </footer>
      </main>
    </div>
  )
}