import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function upload() {
  console.log('🚀 Starting TwoHearts Wedding upload...');

  // Step 1: Find or create "Wedding" category
  const existing = await client.fetch(
    `*[_type == "category" && title == "Wedding"][0]{ _id }`
  );

  let categoryId;
  if (existing?._id) {
    categoryId = existing._id;
    console.log('✅ Category already exists:', categoryId);
  } else {
    const cat = await client.create({
      _type: 'category',
      title: 'Wedding',
      slug: { _type: 'slug', current: 'wedding' },
      categoryType: 'template',
      description: 'Elegant, romantic, and sophisticated templates for weddings, anniversaries, and special event planning.',
      order: 90,
    });
    categoryId = cat._id;
    console.log('✅ Created category:', categoryId);
  }

  // Step 2: Skip if already uploaded
  const existingTemplate = await client.fetch(
    `*[_type == "template" && slug.current == "twohearts-wedding-invitation-template"][0]{ _id }`
  );
  if (existingTemplate?._id) {
    console.log('⚠️  Template already exists:', existingTemplate._id);
    return;
  }

  // Step 3: Create template document
  const template = await client.create({
    _type: 'template',
    title: 'TwoHearts — Elegant Wedding Invitation & RSVP HTML Template',
    slug: { _type: 'slug', current: 'twohearts-wedding-invitation-template' },
    description: `TwoHearts is a sophisticated and modern one-page wedding invitation template designed to help couples share their most precious moments. Whether it's the countdown to the big day or the journey of how you met, this template provides an elegant digital stage for your wedding announcement. It features a beautifully styled interactive countdown timer, a vertical scrolling Love Story timeline, dedicated Groom & Bride profile cards, groomsmen & bridesmaids sections, a Google Maps integration for venue details, a responsive photo gallery, and a fully functional RSVP form. Built with pure HTML5, CSS3, and Vanilla JavaScript — no frameworks, no bloat — TwoHearts delivers ultra-fast performance and a stunning mobile-first experience out of the box. Typography is powered by a premium Google Fonts trio: Great Vibes, Playfair Display, and Poppins. Available exclusively on TemplateLayer: https://templatelayer.com/`,
    seoTitle: 'TwoHearts — Wedding Invitation & RSVP Template',
    seoDescription: 'One-page wedding invitation template with countdown, RSVP form, love story timeline & photo gallery. Responsive & easy to customize.',
    category: { _type: 'reference', _ref: categoryId },
    pricingType: 'premium',
    price: '$19',
    technologies: [
      'HTML5 (Single Page)',
      'CSS3 (Flexbox/Grid/Animations)',
      'Vanilla JavaScript',
      'Google Fonts (Great Vibes, Playfair Display, Poppins)',
      'Intersection Observer API',
      'Google Maps Embed',
    ],
    features: [
      'Interactive Countdown Timer to wedding day',
      'Vertical Love Story Timeline with dates',
      'Groom & Bride profile cards with custom bios',
      'Groomsmen & Bridesmaids grid section',
      'When & Where section with Google Maps embed',
      'Responsive Photo Gallery grid',
      'Functional RSVP Form (Name, Email, Guests, Attendance)',
      'Mobile-first fully responsive layout',
      'Smooth scroll and fade-in animations (Intersection Observer)',
      'Premium typography pairing (Great Vibes + Playfair + Poppins)',
      'Zero framework dependency — pure HTML/CSS/JS',
      'SEO-friendly semantic HTML5 structure',
    ],
    tags: [
      'wedding template',
      'wedding invitation html',
      'rsvp form template',
      'one page wedding site',
      'countdown timer wedding',
      'love story timeline',
      'bride groom website',
      'elegant event template',
      'responsive wedding page',
      'vanilla js wedding template',
      'google maps wedding',
      'couple website html',
    ],
    isFeatured: false,
    order: 21,
  });

  console.log('✅ Template uploaded successfully!');
  console.log('   ID   :', template._id);
  console.log('   Slug : twohearts-wedding-invitation-template');
  console.log('   Cat  :', categoryId);
  console.log('\n🎉 Done!');
}

upload().catch((err) => {
  console.error('❌ Upload failed:', err.message);
  process.exit(1);
});
