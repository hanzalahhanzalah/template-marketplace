import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function upload() {
  console.log('🚀 Starting Urban Bites upload...');

  // Step 1: Find or create "Restaurant" category
  const existing = await client.fetch(
    `*[_type == "category" && title == "Restaurant"][0]{ _id }`
  );

  let categoryId;
  if (existing?._id) {
    categoryId = existing._id;
    console.log('✅ Category already exists:', categoryId);
  } else {
    const cat = await client.create({
      _type: 'category',
      title: 'Restaurant',
      slug: { _type: 'slug', current: 'restaurant' },
      categoryType: 'template',
      description: 'Elegant and appetizing templates for restaurants, cafes, bars, and catering businesses.',
      order: 10,
    });
    categoryId = cat._id;
    console.log('✅ Created category:', categoryId);
  }

  // Step 2: Skip if already uploaded
  const existingTemplate = await client.fetch(
    `*[_type == "template" && slug.current == "urban-bites-premium-restaurant-dining-template"][0]{ _id }`
  );
  if (existingTemplate?._id) {
    console.log('⚠️  Template already exists:', existingTemplate._id);
    return;
  }

  // Step 3: Create template document
  const template = await client.create({
    _type: 'template',
    title: 'Urban Bites — Premium Restaurant & Dining Template',
    slug: { _type: 'slug', current: 'urban-bites-premium-restaurant-dining-template' },
    description: `Urban Bites is a state-of-the-art multi-page HTML template tailored for modern culinary businesses seeking a premium online presence. With 6 carefully crafted pages—including a high-impact Homepage, comprehensive Menu, intuitive Reservation UI, and dedicated Story and Contact pages—Urban Bites offers a complete digital solution for restaurants and cafes. The template prioritizes visual storytelling with large imagery, elegant typography, and smooth micro-interactions. Built using vanilla HTML5, CSS3, and JavaScript, it guarantees elite performance scores and a flawess mobile-first experience. Whether it's for fine dining or an urban bistro, Urban Bites provides the perfect blend of style and functionality. Available exclusively on TemplateLayer: https://templatelayer.com/`,
    seoTitle: 'Urban Bites — Modern Restaurant HTML Template with Reservation UI',
    seoDescription: 'Premium 6-page restaurant HTML template. Features digital menus, reservation forms, and story pages. Fully responsive, ultra-fast, and SEO-optimized.',
    category: { _type: 'reference', _ref: categoryId },
    pricingType: 'premium',
    price: '$29',
    technologies: [
      'HTML5 (Multipage)',
      'CSS3 (Flexbox/Grid)',
      'Vanilla JavaScript',
      'Google Fonts',
      'SVG Icons',
    ],
    features: [
      '6 Production-ready Pages: Home, Menu, Reservation, About, Contact, 404',
      'Elegant and modern Culinary Design aesthetic',
      'Interactive Reservation Form interface',
      'Beautifully structured Digital Food Menu',
      'High-performance codebase (Zero Frameworks)',
      '100% Responsive and Mobile-optimized',
      'SEO-friendly semantic HTML5 structure',
      'Smooth scroll and subtle hover micro-animations',
      'Easy branding with global CSS custom properties',
      'Lightweight and fast loading',
    ],
    tags: [
      'restaurant template',
      'dining website HTML',
      'food menu template',
      'reservation system UI',
      'cafe website template',
      'gastronomy landing page',
      'premium restaurant UI',
      'responsive dining template',
      'vanilla js restaurant',
      'culinary portfolio',
    ],
    isFeatured: false,
    order: 15,
  });

  console.log('✅ Template uploaded successfully!');
  console.log('   ID   :', template._id);
  console.log('   Slug : urban-bites-premium-restaurant-dining-template');
  console.log('   Cat  :', categoryId);
  console.log('\n🎉 Done!');
}

upload().catch((err) => {
  console.error('❌ Upload failed:', err.message);
  process.exit(1);
});
