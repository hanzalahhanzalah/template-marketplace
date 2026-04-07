const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') });
const { createClient } = require('next-sanity');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function run() {
  const categories = await client.fetch(`*[_type == "category" && categoryType == "template"]{_id, title}`);
  console.log('Categories:', categories);
  
  if (categories.length === 0) {
    console.log("No categories found");
    return;
  }
  
  // Trying to find a relevant category, fallback to first
  let catId = categories[0]._id;
  const targetCat = categories.find(c => c.title.toLowerCase().includes('site') || c.title.toLowerCase().includes('theme'));
  if (targetCat) catId = targetCat._id;

  const doc = {
    _type: 'template',
    title: 'AI Startup Landing Page HTML CSS',
    slug: {
      _type: 'slug',
      current: 'ai-startup-landing-page-html-css'
    },
    description: 'A fully responsive AI startup landing page built with HTML, CSS, and JavaScript. Includes dark/light mode and easy customization.\n\n\uD83D\uDE80 AI Startup Landing Page – Responsive HTML, CSS, JS Template\nA modern, professional landing page template designed for AI startups, SaaS businesses, and digital agencies. Fully responsive and optimized for fast loading and SEO.\n\n\uD83D\uDD25 Key Features:\n✅ Fully Responsive – Works on mobile, tablet, and desktop\n✅ Built with HTML, CSS, JavaScript (No Backend Required)\n✅ Dark & Light Mode – Modern UI experience\n✅ SEO & Speed Optimized – Fast loading for better rankings\n✅ Smooth Animations – Uses AOS (Animate on Scroll)\n✅ Easy to Customize – Edit colors, text & images easily\n\n\uD83D\uDCC2 What’s Included:\n📌 index.html (Landing Page)\n📌 css/styles.css (Styling & Customization)\n📌 js/script.js (Animations & Interactivity)\n📌 documentation.md (Full Setup Guide)\n📌 User-Guide.txt (Quick Start Instructions)\n\n\uD83D\uDCA1 Who Is This Template For?\n✅ AI Startups & SaaS Businesses\n✅ Entrepreneurs, Developers, & Digital Marketers\n✅ Freelancers & Agencies\n\n\uD83D\uDE80 Get Started Today – Instant Download & Lifetime Access!',
    category: {
      _type: 'reference',
      _ref: catId
    },
    pricingType: 'premium',
    demoUrl: 'https://www.codester.com/items/preview/54425/ai-startup-landing-page-html-css',
    buyLinks: [
      {
        _key: 'codester1',
        platform: 'Codester',
        url: 'https://www.codester.com/items/54425/ai-startup-landing-page-html-css',
        price: 'Free?'
      }
    ],
    features: [
      'Fully Responsive – Works on mobile, tablet, and desktop',
      'Dark & Light Mode – User-friendly switch',
      'SEO & Speed Optimized – Fast loading for better rankings',
      'Smooth Animations – Uses AOS'
    ],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    tags: ['AI', 'Startup', 'Landing Page', 'HTML', 'CSS', 'JavaScript', 'SaaS', 'Dark Mode'],
    isFeatured: false,
    order: 0,
    seoTitle: 'AI Startup Landing Page | HTML CSS',
    seoDescription: 'A fully responsive AI startup landing page built with HTML, CSS, and JavaScript. Includes dark/light mode and easy customization.'
  };

  const res = await client.create(doc);
  console.log(`Document created with ID: ${res._id}`);
}

run().catch(console.error);
