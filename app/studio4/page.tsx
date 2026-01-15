'use client';

import { useState, useRef, useEffect } from 'react';
import { Layers, Printer, Percent, ImageIcon, Trash2, Info, Loader2, Cpu } from 'lucide-react';
import Link from 'next/link';

export default function Studio4Page() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentLayer, setCurrentLayer] = useState('original');
  const [dotPercent, setDotPercent] = useState(40);
  const [paperSize, setPaperSize] = useState({ width: 210, height: 297 });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const calculateActualDotSize = () => {
    return Math.max(2, 12 - (dotPercent / 10));
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (red) => {
        setSelectedImage(red.target?.result as string);
        setCurrentLayer('original');
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setSelectedImage(null);
    setCurrentLayer('original');
  };

  const drawRegistrationMark = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x - 25, y); ctx.lineTo(x + 25, y);
    ctx.moveTo(x, y - 25); ctx.lineTo(x, y + 25); ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y, 12, 0, Math.PI * 2); ctx.stroke();
  };

  // แยกฟังก์ชัน Render ออกมาเพื่อเรียกใช้ผ่านปุ่ม Process
  const renderSeparation = () => {
    if (!selectedImage || !canvasRef.current || currentLayer === 'original') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = selectedImage;

    img.onload = () => {
      const actualDot = calculateActualDotSize();
      canvas.width = 1500;
      canvas.height = (paperSize.height / paperSize.width) * 1500;
      
      ctx!.fillStyle = "white";
      ctx!.fillRect(0, 0, canvas.width, canvas.height);

      const margin = 60;
      drawRegistrationMark(ctx!, margin, margin);
      drawRegistrationMark(ctx!, canvas.width - margin, margin);
      drawRegistrationMark(ctx!, margin, canvas.height - margin);
      drawRegistrationMark(ctx!, canvas.width - margin, canvas.height - margin);

      const drawWidth = canvas.width * 0.8;
      const drawHeight = drawWidth / (img.width / img.height);
      const offX = (canvas.width - drawWidth) / 2;
      const offY = (canvas.height - drawHeight) / 2;

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = drawWidth;
      tempCanvas.height = drawHeight;
      const tCtx = tempCanvas.getContext('2d');
      tCtx?.drawImage(img, 0, 0, drawWidth, drawHeight);
      
      const imageData = tCtx?.getImageData(0, 0, drawWidth, drawHeight);
      if (!imageData) return;
      const data = imageData.data;

      for (let y = 0; y < drawHeight; y += actualDot) {
        for (let x = 0; x < drawWidth; x += actualDot) {
          const i = (Math.floor(y) * Math.floor(drawWidth) + Math.floor(x)) * 4;
          const r = data[i]/255, g = data[i+1]/255, b = data[i+2]/255;
          const k = 1 - Math.max(r, g, b);
          
          const intensity = currentLayer === 'cyan' ? (1-r-k)/(1-k)||0 :
                            currentLayer === 'magenta' ? (1-g-k)/(1-k)||0 :
                            currentLayer === 'yellow' ? (1-b-k)/(1-k)||0 : k;

          if (intensity > 0.1) {
            ctx!.beginPath();
            ctx!.arc(x + offX, y + offY, (actualDot/2) * intensity * 1.5, 0, Math.PI * 2);
            ctx!.fillStyle = "black";
            ctx!.fill();
          }
        }
      }
    };
  };

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      renderSeparation();
      setIsProcessing(false);
    }, 800);
  };

  const handlePrint = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL("image/png");
    const printWin = window.open('', '', 'width=1200,height=800');
    printWin?.document.write(`
      <html><body style="margin:0; display:flex; justify-content:center; align-items:center; height:100vh; background:#fff;">
        <img src="${dataUrl}" style="max-width:100%; max-height:100%;">
        <script>window.onload = function() { window.print(); window.close(); }</script>
      </body></html>`);
    printWin?.document.close();
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-10 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-900/40"><Layers size={24} /></div>
            <div>
              <h1 className="text-xl font-black italic uppercase text-white tracking-tight">Aurelius Separation Pro</h1>
              <p className="text-[10px] text-indigo-400 font-bold tracking-[0.2em]">Studio 04 / BY_KOMSIN</p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <button onClick={() => setShowManual(!showManual)} className="text-slate-400 hover:text-indigo-400 transition-colors">
              <Info size={20} />
            </button>
            <Link href="/" className="bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all">Exit</Link>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Controls */}
          <div className="lg:col-span-4 space-y-5">
            
            {/* 1. Size Control */}
            <section className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
              <label className="text-[10px] font-black uppercase text-indigo-400 mb-4 block tracking-widest text-center">Output Size (mm)</label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <span className="text-[8px] text-slate-500 uppercase font-bold ml-1">Width</span>
                    <input type="number" value={paperSize.width} onChange={(e)=>setPaperSize({...paperSize, width: Number(e.target.value)})} className="w-full bg-slate-800 rounded-xl p-3 text-center font-bold text-white border border-slate-700 focus:ring-1 ring-indigo-500" />
                </div>
                <div className="space-y-1">
                    <span className="text-[8px] text-slate-500 uppercase font-bold ml-1">Height</span>
                    <input type="number" value={paperSize.height} onChange={(e)=>setPaperSize({...paperSize, height: Number(e.target.value)})} className="w-full bg-slate-800 rounded-xl p-3 text-center font-bold text-white border border-slate-700 focus:ring-1 ring-indigo-500" />
                </div>
              </div>
            </section>

            {/* 2. Image Upload */}
            <section className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
                {!selectedImage ? (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-xl p-6 cursor-pointer hover:border-indigo-500 transition-colors">
                        <ImageIcon className="text-slate-600 mb-2" />
                        <span className="text-[10px] font-black uppercase text-slate-400">Upload Source</span>
                        <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                    </label>
                ) : (
                    <div className="flex items-center justify-between bg-slate-800 p-3 rounded-xl border border-slate-700">
                        <span className="text-xs font-bold text-indigo-300 truncate max-w-[150px]">Source Loaded</span>
                        <button onClick={clearImage} className="text-red-400 hover:bg-red-950/30 p-2 rounded-lg"><Trash2 size={16} /></button>
                    </div>
                )}
            </section>

            {/* 3. Color Selection */}
            <section className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl">
              <label className="text-[10px] font-black uppercase text-indigo-400 mb-4 block tracking-widest">Select Color Film</label>
              <div className="grid grid-cols-2 gap-2">
                {['Original', 'Cyan', 'Magenta', 'Yellow', 'Black'].map((c) => (
                  <button key={c} onClick={() => setCurrentLayer(c.toLowerCase())} className={`p-3 rounded-xl text-[10px] font-black uppercase border transition-all ${currentLayer === c.toLowerCase() ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-white'}`}>{c}</button>
                ))}
              </div>
            </section>

            {/* 4. Dot Control */}
            <section className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl shadow-inner">
              <div className="flex justify-between items-center mb-4">
                <label className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">Dot Density</label>
                <span className="text-sm font-black text-white px-2 py-1 bg-indigo-600 rounded">{dotPercent}%</span>
              </div>
              <input type="range" min="10" max="100" value={dotPercent} onChange={(e)=>setDotPercent(parseInt(e.target.value))} className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
            </section>

            {/* ACTION BUTTONS */}
            <div className="space-y-3 pt-4">
                <button 
                    onClick={handleProcess}
                    disabled={!selectedImage || currentLayer === 'original' || isProcessing}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-2 transition-all"
                >
                    {isProcessing ? <Loader2 className="animate-spin" size={18} /> : <Cpu size={18} />}
                    {isProcessing ? 'Processing...' : 'Initialize Process Film'}
                </button>

                <button 
                    onClick={handlePrint} 
                    disabled={currentLayer === 'original' || !selectedImage || isProcessing} 
                    className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-30 text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all"
                >
                    <Printer size={18} /> Print Film (PDF)
                </button>
            </div>
          </div>

          {/* Canvas Display */}
          <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-[2rem] p-6 min-h-[700px] flex items-center justify-center relative shadow-2xl overflow-hidden group">
            {showManual && (
                <div className="absolute inset-0 z-50 bg-slate-950/95 p-10 overflow-y-auto border border-indigo-500/30 rounded-[2rem]">
                    <div className="max-w-2xl mx-auto space-y-6 text-slate-300">
                        <h2 className="text-2xl font-black text-indigo-400 italic">SEPARATION PROTOCOL</h2>
                        <div className="space-y-4">
                            <p className="text-xs leading-relaxed"><b className="text-white">01. SOURCE:</b> อัปโหลดภาพความละเอียดสูง (แนะนำ 300 DPI) เพื่อความคมชัดของเม็ดสกรีน</p>
                            <p className="text-xs leading-relaxed"><b className="text-white">02. DENSITY:</b> 10-40% สำหรับงาน Streetwear เม็ดใหญ่ / 50-80% สำหรับงานมาตรฐาน / 90%+ สำหรับงานพรีเมียม</p>
                            <p className="text-xs leading-relaxed"><b className="text-white">03. PROCESS:</b> เมื่อเลือกสีที่ต้องการแล้ว ต้องกด <span className="text-indigo-400 font-bold">"INITIALIZE PROCESS"</span> ทุกครั้งเพื่อให้ AI คำนวณเม็ดสกรีนใหม่</p>
                            <p className="text-xs leading-relaxed"><b className="text-white">04. ALIGNMENT:</b> ระบบจะแทรกกากบาทเล็งตำแหน่ง (Registration Marks) ให้อัตโนมัติที่มุมฟิล์ม</p>
                        </div>
                        <button onClick={() => setShowManual(false)} className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-widest">Close Manual</button>
                    </div>
                </div>
            )}

            {!selectedImage ? (
              <div className="text-center opacity-20">
                <div className="relative inline-block">
                    <ImageIcon size={100} className="mx-auto text-slate-700" />
                    <div className="absolute inset-0 animate-pulse border-2 border-indigo-500 rounded-full scale-150 opacity-20"></div>
                </div>
                <p className="font-black uppercase text-[10px] tracking-[0.5em] mt-10 text-slate-500">Waiting for Data Source...</p>
              </div>
            ) : (
              <div className="relative animate-in fade-in zoom-in duration-500 h-full w-full flex items-center justify-center">
                {currentLayer === 'original' ? (
                  <img src={selectedImage} className="max-h-[600px] shadow-2xl rounded-lg border border-slate-700" alt="Original" />
                ) : (
                  <canvas ref={canvasRef} className="max-h-[650px] shadow-2xl bg-white rounded-sm border-[12px] border-slate-800" />
                )}
                {isProcessing && (
                    <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm flex flex-col items-center justify-center rounded-[2rem]">
                        <Loader2 className="animate-spin text-indigo-500 mb-4" size={40} />
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Neural Separation in Progress</p>
                    </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}