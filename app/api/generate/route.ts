import { NextResponse } from "next/server";
import Replicate from "replicate";

// ดึง Token ที่คุณกมสินตั้งไว้ใน Vercel มาใช้งาน
const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // ใช้โมเดล Flux (เร็วและคมชัด) ในการสร้างรูป
    const output: any = await replicate.run(
      "black-forest-labs/flux-schnell",
      { input: { prompt: prompt } }
    );

    // ส่งลิงก์รูปภาพกลับไปให้หน้าจอ
    return NextResponse.json({ url: output[0] });
  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: "การเชื่อมต่อ AI ขัดข้อง กรุณาเช็ก Token" }, { status: 500 });
  }
}