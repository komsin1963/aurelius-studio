import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  BookOpen, 
  PlayCircle, 
  Trophy, 
  Settings, 
  ShieldCheck 
} from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: 'Command Center', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Knowledge Vault', href: '/ebook', icon: BookOpen },    // หน้า E-book
    { name: 'Neural Academy', href: '/academy', icon: PlayCircle }, // หน้า Video
    { name: 'Leaderboard', href: '/leaderboard', icon: Trophy },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-[#050508] border-r border-white/5 flex flex-col p-6 z-50">
      {/* Brand Logo - By komsin */}
      <div className="mb-12 px-2">
        <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase">
          Aurelius<span className="text-cyan-500">X</span>
        </h2>
        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mt-1">
          By komsin intelligence
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-grow space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`
                flex items-center gap-4 px-4 py-4 rounded-2xl font-black uppercase italic text-[11px] tracking-widest transition-all
                ${isActive 
                  ? 'bg-cyan-500/10 text-cyan-500 border border-cyan-500/20' 
                  : 'text-slate-500 hover:bg-white/5 hover:text-white'
                }
              `}
            >
              <item.icon size={18} strokeWidth={2.5} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Admin Quick Link (เฉพาะเมื่อเป็นคุณกมสิน) */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <Link 
          href="/admin/ebooks"
          className="flex items-center gap-4 px-4 py-4 rounded-2xl text-slate-600 hover:text-yellow-500 transition-colors font-black uppercase italic text-[10px]"
        >
          <ShieldCheck size={18} />
          System Control
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;