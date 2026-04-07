import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function upload() {
  console.log('🚀 Starting WhatsApp Business Kit upload...');

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
    `*[_type == "template" && slug.current == "whatsapp-business-kit-premium-saas-landing-template"][0]{ _id }`
  );
  if (existingTemplate?._id) {
    console.log('⚠️  Template already exists:', existingTemplate._id);
    return;
  }

  // Step 3: Create template document
  const template = await client.create({
    _type: 'template',
    title: 'WhatsApp Business Kit — Premium SaaS Landing Template',
    slug: { _type: 'slug', current: 'whatsapp-business-kit-premium-saas-landing-template' },
    description: `WhatsApp Business Kit is a high-conversion single-page HTML template designed specifically for SaaS startups, marketing tools, and customer engagement platforms. Built with elite performance in mind, this template provides a complete marketing toolkit including feature showcases, interactive pricing tables, testimonials, and a sleek modern aesthetic. The design is clean, professional, and fully responsive, ensuring your software product looks stunning on mobile, tablet, and desktop. Leveraging pure HTML5, CSS3, and Vanilla JavaScript, it offers superior load speeds and SEO optimization without the weight of external frameworks. Perfect for launching your next business automation tool or marketing service. Available exclusively on TemplateLayer: https://templatelayer.com/`,
    seoTitle: 'WhatsApp Business Kit — Modern SaaS Landing Page HTML Template',
    seoDescription: 'High-conversion SaaS landing page HTML template. Features feature lists, pricing, and testimonial sections. Fully responsive and optimized for business automation tools.',
    category: { _type: 'reference', _ref: categoryId },
    pricingType: 'premium',
    price: '$19',
    technologies: [
      'HTML5 (Semantic Structure)',
      'CSS3 (Custom Animations)',
      'Vanilla JavaScript',
      'Google Fonts (Inter)',
      'SVG Components',
      'Intersection Observer API',
    ],
    features: [
      'High-conversion SaaS Landing Page layout',
      'Professional Toolkit and Feature showcase modules',
      'Modern, High-performance aesthetic',
      'Interactive Pricing and Plan selectors',
      'Advanced Customer Testimonial sections',
      'Fully Responsive and Mobile-first design',
      'Zero Framework overhead (Lightning Fast)',
      'SEO-optimized semantic HTML',
      'Smooth scroll and Micro-interactions',
      'Easy customization with CSS Variables',
    ],
    tags: [
      'whatsapp business',
      'saas landing page',
      'marketing template',
      'business toolkit UI',
      'automation software landing',
      'premium saas design',
      'responsive landing page',
      'software as a service',
      'vanilla js landing',
      'conversion optimized',
    ],
    isFeatured: false,
    order: 19,
  });

  console.log('✅ Template uploaded successfully!');
  console.log('   ID   :', template._id);
  console.log('   Slug : whatsapp-business-kit-premium-saas-landing-template');
  console.log('   Cat  :', categoryId);
  console.log('\n🎉 Done!');
}

upload().catch((err) => {
  console.error('❌ Upload failed:', err.message);
  process.exit(1);
});
