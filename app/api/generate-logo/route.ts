import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: 'A magical, whimsical logo for a web app called "Coloring Book Studio". It features an open book with glowing colors and a magic wand. Clean vector style, white background, high quality, vibrant.',
    });
    
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        return NextResponse.json({ success: true, image: `data:image/png;base64,${base64Data}` });
      }
    }
    
    return NextResponse.json({ success: false, error: 'No image generated' });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e.message });
  }
}
