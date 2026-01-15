import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4 font-sans selection:bg-cyan-500">
      
      {/* เอฟเฟกต์แสงพื้นหลัง (Glow Background) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-64 h-64 bg-cyan-600/20 blur-[120px] rounded-full"></div>
      
      <div className="z-10 text-center space-y-8">
        
        {/* หัวข้อสโลแกน */}
        <p className="text-cyan-400 tracking-[0.3em] font-medium text-sm animate-pulse">
          HELLO CREATOR
        </p>

        {/* กล่องชื่อพร้อมนีออนล้อมรอบ */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative px-8 py-6 bg-black ring-1 ring-cyan-500/50 rounded-lg leading-none flex flex-col items-center space-y-2">
            <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              Aurelius Studio
            </h1>
            <p className="text-gray-400 text-lg italic">By Komsin</p>
          </div>
        </div>

        {/* สโลแกน ผู้สร้าง */}
        <p className="text-gray-500 text-sm md:text-base">
          “ พลังแห่งการสรรค์สร้างในมือคุณ ”
        </p>

        {/* ปุ่มเลือก Studio */}
        <div className="flex flex-col md:flex-row gap-4 justify-center pt-4">
          <Link href="/studio3" className="group relative px-8 py-3 font-semibold text-black transition-all duration-300">
            <span className="absolute inset-0 w-full h-full bg-cyan-400 rounded-full group-hover:bg-white"></span>
            <span className="relative">ไปที่ Studio 3</span>
          </Link>
          
          <Link href="/studio4" className="px-8 py-3 font-semibold border border-gray-700 rounded-full hover:bg-gray-800 transition-all text-gray-300">
            เข้าสู่ Studio 4
          </Link>
        </div>

        <footer className="pt-12 text-[10px] text-gray-600 uppercase tracking-widest">
          Powered by Next.js & Vercel
        </footer>
      </div>
    </main>
  );
}