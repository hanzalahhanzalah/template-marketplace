import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function upload() {
  console.log('🚀 Starting CleanStream SaaS Landing upload...');

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
    `*[_type == "template" && slug.current == "clean-stream-modern-saas-landing-template"][0]{ _id }`
  );
  if (existingTemplate?._id) {
    console.log('⚠️  Template already exists:', existingTemplate._id);
    return;
  }

  // Step 3: Create template document
  const template = await client.create({
    _type: 'template',
    title: 'CleanStream — Modern SaaS Landing Page',
    slug: { _type: 'slug', current: 'clean-stream-modern-saas-landing-template' },
    description: `CleanStream is a high-performance, single-page HTML landing kit meticulously designed for software startups, SaaS products, and digital entrepreneurs who prioritize speed, clarity, and conversion. This template features a visually stunning hero section, dynamic feature grids, a professional pricing matrix, and integrated trust modules like testimonials and FAQ sections. The design aesthetic is ultra-clean and modern, utilizing a sophisticated typography system and subtle micro-animations to create a premium user experience. Built with pure HTML5, CSS3, and Vanilla JavaScript, CleanStream ensures elite-level performance and perfect mobile responsiveness without the overhead of heavy frameworks. It's the perfect technical foundation for launching a world-class software landing page in minutes. Available exclusively on TemplateLayer: https://templatelayer.com/`,
    seoTitle: 'CleanStream — Professional Single-Page SaaS HTML Template',
    seoDescription: 'High-performance single-page SaaS landing page HTML template. Features feature grids, pricing tables, and FAQ sections. Fully responsive, clean design, and SEO-optimized.',
    category: { _type: 'reference', _ref: categoryId },
    pricingType: 'premium',
    price: '$19',
    technologies: [
      'HTML5 (Single-page Layout)',
      'CSS3 (Custom Transitions)',
      'Vanilla JavaScript',
      'Google Fonts (Inter)',
      'SVG Support',
      'Intersection Observer Animations',
    ],
    features: [
      'Ultra-clean Single-page Professional Landing architecture',
      'High-conversion Hero and Trust-building sections',
      'Dynamic Feature showcase and Benefit cards',
      'Professional Pricing Table and FAQ modules',
      'Fully Responsive and Mobile-first design',
      'Zero Framework overhead (Superior Performance)',
      'Sleek, Modern SaaS design aesthetic',
      'SEO-friendly semantic HTML5 structure',
      'Smooth scroll and Micro-interactions',
      'Global CSS customization for quick branding',
    ],
    tags: [
      'clean saas landing',
      'modern software template',
      'startup landing page',
      'single page saas',
      'premium software design',
      'responsive landing page',
      'software business website',
      'vanilla js startup',
      'conversion optimized',
      'minimalist saas design',
    ],
    isFeatured: false,
    order: 25,
  });

  console.log('✅ Template uploaded successfully!');
  console.log('   ID   :', template._id);
  console.log('   Slug : clean-stream-modern-saas-landing-template');
  console.log('   Cat  :', categoryId);
  console.log('\n🎉 Done!');
}

upload().catch((err) => {
  console.error('❌ Upload failed:', err.message);
  process.exit(1);
});
