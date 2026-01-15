'use client';
import { useState, useEffect, useRef } from 'react';
import { Volume2, Square, Trash2, Mic } from 'lucide-react';

export default function ThaiVoiceSynthesis() {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    synth.current = window.speechSynthesis;
    
    const loadVoices = () => {
      const allVoices = synth.current?.getVoices() || [];
      // กรองเฉพาะเสียงไทย (th-TH) และอังกฤษ (en-US)
      const filtered = allVoices.filter(v => v.lang.includes('th-TH') || v.lang.includes('en-US'));
      setVoices(filtered);
      
      // เลือกเสียงภาษาไทยเป็นค่าเริ่มต้นถ้ามี
      const thaiVoice = filtered.find(v => v.lang.includes('th-TH'));
      if (thaiVoice) setSelectedVoice(thaiVoice);
      else if (filtered.length > 0) setSelectedVoice(filtered[0]);
    };

    loadVoices();
    if (synth.current?.onvoiceschanged !== undefined) {
      synth.current.onvoiceschanged = loadVoices;
    }
  }, []);

  const handleSpeak = () => {
    if (!text || !selectedVoice) return;
    
    // หยุดเสียงที่กำลังพูดอยู่ก่อนหน้า
    synth.current?.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    
    synth.current?.speak(utterance);
  };

  const handleStop = () => {
    synth.current?.cancel();
    setIsSpeaking(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-2xl mx-auto bg-slate-800 rounded-2xl p-8 shadow-2xl border border-slate-700">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <Mic className="text-red-500" /> AI Voice Generator
        </h1>

        {/* ส่วนเลือกเสียง */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-slate-400">Select Voice (Thai / English US)</label>
          <select 
            className="w-full bg-slate-700 border border-slate-600 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500"
            value={selectedVoice?.name || ''}
            onChange={(e) => {
              const voice = voices.find(v => v.name === e.target.value);
              if (voice) setSelectedVoice(voice);
            }}
          >
            {voices.map((voice) => (
              <option key={voice.name} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
        </div>

        {/* ส่วนพิมพ์ข้อความ */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2 text-slate-400">Text to Speak</label>
          <textarea
            className="w-full bg-slate-700 border border-slate-600 rounded-xl p-4 h-48 text-lg focus:ring-2 focus:ring-blue-500"
            placeholder="พิมพ์ข้อความที่นี่..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        {/* ปุ่มควบคุม */}
        <div className="flex gap-4">
          <button
            onClick={handleSpeak}
            disabled={isSpeaking}
            className="flex-1 bg-red-600 hover:bg-red-500 disabled:bg-slate-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            <Volume2 size={24} /> {isSpeaking ? 'Speaking...' : 'Speak'}
          </button>
          
          <button
            onClick={handleStop}
            className="px-6 bg-slate-700 hover:bg-slate-600 text-white rounded-xl flex items-center justify-center transition-all border border-slate-600"
          >
            <Square size={24} />
          </button>

          <button
            onClick={() => setText('')}
            className="px-6 bg-slate-700 hover:bg-slate-600 text-white rounded-xl flex items-center justify-center transition-all border border-slate-600"
          >
            <Trash2 size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}