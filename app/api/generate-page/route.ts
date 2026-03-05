import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { image, prompt, model, useModalities } = await req.json();
        const modelId = model || 'sourceful/riverflow-v2-standard-preview';

        if (!image || !prompt) {
            return NextResponse.json({ success: false, error: 'Missing image or prompt' }, { status: 400 });
        }

        const apiKey = process.env.OPENROUTER_API;
        if (!apiKey) {
            return NextResponse.json({ success: false, error: 'OpenRouter API key not configured' }, { status: 500 });
        }

        // If the image is a URL (e.g. Firebase Storage), fetch it server-side and convert to base64.
        // OpenRouter/Gemini can't access token-protected Firebase Storage URLs, so we pass raw bytes.
        let imageData = image;
        if (image.startsWith('http://') || image.startsWith('https://')) {
            try {
                const imgResponse = await fetch(image);
                if (!imgResponse.ok) throw new Error(`Failed to fetch image: ${imgResponse.statusText}`);
                const contentType = imgResponse.headers.get('content-type') || 'image/jpeg';
                const buffer = await imgResponse.arrayBuffer();
                const base64 = Buffer.from(buffer).toString('base64');
                imageData = `data:${contentType};base64,${base64}`;
            } catch (err: any) {
                return NextResponse.json({ success: false, error: `Could not fetch cover image: ${err.message}` }, { status: 500 });
            }
        }

        let response;
        let retries = 3;
        while (retries > 0) {
            try {
                response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json',
                        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
                        'X-Title': 'Coloring Book Studio',
                    },
                    body: JSON.stringify({
                        model: modelId,
                        // modalities must be set for Gemini-family models to output images
                        ...(useModalities !== false ? { modalities: ['image', 'text'] } : {}),
                        messages: [
                            {
                                role: 'user',
                                content: [
                                    { type: 'text', text: prompt },
                                    { type: 'image_url', image_url: { url: imageData } }
                                ]
                            }
                        ]
                    })
                });
                break;
            } catch (err: any) {
                retries--;
                if (retries === 0) {
                    throw new Error(`OpenRouter connection failed: ${err.message}`);
                }
                await new Promise(res => setTimeout(res, 1000));
            }
        }

        if (!response) {
            throw new Error('Failed to connect to OpenRouter API');
        }

        const data = await response.json();
        console.log('OpenRouter raw response:', JSON.stringify(data).substring(0, 500));

        if (!response.ok) {
            throw new Error(data.error?.message || 'Failed to generate preview');
        }

        const message = data.choices?.[0]?.message;
        let previewImage = '';

        // Per OpenRouter docs: generated images are in message.images[]
        // https://openrouter.ai/docs/features/multimodal/image-generation
        if (message?.images && message.images.length > 0) {
            previewImage = message.images[0]?.image_url?.url || '';
        }

        // Fallback: some models embed base64 in message.content (as a string or array)
        if (!previewImage) {
            const content = message?.content;
            const contentText = typeof content === 'string'
                ? content
                : Array.isArray(content)
                    ? content.map((p: any) => p.text || p.image_url?.url || '').join('')
                    : '';

            // Try to find a data URL embedded in the text
            const base64Match = contentText.match(/(data:image\/[a-zA-Z0-9\-\+]+;base64,[a-zA-Z0-9\+\/=]+)/);
            if (base64Match?.[1]) {
                previewImage = base64Match[1];
            }
        }

        if (!previewImage || !previewImage.startsWith('data:image/')) {
            console.error('AI returned no image. Full response:', JSON.stringify(data).substring(0, 1000));
            throw new Error('The AI did not generate an image. Please try again.');
        }

        return NextResponse.json({
            success: true,
            image: previewImage,
        });
    } catch (err: any) {
        console.error('Error generating preview:', err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

