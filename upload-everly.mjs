import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function upload() {
  console.log('🚀 Starting Everly Wedding upload...');

  // Step 1: Find or create "Wedding" category
  const existing = await client.fetch(
    `*[_type == "category" && title == "Wedding"][0]{ _id }`
  );

  let categoryId;
  if (existing?._id) {
    categoryId = existing._id;
    console.log('✅ Category already exists:', categoryId);
  } else {
    const cat = await client.create({
      _type: 'category',
      title: 'Wedding',
      slug: { _type: 'slug', current: 'wedding' },
      categoryType: 'template',
      description: 'Elegant, romantic, and sophisticated templates for weddings, anniversaries, and special event planning.',
      order: 90,
    });
    categoryId = cat._id;
    console.log('✅ Created category:', categoryId);
  }

  // Step 2: Skip if already uploaded
  const existingTemplate = await client.fetch(
    `*[_type == "template" && slug.current == "everly-premium-multipage-wedding-template"][0]{ _id }`
  );
  if (existingTemplate?._id) {
    console.log('⚠️  Template already exists:', existingTemplate._id);
    return;
  }

  // Step 3: Create template document
  const template = await client.create({
    _type: 'template',
    title: 'Everly — Premium Multipage Wedding & Events Template',
    slug: { _type: 'slug', current: 'everly-premium-multipage-wedding-template' },
    description: `Everly is a sophisticated and comprehensive multi-page HTML template designed for modern couples and wedding planners. With 8 meticulously crafted pages including an elegant Homepage, Story/About Us, detailed Wedding information, interactive RSVP module, and a stunning Gallery, Everly provides everything needed to share your special day. The template features a timeless romantic aesthetic with soft typography, smooth animations, and a fully responsive grid. It includes a comprehensive blog system for sharing updates, a functional contact area, and dedicated sections for bridal parties and registries. Built with clean HTML5/CSS3 and optimized for high-performance, Everly is as fast as it is beautiful. Available exclusively on TemplateLayer: https://templatelayer.com/`,
    seoTitle: 'Everly — 8-Page Premium Multipage Wedding & Event HTML Template',
    seoDescription: 'Elegant 8-page multi-page wedding HTML template. Features RSVP form, story timeline, gallery, and blog. Perfectly responsive and romantic design.',
    category: { _type: 'reference', _ref: categoryId },
    pricingType: 'premium',
    price: '$25',
    technologies: [
      'HTML5 (Multipage)',
      'CSS3 (Animations)',
      'Vanilla JavaScript',
      'Google Fonts',
      'Modernizr.js',
    ],
    features: [
      '8 Professional Pages: Home, Story, Wedding, RSVP, Gallery, Blog, Details, Contact',
      'Elegant RSVP form with customized input fields',
      'Sophisticated Story Timeline for couples',
      'Full-screen Gallery with lightbox support',
      'Dedicated Wedding Details page with dress code and map',
      'Comprehensive Blog system with single-post layouts',
      'Smooth scroll-reveal animations and transitions',
      'Timeless typography and romantic color palette',
      '100% Mobile Responsive design',
      'SEO Optimized with clean semantic structure',
      'Pure Vanilla JS — zero heavy framework dependencies',
    ],
    tags: [
      'wedding template',
      'multipage wedding website',
      'romantic event template',
      'RSVP website template',
      'wedding gallery HTML',
      'couple story template',
      'premium wedding UI',
      'wedding planner website',
      'sophisticated event template',
      'responsive wedding page',
    ],
    isFeatured: false,
    order: 10,
  });

  console.log('✅ Template uploaded successfully!');
  console.log('   ID   :', template._id);
  console.log('   Slug : everly-premium-multipage-wedding-template');
  console.log('   Cat  :', categoryId);
  console.log('\n🎉 Done!');
}

upload().catch((err) => {
  console.error('❌ Upload failed:', err.message);
  process.exit(1);
});
