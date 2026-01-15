import Link from 'next/link';

export default function DesignGallery() {
  // เมื่อคุณกมสินมีรูปงานดีไซน์สวยๆ ให้เอา URL มาใส่ตรงนี้นะครับ
  const designs = [
    { id: 1, title: "Modern Brand Identity", category: "Logo Design", url: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=800" },
    { id: 2, title: "Neon Cyberpunk Poster", category: "AI Art", url: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=800" },
    { id: 3, title: "Minimalist Packaging", category: "Print", url: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6?q=80&w=800" },
  ];

  return (
    <main className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-10">
        
        <header className="flex justify-between items-end border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter">DESIGN SHOWCASE</h1>
            <p className="text-cyan-500 font-mono text-xs mt-2 uppercase tracking-widest">Aurelius Studio Masterpieces</p>
          </div>
          <Link href="/" className="text-xs text-gray-500 hover:text-white transition-colors">BACK HOME</Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designs.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm grayscale hover:grayscale-0 transition-all duration-700 border border-white/5">
                <img src={item.url} alt={item.title} className="object-cover w-full h-full scale-105 group-hover:scale-100 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="border border-white px-4 py-2 text-xs">VIEW PROJECT</span>
                </div>
              </div>
              <div className="mt-4 space-y-1">
                <p className="text-[10px] text-cyan-500 uppercase font-mono">{item.category}</p>
                <h3 className="text-lg font-medium tracking-tight">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}