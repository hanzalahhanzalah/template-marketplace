import { createClient } from '@sanity/client';
import https from 'https';
import http from 'http';

const client = createClient({ projectId: 'ath1uvh6', dataset: 'production', apiVersion: '2024-01-01', useCdn: false, token: process.env.SANITY_API_TOKEN });
const k = () => Math.random().toString(36).substr(2, 9);
const b = (text, style = 'normal') => ({ _type: 'block', _key: k(), style, markDefs: [], children: [{ _type: 'span', _key: k(), text, marks: [] }] });
const h2 = t => b(t, 'h2');
const h3 = t => b(t, 'h3');
const p = t => b(t, 'normal');

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const proto = url.startsWith('https') ? https : http;
    proto.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) return downloadImage(res.headers.location).then(resolve).catch(reject);
      if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`));
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  const slug = 'best-restaurant-website-design-examples-2025';
  const existing = await client.fetch(`*[_type == "blogPost" && slug.current == $slug][0]{ _id }`, { slug });
  if (existing?._id) { console.log('⚠️  Already exists'); return; }

  const catData = await client.fetch(`*[_type == "category" && title == "Templates" && categoryType == "blog"][0]{ _id }`);
  const catId = catData?._id;

  const body = [
    p('A great restaurant website does more than list your menu. It communicates your atmosphere, builds hunger before customers even arrive, and makes it effortless to find your location, hours, and reservation link. These restaurant website design examples show you exactly what a high-performing restaurant website looks like — and what you can take from each one to improve your own.'),

    h2('What the Best Restaurant Websites Have in Common'),
    p('Before the examples, here is the pattern you will see across every high-performing restaurant website: a full-screen food or atmosphere photo immediately visible on load, a prominent address and phone number in the header or hero, a mobile-optimized menu that loads as HTML text (not a PDF), a clear reservation CTA above the fold, and fast page load speed — because hungry people do not wait for slow websites.'),
    p('Keep these principles in mind as you look through the examples below.'),

    h2('1. Nobu — Atmosphere-First Design'),
    p('The Nobu restaurant group website (noburestaurants.com) leads with full-screen atmospheric photography that immediately communicates luxury and exclusivity. There is no text fighting for attention in the hero — just one powerful image and a single navigation bar.'),
    p('What to steal: Lead with your best, most atmospheric photo. One strong image beats a cluttered hero with too many elements. If you do not have professional photography yet, Unsplash has excellent free restaurant photos you can use as placeholders.'),

    h2('2. Shake Shack — Fast Food Done Premium'),
    p('Shake Shack (shakeshack.com) proves that fast food websites can feel premium. Their homepage is fast-loading, bold, and focused: find a location, see the menu, order online. Three actions. Nothing else.'),
    p('What to steal: Clarity wins. Identify the one thing your visitors most need to do (find your location, make a reservation, view the menu) and make that action impossible to miss. Remove everything that competes with it.'),

    h2('3. The Fat Duck — Storytelling Design'),
    p('Heston Blumenthal\'s The Fat Duck website uses its design to tell a story about the dining experience before you even book. Black background, theatrical typography, and careful pacing create anticipation. The design itself communicates that this is an experience, not just a meal.'),
    p('What to steal: Your website design language should match your restaurant\'s personality. A fine dining restaurant should feel elevated. A casual neighbourhood bistro should feel warm and approachable. A design that feels wrong for your restaurant creates confusion and reduces bookings.'),

    h2('4. Local Restaurant — The Essentials Done Right'),
    p('Not every restaurant has a $50,000 web design budget. The most effective local restaurant websites succeed by doing the basics perfectly: clear NAP (name, address, phone), a readable HTML menu with prices, a visible reservation link, food photography above the fold, and consistent hours.'),
    p('What to steal: You do not need a complex website. You need the right information, presented clearly, loading fast on mobile. A clean HTML restaurant template accomplishes this at a fraction of the cost of a custom-built site.'),

    h2('Key Design Elements of High-Performing Restaurant Websites'),

    h3('Hero Section'),
    p('Your hero image sets the tone for everything. Use a photo that shows your food at its best, your restaurant atmosphere, or both. The image should be high resolution (minimum 1920px wide), professionally lit if possible, and compressed to under 300KB so it loads fast. Add a brief headline ("Fresh Italian Cuisine in the Heart of Chicago") and your primary CTA ("Book a Table" or "View Menu").'),

    h3('Menu Page'),
    p('This is the most visited page on any restaurant website. Critical rules: publish your menu as real HTML text, not a PDF or image. PDFs rank poorly in Google, break on mobile, and frustrate users. Organise by section (Starters, Mains, Desserts, Drinks). Include prices on every item — hiding prices increases bounce rate. Add a one-sentence description for each dish to help with SEO and to make dishes sound more appealing.'),

    h3('Location and Hours'),
    p('Put your address, phone number, and opening hours on every page — ideally in the footer. Add a Google Maps embed to your contact or location page. Many mobile users visit your website specifically to confirm your address or hours before driving to you. If they cannot find this information in 10 seconds, they go elsewhere.'),

    h3('Online Reservations'),
    p('If you take bookings, integrate a reservation system. The most popular options are OpenTable (most widely used, per-cover fee model), Resy (lower fees, popular with independent restaurants), and Yelp Reservations. Even a simple "Email us to book" link is better than nothing — but a live booking widget reduces friction and increases reservations significantly.'),

    h3('Food Photography'),
    p('Nothing sells food like great photography. Poor food photos actively hurt conversions — a blurry, dark photo of a dish makes it look unappetising even if it tastes exceptional. If professional photography is not in your budget right now, use a modern smartphone in good natural light. Position dishes near a window, shoot from directly above or at a 45-degree angle, and keep backgrounds simple. Many successful local restaurant websites use smartphone photos done well.'),

    h2('Restaurant Website Templates — Start with a Proven Layout'),
    p('Building your restaurant website from a professionally designed HTML template means you start with a layout that has already been designed for conversion. The visual hierarchy, section order, and CTA placement are already optimised. You customise the content — your photos, your menu, your story — without having to figure out design from scratch.'),
    p('TemplateLayer offers free and premium restaurant HTML CSS templates including Urban Bites (a bold, full-screen restaurant template with dark aesthetic and focus on atmosphere) and Savoria (an elegant restaurant template with a lighter, more classical design). Both include live previews so you can see exactly how your restaurant website will look before downloading.'),

    h2('Restaurant Website SEO — Get Found on Google'),
    p('A beautiful restaurant website that no one finds is wasted effort. These SEO steps ensure local diners can find you:'),
    p('Google Business Profile: The single most important step. Set up and fully complete your Google Business Profile at business.google.com. Add photos, your menu, hours, and encourage customers to leave reviews. This controls what appears in Google Maps and local search results.'),
    p('Page title with location: Your homepage title should follow the format "Restaurant Name — [Cuisine Type] in [City]". Example: "Mario\'s — Authentic Italian Restaurant in Brooklyn, NY". This helps Google understand your location relevance.'),
    p('Schema markup: Add LocalBusiness and Restaurant schema (JSON-LD format) to your homepage. This gives Google structured information about your business — cuisine type, price range, accepted reservations, hours — and can result in rich snippets in search results.'),
    p('Local keywords in content: Use your city and neighbourhood name naturally throughout your website content. "Our Chicago restaurant has been serving the Lincoln Park neighbourhood since 2018" is better for local SEO than a generic description that mentions no location.'),
    p('Mobile speed: Google uses mobile performance as a ranking factor. Test your restaurant website at pagespeed.web.dev and fix anything below 70 on the mobile score. Compress images, remove unused JavaScript, and use a fast hosting provider.'),

    h2('How Much Does a Restaurant Website Cost?'),
    p('The range is enormous. Here is an honest breakdown:'),
    p('HTML template approach: Domain ($12/year) + hosting (free on Cloudflare Pages or $24-36/year on Hostinger) + template ($0-30 one-time). Total: under $50 for the first year. This is the best value option for independent restaurants.'),
    p('WordPress with restaurant theme: Domain ($12/year) + hosting ($60-120/year) + premium theme ($50-100 one-time) + plugins ($0-100/year). Total: $120-330 first year.'),
    p('Squarespace or Wix: $192-480/year subscription.'),
    p('Custom web design agency: $2,000-15,000+ one-time cost, plus ongoing maintenance fees.'),
    p('For most independent and small chain restaurants, the HTML template or WordPress approach delivers professional results at a fraction of the agency cost.'),

    h2('Final Thoughts'),
    p('The best restaurant websites are not the most expensive or the most complex. They are the ones that load fast, show great food photography, make it effortless to find location and hours, and have a clear path to making a reservation or placing an order.'),
    p('Start with a professionally designed restaurant HTML template, customize it with your photos and content, and you can have a restaurant website that outperforms many expensive custom-built competitors — because design and speed matter more than budget.'),
    p('Browse free and premium restaurant website templates at TemplateLayer with live interactive previews. Download in seconds, no account required.'),
  ];

  console.log('📝 [Article 10] Uploading: Best Restaurant Website Design Examples...');
  const post = await client.create({
    _type: 'blogPost',
    title: 'Best Restaurant Website Design Examples 2025 — What Makes Them Work',
    slug: { _type: 'slug', current: slug },
    excerpt: 'What separates a restaurant website that fills tables from one that gets ignored? We analyzed the best restaurant website designs of 2025 and extracted the key principles you can apply today.',
    body,
    category: { _type: 'reference', _ref: catId },
    publishedAt: new Date().toISOString(),
    readTime: '10 min read',
    seoTitle: 'Best Restaurant Website Design Examples 2025 — What Makes Them Work',
    seoDescription: 'Explore the best restaurant website design examples of 2025. Learn what makes them convert, and how to apply the same principles to your own restaurant website.',
  });
  console.log('✅ Uploaded:', post._id);

  // Photo: restaurant interior with warm lighting — Unsplash free
  console.log('🖼️  Uploading image...');
  const buf = await downloadImage('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&h=630&fit=crop&q=80');
  const asset = await client.assets.upload('image', buf, { filename: 'restaurant-website-design-examples.jpg', contentType: 'image/jpeg' });
  await client.patch(post._id).set({ thumbnail: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } }).commit();
  console.log('✅ Image attached');
  console.log('🎉 Done! → /blog/' + slug);
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
