import { NextRequest, NextResponse } from 'next/server';
import { getTemplateBySlug } from '@/sanity/lib/queries';
import JSZip from 'jszip';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string; path: string[] }> }
) {
    const { slug, path } = await params;

    try {
        // 1. Fetch template data from Sanity
        const template = await getTemplateBySlug(slug);

        if (!template || !template.demoZipUrl) {
            return new NextResponse('Template or ZIP not found', { status: 404 });
        }

        // 2. Fetch the ZIP file from Sanity CDN
        const zipResponse = await fetch(template.demoZipUrl);
        if (!zipResponse.ok) {
            return new NextResponse('Failed to fetch ZIP from Sanity', { status: 500 });
        }

        const zipBuffer = await zipResponse.arrayBuffer();

        // 3. Load ZIP into memory
        const zip = await JSZip.loadAsync(zipBuffer);

        // 4. Determine which file to serve
        // If path is empty, serve index.html
        let filePath = path.join('/');
        if (!filePath || filePath === '') {
            filePath = 'index.html';
        }

        // 5. Find the file in the ZIP — try multiple strategies
        const allFiles = Object.keys(zip.files).filter(f => !zip.files[f].dir);

        let file = zip.file(filePath);

        if (!file) {
            // Strategy 2: detect all root folders in the ZIP and prepend them
            const rootFolders = [...new Set(
                allFiles
                    .filter(f => f.includes('/'))
                    .map(f => f.split('/')[0])
            )];

            for (const folder of rootFolders) {
                const candidate = `${folder}/${filePath}`;
                const found = zip.file(candidate);
                if (found) { file = found; break; }
            }
        }

        if (!file) {
            // Strategy 3: match by filename only (last resort)
            const filename = filePath.split('/').pop() || filePath;
            const match = allFiles.find(f => f.endsWith('/' + filename) || f === filename);
            if (match) file = zip.file(match);
        }

        if (!file) {
            return new NextResponse(`File not found in ZIP: ${filePath}`, { status: 404 });
        }

        // 6. Get content and detect mime type
        const content = await file.async('uint8array');
        const extension = filePath.split('.').pop()?.toLowerCase();

        const mimeTypes: Record<string, string> = {
            'html': 'text/html',
            'css': 'text/css',
            'js': 'application/javascript',
            'png': 'image/png',
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'gif': 'image/gif',
            'svg': 'image/svg+xml',
            'json': 'application/json',
            'ico': 'image/x-icon',
            'webp': 'image/webp',
            'woff': 'font/woff',
            'woff2': 'font/woff2',
            'ttf': 'font/ttf',
        };

        const contentType = mimeTypes[extension || ''] || 'application/octet-stream';

        // 7. Return the file content
        return new NextResponse(Buffer.from(content), {
            headers: {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
            },
        });

    } catch (error) {
        console.error('Error serving demo from ZIP:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
