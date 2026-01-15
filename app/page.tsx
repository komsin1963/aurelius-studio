import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4 font-sans overflow-hidden">
      
      {/* เอฟเฟกต์แสงพื้นหลัง */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 blur-[150px] rounded-full"></div>
      
      <div className="z-10 text-center space-y-12">
        
        {/* Slogan ด้านบน */}
        <p className="text-cyan-400 tracking-[0.5em] font-light text-[10px] md:text-xs animate-pulse uppercase">
          Hello Creator
        </p>

        {/* กล่องชื่อ Aurelius Studio ล้อมรอบด้วยนีออน */}
        <div className="relative inline-block group cursor-default">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-60 transition duration-1000"></div>
          <div className="relative px-10 py-12 bg-black ring-1 ring-white/10 rounded-2xl border border-cyan-500/20 shadow-2xl">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500">
              AURELIUS
            </h1>
            <div className="mt-4 h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
            <p className="mt-4 text-gray-400 text-lg md:text-xl font-light tracking-[0.3em]">STUDIO</p>
          </div>
        </div>

        {/* Branding ผู้สร้าง */}
        <div className="space-y-3">
          <p className="text-white/90 text-xl font-medium tracking-tight">BY KOMSIN</p>
          <div className="flex items-center justify-center gap-2">
             <span className="h-[1px] w-8 bg-gray-800"></span>
             <p className="text-gray-500 text-sm italic">ผู้สร้างสรรค์จินตนาการสู่โลกแห่งความจริง</p>
             <span className="h-[1px] w-8 bg-gray-800"></span>
          </div>
        </div>

        {/* ปุ่มเลือกเข้า Studio */}
        <div className="flex flex-col md:flex-row gap-6 justify-center pt-10">
          <Link href="/studio3" className="group relative px-12 py-4 bg-cyan-500 text-black font-bold rounded-full hover:bg-white transition-all duration-500 transform hover:scale-105 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
            เข้าสู่ STUDIO 3
          </Link>
          <Link href="/studio4" className="px-12 py-4 bg-transparent border border-gray-700 text-gray-400 font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300">
            GALLERY
          </Link>
        </div>

        <footer className="pt-20 text-[9px] text-gray-700 uppercase tracking-widest">
          &copy; 2026 Aurelius Studio • komsin.com
        </footer>
      </div>
    </main>
  );
}