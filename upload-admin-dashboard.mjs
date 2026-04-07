import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function upload() {
  console.log('🚀 Starting Admin Dashboard upload...');

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
    `*[_type == "template" && slug.current == "admin-dashboard-premium-saas-backend-template"][0]{ _id }`
  );
  if (existingTemplate?._id) {
    console.log('⚠️  Template already exists:', existingTemplate._id);
    return;
  }

  // Step 3: Create template document
  const template = await client.create({
    _type: 'template',
    title: 'AdminPro — Premium Admin Dashboard Template',
    slug: { _type: 'slug', current: 'admin-dashboard-premium-saas-backend-template' },
    description: `AdminPro is a state-of-the-art multi-page HTML dashboard template meticulously crafted for SaaS backends, e-commerce management, and enterprise internal systems. With 7 specialized pages—including a high-density Overview dashboard, Order tracking, Product inventory, User management, and comprehensive Settings—it provides a robust foundation for any web application. The design language is clean, professional, and data-centric, utilizing a sophisticated gray-scale palette with focused primary accents for maximum readability. Built with pure HTML5, CSS3, and Vanilla JavaScript, AdminPro ensures elite performance and seamless mobile responsiveness without the overhead of heavy frameworks. Ideal for developers needing a premium, production-ready starting point for their next management tool. Available exclusively on TemplateLayer: https://templatelayer.com/`,
    seoTitle: 'AdminPro — Modern Admin Dashboard HTML Template with 7 Pages',
    seoDescription: 'Premium 7-page admin dashboard HTML template. Features order management, user directory, and product inventory. Fully responsive and framework-free.',
    category: { _type: 'reference', _ref: categoryId },
    pricingType: 'premium',
    price: '$29',
    technologies: [
      'HTML5 (Dashboard Layout)',
      'CSS3 (Custom Properties)',
      'Vanilla JavaScript',
      'Google Fonts (Inter)',
      'Data Tables (UI)',
      'SVG Components',
    ],
    features: [
      '7 Production-ready Dashboard Pages: Home, Orders, Products, Users, Settings, Login, Register',
      'Enterprise-grade Data Table and List views',
      'Clean, Modern SaaS Dashboard aesthetic',
      'Fully Responsive Sidebar and Navigation systems',
      'High-performance codebase (Zero Frameworks)',
      'Pre-built Authentication (Login/Register) UI flows',
      'Search and Filter interface components',
      'Smooth, professional transition animations',
      'Easy branding with global CSS variables',
      'SEO-friendly semantic HTML structure',
    ],
    tags: [
      'admin dashboard',
      'saas backend template',
      'ecommerce dashboard',
      'user management UI',
      'inventory management template',
      'admin landing page',
      'premium dashboard design',
      'responsive admin panel',
      'vanilla js dashboard',
      'saas UI kit',
    ],
    isFeatured: false,
    order: 17,
  });

  console.log('✅ Template uploaded successfully!');
  console.log('   ID   :', template._id);
  console.log('   Slug : admin-dashboard-premium-saas-backend-template');
  console.log('   Cat  :', categoryId);
  console.log('\n🎉 Done!');
}

upload().catch((err) => {
  console.error('❌ Upload failed:', err.message);
  process.exit(1);
});
