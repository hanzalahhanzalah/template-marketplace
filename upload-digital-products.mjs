import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function upload() {
  console.log('🚀 Starting Digital Products upload...');

  // Step 1: Find or create "Digital Marketplace" category
  const existing = await client.fetch(
    `*[_type == "category" && title == "Digital Marketplace"][0]{ _id }`
  );

  let categoryId;
  if (existing?._id) {
    categoryId = existing._id;
    console.log('✅ Category already exists:', categoryId);
  } else {
    const cat = await client.create({
      _type: 'category',
      title: 'Digital Marketplace',
      slug: { _type: 'slug', current: 'digital-marketplace' },
      categoryType: 'template',
      description: 'Comprehensive templates for selling digital assets, software, graphics, and online courses.',
      order: 100,
    });
    categoryId = cat._id;
    console.log('✅ Created category:', categoryId);
  }

  // Step 2: Skip if already uploaded
  const existingTemplate = await client.fetch(
    `*[_type == "template" && slug.current == "digi-store-premium-digital-products-marketplace-template"][0]{ _id }`
  );
  if (existingTemplate?._id) {
    console.log('⚠️  Template already exists:', existingTemplate._id);
    return;
  }

  // Step 3: Create template document
  const template = await client.create({
    _type: 'template',
    title: 'DigiStore — Premium Digital Products Marketplace Template',
    slug: { _type: 'slug', current: 'digi-store-premium-digital-products-marketplace-template' },
    description: `DigiStore is a powerful, multi-page HTML template designed for creators looking to launch their own digital marketplace. Whether you are selling eBooks, software, stock photos, or online courses, DigiStore provides a professional and trust-inspiring platform. With 7 dedicated pages—including a feature-rich Homepage, extensive Product Grids, detailed Product View, and a functional Shopping Cart UI—it covers the entire user journey from discovery to checkout. The template features a modern, clean aesthetic with a focus on product visibility and user experience. Built with pure HTML5, CSS3, and Vanilla JavaScript, it offers top-tier performance and easy customization without framework overhead. Available exclusively on TemplateLayer: https://templatelayer.com/`,
    seoTitle: 'DigiStore — Modern Digital Marketplace HTML Template with Cart UI',
    seoDescription: 'Premium 7-page digital products marketplace HTML template. Features product details, cart UI, and blog. Perfectly responsive and optimized for conversions.',
    category: { _type: 'reference', _ref: categoryId },
    pricingType: 'premium',
    price: '$29',
    technologies: [
      'HTML5 (Multipage)',
      'CSS3 (Custom Properties)',
      'Vanilla JavaScript',
      'Google Fonts',
      'SVG Icons',
    ],
    features: [
      '7 Marketplace-ready Pages: Home, Products, Product Detail, Cart, Blog, About, Contact',
      'Timeless and clean UI focused on digital asset sales',
      'Interactive Product Grid with filtering capabilities',
      'Comprehensive Product Detail page with features and reviews',
      'Functional Shopping Cart UI (frontend logic only)',
      'Mobile-first Responsive Design for on-the-go browsing',
      'Fast performance with zero heavy framework dependencies',
      'SEO-friendly semantic HTML structure',
      'Easy customization with global CSS variables',
      'Modern typography and intuitive layout',
    ],
    tags: [
      'digital marketplace template',
      'software store HTML',
      'digital product website',
      'cart ui template',
      'e-commerce landing page',
      'creator marketplace UI',
      'premium digital store',
      'responsive marketplace template',
      'vanilla js marketplace',
      'digital asset store',
    ],
    isFeatured: false,
    order: 12,
  });

  console.log('✅ Template uploaded successfully!');
  console.log('   ID   :', template._id);
  console.log('   Slug : digi-store-premium-digital-products-marketplace-template');
  console.log('   Cat  :', categoryId);
  console.log('\n🎉 Done!');
}

upload().catch((err) => {
  console.error('❌ Upload failed:', err.message);
  process.exit(1);
});
