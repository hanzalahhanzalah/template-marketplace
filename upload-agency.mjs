import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function upload() {
  console.log('🚀 Starting Agency Starter upload...');

  // Step 1: Find or create "Agency" category
  const existing = await client.fetch(
    `*[_type == "category" && title == "Agency"][0]{ _id }`
  );

  let categoryId;
  if (existing?._id) {
    categoryId = existing._id;
    console.log('✅ Category already exists:', categoryId);
  } else {
    const cat = await client.create({
      _type: 'category',
      title: 'Agency',
      slug: { _type: 'slug', current: 'agency' },
      categoryType: 'template',
      description: 'Professional agency templates for creative, digital, marketing, and advertising firms.',
      order: 40,
    });
    categoryId = cat._id;
    console.log('✅ Created category:', categoryId);
  }

  // Step 2: Skip if already uploaded
  const existingTemplate = await client.fetch(
    `*[_type == "template" && slug.current == "agency-starter-premium-one-page-template"][0]{ _id }`
  );
  if (existingTemplate?._id) {
    console.log('⚠️  Template already exists:', existingTemplate._id);
    return;
  }

  // Step 3: Create template document
  const template = await client.create({
    _type: 'template',
    title: 'Nexus Agency — Premium One-Page Business Template',
    slug: { _type: 'slug', current: 'agency-starter-premium-one-page-template' },
    description: `Nexus Agency is a premium, marketplace-ready one-page creative agency website template featuring a stunning purple theme, glassmorphism effects, and modern professional design. This high-performance template includes 11 distinct sections: a full-screen Hero Slider with auto-carousel, About Us with experience highlights, Services cards with custom icons, filterable Portfolio grid, featured Case Studies, Team member profiles, Testimonials slider, and a clean Contact form area with Google Maps integration. Developed with pure HTML5, CSS3 (using Custom Properties), and Vanilla JS — making it extremely fast, easy to theme, and maintenance-free. Perfect for digital agencies, marketing firms, and creative studios looking for a bold online presence. Available exclusively on TemplateLayer: https://templatelayer.com/`,
    seoTitle: 'Nexus Agency — Premium Purple One-Page Creative Agency HTML Template',
    seoDescription: 'Premium one-page creative agency HTML template with purple theme, hero slider, filterable portfolio, and glassmorphism effects. Fast & responsive.',
    category: { _type: 'reference', _ref: categoryId },
    pricingType: 'premium',
    price: '$19',
    technologies: [
      'HTML5',
      'CSS3 (Glassmorphism)',
      'Vanilla JavaScript',
      'CSS Custom Properties',
      'SVG Icons',
      'Google Fonts',
    ],
    features: [
      'Premium One-Page Layout with deep purple theme',
      'Stunning Hero Slider with 3 auto-playing slides',
      'Trend-forward Glassmorphism visual effects',
      'Filterable Portfolio Grid (Website, Branding, Mobile App)',
      'Smooth Scroll Navigation & Reveal Animations',
      'Interactive Team member cards with social overlays',
      'Testimonial Carousel with automatic rotation',
      'Clean Services grid with custom SVG iconography',
      'Featured Project/Case Study cards',
      'Contact section with Google Maps integration',
      '100% Mobile Responsive & Cross-Browser Compatible',
      'Lightweight — No jQuery or external frameworks required',
    ],
    tags: [
      'agency template',
      'one page HTML template',
      'creative agency website',
      'purple theme template',
      'glassmorphism HTML',
      'business landing page',
      'portfolio landing page',
      'marketing agency template',
      'modern agency website',
      'responsive one page template',
    ],
    isFeatured: false,
    order: 4,
  });

  console.log('✅ Template uploaded successfully!');
  console.log('   ID   :', template._id);
  console.log('   Slug :', 'agency-starter-premium-one-page-template');
  console.log('   Cat  :', categoryId);
  console.log('\n🎉 Done!');
}

upload().catch((err) => {
  console.error('❌ Upload failed:', err.message);
  process.exit(1);
});
