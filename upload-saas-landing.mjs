import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function upload() {
  console.log('🚀 Starting SaaS Landing Template upload...');

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
    `*[_type == "template" && slug.current == "saas-landing-premium-modern-software-template"][0]{ _id }`
  );
  if (existingTemplate?._id) {
    console.log('⚠️  Template already exists:', existingTemplate._id);
    return;
  }

  // Step 3: Create template document
  const template = await client.create({
    _type: 'template',
    title: 'SaaS Landing — Premium Modern Software Template',
    slug: { _type: 'slug', current: 'saas-landing-premium-modern-software-template' },
    description: `SaaS Landing is a comprehensive, multi-page HTML template meticulously designed for high-growth software companies, tech startups, and digital service providers. It features 7 specialized pages including a conversion-focused Home page, a detailed Pricing matrix, a professional Documentation portal, and essential legal pages. The design language is modern, vibrant, and conversion-optimized, with smooth animations and a refined typography system. Built with 100% semantic HTML5, CSS3, and Vanilla JavaScript, it ensures elite-level performance and effortless mobile responsiveness without the overhead of complex frameworks. Perfect for developers and founders looking to launch a polished, world-class online presence for their next software product. Available exclusively on TemplateLayer: https://templatelayer.com/`,
    seoTitle: 'SaaS Landing — Professional 7-Page Software Startup HTML Template',
    seoDescription: 'Premium 7-page SaaS landing page HTML template. Features pricing, documentation, and contact sections. Fully responsive, high-performance, and SEO-optimized.',
    category: { _type: 'reference', _ref: categoryId },
    pricingType: 'premium',
    price: '$25',
    technologies: [
      'HTML5 (Multi-page Architecture)',
      'CSS3 (Custom Transitions)',
      'Vanilla JavaScript',
      'Google Fonts (Outfit)',
      'SVG Support',
      'Responsiveness (Tailored Breakpoints)',
    ],
    features: [
      '7 Production-grade Pages: Home, Pricing, About, Documentation, Contact, Terms, Privacy',
      'Conversion-optimized Pricing and Plan modules',
      'Professional Documentation portal interface',
      'Modern, Sleek SaaS design aesthetic',
      'Fully Responsive and Mobile-first navigation',
      'Zero Framework overhead (Lightning Fast)',
      'SEO-friendly semantic HTML5 structure',
      'Interactive FAQ and Accordion components',
      'Smooth scroll and Micro-interactions',
      'Global CSS customization for quick branding',
    ],
    tags: [
      'saas landing page',
      'software dashboard',
      'startup template',
      'multipage saas website',
      'documentation template',
      'pricing table html',
      'premium software design',
      'responsive saas landing',
      'vanilla js startup',
      'conversion optimized',
    ],
    isFeatured: false,
    order: 22,
  });

  console.log('✅ Template uploaded successfully!');
  console.log('   ID   :', template._id);
  console.log('   Slug : saas-landing-premium-modern-software-template');
  console.log('   Cat  :', categoryId);
  console.log('\n🎉 Done!');
}

upload().catch((err) => {
  console.error('❌ Upload failed:', err.message);
  process.exit(1);
});
