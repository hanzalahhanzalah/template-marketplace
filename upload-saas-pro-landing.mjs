import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function upload() {
  console.log('🚀 Starting SaaS Pro Landing upload...');

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
      description: 'Professional dashboard, landing page, and UI kit templates for SaaS and software startups.',
      order: 20,
    });
    categoryId = cat._id;
    console.log('✅ Created category:', categoryId);
  }

  // Step 2: Skip if already uploaded
  const existingTemplate = await client.fetch(
    `*[_type == "template" && slug.current == "saas-pro-landing-premium-onepage-template"][0]{ _id }`
  );
  if (existingTemplate?._id) {
    console.log('⚠️  Template already exists:', existingTemplate._id);
    return;
  }

  // Step 3: Create template document
  const template = await client.create({
    _type: 'template',
    title: 'SaaS Pro Landing — Modern Software Landing Page',
    slug: { _type: 'slug', current: 'saas-pro-landing-premium-onepage-template' },
    description: `SaaS Pro Landing is a high-performance, single-page professional landing kit designed for modern software products, mobile apps, and digital services. It features a meticulously crafted hero section, dynamic feature grids, a professional pricing table, and a conversion-focused call-to-action area. The design aesthetic is clean, minimal, and premium, utilizing a sophisticated color palette and elite typography. Built with 100% semantic HTML5, CSS3, and Vanilla JavaScript, SaaS Pro Landing ensures lightning-fast loading speeds and perfect mobile responsiveness across all devices. Ideal for founders and developers seeking a polished, production-ready frontend solution that prioritizes core web vitals and user experience. Available exclusively on TemplateLayer: https://templatelayer.com/`,
    seoTitle: 'SaaS Pro Landing — Premium Single-Page Software HTML Template',
    seoDescription: 'High-performance single-page SaaS landing page HTML template. Features feature grids, pricing tables, and CTA sections. Fully responsive, clean design, and SEO-optimized.',
    category: { _type: 'reference', _ref: categoryId },
    pricingType: 'premium',
    price: '$19',
    technologies: [
      'HTML5 (Single-page Layout)',
      'CSS3 (Flexbox/Grid)',
      'Vanilla JavaScript',
      'Google Fonts (Inter)',
      'SVG Components',
      'Intersection Observer Animations',
    ],
    features: [
      'Sleek Single-page Professional Landing architecture',
      'High-conversion Hero and Call-to-action sections',
      'Dynamic Feature showcase and Service cards',
      'Professional Pricing Table with plan details',
      'Fully Responsive and Mobile-first navigation',
      'Zero Framework overhead (Superior Performance)',
      'Clean, Modern SaaS design aesthetic',
      'SEO-friendly semantic HTML5 structure',
      'Smooth scroll and Micro-interactions',
      'Easy branding with global CSS custom properties',
    ],
    tags: [
      'saas landing page',
      'software landing kit',
      'startup website template',
      'single page saas',
      'premium software design',
      'responsive landing page',
      'business automation landing',
      'vanilla js startup',
      'conversion optimized',
      'modern landing page',
    ],
    isFeatured: false,
    order: 24,
  });

  console.log('✅ Template uploaded successfully!');
  console.log('   ID   :', template._id);
  console.log('   Slug : saas-pro-landing-premium-onepage-template');
  console.log('   Cat  :', categoryId);
  console.log('\n🎉 Done!');
}

upload().catch((err) => {
  console.error('❌ Upload failed:', err.message);
  process.exit(1);
});
