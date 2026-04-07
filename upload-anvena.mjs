import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function upload() {
  console.log('🚀 Starting Anvena upload...');

  // Step 1: Find or create "Saas" category
  const existing = await client.fetch(
    `*[_type == "category" && title == "Saas"][0]{ _id }`
  );

  let categoryId;
  if (existing?._id) {
    categoryId = existing._id;
    console.log('✅ Category already exists:', categoryId);
  } else {
    const cat = await client.create({
      _type: 'category',
      title: 'Saas',
      slug: { _type: 'slug', current: 'saas' },
      categoryType: 'template',
      description: 'Clean, modern landing pages and dashboards for software-as-a-service startups.',
      order: 70,
    });
    categoryId = cat._id;
    console.log('✅ Created category:', categoryId);
  }

  // Step 2: Skip if already uploaded
  const existingTemplate = await client.fetch(
    `*[_type == "template" && slug.current == "anvena-minimal-saas-landing-page-template"][0]{ _id }`
  );
  if (existingTemplate?._id) {
    console.log('⚠️  Template already exists:', existingTemplate._id);
    return;
  }

  // Step 3: Create template document
  const template = await client.create({
    _type: 'template',
    title: 'Anvena — Minimal SaaS Landing Page Template',
    slug: { _type: 'slug', current: 'anvena-minimal-saas-landing-page-template' },
    description: `Anvena is a clean, minimal, and high-conversion landing page template designed specifically for SaaS startups and digital products. It features a modern design focused on clarity and user engagement, with sections for value propositions, feature highlights, and clear calls-to-action. Built with professional CSS structure (including Variables) and lightweight Vanilla JS, it ensures fast loading times and easy customization. Anvena follows modern SaaS design trends with smooth animations and a mobile-first responsive layout. Perfect for launching MVPs or refreshing a software product's web presence. Available exclusively on TemplateLayer: https://templatelayer.com/`,
    seoTitle: 'Anvena — Clean & Minimal SaaS Landing Page HTML Template',
    seoDescription: 'Premium minimal SaaS landing page HTML template. Responsive design, fast-loading, and optimized for conversions. Pure HTML/CSS/JS.',
    category: { _type: 'reference', _ref: categoryId },
    pricingType: 'premium',
    price: '$19',
    technologies: [
      'HTML5',
      'CSS3 (Flexbox)',
      'Vanilla JavaScript',
      'Google Fonts',
      'SVG Icons',
    ],
    features: [
      'Minimalist SaaS-focused design',
      'High-conversion Hero Section',
      'Feature showcases with clean typography',
      'Responsive navigation and mobile menu',
      'Optimized for fast performance and high Core Web Vitals',
      'CSS Variables for rapid branding changes',
      'Semantic HTML structure for SEO',
      'Lightweight — No heavy dependencies',
    ],
    tags: [
      'saas landing page',
      'software website template',
      'minimalist landing page',
      'startup HTML template',
      'digital product website',
      'clean saas template',
      'responsive landing page',
      'high conversion template',
      'modern software website',
      'vanilla js landing page',
    ],
    isFeatured: false,
    order: 8,
  });

  console.log('✅ Template uploaded successfully!');
  console.log('   ID   :', template._id);
  console.log('   Slug : anvena-minimal-saas-landing-page-template');
  console.log('   Cat  :', categoryId);
  console.log('\n🎉 Done!');
}

upload().catch((err) => {
  console.error('❌ Upload failed:', err.message);
  process.exit(1);
});
