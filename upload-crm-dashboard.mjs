import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function upload() {
  console.log('🚀 Starting CRM Dashboard upload...');

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
    `*[_type == "template" && slug.current == "crm-pro-premium-customer-relationship-management-dashboard"][0]{ _id }`
  );
  if (existingTemplate?._id) {
    console.log('⚠️  Template already exists:', existingTemplate._id);
    return;
  }

  // Step 3: Create template document
  const template = await client.create({
    _type: 'template',
    title: 'CRM Pro — Premium Customer Relationship Management Dashboard',
    slug: { _type: 'slug', current: 'crm-pro-premium-customer-relationship-management-dashboard' },
    description: `CRM Pro is an elite, high-density single-page HTML dashboard designed for modern sales teams and customer-focused enterprises. It packs a full-featured CRM experience into a lightning-fast, framework-free codebase. Key modules include a comprehensive revenue overview with Chart.js, a visual deal pipeline for opportunity tracking, and a powerful customer directory with search and filtering capabilities. The template features a premium dark/light mode toggle, smooth sidebar interactions, and a polished Enterprise UI aesthetic using the Inter font family. Built with pure HTML5, CSS3, and Vanilla JavaScript, CRM Pro offers extreme reliability and elite Core Web Vitals performance. It is the perfect technical foundation for developers building internal tools, sales dashboards, or custom CRM solutions. Available exclusively on TemplateLayer: https://templatelayer.com/`,
    seoTitle: 'CRM Pro — Professional Single-Page CRM Dashboard HTML Template',
    seoDescription: 'High-performance CRM dashboard HTML template. Features sales pipeline, customer management, and revenue analytics. Fully responsive, dark mode, and SEO-optimized.',
    category: { _type: 'reference', _ref: categoryId },
    pricingType: 'premium',
    price: '$29',
    technologies: [
      'HTML5 (Single-page Dashboard)',
      'CSS3 (Flexbox/Grid)',
      'Vanilla JavaScript',
      'Chart.js Visualization',
      'Google Fonts (Inter)',
      'Font Awesome 6',
    ],
    features: [
      'Sophisticated Single-page CRM Dashboard architecture',
      'Real-time Data Visualization with Chart.js',
      'Interactive Sales Pipeline tracking UI',
      'Advanced Customer Data Table with filters',
      'Premium Dark and Light mode theme support',
      'Responsive Sidebar and Mobile-optimized header',
      'High-performance codebase (Zero Frameworks)',
      'Clean Enterprise UI design aesthetic',
      'Easy branding with global CSS custom properties',
      'SEO-friendly semantic HTML5 structure',
    ],
    tags: [
      'crm dashboard',
      'customer relationship management',
      'sales pipeline UI',
      'saas dashboard template',
      'admin panel HTML',
      'premium crm design',
      'responsive dashboard',
      'business management tool',
      'vanilla js crm',
      'data visualization template',
    ],
    isFeatured: false,
    order: 18,
  });

  console.log('✅ Template uploaded successfully!');
  console.log('   ID   :', template._id);
  console.log('   Slug : crm-pro-premium-customer-relationship-management-dashboard');
  console.log('   Cat  :', categoryId);
  console.log('\n🎉 Done!');
}

upload().catch((err) => {
  console.error('❌ Upload failed:', err.message);
  process.exit(1);
});
