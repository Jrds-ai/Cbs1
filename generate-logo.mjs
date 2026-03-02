import { GoogleGenAI } from '@google/genai';
import fs from 'fs';

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

async function generate() {
  try {
    console.log('Generating logo...');
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: 'A magical, whimsical logo for a web app called "Coloring Book Studio". It features an open book with glowing colors and a magic wand. Clean vector style, white background, high quality, vibrant.',
    });
    
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64Data = part.inlineData.data;
        fs.writeFileSync('public/logo.png', Buffer.from(base64Data, 'base64'));
        console.log('Logo generated and saved to public/logo.png');
        return;
      }
    }
  } catch (e) {
    console.error('Error generating logo:', e);
  }
}

generate();
