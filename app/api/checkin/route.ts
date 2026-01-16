import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    // 1. ดึงข้อมูลโปรไฟล์เพื่อดู XP และวันที่เช็คอินล่าสุด
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('credits, last_checkin')
      .eq('id', userId)
      .single();

    if (fetchError || !profile) throw new Error('ไม่พบข้อมูลโปรไฟล์');

    // 2. ตรวจสอบเงื่อนไขเวลา (เช็คอินได้วันละ 1 ครั้ง)
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const lastCheckinDate = profile.last_checkin 
      ? new Date(profile.last_checkin).toISOString().split('T')[0] 
      : null;

    if (today === lastCheckinDate) {
      return NextResponse.json(
        { error: 'คุณเช็คอินวันนี้ไปแล้ว กลับมาใหม่พรุ่งนี้นะครับ!' }, 
        { status: 400 }
      );
    }

    // 3. สุ่ม XP รางวัล (1 - 10 XP)
    const rewardXP = Math.floor(Math.random() * 10) + 1;

    // 4. บันทึกข้อมูลลงฐานข้อมูล
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ 
        credits: (profile.credits || 0) + rewardXP,
        last_checkin: now.toISOString()
      })
      .eq('id', userId);

    if (updateError) throw updateError;

    return NextResponse.json({ message: 'เช็คอินสำเร็จ!', reward: rewardXP });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}