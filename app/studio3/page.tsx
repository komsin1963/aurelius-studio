"use client";

import { useState } from "react";
import Link from "next/link";

export default function Studio3() {
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // ฟังก์ชันเจนภาพ
  const generateImage = async () => {
    setLoading(true);
    // ตรงนี้คือส่วนเดิมที่คุณใช้เชื่อมต่อกับ Replicate/AI ของคุณ
    // สมมติว่าได้ url กลับมาเป็น output
    const response = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    if (data.url) setImage(data.url);
    setLoading(false);
  };

  // ฟังก์ชันใหม่: ส่งรูปเข้าคลัง Gallery
  const saveToGallery = async () => {
    if (!image) return;
    setSaving(true);
    try {
      const res = await fetch("/api/save-to-gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: image }),
      });
      if (res.ok) {
        alert("บันทึกเข้า Gallery สำเร็จ! ✨");
      }
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการบันทึก");
    }
    setSaving(false);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-cyan-400 tracking-widest">STUDIO 03 / AI GENERATOR</h1>
          <Link href="/" className="text-xs text-gray-500">EXIT</Link>
        </div>

        {/* ส่วนป้อนคำสั่ง */}
        <div className="space-y-4 bg-gray-900/50 p-6 rounded-2xl border border-white/5">
          <textarea 
            className="w-full bg-black border border-gray-800 p-4 rounded-xl text-sm focus:border-cyan-500 outline-none"
            placeholder="อธิบายภาพที่คุณต้องการ..."
            rows={3}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button 
            onClick={generateImage}
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-white hover:text-black text-black font-bold py-3 rounded-xl transition-all"
          >
            {loading ? "กำลังเนรมิตภาพ..." : "GENERATE ARTWORK"}
          </button>
        </div>

        {/* ส่วนแสดงผลและปุ่มเซฟ */}
        {image && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="relative aspect-square rounded-2xl overflow-hidden border-4 border-white/5 shadow-2xl">
              <img src={image} alt="Generated" className="w-full h-full object-cover" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <a href={image} download className="text-center py-4 bg-gray-800 rounded-xl text-sm hover:bg-gray-700">
                DOWNLOAD IMAGE
              </a>
              <button 
                onClick={saveToGallery}
                disabled={saving}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 py-4 rounded-xl text-sm font-bold hover:brightness-125 transition-all shadow-lg"
              >
                {saving ? "กำลังบันทึก..." : "POST TO GALLERY ✨"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}