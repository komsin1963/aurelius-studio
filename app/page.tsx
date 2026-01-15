import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4 font-sans overflow-hidden">
      
      {/* เอฟเฟกต์แสงนีออนพื้นหลัง */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/10 blur-[150px] rounded-full"></div>
      
      <div className="z-10 text-center space-y-12 w-full max-w-2xl">
        
        {/* Slogan */}
        <p className="text-cyan-400 tracking-[0.4em] font-light text-[10px] uppercase animate-pulse">
          Hello Creator
        </p>

        {/* Branding Box */}
        <div className="relative inline-block group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative px-8 py-10 bg-black ring-1 ring-white/10 rounded-2xl border border-cyan-500/20">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 uppercase">
              AURELIUS
            </h1>
            <p className="mt-2 text-gray-400 text-lg tracking-[0.3em] font-light italic">By Komsin</p>
          </div>
        </div>

        {/* สโลแกน */}
        <p className="text-gray-500 text-sm tracking-wide">
          “ นวัตกรรมงานพิมพ์ และจินตนาการจาก AI ”
        </p>

        {/* 3 Main Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
          
          {/* ปุ่ม 1: Studio 3 (AI) */}
          <Link href="/studio3" className="group relative px-4 py-5 bg-cyan-500 text-black font-bold rounded-xl hover:bg-white transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_20px_rgba(6,182,212,0.3)] text-center">
            <span className="block text-[9px] opacity-70">AI CREATOR</span>
            STUDIO 3
          </Link>

          {/* ปุ่ม 2: Studio 4 (แยกสี) */}
          <Link href="/studio4" className="group px-4 py-5 border border-cyan-500/50 text-cyan-400 font-bold rounded-xl hover:bg-cyan-500 hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-center">
            <span className="block text-[9px] opacity-70">SEPARATION</span>
            STUDIO 4
          </Link>

          {/* ปุ่ม 3: Design Gallery (โชว์งานออกแบบ) */}
          <Link href="/design-gallery" className="group px-4 py-5 border border-gray-700 text-gray-400 font-bold rounded-xl hover:bg-white hover:text-black transition-all duration-300 transform hover:-translate-y-1 text-center">
            <span className="block text-[9px] opacity-70">SHOWCASE</span>
            DESIGN GALLERY
          </Link>

        </div>

        <footer className="pt-16 text-[9px] text-gray-700 uppercase tracking-[0.5em]">
          komsin.com • 2026
        </footer>
      </div>
    </main>
  );
}