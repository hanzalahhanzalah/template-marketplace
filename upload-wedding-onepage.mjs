import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function upload() {
  console.log('🚀 Starting Premium Wedding Onepage upload...');

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
      description: 'Elegant and romantic templates for weddings, invitations, and couple milestones.',
      order: 70,
    });
    categoryId = cat._id;
    console.log('✅ Created category:', categoryId);
  }

  // Step 2: Skip if already uploaded
  const existingTemplate = await client.fetch(
    `*[_type == "template" && slug.current == "eternal-love-premium-one-page-wedding-template"][0]{ _id }`
  );
  if (existingTemplate?._id) {
    console.log('⚠️  Template already exists:', existingTemplate._id);
    return;
  }

  // Step 3: Create template document
  const template = await client.create({
    _type: 'template',
    title: 'EternalLove — Premium One-Page Wedding Template',
    slug: { _type: 'slug', current: 'eternal-love-premium-one-page-wedding-template' },
    description: `EternalLove is a visually breathtaking one-page HTML template meticulously designed for modern couples, wedding invitations, and marital announcements. It features a seamless, emotionally-driven scrolling experience with dedicated sections for your personal "Love Story," a romantic photo gallery, event details with venue maps, and a streamlined RSVP interface. The design language utilizes soft, elegant colors and high-end typography to create a sense of premium luxury. Built with 100% semantic HTML5 and CSS3, EternalLove ensures ultra-fast loading across all devices, making it perfect for sharing your big day with friends and family worldwide. Completely framework-free for maximum compatibility and ease of customization. Available exclusively on TemplateLayer: https://templatelayer.com/`,
    seoTitle: 'EternalLove — Elegant One-Page Wedding HTML Template',
    seoDescription: 'Premium single-page wedding HTML template. Features RSVP form, story timeline, and photo gallery. Fully responsive, romantic design, and SEO-friendly.',
    category: { _type: 'reference', _ref: categoryId },
    pricingType: 'premium',
    price: '$15',
    technologies: [
      'HTML5 (Semantic Layout)',
      'CSS3 (Flexbox/Animations)',
      'Vanilla JavaScript',
      'Google Fonts (Cormorant Garamond)',
      'SVG Icons',
      'Responsiveness (Mobile-first)',
    ],
    features: [
      'Stunning One-Page scrolling architecture',
      'Beautiful Love Story timeline module',
      'Responsive RSVP Form UI components',
      'High-end Masonry Photo Gallery interface',
      'Elegant Event Information and Maps sections',
      'Pure Vanilla Code (Lightning Fast Performance)',
      'Romantic aesthetic with refined typography',
      'SEO-optimized semantic structure',
      'Custom micro-animations for emotional impact',
      'Global CSS customization for quick branding',
    ],
    tags: [
      'wedding template',
      'wedding invitation html',
      'single page wedding',
      'romantic website',
      'rsvp template',
      'couple story website',
      'marriage announcement',
      'premium wedding design',
      'one page landing',
      'responsive wedding site',
    ],
    isFeatured: false,
    order: 20,
  });

  console.log('✅ Template uploaded successfully!');
  console.log('   ID   :', template._id);
  console.log('   Slug : eternal-love-premium-one-page-wedding-template');
  console.log('   Cat  :', categoryId);
  console.log('\n🎉 Done!');
}

upload().catch((err) => {
  console.error('❌ Upload failed:', err.message);
  process.exit(1);
});
