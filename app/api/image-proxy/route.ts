import { NextResponse } from 'next/server';

/**
 * GET /api/image-proxy?url=<firebase-storage-url>
 *
 * Server-side proxy that fetches an image from any URL and returns it
 * as a base64 Data URI. This bypasses CORS restrictions that prevent
 * the browser from directly fetching Firebase Storage images (when CORS
 * is not configured on the bucket).
 */
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const imageUrl = searchParams.get('url');

    if (!imageUrl) {
        return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
    }

    try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch image: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type') || 'image/jpeg';
        const buffer = await response.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');

        // Return raw base64 data URI
        return NextResponse.json({
            dataUrl: `data:${contentType};base64,${base64}`
        });
    } catch (err: any) {
        console.error('Image proxy error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
