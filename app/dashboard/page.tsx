'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, Settings, X, LayoutGrid, Box, Layers, Zap, Mic2, 
  Sparkles, Megaphone, ShieldCheck, UserPlus, LogIn, Save, Edit3, Activity, Image as ImageIcon, Trash2,
  MessageSquare, Send, Facebook, Twitter, Instagram, Youtube, Linkedin
} from 'lucide-react';

export default function AureliusCyberHub() {
  const [announcement, setAnnouncement] = useState("AURELIUS_SYSTEM_STABLE: พร้อมสำหรับการเชื่อมต่อเข้าสู่ Digital Hub... ทุกระบบกำลังทำงานภายใต้โหมดความปลอดภัยสูงสุด");
  const [announcementImage, setAnnouncementImage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [time, setTime] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string; }[]>([
    { sender: 'AI', text: "สวัสดีครับ ผมคือ AI ผู้ช่วยประจำ AURELIUS STUDIO มีอะไรให้ผมช่วยจัดการระบบในวันนี้ไหมครับ?" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const chatMessagesRef = useRef<HTMLDivElement>(null); // Ref สำหรับ scroll chat

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight; // Auto-scroll chat
    }
  }, [chatMessages]);

  const menuItems = [
    { icon: <Cpu size={18} />, label: 'CORE' },
    { icon: <Box size={18} />, label: 'ASSET' },
    { icon: <Zap size={18} />, label: 'FX' },
    { icon: <Mic2 size={18} />, label: 'AUDIO' },
    { icon: <Sparkles size={18} />, label: 'AI' },
    { icon: <Layers size={18} />, label: 'RENDER' },
  ];

  const socialMediaLinks = [
    { icon: <Facebook size={16} />, href: "#" },
    { icon: <Twitter size={16} />, href: "#" },
    { icon: <Instagram size={16} />, href: "#" },
    { icon: <Youtube size={16} />, href: "#" },
    { icon: <Linkedin size={16} />, href: "#" },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAnnouncementImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setAnnouncementImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleChatSubmit = () => {
    if (chatInput.trim()) {
      setChatMessages((prev) => [...prev, { sender: 'User', text: chatInput }]);
      // Simulate AI response (can be replaced with actual AI logic)
      setTimeout(() => {
        setChatMessages((prev) => [...prev, { sender: 'AI', text: `คุณพิมพ์ว่า "${chatInput}" ครับ มีอะไรให้ผมช่วยต่อไหม?` }]);
      }, 1000);
      setChatInput('');
    }
  };

  return (
    <div className="fixed inset-0 bg-[#020205] text-white font-sans antialiased overflow-hidden flex flex-col">
      {/* 1. VOID BASE & CYBER GLOW */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.05)_0%,transparent_55%)] pointer-events-none" />

      {/* 2. HEADER: CYBER GLOW BRANDING */}
      <nav className="relative z-50 h-28 flex justify-between items-start px-12 pt-10 border-b border-white/5">
        <div className="flex flex-col">
          <h1 className="text-3xl font-black tracking-[0.6em] italic text-white drop-shadow-[0_0_12px_rgba(0,255,255,0.6)]">
            AURELIUS <span className="font-light tracking-[0.2em] opacity-60">STUDIO</span>
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <Activity size={10} className="text-cyan-500 animate-pulse" />
            <span className="text-[8px] font-mono tracking-[0.5em] text-cyan-900 uppercase">Cyber_Creative_Environment</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-[9px] font-black tracking-[0.2em] text-slate-400">
            <LogIn size={14} /> ACCESS_INTERNAL
          </button>
          
          <button className="px-8 py-3 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-300 text-[10px] tracking-[0.4em] font-black italic hover:bg-cyan-400/20 hover:shadow-[0_0_25px_rgba(0,255,255,0.5)] transition-all duration-500">
            REGISTER
          </button>

          <div className="px-4 py-2 bg-cyan-500/5 border border-cyan-500/20 rounded-full">
            <span className="text-[9px] font-black tracking-[0.4em] text-cyan-400 animate-pulse">READY</span>
          </div>
        </div>
      </nav>

      <div className="relative z-10 flex flex-1 p-8 gap-8 overflow-hidden">
        
        {/* 3. SIDEBAR: HIGH-END GLASS */}
        <aside className="w-20 rounded-[3rem] bg-black/50 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col items-center py-10 gap-10">
          <LayoutGrid size={22} className="text-cyan-900" />
          <div className="flex flex-col gap-10 flex-1">
            {menuItems.map((item, idx) => (
              <button key={idx} className="group relative flex items-center justify-center">
                <div className="text-slate-600 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] transition-all transform group-hover:scale-110">
                  {item.icon}
                </div>
                <div className="absolute left-16 px-4 py-1.5 bg-white text-black text-[9px] font-black tracking-widest rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-xl pointer-events-none uppercase">
                  {item.label}
                </div>
              </button>
            ))}
          </div>
          <Settings size={22} className="text-slate-800 hover:text-white transition-colors cursor-pointer" />
        </aside>

        <div className="flex-1 flex flex-col gap-8">
          
          {/* 4. MAIN DISPLAY: GADGET FEEL */}
          <section className="flex-[1.2] relative rounded-[3rem] overflow-hidden border border-white/5 bg-black/40 group shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=2070" 
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-[5s]" 
              alt="Cyber Hub" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent" />
            <div className="absolute bottom-12 left-12">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-ping" />
                <span className="text-[10px] font-black tracking-[0.6em] text-cyan-500/60 uppercase">Operational_Mode</span>
              </div>
              <h2 className="text-4xl font-black text-white tracking-tighter italic uppercase">Creative_Engine_Active</h2>
            </div>
          </section>

          {/* 5. BULLETIN BOARD: ADMIN INTERACTION (WITH IMAGE) */}
          <section className="flex-1 rounded-[3rem] bg-black/50 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] p-10 flex flex-col relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl">
                    <Megaphone size={20} className="text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-black tracking-[0.3em] text-white uppercase">Bulletin_Board</h3>
                    <p className="text-[9px] text-cyan-900 font-bold uppercase tracking-[0.2em]">Digital_Hub_Creative_Feed</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  {isEditing && (
                    <>
                      <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 rounded-full text-[9px] tracking-[0.2em] font-black italic transition-all border bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10"
                      >
                        <ImageIcon size={14} className="inline-block mr-2" /> UPLOAD_IMAGE
                      </button>
                      {announcementImage && (
                        <button 
                          onClick={clearImage}
                          className="px-4 py-2 rounded-full text-[9px] tracking-[0.2em] font-black italic transition-all border bg-red-500/10 border-red-400/30 text-red-300 hover:bg-red-500/20 hover:shadow-[0_0_15px_rgba(255,0,0,0.5)]"
                        >
                          <Trash2 size={14} className="inline-block mr-2" /> CLEAR_IMAGE
                        </button>
                      )}
                    </>
                  )}

                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className={`px-6 py-3 rounded-full text-[9px] tracking-[0.4em] font-black italic transition-all duration-500 border ${
                      isEditing 
                      ? 'bg-emerald-500/20 border-emerald-400/60 text-emerald-200 shadow-[0_0_35px_rgba(52,211,153,0.8)] animate-pulse' 
                      : 'bg-emerald-500/10 border-emerald-400/30 text-emerald-300 hover:bg-emerald-500/20 hover:border-emerald-400/50'
                    }`}
                  >
                    {isEditing ? 'COMMIT_UPDATE' : 'MODIFY_FEED'}
                  </button>
                </div>
              </div>

              <div className="flex-1 bg-black/40 border border-white/5 rounded-[2rem] relative overflow-hidden flex flex-col">
                {announcementImage && (
                  <div className="p-4 border-b border-white/5 bg-black/30">
                    <img src={announcementImage} alt="Announcement Visual" className="w-full h-48 object-cover rounded-xl border border-white/10 shadow-lg" />
                  </div>
                )}
                {isEditing ? (
                  <textarea 
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    className="flex-1 w-full bg-transparent p-8 text-[13px] text-cyan-100 font-thai leading-relaxed focus:outline-none resize-none"
                  />
                ) : (
                  <div className="flex-1 p-8 text-[14px] text-slate-400 font-thai leading-loose italic whitespace-pre-line overflow-y-auto h-full custom-scrollbar">
                    {announcement}
                  </div>
                )}
              </div>

              <div className="mt-8 flex justify-between items-center border-t border-white/5 pt-6">
                <div className="flex items-center gap-3 text-slate-700">
                  <ShieldCheck size={14} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Verified_Admin_Access</span>
                </div>
                <div className="text-[10px] font-mono text-cyan-900 font-bold tracking-widest">
                  SYNC_STABLE // {time}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* 6. FOOTER: SYSTEM STATUS & SOCIAL MEDIA */}
      <footer className="h-14 border-t border-white/5 bg-black/80 backdrop-blur-md px-12 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <span className="text-[9px] font-black text-cyan-950 uppercase tracking-[0.8em]">AURELIUS_STUDIO_CORE_V2.0.8</span>
          <div className="h-[1px] w-24 bg-white/5" />
          
          {/* SOCIAL MEDIA ICONS */}
          <div className="flex items-center gap-4 ml-6">
            {socialMediaLinks.map((link, idx) => (
              <a 
                key={idx} 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-700 hover:text-cyan-400 hover:scale-110 transition-all duration-300 drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">
          © 2026 Systems Stable // Creative Digital Hub
        </div>
      </footer>

      {/* 7. AI CHATBOT INTERFACE (FLOATING GLASS BUBBLE) */}
      <div className={`fixed bottom-12 right-12 z-[200] flex flex-col items-end gap-4 ${isChatOpen ? '' : ''}`}>
        {isChatOpen && (
          <div className="w-80 h-96 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden transition-all duration-500 transform hover:scale-[1.02]">
            {/* Chat Header */}
            <div className="p-5 border-b border-white/5 bg-cyan-500/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(0,255,255,1)]" />
                <span className="text-[10px] font-black tracking-[0.3em] text-cyan-400">AURELIUS_AI</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>

            {/* Messages Area (Scrollable) */}
            <div ref={chatMessagesRef} className="flex-1 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-4">
              {chatMessages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-2xl max-w-[85%] ${
                    msg.sender === 'AI' 
                    ? 'bg-white/5 border border-white/5 rounded-tl-none self-start' 
                    : 'bg-cyan-500/10 border border-cyan-500/20 rounded-br-none self-end'
                  }`}
                >
                  <p className="text-[11px] text-slate-400 font-thai leading-relaxed">
                    <span className={`font-bold mr-1 ${msg.sender === 'AI' ? 'text-cyan-400' : 'text-cyan-200'}`}>{msg.sender}:</span> {msg.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-black/40 border-t border-white/5">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="ENTER_COMMAND..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => { if (e.key === 'Enter') handleChatSubmit(); }}
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-[10px] font-mono text-cyan-100 focus:outline-none focus:border-cyan-500/50 transition-all"
                />
                <button 
                  onClick={handleChatSubmit}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-cyan-500 hover:text-white transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Toggle Button (The Bubble) */}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-[0_0_30px_rgba(0,255,255,0.2)] hover:bg-cyan-400 hover:text-black hover:scale-110 transition-all duration-500 ${isChatOpen ? 'rotate-45' : ''}`}
        >
          {isChatOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </button>
      </div>
    </div>
  );
}