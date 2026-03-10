import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

const config = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'ath1uvh6',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
};

// CDN-backed client — fast, for client-side reads
export const client = createClient({
    ...config,
    useCdn: true,
});

// Server-only client — bypasses CDN, uses token, for SSR / generateStaticParams / sitemap
export const serverClient = createClient({
    ...config,
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
});

const builder = imageUrlBuilder(client);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
    return builder.image(source);
}

