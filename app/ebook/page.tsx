'use client';
import { useState, useEffect } from 'react';
import { Download, Image as ImageIcon, ArrowLeft, Upload, ChevronRight, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function EbookPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const [images, setImages] = useState<(string | null)[]>([null, null, null]);
  const [metadata, setMetadata] = useState({ title: 'กำลังโหลด...', author: 'AI Storyteller' });
  const [storyContent, setStoryContent] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('my-stories') || '[]');
    if (saved.length > 0) {
      const latest = saved[saved.length - 1];
      setMetadata({ title: latest.title || 'นิทานของฉัน', author: 'AI Storyteller' });
      setStoryContent(latest.content || '');
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[currentPage] = reader.result as string;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  // กำหนดเนื้อหาแต่ละหน้า
  const pages = [
    { title: "คำนำ", content: `นิทานเรื่อง "${metadata.title}" เล่มนี้ จัดทำขึ้นเพื่อสร้างความเพลิดเพลินและเสริมสร้างจินตนาการ หวังว่าผู้อ่านจะได้รับความสุขจากเรื่องราวที่เราตั้งใจสร้างสรรค์ขึ้นมาครับ` },
    { title: "สารบัญ", content: `1. คำนำ ................................. หน้า 1\n2. สารบัญ ............................... หน้า 2\n3. ${metadata.title} ................. หน้า 3` },
    { title: metadata.title, content: storyContent }
  ];

  return (
    <div className="min-h-screen bg-[#F5F5DC] text-stone-800 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6 print:hidden">
          <Link href="/gallery" className="flex items-center gap-2 text-stone-600 font-medium hover:text-stone-900 transition-colors">
            <ArrowLeft size={20} /> กลับคลังนิทาน
          </Link>
          <button onClick={() => window.print()} className="bg-orange-600 text-white px-6 py-2 rounded-full flex items-center gap-2 font-bold shadow-lg">
            <Download size={20} /> บันทึก PDF
          </button>
        </div>

        <div className="bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-sm p-10 md:p-16 border-l-[20px] border-orange-950 min-h-[80vh] relative flex flex-col justify-between">
          <div className="relative z-10">
            <h1 className="text-4xl font-serif font-bold text-stone-900 mb-8 border-b-2 border-orange-50 pb-4">
              {pages[currentPage].title}
            </h1>
            
            <div className="flex flex-col md:flex-row gap-10 items-start">
              <div className="w-full md:w-1/3 flex flex-col gap-4 print:hidden">
                <div className="aspect-square bg-stone-50 rounded border border-stone-100 flex items-center justify-center overflow-hidden shadow-inner">
                  {images[currentPage] ? (
                    <img src={images[currentPage]!} className="w-full h-full object-cover" />
                  ) : (
                    <ImageIcon size={40} className="text-stone-200" />
                  )}
                </div>
                <label className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer text-sm shadow-md">
                  <Upload size={16} /> อัปโหลดรูปหน้า {currentPage + 1}
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              </div>

              <div className="w-full md:w-2/3 prose prose-stone lg:prose-xl italic text-2xl leading-relaxed font-serif whitespace-pre-wrap text-stone-700">
                {pages[currentPage].content}
              </div>
            </div>
          </div>

          <div className="mt-10 flex justify-between items-center border-t border-stone-100 pt-6 text-stone-400 italic">
            <button 
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-2 hover:bg-stone-50 rounded-full disabled:opacity-0 transition-all"
            >
              <ChevronLeft size={30} />
            </button>
            
            <div className="text-center">
              <span className="font-bold text-stone-600 not-italic">หน้า {currentPage + 1}</span>
              <p className="text-xs mt-1">Aurelius AI Studio</p>
            </div>

            <button 
              disabled={currentPage === pages.length - 1}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 hover:bg-stone-50 rounded-full disabled:opacity-0 transition-all"
            >
              <ChevronRight size={30} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}