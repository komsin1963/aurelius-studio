"use client"
import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ArtStudio() {
  // ปรับยอดเริ่มต้นเป็น 10 ตามที่คุณคมศิลป์ต้องการ
  const [liquidity, setLiquidity] = useState<number>(10.00) 
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchSentinel() {
      const { data } = await supabase
        .from('profiles')
        .select('credits_thb')
        .single()
      
      // ถ้าใน Database มีข้อมูลให้ใช้ตามนั้น แต่ถ้าไม่มีให้ Default ที่ 10
      if (data) {
        setLiquidity(data.credits_thb)
      } else {
        setLiquidity(10.00) 
      }
      setLoading(false)
    }
    fetchSentinel()
  }, [])

  // สูตรคำนวณใหม่: $10 = 100 XP
  const convertedXP = liquidity * 10

  return (
    <main className="max-w-6xl mx-auto p-8">
      <div className="grid lg:grid-cols-3 gap-8 mt-10">
        
        {/* --- กล่อง Sentinel Liquidity $10 --- */}
        <div className="bg-gradient-to-b from-[#0A0A0A] to-black border border-cyan-500/30 rounded-[2.5rem] p-8 shadow-[0_0_40px_rgba(6,182,212,0.15)] relative group">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-[10px] text-cyan-500 uppercase tracking-[0.4em] font-black">Sentinel Liquidity</p>
              <h3 className="text-[9px] text-gray-600 italic mt-1">Status: Operational</h3>
            </div>
            <div className="text-cyan-500 animate-pulse text-xl">⚡</div>
          </div>

          <div className="space-y-8">
            {/* ส่วนแสดงเงินดอลลาร์ */}
            <div>
              <p className="text-[10px] text-gray-500 uppercase mb-1">System Balance</p>
              <p className="text-4xl font-mono font-bold text-white tracking-tighter">
                ${liquidity.toFixed(2)}
              </p>
            </div>

            {/* ส่วนแสดงพลังงาน XP (100 XP) */}
            <div className="p-5 bg-cyan-500/5 rounded-3xl border border-cyan-500/10">
              <p className="text-[10px] text-cyan-400 uppercase mb-2 font-bold tracking-widest">Converted Power</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-mono font-black text-cyan-400">
                  {convertedXP.toFixed(0)}
                </span>
                <span className="text-sm text-cyan-700 font-bold uppercase">XP</span>
              </div>
              
              {/* Progress Bar เต็ม 100% สำหรับ $10 */}
              <div className="h-1.5 w-full bg-gray-900 mt-4 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4] w-full"></div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-900 text-center">
             <p className="text-[10px] text-gray-600 uppercase tracking-widest">By komsin • Protocol v2.0</p>
          </div>
        </div>

        {/* --- พื้นที่แสดงผล Machine (ด้านขวา) --- */}
        <div className="lg:col-span-2 bg-[#050505] border border-gray-900 rounded-[2.5rem] p-10 flex flex-col items-center justify-center border-dashed">
            <div className="text-center space-y-4">
               <div className="text-6xl mb-4">🤖</div>
               <h3 className="text-xl font-bold text-gray-400 uppercase tracking-tighter">Machine Ready</h3>
               <p className="text-gray-600 text-sm italic max-w-xs mx-auto">"ใช้พลังงานจาก 100 XP ในการปลุกวิญญาณหุ่นยนต์ของคุณ"</p>
            </div>
        </div>

      </div>
    </main>
  )
}