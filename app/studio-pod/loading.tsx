"use client"
import React from 'react'

export default function StudioLoading() {
  return (
    <div className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center">
      
      {/* Container สำหรับ Logo AX */}
      <div className="relative">
        {/* แสง Glow รอบโลโก้ */}
        <div className="absolute inset-0 bg-cyan-500 blur-[60px] opacity-20 animate-pulse"></div>
        
        {/* โลโก้ AX หมุนๆ */}
        <div className="relative w-24 h-24 border-2 border-cyan-500/20 rounded-[2rem] flex items-center justify-center overflow-hidden">
          <span className="text-4xl font-black italic tracking-tighter text-white z-10">AX</span>
          
          {/* เส้นวิ่งรอบวง (Scanning Line) */}
          <div className="absolute inset-0 border-t-2 border-cyan-500 shadow-[0_0_15px_#06b6d4] animate-spin"></div>
        </div>
      </div>

      {/* ข้อความสถานะด้านล่าง */}
      <div className="mt-8 text-center">
        <p className="text-[10px] text-cyan-500 font-bold uppercase tracking-[0.5em] animate-pulse">
          Connecting to Sentinel
        </p>
        <p className="text-[8px] text-gray-700 mt-2 uppercase tracking-widest italic">
          By komsin • komsin.com
        </p>
      </div>

      {/* บาร์โหลดด้านล่าง (Progress Bar จำลอง) */}
      <div className="mt-6 w-48 h-[1px] bg-gray-900 overflow-hidden rounded-full">
        <div className="h-full bg-cyan-500 w-full -translate-x-full animate-[loading_1.5s_infinite]"></div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}