'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CreditCard, ShieldCheck, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planName = searchParams.get('plan') || 'Starter';
  const price = searchParams.get('price') || '฿199';
  const credits = searchParams.get('credits') || '50';
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    // จำลองการจ่ายเงิน 2 วินาที
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in zoom-in duration-500">
        <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mb-6 border border-cyan-500/30">
          <CheckCircle2 size={40} className="text-cyan-400" />
        </div>
        <h2 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Payment Successful</h2>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.4em] mb-10">ระบบกำลังเพิ่ม {credits} Credits เข้ากระเป๋าของคุณ</p>
        <Link href="/dashboard" className="px-10 py-4 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-cyan-500 transition-all">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* ฝั่งซ้าย: สรุปรายการ */}
      <div className="space-y-8">
        <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem]">
          <p className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-4">Order Summary</p>
          <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-2">{planName} Plan</h2>
          <div className="flex justify-between items-end border-b border-white/5 pb-8 mb-8">
            <span className="text-slate-500 text-[10px] font-bold uppercase tracking-widest italic">AureliusX XP Credits</span>
            <span className="text-2xl font-black italic text-white">{credits} XP</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white text-sm font-black uppercase tracking-widest">Total Amount</span>
            <span className="text-3xl font-black italic text-cyan-400">{price}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 px-6 opacity-40">
          <ShieldCheck size={20} />
          <p className="text-[9px] font-bold uppercase tracking-widest">Secured by AureliusX Encryption System</p>
        </div>
      </div>

      {/* ฝั่งขวา: ช่องทางจ่ายเงิน */}
      <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem]">
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-8 text-center">Select Payment Method</p>
        <div className="space-y-4 mb-10">
          <button className="w-full flex items-center justify-between p-6 bg-white/5 border-2 border-cyan-500/50 rounded-2xl">
            <div className="flex items-center gap-4">
              <CreditCard className="text-cyan-400" />
              <span className="text-[10px] font-black uppercase tracking-widest">Credit / Debit Card</span>
            </div>
            <div className="w-4 h-4 rounded-full border-2 border-cyan-500 flex items-center justify-center">
              <div className="w-2 h-2 bg-cyan-500 rounded-full" />
            </div>
          </button>
          <button className="w-full flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl opacity-50 cursor-not-allowed">
            <div className="flex items-center gap-4">
              <span className="font-black italic text-lg">QR</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Thai QR Payment</span>
            </div>
          </button>
        </div>

        <button 
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full py-6 bg-cyan-500 text-black rounded-2xl font-black uppercase text-xs tracking-[0.3em] hover:bg-white transition-all flex items-center justify-center gap-3"
        >
          {isProcessing ? <Loader2 className="animate-spin" /> : 'Confirm and Pay'}
        </button>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#020205] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/topup" className="flex items-center gap-2 text-slate-500 hover:text-white mb-10 transition-all font-black text-[10px] uppercase tracking-[0.3em]">
          <ArrowLeft size={16} /> กลับไปเลือกแพ็กเกจ
        </Link>
        <Suspense fallback={<div className="flex justify-center py-20"><Loader2 className="animate-spin text-cyan-500" size={40} /></div>}>
          <CheckoutContent />
        </Suspense>
      </div>
    </div>
  );
}