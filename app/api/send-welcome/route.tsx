import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
 const body = await req.json();
const { email, type, credits } = body;

  try {
    const data = await resend.emails.send({
      from: 'Aurelius Studio <onboarding@resend.dev>', // เมื่อจด komsin.com แล้วให้เปลี่ยนเป็น hello@komsin.com
      to: [email],
      subject: type === 'referral' ? '🎁 You received 20 XP Bonus!' : 'Welcome to Aurelius Studio',
      html: `
        <div style="font-family: sans-serif; background: #020205; color: white; padding: 40px; border-radius: 20px;">
          <h1 style="color: #06b6d4; font-style: italic;">AURELIUS X</h1>
          <p>ยินดีต้อนรับสู่โปรเจกต์ของกมสินครับ!</p>
          <p>คุณได้รับ <strong>${credits} XP</strong> เพื่อเริ่มต้นสร้างสรรค์ผลงาน</p>
          ${type === 'referral' ? '<p style="color: #f472b6;">* คุณได้รับโบนัสพิเศษจากการสมัครผ่านลิงก์แนะนำเพื่อน</p>' : ''}
          <hr style="border-color: #1e293b;" />
          <p style="font-size: 10px; color: #64748b;">Aurelius Studio By Komsin Intelligence</p>
        </div>
      `
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}