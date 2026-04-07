import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function upload() {
  console.log('🚀 Starting CryptoNexus upload...');

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
      description: 'Cutting-edge templates for ICOs, blockchain startups, NFT marketplaces, and DeFi platforms.',
      order: 40,
    });
    categoryId = cat._id;
    console.log('✅ Created category:', categoryId);
  }

  // Step 2: Skip if already uploaded
  const existingTemplate = await client.fetch(
    `*[_type == "template" && slug.current == "cryptonexus-premium-ico-defi-multipage-template"][0]{ _id }`
  );
  if (existingTemplate?._id) {
    console.log('⚠️  Template already exists:', existingTemplate._id);
    return;
  }

  // Step 3: Create template document
  const template = await client.create({
    _type: 'template',
    title: 'CryptoNexus — Premium ICO & DeFi Multipage Template',
    slug: { _type: 'slug', current: 'cryptonexus-premium-ico-defi-multipage-template' },
    description: `CryptoNexus is a high-end, futuristic multi-page HTML template designed for the next generation of web3 projects. Whether you are launching an ICO initial coin offering, a DeFi platform, or a crypto market tracking site, CryptoNexus provides the visual impact and technical depth required for the space. With 7 production-ready pages—including Home, MarketTracker, Services, Blog, and a sophisticated About and Contact section—it covers the full ecosystem of a crypto startup. The template features a sleek dark-mode aesthetic with neon accents, custom SVG graphics, and interactive AOS animations. Built with vanilla HTML5, CSS3, and JavaScript, it offers top-tier performance and a zero-framework footprint for lightning-fast loading. Available exclusively on TemplateLayer: https://templatelayer.com/`,
    seoTitle: 'CryptoNexus — Futuristic Crypto & DeFi Multipage HTML Template',
    seoDescription: 'Premium dark-themed crypto HTML template. 7 specialized pages for ICOs, markets, and DeFi assets. High-performance, SEO-ready, and mobile-responsive.',
    category: { _type: 'reference', _ref: categoryId },
    pricingType: 'premium',
    price: '$29',
    technologies: [
      'HTML5 (Multipage)',
      'CSS3 (Custom Properties)',
      'Vanilla JavaScript',
      'Orbitron & Inter Google Fonts',
      'AOS Animations',
      'Particles.js Integration',
    ],
    features: [
      '7 Premium Crypto Pages: Home, Market, Services, Blog, About, Contact',
      'Futuristic Dark-Mode design aesthetic with Glassmorphism',
      'Interactive Token Presale Countdown module',
      'Dynamic Crypto Ticker and Market Data UI',
      'Animated Roadmap and Tokenomics charts',
      'Mobile-first Responsive Navigation with custom mobile menu',
      'Particles.js background for high-tech visual impact',
      'High-performance codebase (Zero frameworks)',
      'SEO-optimized semantic HTML structure',
      'Easy to customize with global CSS variables',
    ],
    tags: [
      'crypto template',
      'ICO landing page',
      'DeFi website UI',
      'blockchain template',
      'dark mode crypto theme',
      'web3 landing page',
      'premium crypto design',
      'responsive blockchain website',
      'vanilla js crypto',
      'tokenomics UI template',
    ],
    isFeatured: false,
    order: 16,
  });

  console.log('✅ Template uploaded successfully!');
  console.log('   ID   :', template._id);
  console.log('   Slug : cryptonexus-premium-ico-defi-multipage-template');
  console.log('   Cat  :', categoryId);
  console.log('\n🎉 Done!');
}

upload().catch((err) => {
  console.error('❌ Upload failed:', err.message);
  process.exit(1);
});
