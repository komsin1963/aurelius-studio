"use client"
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar() {
  const pathname = usePathname()
  const menuItems = [
    { name: 'Main Vault', path: '/studio-pod/portfolio', icon: '💰', color: 'emerald' },
    { name: 'Art Studio', path: '/studio-pod/art', icon: '🤖', color: 'emerald' },
    { name: 'Tale Studio', path: '/studio-pod/tale', icon: '📚', color: 'purple' },
  ]

  return (
    <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50">
      <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-3 rounded-[2.5rem] flex flex-col gap-4 shadow-2xl">
        <div className="w-12 h-12 flex items-center justify-center text-[10px] font-black bg-emerald-500 rounded-2xl mb-4 text-black italic">
          AX
        </div>
        {menuItems.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link key={item.path} href={item.path} className="relative group">
              <div className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${isActive ? 'bg-emerald-500/10 border border-emerald-500/30 text-white' : 'text-gray-500 hover:bg-white/5'}`}>
                <span className="text-xl">{item.icon}</span>
                {isActive && <div className={`absolute inset-0 rounded-2xl blur-md -z-10 opacity-40 bg-emerald-500`}></div>}
              </div>
              <div className="absolute left-full ml-4 px-3 py-1 bg-black border border-emerald-500/20 text-[9px] text-emerald-500 uppercase font-black tracking-widest rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {item.name}
              </div>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}