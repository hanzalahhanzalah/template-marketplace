import { createClient } from '@sanity/client';
import https from 'https';
import http from 'http';

const client = createClient({ projectId: 'ath1uvh6', dataset: 'production', apiVersion: '2024-01-01', useCdn: false, token: process.env.SANITY_API_TOKEN });

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) return downloadImage(res.headers.location).then(resolve).catch(reject);
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function uploadAndAttach(unsplashUrl, filename, label, slug) {
  console.log(`\n📰 ${label}`);
  console.log(`  📥 Downloading image...`);
  const buffer = await downloadImage(unsplashUrl);
  const asset = await client.assets.upload('image', buffer, { filename, contentType: 'image/jpeg' });
  console.log(`  ✅ Uploaded: ${asset._id}`);
  const post = await client.fetch(`*[_type == "blogPost" && slug.current == $slug][0]{ _id }`, { slug });
  if (!post?._id) { console.log(`  ⚠️  Post not found: ${slug}`); return; }
  await client.patch(post._id).set({ thumbnail: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } }).commit();
  console.log(`  ✅ Thumbnail set → /blog/${slug}`);
}

async function main() {
  console.log('🖼️  Adding images to new articles (Unsplash — free license)\n');

  // Article 4: Wix vs Squarespace vs WordPress — laptop/website builder
  await uploadAndAttach(
    'https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&h=630&fit=crop&q=80',
    'website-builder-comparison.jpg',
    'Wix vs Squarespace vs WordPress',
    'wix-vs-squarespace-vs-wordpress-2025'
  );

  // Article 5: Portfolio HTML CSS — developer at desk coding
  await uploadAndAttach(
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop&q=80',
    'portfolio-html-css.jpg',
    'How to Create a Portfolio Website HTML CSS',
    'how-to-create-portfolio-website-html-css'
  );

  // Article 6: SaaS landing page templates — clean modern interface
  await uploadAndAttach(
    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=630&fit=crop&q=80',
    'saas-landing-page-templates.jpg',
    'Best Free SaaS Landing Page Templates',
    'best-free-saas-landing-page-html-templates-2025'
  );

  // Article 7: Namecheap vs GoDaddy — domain/internet/web
  await uploadAndAttach(
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=630&fit=crop&q=80',
    'domain-registrar-comparison.jpg',
    'Namecheap vs GoDaddy',
    'namecheap-vs-godaddy-2025-best-domain-registrar'
  );

  console.log('\n🎉 All images uploaded! (Source: Unsplash — free, no copyright required)');
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
