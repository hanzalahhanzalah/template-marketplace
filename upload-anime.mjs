import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function upload() {
  console.log('🚀 Starting Anime Watchlist upload...');

  // Step 1: Find or create "Entertainment" category
  const existing = await client.fetch(
    `*[_type == "category" && title == "Entertainment"][0]{ _id }`
  );

  let categoryId;
  if (existing?._id) {
    categoryId = existing._id;
    console.log('✅ Category already exists:', categoryId);
  } else {
    const cat = await client.create({
      _type: 'category',
      title: 'Entertainment',
      slug: { _type: 'slug', current: 'entertainment' },
      categoryType: 'template',
      description: 'Engaging templates for fans, collectors, and entertainment platforms.',
      order: 60,
    });
    categoryId = cat._id;
    console.log('✅ Created category:', categoryId);
  }

  // Step 2: Skip if already uploaded
  const existingTemplate = await client.fetch(
    `*[_type == "template" && slug.current == "anime-watchlist-personal-tracker-template"][0]{ _id }`
  );
  if (existingTemplate?._id) {
    console.log('⚠️  Template already exists:', existingTemplate._id);
    return;
  }

  // Step 3: Create template document
  const template = await client.create({
    _type: 'template',
    title: 'Anime Watchlist — Personal Tracking & Discovery Template',
    slug: { _type: 'slug', current: 'anime-watchlist-personal-tracker-template' },
    description: `Anime Watchlist is a sleek, modern personal entertainment tracker template designed for fans of anime and digital content. It features a clean, purple-accented dark theme with interactive elements for discovering, tracking, and prioritizing watchlists. The template includes a dynamic search system (simulated), status tracking (Watching, Completed, Plan to Watch), and detailed anime cards with rating and genre tags. Built with pure HTML5, CSS3, and Vanilla JavaScript, it offers a high-performance experience without the need for complex frameworks. Perfect for hobbyists, fan sites, or as a starting point for a larger entertainment discovery platform. Available exclusively on TemplateLayer: https://templatelayer.com/`,
    seoTitle: 'Anime Watchlist — Modern Personal Anime Tracker HTML Template',
    seoDescription: 'Clean and modern personal anime tracker HTML template. Features dark theme, list management, discovery cards, and responsive design. Pure HTML/CSS/JS.',
    category: { _type: 'reference', _ref: categoryId },
    pricingType: 'premium',
    price: '$15',
    technologies: [
      'HTML5',
      'CSS3 (Flexbox/Grid)',
      'Vanilla JavaScript',
      'Google Fonts',
      'FontAwesome Icons',
    ],
    features: [
      'Personalized Watchlist Management UI (Watching, Completed, etc.)',
      'Interactive Discovery Cards with genre tags and ratings',
      'Modern Dark Theme with deep purple accents',
      'Real-time Search Bar simulation',
      'Detailed Anime Popups/Modals for more info',
      'Statistics dashboard for viewing habits',
      'Fully Responsive design for mobile discovery',
      'Pure Vanilla JavaScript — zero dependencies',
      'Easily customizable CSS variables',
    ],
    tags: [
      'anime watchlist template',
      'entertainment tracker',
      'personal list manager',
      'dark theme template',
      'fandom website template',
      'hobby tracker HTML',
      'anime discovery page',
      'personal dashboard template',
      'responsive tracker UI',
      'purple theme landing page',
    ],
    isFeatured: false,
    order: 7,
  });

  console.log('✅ Template uploaded successfully!');
  console.log('   ID   :', template._id);
  console.log('   Slug : anime-watchlist-personal-tracker-template');
  console.log('   Cat  :', categoryId);
  console.log('\n🎉 Done!');
}

upload().catch((err) => {
  console.error('❌ Upload failed:', err.message);
  process.exit(1);
});
