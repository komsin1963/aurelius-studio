import Replicate from "replicate";
import { NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { prompt, style, userId } = await req.json();

    // --- [SaaS Logic: เตรียมไว้สำหรับอนาคต] ---
    /* if (userId) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('credits')
        .eq('id', userId)
        .single();

      if (profile && profile.credits <= 0) {
        return NextResponse.json({ error: "Insufficient Credits" }, { status: 403 });
      }
    }
    */
    // ---------------------------------------

    const output: any = await replicate.run(
      "black-forest-labs/flux-schnell",
      { input: { prompt: `${style} style, ${prompt}`, aspect_ratio: "1:1" } }
    );

    const imageUrl = output[0];

    // บันทึกประวัติการใช้งาน (ผูกกับ userId ถ้ามี)
    await supabase.from('usage_logs').insert([
      { 
        studio_name: 'AureliusX', 
        action_type: 'AI_GEN', 
        details: `Style: ${style} | Prompt: ${prompt}`,
        image_url: imageUrl,
        user_id: userId || null 
      }
    ]);

    /* --- [SaaS Logic: หักเครดิตหลังเจนสำเร็จ] ---
    if (userId) {
       await supabase.rpc('decrement_credit', { user_id: userId });
    }
    */

    return NextResponse.json({ url: imageUrl });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "AI Engine Error" }, { status: 500 });
  }
}