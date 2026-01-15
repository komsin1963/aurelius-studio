import { kv } from '@vercel/kv';
import Link from 'next/link';

export default async function DesignGallery() {
  // ดึงข้อมูลรูปทั้งหมดจาก KV Database (ดึงจากใหม่ไปเก่า)
  const designs: any[] = await kv.lrange('gallery_items', 0, -1) || [];

  return (
    <main className="min-h-screen bg-black text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-10">
        <header className="flex justify-between items-end border-b border-white/10 pb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tighter text-cyan-400 uppercase">Design Gallery</h1>
            <p className="text-gray-500 font-mono text-[10px] mt-2 uppercase tracking-[0.3em]">By Komsin - Aurelius Studio</p>
          </div>
          <Link href="/" className="text-xs text-gray-500 hover:text-white transition-all">BACK HOME</Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designs.length > 0 ? designs.map((item) => (
            <div key={item.id} className="group">
              <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 shadow-2xl">
                <img src={item.url} alt={item.title} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="mt-4">
                <p className="text-[10px] text-cyan-500 uppercase font-mono tracking-widest">{item.category}</p>
                <h3 className="text-lg font-medium text-gray-200">{item.title}</h3>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-20 text-center border border-dashed border-gray-800 rounded-2xl">
              <p className="text-gray-600 italic">ยังไม่มีผลงานในคลัง... ไปสร้างภาพที่ Studio 3 แล้วกดเซฟได้เลย!</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}