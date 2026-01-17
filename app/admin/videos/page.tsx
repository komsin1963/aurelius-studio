"use client";
export const dynamic = 'force-dynamic';

import { useState } from 'react';

export default function AdminVideos() {
  const [videoUrl, setVideoUrl] = useState("");

  return (
    <div className="min-h-screen bg-[#020205] text-white p-8">
      <h1 className="text-2xl font-bold text-[#f472b6] mb-6">ADMIN: VIDEO CONTROL</h1>
      <div className="bg-[#0a0a0f] p-6 rounded-3xl border border-[#1e293b]">
        <label className="block mb-2 text-sm text-gray-400">Video Link (YouTube/Direct)</label>
        <input 
          type="text" 
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="w-full bg-[#1e293b] p-3 rounded-xl mb-4 border border-transparent focus:border-[#06b6d4] outline-none"
          placeholder="https://..."
        />
        <button className="w-full bg-[#06b6d4] py-3 rounded-xl font-bold hover:bg-[#22d3ee] transition-all">
          UPDATE CONTENT
        </button>
      </div>
      <footer className="mt-12 text-[10px] text-gray-500 text-center">
        Aurelius Studio By komsin
      </footer>
    </div>
  );
}