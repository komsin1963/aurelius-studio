import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET() {
  try {
    // ดึงเฉพาะคนที่มีการแนะนำเพื่อน (referred_by ไม่เป็น null)
    const { data, error } = await supabase
      .from('profiles')
      .select('referred_by')
      .not('referred_by', 'is', null);

    if (error) throw error;

    // คำนวณจำนวนการแนะนำ
    const counts: Record<string, number> = {};
    data.forEach((row: any) => {
      counts[row.referred_by] = (counts[row.referred_by] || 0) + 1;
    });

    // ดึงข้อมูล Email ของเจ้าของ ID ที่ติดอันดับ
    const leaderIds = Object.keys(counts);
    const { data: userDetails } = await supabase
      .from('profiles')
      .select('id, email')
      .in('id', leaderIds);

    // ประกอบข้อมูลรวมกัน
    const leaderboard = userDetails?.map(u => ({
      email: u.email.split('@')[0], // โชว์แค่ชื่อหน้า email เพื่อความเป็นส่วนตัว
      count: counts[u.id] || 0
    })).sort((a, b) => b.count - a.count).slice(0, 10);

    return NextResponse.json(leaderboard || []);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}