import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function upload() {
  console.log('🚀 Starting Cryptoverse Pro upload...');

  // Step 1: Crypto category already exists from Nexatoken
  const category = await client.fetch(
    `*[_type == "category" && title == "Crypto"][0]{ _id }`
  );

  if (!category) {
    console.error('❌ Crypto category not found. Please upload Nexatoken first.');
    process.exit(1);
  }
  const categoryId = category._id;

  // Step 2: Skip if already uploaded
  const existingTemplate = await client.fetch(
    `*[_type == "template" && slug.current == "cryptoverse-pro-multipage-crypto-html-template"][0]{ _id }`
  );
  if (existingTemplate?._id) {
    console.log('⚠️  Template already exists:', existingTemplate._id);
    return;
  }

  // Step 3: Create template document
  const template = await client.create({
    _type: 'template',
    title: 'Cryptoverse Pro — Premium Multipage Crypto & NFT Template',
    slug: { _type: 'slug', current: 'cryptoverse-pro-multipage-crypto-html-template' },
    description: `Cryptoverse Pro is a comprehensive, premium multi-page HTML template designed for massive crypto ecosystems. Featuring 8 professionally designed pages including a high-conversion Homepage, dedicated Market data page, ICO launch page, NFT marketplace gallery, and more. This template comes packed with advanced features: a live cryptocurrency price ticker, stunning Bento-grid features section, interactive tokenomics charts, tactical roadmap timeline, and a professional trading dashboard preview. Built with a futuristic dark theme using modern CSS Custom Properties, it's fully responsive and includes integrated dark/light mode switching. Perfect for DeFi protocols, NFT platforms, and comprehensive blockchain projects. Available exclusively on TemplateLayer: https://templatelayer.com/`,
    seoTitle: 'Cryptoverse Pro — 8-Page Premium Crypto, NFT & DeFi HTML Template',
    seoDescription: 'Ultimate 8-page multi-page crypto HTML template. Features live price ticker, NFT gallery, ICO landing, and trading dashboard. Built with futuristic dark/light mode.',
    category: { _type: 'reference', _ref: categoryId },
    pricingType: 'premium',
    price: '$39',
    technologies: [
      'HTML5 (Multipage)',
      'CSS3 (Bento Grid)',
      'Vanilla JavaScript',
      'particles.js',
      'Chart.js',
      'AOS Animations',
    ],
    features: [
      '8 Professional Pages: Home, About, ICO, Market, NFT, Blog, Services, Contact',
      'Live Cryptocurrency Price Tickers via API integration',
      'Futuristic Bento Grid Feature Section with glow effects',
      'Professional Trading Dashboard preview with data visualizations',
      'NFT Showcase gallery with hover states',
      'Interactive Tokenomics Chart and detailed Roadmap',
      'Integrated AI Chatbot widget UI',
      'Wallet Connect simulated modal interface',
      'Dark / Light mode toggle with CSS Variables',
      'High-conversion CTA sections with glassmorphism',
      'SEO Optimized with proper semantic structure',
      'Pure Vanilla JS — No heavy dependencies',
    ],
    tags: [
      'crypto multipage template',
      'NFT marketplace template',
      'DeFi website template',
      'blockchain HTML template',
      'crypto market template',
      'premium crypto website',
      'ICO landing 8-page',
      'web3 business template',
      'bitcoin ethereum website',
      'futuristic UI kit',
    ],
    isFeatured: true,
    order: 6,
  });

  console.log('✅ Template uploaded successfully!');
  console.log('   ID   :', template._id);
  console.log('   Slug : cryptoverse-pro-multipage-crypto-html-template');
  console.log('   Cat  :', categoryId);
  console.log('\n🎉 Done!');
}

upload().catch((err) => {
  console.error('❌ Upload failed:', err.message);
  process.exit(1);
});
