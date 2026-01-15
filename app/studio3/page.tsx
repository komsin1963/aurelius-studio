"use client";
import React, { useState } from 'react';

export default function Studio3Page() {
  const [promptText, setPromptText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedStyle, setSelectedStyle] = useState('Poster'); // ค่าเริ่มต้น
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: promptText, style: selectedStyle }),
      });
      const data = await res.json();
      if (data.url) setImageUrl(data.url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* --- ส่วนเลือกไอคอนสไตล์ --- */}
      <div className="flex justify-center gap-8 mb-10">
        {['T-Shirt', 'Logo', 'Poster', 'Social'].map((style) => (
          <button 
            key={style}
            onClick={() => setSelectedStyle(style)}
            className={`p-4 rounded-xl transition-all ${selectedStyle === style ? 'bg-pink-600 scale-110 shadow-[0_0_20px_rgba(219,39,119,0.5)]' : 'bg-gray-800 opacity-50'}`}
          >
            <span className="block text-xs font-bold mt-1">{style}</span>
          </button>
        ))}
      </div>

      {/* --- ส่วนแสดงผล LIVE MOCKUP PREVIEW --- */}
      <div className="relative flex items-center justify-center w-full h-[550px] bg-[#0a0a0a] rounded-3xl border border-gray-800 shadow-inner overflow-hidden">
        
        {/* Loading State */}
        {isLoading && <div className="absolute z-50 animate-spin rounded-full h-12 w-12 border-t-2 border-pink-500"></div>}

        {/* 1. Mockup เสื้อยืด */}
        {selectedStyle === 'T-Shirt' && (
          <div className="relative flex items-center justify-center">
            <img src="https://www.freeiconspng.com/thumbs/t-shirt-png/blank-t-shirt-png-8.png" className="w-[450px] opacity-80" />
            {imageUrl && (
              <img src={imageUrl} className="absolute w-[160px] h-[160px] top-[140px] mix-blend-multiply opacity-90" />
            )}
          </div>
        )}

        {/* 2. Mockup โปสเตอร์ (ใส่กรอบรูปหรู) */}
        {selectedStyle === 'Poster' && (
          <div className="relative p-6 bg-black border-[16px] border-[#1a1a1a] shadow-2xl">
            {imageUrl ? (
              <img src={imageUrl} className="w-[300px] h-[420px] object-cover" />
            ) : (
              <div className="w-[300px] h-[420px] bg-gray-900 flex items-center justify-center text-gray-700">Waiting for Art...</div>
            )}
          </div>
        )}

        {/* 3. Mockup Logo & Social */}
        {(selectedStyle === 'Logo' || selectedStyle === 'Social') && (
          <div className={`relative p-2 bg-white shadow-2xl ${selectedStyle === 'Logo' ? 'rounded-full' : 'rounded-lg'}`}>
            {imageUrl ? (
              <img src={imageUrl} className={`w-[350px] h-[350px] object-cover ${selectedStyle === 'Logo' ? 'rounded-full' : 'rounded-lg'}`} />
            ) : (
              <div className="w-[350px] h-[350px] bg-gray-100" />
            )}
          </div>
        )}
      </div>

      {/* --- ส่วนควบคุมด้านล่าง --- */}
      <div className="max-w-2xl mx-auto mt-10 space-y-4">
        <input 
          value={promptText}
          onChange={(e) => setPromptText(e.target.value)}
          placeholder={`Describe your ${selectedStyle} design...`}
          className="w-full p-4 bg-gray-900 rounded-lg border border-gray-700 focus:border-pink-500 outline-none"
        />
        <button 
          onClick={handleGenerate}
          disabled={isLoading}
          className="w-full py-4 bg-white text-black font-black rounded-lg hover:bg-pink-500 hover:text-white transition-colors"
        >
          {isLoading ? 'GENERATING...' : 'EXECUTE_GENERATION'}
        </button>
      </div>
    </div>
  );
}