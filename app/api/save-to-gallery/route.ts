import { put } from '@vercel/blob';
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { imageUrl } = await request.json();
    
    // 1. ดึงภาพจาก Replicate (AI) มาชั่วคราว
    const response = await fetch(imageUrl);
    if (!response.body) throw new Error('No body');

    // 2. บันทึกไฟล์ภาพลงใน Vercel Blob (aurelius-gallery) ที่คุณเพิ่งสร้าง
    const blob = await put(`gallery/${Date.now()}.png`, response.body, {
      access: 'public',
    });

    // 3. เตรียมข้อมูลเพื่อเก็บลงใน KV (aurelius-db)
    const newEntry = {
      id: Date.now(),
      url: blob.url, // ใช้ URL ใหม่จาก Blob ของเราเอง
      title: "AI Design By Komsin",
      category: "Masterpiece",
      createdAt: new Date().toISOString()
    };

    // 4. บันทึกลง KV (Redis) โดยเก็บไว้ใน List ชื่อ 'gallery_items'
    await kv.lpush('gallery_items', newEntry);

    return NextResponse.json({ success: true, data: newEntry });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: "Failed to save" }, { status: 500 });
  }
}