import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function upload() {
  console.log('🚀 Starting Elegant Wedding upload...');

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
    `*[_type == "template" && slug.current == "elegant-wedding-minimalist-multipage-template"][0]{ _id }`
  );
  if (existingTemplate?._id) {
    console.log('⚠️  Template already exists:', existingTemplate._id);
    return;
  }

  // Step 3: Create template document
  const template = await client.create({
    _type: 'template',
    title: 'Elegant Wedding — Minimalist Multipage Celebration Template',
    slug: { _type: 'slug', current: 'elegant-wedding-minimalist-multipage-template' },
    description: `Elegant Wedding is a premium, minimalist multi-page HTML template designed for couples who value clean aesthetics and sophisticated storytelling. With 6 full-featured pages—including Home, Our Story, Services, Gallery, RSVP, and Contact—this template provides a complete digital experience for any wedding or special event. It features a modern, airy design with elegant typography and smooth, subtle animations that enhance the romantic atmosphere. Built with pure HTML5, CSS3, and Vanilla JavaScript, it ensures high-speed performance and a seamless mobile-first responsive experience. Elegant Wedding is perfect for couples, event planners, and photographers looking for a timeless online presence. Available exclusively on TemplateLayer: https://templatelayer.com/`,
    seoTitle: 'Elegant Wedding — 6-Page Minimalist Multipage Wedding HTML Template',
    seoDescription: 'Premium minimalist wedding HTML template with 6 pages. Includes RSVP module, story timeline, and elegant galleries. Fully responsive and fast.',
    category: { _type: 'reference', _ref: categoryId },
    pricingType: 'premium',
    price: '$25',
    technologies: [
      'HTML5 (Multipage)',
      'CSS3 (Flexbox/Grid)',
      'Vanilla JavaScript',
      'Google Fonts',
      'SVG Icons',
    ],
    features: [
      '6 Dedicated Pages: Home, Our Story, Services, Gallery, RSVP, Contact',
      'Minimalist, Sophisticated design aesthetic',
      'Interactive RSVP Form with custom validation',
      'Clean Story Timeline for showcasing couple journeys',
      'Airy and elegant Gallery layout with lightbox support',
      'Services section for vendors and wedding details',
      'Mobile-first Responsive Navigation',
      'Lightning-fast performance with zero frameworks',
      'SEO-friendly semantic HTML structure',
      'Easily customizable via CSS Variables',
    ],
    tags: [
      'elegant wedding template',
      'minimalist wedding website',
      'multipage event template',
      'RSVP website UI',
      'wedding story template',
      'clean event landing page',
      'premium wedding UI',
      'responsive wedding template',
      'vanilla js wedding page',
      'timeless wedding design',
    ],
    isFeatured: false,
    order: 14,
  });

  console.log('✅ Template uploaded successfully!');
  console.log('   ID   :', template._id);
  console.log('   Slug : elegant-wedding-minimalist-multipage-template');
  console.log('   Cat  :', categoryId);
  console.log('\n🎉 Done!');
}

upload().catch((err) => {
  console.error('❌ Upload failed:', err.message);
  process.exit(1);
});
