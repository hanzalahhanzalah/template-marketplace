/**
 * Upload free Unsplash images to Sanity and attach them to blog posts.
 * 
 * Images are from Unsplash — 100% free to use, no copyright, no attribution required.
 * Unsplash License: https://unsplash.com/license
 * 
 * Run: node upload-blog-images.mjs
 */

import { createClient } from '@sanity/client';
import https from 'https';
import http from 'http';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

/**
 * Follow redirects and download image as a Buffer
 */
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      // Handle redirect
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Download an image from Unsplash and upload it to Sanity assets
 * Returns the Sanity asset _id reference
 */
async function uploadUnsplashImage(unsplashUrl, filename, label) {
  console.log(`  📥 Downloading: ${label}...`);
  const buffer = await downloadImage(unsplashUrl);
  console.log(`  📤 Uploading to Sanity (${Math.round(buffer.length / 1024)}KB)...`);
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: 'image/jpeg',
  });
  console.log(`  ✅ Uploaded: ${asset._id}`);
  return asset._id;
}

/**
 * Attach a Sanity image asset to a blog post's thumbnail field
 */
async function attachThumbnail(slug, assetId) {
  const post = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]{ _id }`,
    { slug }
  );
  if (!post?._id) {
    console.log(`  ⚠️  Post not found: ${slug}`);
    return;
  }
  await client.patch(post._id).set({
    thumbnail: {
      _type: 'image',
      asset: { _type: 'reference', _ref: assetId },
    },
  }).commit();
  console.log(`  ✅ Thumbnail attached to: /blog/${slug}`);
}

async function main() {
  console.log('🖼️  Starting blog image upload...\n');

  // ─────────────────────────────────────────────────────────────────
  // Article 1: Best Web Hosting for Small Business
  // Unsplash image: server/hosting related
  // Photo by Taylor Vick — Unsplash (free license)
  // ─────────────────────────────────────────────────────────────────
  console.log('📰 Article 1: Best Web Hosting for Small Business...');
  try {
    const assetId1 = await uploadUnsplashImage(
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=630&fit=crop&q=80',
      'web-hosting-small-business.jpg',
      'Web Hosting — Server Room'
    );
    await attachThumbnail('best-web-hosting-for-small-business-2025', assetId1);
  } catch (err) {
    console.error('  ❌ Article 1 failed:', err.message);
  }

  console.log('');

  // ─────────────────────────────────────────────────────────────────
  // Article 2: Best Free Admin Dashboard Templates
  // Unsplash image: dashboard / analytics / screen
  // Photo by Carlos Muza — Unsplash (free license)
  // ─────────────────────────────────────────────────────────────────
  console.log('📰 Article 2: Best Free Admin Dashboard Templates...');
  try {
    const assetId2 = await uploadUnsplashImage(
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=630&fit=crop&q=80',
      'admin-dashboard-templates.jpg',
      'Dashboard Analytics Screen'
    );
    await attachThumbnail('best-free-admin-dashboard-templates-html-css-2025', assetId2);
  } catch (err) {
    console.error('  ❌ Article 2 failed:', err.message);
  }

  console.log('');

  // ─────────────────────────────────────────────────────────────────
  // Article 3: How to Make a Restaurant Website
  // Unsplash image: restaurant / food / dining
  // Photo by Yeh Xintong — Unsplash (free license)
  // ─────────────────────────────────────────────────────────────────
  console.log('📰 Article 3: How to Make a Restaurant Website...');
  try {
    const assetId3 = await uploadUnsplashImage(
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=630&fit=crop&q=80',
      'restaurant-website-guide.jpg',
      'Restaurant Interior'
    );
    await attachThumbnail('how-to-make-a-restaurant-website-step-by-step', assetId3);
  } catch (err) {
    console.error('  ❌ Article 3 failed:', err.message);
  }

  console.log('\n🎉 All done! Blog thumbnails uploaded.\n');
  console.log('Images from Unsplash — free to use, no copyright, no attribution required.');
  console.log('License: https://unsplash.com/license');
}

main().catch((err) => {
  console.error('❌ Script failed:', err.message);
  process.exit(1);
});
