"use client";

import { useState } from "react";

// สมมติโครงสร้างข้อมูล Assets ของคุณกมสิน
const assets = [
  { id: 1, name: "Neural Link v1", type: "Chip", xp: 500 },
  { id: 2, name: "Cyber Armor", type: "Armor", xp: 1200 },
  { id: 3, name: "Aurelius Core", type: "Power", xp: 3000 },
];

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ จุดที่แก้: สร้างตัวแปร filteredAssets เพื่อให้บรรทัดที่ 96 ไม่ error
  const filteredAssets = assets.filter((asset) =>
    asset.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 bg-[#020205] min-h-screen text-white">
      <h1 className="text-3xl font-bold italic text-[#06b6d4] mb-6">AURELIUS ASSETS</h1>
      
      {/* ส่วน Search */}
      <input
        type="text"
        placeholder="ค้นหาไอเทม..."
        className="bg-[#1e293b] p-2 rounded-lg mb-8 w-full max-w-md"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* บรรทัดที่ 96 ที่เคยมีปัญหา */}
        {filteredAssets.map((asset) => (
          <div key={asset.id} className="p-4 border border-[#1e293b] rounded-2xl hover:border-[#06b6d4] transition-all">
            <h3 className="text-xl font-bold">{asset.name}</h3>
            <p className="text-sm text-gray-400">Type: {asset.type}</p>
            <p className="text-[#f472b6] mt-2">{asset.xp} XP</p>
          </div>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <p className="text-gray-500 mt-4">ไม่พบไอเทมที่คุณค้นหา</p>
      )}

      <footer className="mt-12 text-[10px] text-gray-600">
        Aurelius Studio By komsin
      </footer>
    </div>
  );
}