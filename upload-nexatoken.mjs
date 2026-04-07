import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function upload() {
  console.log('🚀 Starting Nexatoken ICO upload...');

  // Step 1: Find or create "Crypto" category
  const existing = await client.fetch(
    `*[_type == "category" && title == "Crypto"][0]{ _id }`
  );

  let categoryId;
  if (existing?._id) {
    categoryId = existing._id;
    console.log('✅ Category already exists:', categoryId);
  } else {
    const cat = await client.create({
      _type: 'category',
      title: 'Crypto',
      slug: { _type: 'slug', current: 'crypto' },
      categoryType: 'template',
      description: 'Stunning templates for web3, blockchain, ICO launches, and cryptocurrency platforms.',
      order: 50,
    });
    categoryId = cat._id;
    console.log('✅ Created category:', categoryId);
  }

  // Step 2: Skip if already uploaded
  const existingTemplate = await client.fetch(
    `*[_type == "template" && slug.current == "nexatoken-premium-ico-landing-page-template"][0]{ _id }`
  );
  if (existingTemplate?._id) {
    console.log('⚠️  Template already exists:', existingTemplate._id);
    return;
  }

  // Step 3: Create template document
  const template = await client.create({
    _type: 'template',
    title: 'Nexatoken — Premium ICO & Crypto Landing Page Template',
    slug: { _type: 'slug', current: 'nexatoken-premium-ico-landing-page-template' },
    description: `Nexatoken is a high-performance, premium ICO and Cryptocurrency landing page template designed for token launches and blockchain projects. It features futuristic crypto aesthetics with a stunning tsParticles background, an interactive Chart.js tokenomics doughnut chart, and a FlipDown.js presale countdown timer. The template includes integrated scroll animations (AOS.js), a simulated Wallet Connect modal, team showcase, roadmap timeline, and a comprehensive FAQ section. Built with pure HTML5, CSS3, and Vanilla JS, it offers seamless dark/light mode switching with persistent user preference. Extremely lightweight and fast-loading, Nexatoken provides everything needed for a successful token launch out of the box. Available exclusively on TemplateLayer: https://templatelayer.com/`,
    seoTitle: 'Nexatoken — Futuristic ICO Landing Page HTML Template with Countdown & Tokenomics',
    seoDescription: 'Premium crypto landing page HTML template with dark/light mode, animated countdown, tokenomics chart, and wallet connect UI. Built for ICO launches.',
    category: { _type: 'reference', _ref: categoryId },
    pricingType: 'premium',
    price: '$29',
    technologies: [
      'HTML5',
      'CSS3 (Animations)',
      'Vanilla JavaScript',
      'tsParticles.js',
      'Chart.js',
      'AOS.js',
      'FlipDown.js',
    ],
    features: [
      'Futuristic Dark/Light Mode with localStorage persistence',
      'Interactive Tokenomics Chart powered by Chart.js',
      'Animated Presale Countdown Timer (FlipDown.js)',
      'Stunning tsParticles Background effects',
      'Metamask / WalletConnect simulated UI Modal',
      'Smooth scroll-reveal animations (AOS.js)',
      'Interactive Roadmap and Team sections',
      'Responsive Token Sale Progress Bar',
      'Collapsible FAQ Accordion section',
      '100% Mobile Responsive & lightweight performance',
      'Modern Orbitron & Inter Typography',
      'Clean, marketplace-ready codebase',
    ],
    tags: [
      'crypto template',
      'ICO landing page',
      'blockchain website template',
      'token launch template',
      'web3 landing page',
      'dark mode crypto template',
      'cryptocurrency HTML template',
      'tokenomics website',
      'crypto countdown template',
      'futuristic landing page',
    ],
    isFeatured: true,
    order: 5,
  });

  console.log('✅ Template uploaded successfully!');
  console.log('   ID   :', template._id);
  console.log('   Slug : nexatoken-premium-ico-landing-page-template');
  console.log('   Cat  :', categoryId);
  console.log('\n🎉 Done!');
}

upload().catch((err) => {
  console.error('❌ Upload failed:', err.message);
  process.exit(1);
});
