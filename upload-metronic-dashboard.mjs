import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function upload() {
  console.log('🚀 Starting Metronic Dashboard upload...');

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
    `*[_type == "template" && slug.current == "metronic-pro-premium-enterprise-dashboard-ui-suite"][0]{ _id }`
  );
  if (existingTemplate?._id) {
    console.log('⚠️  Template already exists:', existingTemplate._id);
    return;
  }

  // Step 3: Create template document
  const template = await client.create({
    _type: 'template',
    title: 'MetronicPro — Premium Enterprise Dashboard & UI Suite',
    slug: { _type: 'slug', current: 'metronic-pro-premium-enterprise-dashboard-ui-suite' },
    description: `MetronicPro is a high-end, multi-page HTML admin suite meticulously engineered for enterprise SaaS applications, social networks, and complex management platforms. This 4-page suite provides a robust foundation for internal systems, featuring a high-density Overview dashboard, a professional Network management interface, a comprehensive Profile Creator flow, and a polished User Profile view. The design language is strictly professional—utilizing a clean, high-contrast palette with refined typography to handle complex data at scale. Built using pure HTML5, CSS3, and Vanilla JavaScript, MetronicPro ensures elite-level performance and seamless responsiveness on all devices without the dependency on bulky frameworks. Ideal for developers requiring a sophisticated, production-grade UI kit for enterprise-level tools. Available exclusively on TemplateLayer: https://templatelayer.com/`,
    seoTitle: 'MetronicPro — 4-Page Enterprise Admin Dashboard HTML Template',
    seoDescription: 'Premium 4-page enterprise dashboard HTML template. Features user network, profile creator, and professional data views. Fully responsive and framework-free.',
    category: { _type: 'reference', _ref: categoryId },
    pricingType: 'premium',
    price: '$39',
    technologies: [
      'HTML5 (Multi-page Enterprise Layout)',
      'CSS3 (Custom UI Components)',
      'Vanilla JavaScript',
      'Google Fonts (Poppins)',
      'SVG Icon System',
      'Data-driven UI (Lists/Tables)',
    ],
    features: [
      '4 Specialized Enterprise Pages: Home, Network, Profile Creator, Profile View',
      'Advanced User Profile management modules',
      'Professional Social/Professional Network interface',
      'Polished Step-by-step Account Creation flow',
      'High-performance codebase (Zero Frameworks)',
      'Clean, Modern Enterprise design aesthetic',
      'Fully Responsive Navigation and Sidebar',
      'SEO-friendly semantic HTML structure',
      'Elite Core Web Vitals performance',
      'Global CSS customization for enterprise branding',
    ],
    tags: [
      'enterprise dashboard',
      'admin ui kit',
      'user profile template',
      'saas management panel',
      'network management UI',
      'premium dashboard design',
      'responsive admin panel',
      'vanilla js dashboard',
      'profile creator UI',
      'social network template',
    ],
    isFeatured: true,
    order: 21,
  });

  console.log('✅ Template uploaded successfully!');
  console.log('   ID   :', template._id);
  console.log('   Slug : metronic-pro-premium-enterprise-dashboard-ui-suite');
  console.log('   Cat  :', categoryId);
  console.log('\n🎉 Done!');
}

upload().catch((err) => {
  console.error('❌ Upload failed:', err.message);
  process.exit(1);
});
