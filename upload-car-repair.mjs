import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function upload() {
  console.log('🚀 Starting Car Repair upload...');

  // Step 1: Find or create "Automotive" category
  const existing = await client.fetch(
    `*[_type == "category" && title == "Automotive"][0]{ _id }`
  );

  let categoryId;
  if (existing?._id) {
    categoryId = existing._id;
    console.log('✅ Category already exists:', categoryId);
  } else {
    const cat = await client.create({
      _type: 'category',
      title: 'Automotive',
      slug: { _type: 'slug', current: 'automotive' },
      categoryType: 'template',
      description: 'Rugged and professional templates for auto repair shops, car detailing, and automotive services.',
      order: 80,
    });
    categoryId = cat._id;
    console.log('✅ Created category:', categoryId);
  }

  // Step 2: Skip if already uploaded
  const existingTemplate = await client.fetch(
    `*[_type == "template" && slug.current == "auto-fix-premium-car-repair-landing-page-template"][0]{ _id }`
  );
  if (existingTemplate?._id) {
    console.log('⚠️  Template already exists:', existingTemplate._id);
    return;
  }

  // Step 3: Create template document
  const template = await client.create({
    _type: 'template',
    title: 'AutoFix — Premium Car Repair & Automotive Template',
    slug: { _type: 'slug', current: 'auto-fix-premium-car-repair-landing-page-template' },
    description: `AutoFix is a professional, high-performance landing page template designed specifically for car repair shops, automotive mechanics, and detailing services. It features a rugged, trust-inspiring design with specialized sections for service listings, booking appointments, customer testimonials, and a detailed about us area. Built with search engine optimization in mind, AutoFix ensures your automotive business stands out with fast loading times and a mobile-responsive layout. Developed using pure HTML5, CSS3, and Vanilla JS, it offers a maintenance-free solution that is easy to customize via CSS Variables. Perfect for local shops looking for a premium online presence. Available exclusively on TemplateLayer: https://templatelayer.com/`,
    seoTitle: 'AutoFix — Modern Automotive & Car Repair Shop HTML Template',
    seoDescription: 'Premium car repair and automotive shop HTML template. Features service booking UI, testimonials, and rugged responsive design. Fast & SEO friendly.',
    category: { _type: 'reference', _ref: categoryId },
    pricingType: 'premium',
    price: '$19',
    technologies: [
      'HTML5',
      'CSS3 (Variables)',
      'Vanilla JavaScript',
      'FontAwesome Icons',
      'Google Fonts',
    ],
    features: [
      'Rugged, Industry-specific professional design',
      'Service Booking / Appointment CTAs',
      'Comprehensive Service Grid with custom icons',
      'Interactive Customer Testimonials section',
      'Working Contact Form UI with Google Maps integration',
      'Mobile-first Responsive Navigation',
      'Optimized for Local SEO performance',
      'Pure Vanilla JavaScript — zero dependencies',
      'Easy customization with CSS design tokens',
    ],
    tags: [
      'car repair template',
      'automotive website',
      'mechanic landing page',
      'auto shop HTML template',
      'detailing website template',
      'car service landing page',
      'professional auto repair',
      'local business template',
      'responsive mechanic website',
      'premium automotive UI',
    ],
    isFeatured: false,
    order: 9,
  });

  console.log('✅ Template uploaded successfully!');
  console.log('   ID   :', template._id);
  console.log('   Slug : auto-fix-premium-car-repair-landing-page-template');
  console.log('   Cat  :', categoryId);
  console.log('\n🎉 Done!');
}

upload().catch((err) => {
  console.error('❌ Upload failed:', err.message);
  process.exit(1);
});
