import { 
  LayoutDashboard, Maximize, Image, Trophy, 
  BookOpen, FileText, Zap, ChevronRight 
} from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#050508] border-r border-white/5 flex flex-col p-6 sticky top-0">
      
      {/* BRANDING */}
      <div className="mb-10 px-2">
        <h2 className="text-xl font-black italic tracking-tighter text-white uppercase">
          Aurelius<span className="text-cyan-500">X</span>
        </h2>
        <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1">
          By Komsin Intelligence
        </p>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-8">
        
        {/* --- STUDIO ZONE --- */}
        <section>
          <h3 className="text-[9px] font-black text-cyan-500/50 uppercase tracking-[0.2em] mb-4 px-2">
            Studio Zone
          </h3>
          <div className="space-y-1">
            <MenuBtn icon={<Maximize size={18}/>} label="Studio 5" sub="AI 8X Upscale" active />
            <MenuBtn icon={<LayoutDashboard size={18}/>} label="Dashboard" sub="Citizen Stats" />
          </div>
        </section>

        {/* --- DISCOVERY ZONE --- */}
        <section>
          <h3 className="text-[9px] font-black text-purple-500/50 uppercase tracking-[0.2em] mb-4 px-2">
            Discovery Zone
          </h3>
          <div className="space-y-1">
            <MenuBtn icon={<Image size={18}/>} label="Gallery" sub="Community Feed" />
            <MenuBtn icon={<Trophy size={18}/>} label="Leaderboard" sub="Top Ranking" />
          </div>
        </section>

        {/* --- LEARNING ZONE --- */}
        <section>
          <h3 className="text-[9px] font-black text-yellow-500/50 uppercase tracking-[0.2em] mb-4 px-2">
            Learning Zone
          </h3>
          <div className="space-y-1">
            <MenuBtn icon={<BookOpen size={18}/>} label="Academy" sub="Mastering AI" />
            <MenuBtn icon={<FileText size={18}/>} label="E-Book" sub="Prompt Secrets" />
          </div>
        </section>

      </div>

      {/* USER STATUS / XP QUICK LOOK */}
      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[9px] font-black text-slate-500 uppercase">Your Balance</span>
            <Zap size={12} className="text-yellow-500" />
          </div>
          <p className="text-lg font-black italic text-white">1,250 <span className="text-[10px] font-normal text-slate-500 italic">XP</span></p>
        </div>
      </div>
    </aside>
  );
}

// Sub-component for Menu Buttons
function MenuBtn({ icon, label, sub, active = false }: { icon: any, label: string, sub: string, active?: boolean }) {
  return (
    <button className={`
      w-full flex items-center gap-4 p-3 rounded-2xl transition-all group
      ${active ? 'bg-cyan-500/10 border border-cyan-500/20' : 'hover:bg-white/5 border border-transparent'}
    `}>
      <div className={`${active ? 'text-cyan-400' : 'text-slate-500 group-hover:text-white'} transition-colors`}>
        {icon}
      </div>
      <div className="text-left">
        <p className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
          {label}
        </p>
        <p className="text-[8px] font-bold text-slate-600 uppercase tracking-tighter">{sub}</p>
      </div>
      {active && <ChevronRight size={14} className="ml-auto text-cyan-500" />}
    </button>
  );
}