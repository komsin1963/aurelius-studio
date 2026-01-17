import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// ✅ 1. ต้องมีบรรทัดนี้เพื่อบอก Vercel ว่านี่คือ Dynamic API
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    // ✅ 2. สร้าง Client ข้างในฟังก์ชันแบบเดียวกับไฟล์ generate
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { userId } = await req.json();
    // ... โลจิกที่เหลือของคุณ ...

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}