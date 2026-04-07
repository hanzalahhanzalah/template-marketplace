import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function upload() {
  console.log('🚀 Starting SaaS Bundle upload...');

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
    `*[_type == "template" && slug.current == "saas-bundle-enterprise-ui-kit-multipage-template"][0]{ _id }`
  );
  if (existingTemplate?._id) {
    console.log('⚠️  Template already exists:', existingTemplate._id);
    return;
  }

  // Step 3: Create template document
  const template = await client.create({
    _type: 'template',
    title: 'SaaS Bundle — 4 Premium Industry-Specific Landing Pages',
    slug: { _type: 'slug', current: 'saas-bundle-enterprise-ui-kit-multipage-template' },
    description: `The SaaS Bundle is an elite collection of four specialized, highly-targeted HTML landing page templates designed for the most profitable software industries: AI & Machine Learning, Finance (FinTech), Human Resources (HR Tech), and Professional Marketing. Each sub-template within this bundle is a complete multi-page system, featuring industry-specific UI components, conversion-optimized sections, and premium design aesthetics. In total, the bundle includes over 28 meticulously crafted HTML pages, covering homepages, features, pricing, documentation, login/signup flows, and more. Built with pure HTML5, CSS3, and Vanilla JavaScript, this bundle offers developers a "SaaS-in-a-box" frontend solution with extreme performance and SEO-readiness. It is the ultimate toolkit for building modern software startups at scale. Available exclusively on TemplateLayer: https://templatelayer.com/`,
    seoTitle: 'SaaS Bundle — 4-in-1 Premium Industry-Specific HTML Templates',
    seoDescription: 'Premium bundle of 4 industry-specific SaaS landing pages: AI, Finance, HR, and Marketing. 28+ total pages, fully responsive and optimized for software startups.',
    category: { _type: 'reference', _ref: categoryId },
    pricingType: 'premium',
    price: '$49',
    technologies: [
      'HTML5 (Multi-industry Architecture)',
      'CSS3 (Custom UI Kits)',
      'Vanilla JavaScript',
      'Google Fonts (Inter / Montserrat)',
      'SVG Asset Collection',
      'Responsiveness (Global Standards)',
    ],
    features: [
      '4 Industry-specific Landing Pages: AI/ML, Finance, HR, Marketing',
      '28+ Total Premium HTML Pages across all sub-templates',
      'Comprehensive Login, Signup, and Authentication UI',
      'Advanced Pricing Tables and Feature matrix components',
      'Professional Documentation and Support portal layouts',
      'Zero Framework overhead (Extreme Load Speed)',
      'Elite design aesthetic tailored to each industry niche',
      'SEO-friendly semantic HTML5 structure',
      'Interactive Charting and Data Viz placeholders',
      'Global CSS customization for cross-industry branding',
    ],
    tags: [
      'saas bundle',
      'industry specific landing',
      'ai saas template',
      'fintech landing page',
      'hr tech website',
      'marketing software UI',
      'multipage saas kit',
      'premium software bundle',
      'responsive saas design',
      'vanilla js saas collection',
    ],
    isFeatured: true,
    order: 23,
  });

  console.log('✅ Template uploaded successfully!');
  console.log('   ID   :', template._id);
  console.log('   Slug : saas-bundle-enterprise-ui-kit-multipage-template');
  console.log('   Cat  :', categoryId);
  console.log('\n🎉 Done!');
}

upload().catch((err) => {
  console.error('❌ Upload failed:', err.message);
  process.exit(1);
});
