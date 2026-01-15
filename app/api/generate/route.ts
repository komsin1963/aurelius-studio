import Replicate from "replicate";
import { NextResponse } from "next/server";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { prompt, style } = await req.json();

    let enhancedPrompt = prompt;
    let aspectRatio: "1:1" | "2:3" | "3:2" = "1:1";

    // --- ระบบเลือกสไตล์อัจฉริยะ ---
    if (style === 'T-Shirt') {
      enhancedPrompt = `${prompt}, vector art graphic, solid white background, bold lines, minimalist t-shirt design style, high contrast, isolated on white`;
    } else if (style === 'Logo') {
      enhancedPrompt = `${prompt}, minimalist vector logo, flat design, symmetrical, clean professional branding, white background, circular composition`;
    } else if (style === 'Poster') {
      enhancedPrompt = `${prompt}, cinematic movie poster style, dramatic lighting, highly detailed, 8k resolution, professional photography`;
      aspectRatio = "2:3"; // แนวตั้งสำหรับโปสเตอร์
    } else if (style === 'Social') {
      enhancedPrompt = `${prompt}, vibrant colors, instagram aesthetic, sharp focus, trendy digital art style, high resolution`;
    }

    const output: any = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: {
          prompt: enhancedPrompt,
          aspect_ratio: aspectRatio,
          output_format: "webp"
        }
      }
    );

    return NextResponse.json({ url: output[0] });

  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}