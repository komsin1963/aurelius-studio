'use client';
import { useState, useRef } from 'react';
import { Mic, Monitor, StopCircle, Download, Trash2, Music, Volume2, RotateCcw } from 'lucide-react';

export default function RecorderPage() {
  const [recordingMode, setRecordingMode] = useState<'audio' | 'screen'>('audio');
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [screenURL, setScreenURL] = useState<string | null>(null);
  const [bgMusic, setBgMusic] = useState<HTMLAudioElement | null>(null);
  const [volume, setVolume] = useState(0.3);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMusicUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (bgMusic) bgMusic.pause();
      const url = URL.createObjectURL(file);
      const audio = new Audio(url);
      audio.loop = true;
      audio.volume = volume;
      setBgMusic(audio);
    }
  };

  const startRecording = async () => {
    try {
      let stream: MediaStream;
      if (recordingMode === 'screen') {
        stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      } else {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      }
      streamRef.current = stream;
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: recordingMode === 'screen' ? 'video/webm' : 'audio/wav' });
        setScreenURL(recordingMode === 'screen' ? URL.createObjectURL(blob) : null);
        setAudioURL(recordingMode === 'audio' ? URL.createObjectURL(blob) : null);
        if (bgMusic) { bgMusic.pause(); bgMusic.currentTime = 0; }
      };
      mediaRecorder.start();
      setIsRecording(true);
      setSeconds(0);
      timerIntervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
      if (bgMusic) bgMusic.play();
    } catch (err) { alert("กรุณาอนุญาตเข้าถึงอุปกรณ์"); }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    streamRef.current?.getTracks().forEach(t => t.stop());
    setIsRecording(false);
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
  };

  // ฟังก์ชันเริ่มใหม่ (Reset)
  const handleReset = () => {
    setAudioURL(null);
    setScreenURL(null);
    setSeconds(0);
    if (bgMusic) {
      bgMusic.pause();
      bgMusic.currentTime = 0;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 overflow-hidden">
      <div className="max-w-xl mx-auto flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Recorder Studio</h1>

        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => setRecordingMode('audio')} className={`flex items-center justify-center gap-2 py-2 rounded-lg font-bold ${recordingMode === 'audio' ? 'bg-red-600' : 'bg-slate-800'}`}>
            <Mic size={18} /> Audio
          </button>
          <button onClick={() => setRecordingMode('screen')} className={`flex items-center justify-center gap-2 py-2 rounded-lg font-bold ${recordingMode === 'screen' ? 'bg-blue-600' : 'bg-slate-800'}`}>
            <Monitor size={18} /> Screen
          </button>
        </div>

        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-bold flex items-center gap-2 text-violet-400"><Music size={16}/> เพลงประกอบ</span>
            <input type="file" accept="audio/*" onChange={handleMusicUpload} className="text-xs w-40 cursor-pointer" />
          </div>
          {bgMusic && (
            <div className="flex items-center gap-3 bg-slate-900 p-2 rounded">
              <input type="range" min="0" max="1" step="0.1" value={volume} onChange={(e) => {
                const v = parseFloat(e.target.value); setVolume(v); if (bgMusic) bgMusic.volume = v;
              }} className="flex-1 h-1" />
              <span className="text-xs font-mono">{Math.round(volume * 100)}%</span>
            </div>
          )}
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center relative">
          <div className="text-5xl font-mono mb-4 text-red-500 font-bold">
            {Math.floor(seconds/60).toString().padStart(2,'0')}:{(seconds%60).toString().padStart(2,'0')}
          </div>

          <div className="flex justify-center mb-2">
            {!isRecording ? (
              <button onClick={startRecording} className="w-20 h-20 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center shadow-lg active:scale-95">
                <div className="w-8 h-8 bg-white rounded-full"></div>
              </button>
            ) : (
              <button onClick={stopRecording} className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center animate-pulse">
                <StopCircle size={40} className="text-red-500" />
              </button>
            )}
          </div>
          <p className="text-xs text-slate-400">{isRecording ? "กำลังบันทึก..." : "กดเพื่อเริ่ม"}</p>
        </div>

        {/* ส่วนปุ่มดาวน์โหลดและปุ่มเริ่มใหม่ */}
        {(audioURL || screenURL) && (
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-xl animate-in fade-in zoom-in duration-300">
            <div className="flex gap-2">
              <button onClick={handleReset} className="flex-1 bg-amber-500 hover:bg-amber-400 py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-bold text-slate-900 transition-colors">
                <RotateCcw size={18} /> อัดใหม่
              </button>
              
              <a href={recordingMode === 'screen' ? screenURL! : audioURL!} download={`story-${Date.now()}`} className="flex-[2] bg-green-600 hover:bg-green-500 py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-bold transition-colors">
                <Download size={18} /> ดาวน์โหลดผลงาน
              </a>
              
              <button onClick={() => { setAudioURL(null); setScreenURL(null); }} className="p-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-300 transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}