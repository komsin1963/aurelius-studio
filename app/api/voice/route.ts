import { NextResponse } from 'next/server';
import { ElevenLabsClient } from 'elevenlabs';

const client = new ElevenLabsClient({
  apiKey: "ใส่_API_KEY_ของคุณที่นี่", 
});

export async function POST(req: Request) {
  const { text } = await req.json();

  try {
    const audio = await client.generate({
      voice: "PmsF7M31g7OT96vU9Xm8", // เสียงผู้หญิงไทย หรือเลือก ID อื่นได้
      text: text,
      model_id: "eleven_multilingual_v2",
    });

    // ในที่นี้เราจะส่งกลับเป็นไฟล์เสียง หรือเก็บลง Supabase ตามที่คุณต้องการ
    return NextResponse.json({ audioUrl: "URL_เสียงที่เจนเสร็จแล้ว" });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate voice' }, { status: 500 });
  }
}