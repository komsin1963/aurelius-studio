import { kv } from '@vercel/kv';
import Link from 'next/link';

export default async function DesignGallery() {
  // ดึงข้อมูลจาก KV
  const designs: any[] = await kv.lrange('gallery_items', 0, -1) || [];

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 md:py-20">
        
        {/* Header ส่วนหัวที่หรูหรา */}
        <header className="flex flex-col md:flex-row justify-between items-center md:items-end border-b border-white/5 pb-12 mb-16 space-y-6 md:space-y-0">
          <div className="text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-black tracking-[0.15em] bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-400 to-gray-600 uppercase">
              Masterworks
            </h1>
            <p className="text-cyan-500 font-mono text-[10px] mt-4 uppercase tracking-[0.5em] font-semibold">
              The Digital Archive / By Komsin
            </p>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/" className="group flex items-center gap-2 text-[10px] tracking-[0.3em] text-gray-500 hover:text-white transition-all">
              <span className="w-8 h-[1px] bg-gray-800 group-hover:w-12 group-hover:bg-cyan-500 transition-all"></span>
              EXIT STUDIO
            </Link>
          </div>
        </header>

        {/* Gallery Grid */}
        {designs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
            {designs.map((item, index) => (
              <div key={item.id} className="group relative">
                {/* Image Frame */}
                <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 rounded-sm ring-1 ring-white/10 transition-all duration-700 group-hover:ring-cyan-500/50 group-hover:shadow-[0_0_50px_rgba(6,182,212,0.15)]">
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="object-cover w-full h-full transition-transform duration-[1.5s] ease-out group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                  />
                  
                  {/* Overlay Info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                    <span className="text-cyan-400 font-mono text-[9px] mb-2 tracking-[0.2em]">COLLECTION #00{designs.length - index}</span>
                    <button className="text-white border border-white/20 bg-white/5 backdrop-blur-md px-4 py-2 text-[10px] tracking-widest hover:bg-white hover:text-black transition-all">
                      VIEW FULL DETAILS
                    </button>
                  </div>
                </div>

                {/* Caption (ให้ฟีลงานศิลปะใน Gallery จริง) */}
                <div className="mt-6 space-y-2 px-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-light tracking-tight text-gray-200 group-hover:text-white transition-colors uppercase">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-gray-600 font-mono uppercase tracking-widest border-t border-white/5 pt-2">
                    <span>Artist: Komsin</span>
                    <span>{new Date(item.createdAt || Date.now()).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-96 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-3xl">
            <p className="text-gray-600 font-mono text-xs tracking-[0.3em] animate-pulse">Waiting for your first creation...</p>
            <Link href="/studio3" className="mt-6 text-cyan-500 text-[10px] border border-cyan-500/30 px-6 py-2 hover:bg-cyan-500 hover:text-black transition-all">
              GO TO STUDIO 03
            </Link>
          </div>
        )}

        {/* Footer ของหน้า Gallery */}
        <footer className="mt-32 pt-12 border-t border-white/5 text-center">
          <p className="text-[9px] text-gray-700 tracking-[1em] uppercase">
            Aurelius Studio &copy; 2026 Crafted for Excellence
          </p>
        </footer>
      </div>
    </main>
  );
}