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
  const slug = 'free-html-css-business-website-templates-2025';
  const existing = await client.fetch(`*[_type == "blogPost" && slug.current == $slug][0]{ _id }`, { slug });
  if (existing?._id) { console.log('⚠️  Already exists'); return; }

  const catData = await client.fetch(`*[_type == "category" && title == "Templates" && categoryType == "blog"][0]{ _id }`);
  const catId = catData?._id;

  const body = [
    p('Finding a good free business website template is harder than it sounds. Most of what shows up in a Google search is either outdated code from 2014, full of broken links and dead external dependencies, or technically "free" but behind a required account signup. This guide cuts through all of that.'),
    p('These are the best free HTML CSS business website templates available right now — all with live previews, clean code, and no credit card required to download.'),

    h2('What Makes a Good Business Website Template?'),
    p('Before the list, here is what actually matters when picking a template for a real business website:'),
    p('Professional design: The template needs to look credible. A cheap-looking design damages trust more than having no website at all. Look for clean typography, proper spacing, and a coherent color palette.'),
    p('Responsive layout: Over 60% of web traffic comes from mobile. If the template breaks on a phone, it is unusable. Test every template on mobile before committing.'),
    p('Clean, commented code: You will be customizing the template. Spaghetti HTML and unexplained class names turn a 30-minute task into a 3-hour debugging session.'),
    p('Speed: Templates that load 20 external libraries, multiple icon fonts, and heavy image sliders will hurt your Google rankings. Less dependencies equals faster load equals better SEO.'),
    p('Standard business sections: Look for a hero, about section, services or features section, contact form, and footer. Extra points for a testimonials section and portfolio/work gallery.'),

    h2('1. Agency Starter — TemplateLayer (Free)'),
    p('The Agency Starter template on TemplateLayer is one of the most complete free business website templates available. It is built for creative agencies, freelancers, and service businesses that need a polished, modern web presence.'),
    p('The layout follows a proven conversion structure: a strong hero section with a headline and two CTA buttons, a client logos strip for social proof, a services section with icon cards, a featured work portfolio grid, a testimonials section, and a contact form. Every section a service business needs is included.'),
    p('Built with pure HTML5, CSS3, and Vanilla JavaScript — no framework required. The code uses CSS custom properties throughout, so rebranding to your colors takes editing one file. Fully responsive with smooth CSS transitions on all interactive elements.'),
    p('Best for: Agencies, freelancers, consultants, digital service businesses. Preview it live and download free at TemplateLayer.'),

    h2('2. AI Startup Landing Page — TemplateLayer (Free)'),
    p('If your business is in the tech, SaaS, or AI space, the AI Startup Landing Page template delivers a premium product-launch look that competes with sites built by expensive design agencies. The dark-themed hero section with gradient accents immediately communicates innovation and technical credibility.'),
    p('Sections include: animated hero with CTA, feature highlights with icons, how it works steps, pricing tiers, FAQ accordion, and newsletter signup. The template is particularly effective for software products, apps, and SaaS tools in early stages that need to build a waiting list or drive free trial signups.'),
    p('Built with HTML5, CSS3, and lightweight JavaScript. No jQuery, no Bootstrap dependencies. Available as a free download with live preview at TemplateLayer.'),

    h2('3. SaaS Pro Landing — TemplateLayer'),
    p('For businesses selling subscription software or online tools, the SaaS Pro Landing template provides a purpose-built layout that follows the structure of high-converting SaaS product pages. The design takes inspiration from leading SaaS products — clean, trust-building, and focused on getting visitors to click the primary CTA.'),
    p('Includes: full-width hero, feature grid with icons, three-tier pricing table with toggle, customer testimonials, and an FAQ section. The template makes excellent use of whitespace to direct attention to the most important elements.'),

    h2('4. HTML5 UP — Free Open Source Templates'),
    p('HTML5 UP is one of the most respected free HTML template sites in the web design community. All templates are fully responsive, open source (Creative Commons Attribution license — free for personal and commercial use, attribution required), and coded to a high standard.'),
    p('The Hyperspace and Prologue templates work well for business and portfolio sites. The code quality is excellent — clean, well-commented, and easy to customize. Note that the designs tend toward a specific aesthetic (full-screen sections, bold backgrounds) that suits some businesses more than others.'),
    p('Best for: Developers who want open-source templates they can modify without restriction. Attribution required in footer.'),

    h2('5. Templatemo — Free HTML Business Templates'),
    p('Templatemo hosts hundreds of free HTML CSS templates specifically for business use. Their collection includes corporate websites, business directories, agency sites, consulting pages, and more. Quality varies across templates but the top-rated ones are genuinely usable for real businesses.'),
    p('All templates are free for commercial use with no required attribution. The site has been running since 2012 and is regularly updated with new designs. Worth browsing if you need a specific business niche that is not covered by the options above.'),
    p('Best for: Finding niche-specific business layouts — construction companies, real estate agencies, medical practices, law firms.'),

    h2('6. Free-CSS.com — Large Curated Collection'),
    p('Free-CSS.com maintains a curated collection of over 3,000 free CSS templates including hundreds of business-focused designs. Templates are submitted by designers from around the world and rated by the community. The search and filter system makes it easy to find templates by category.'),
    p('Quality control is less strict than curated sites like HTML5 UP, so expect to look through several options before finding one that meets your standards. That said, with 3,000+ templates, the right one for your business almost certainly exists in their collection.'),
    p('Best for: Finding unusual or niche business template designs not available elsewhere.'),

    h2('How to Customize Your Business HTML Template'),
    p('Once you have chosen and downloaded your template, here is the customization process:'),
    h3('Step 1 — Replace all text content'),
    p('Open the HTML file in a code editor (VS Code is free and excellent). Use Find and Replace to locate placeholder text like "Company Name", "Your Service", and "Lorem ipsum". Replace all of it with your real business information. Do the same for phone numbers, email addresses, and physical addresses.'),
    h3('Step 2 — Update colors to your brand'),
    p('If the template uses CSS custom properties (look for :root at the top of the CSS file with variables starting with --), you can change the entire color scheme by editing a handful of hex codes. If the template uses hardcoded colors throughout, use Find and Replace in the CSS file to swap the primary accent color.'),
    h3('Step 3 — Replace placeholder images'),
    p('Most templates come with placeholder images or use online services like Unsplash for demo images. Replace these with your own photos. If you do not have professional photos, Unsplash (unsplash.com) provides free high-quality images with no copyright issues for commercial use.'),
    h3('Step 4 — Set up your contact form'),
    p('HTML templates cannot send email on their own — they need a backend service. The easiest free options are Formspree (formspree.io, free up to 50 submissions per month) or Netlify Forms if you host on Netlify. Set the form action attribute to your Formspree endpoint URL and your form will start working immediately.'),
    h3('Step 5 — Deploy your site'),
    p('For a free HTML business template, Cloudflare Pages is the best deployment option — it is free, fast (global CDN), and supports custom domains with HTTPS. Connect your GitHub repository and your site deploys automatically whenever you push changes. Netlify is equally good and slightly easier to set up without Git knowledge.'),

    h2('Important SEO Steps for Your Business Website'),
    p('After customizing your template, do these SEO basics before going live:'),
    p('Update the page title and meta description in the HTML head section. Write a unique, keyword-rich title like "Smith Legal Services — Business Law Firm in Chicago" rather than leaving it as "Home - My Website."'),
    p('Add alt text to all images. This is how Google understands what your images contain. Use descriptive alt text: "Smith Legal Services team meeting in Chicago office" not just "image1.jpg."'),
    p('Submit your site to Google Search Console after going live. This tells Google to crawl and index your site. Without this step, your site may not appear in search results for weeks.'),
    p('Set up Google Business Profile if you have a local business. This puts your business on Google Maps and in local search results — often more impactful than your website for driving local customers.'),

    h2('Final Thoughts'),
    p('A free HTML CSS business template from a quality source gives you a professional website foundation at zero cost. The investment is your time to customize — typically 2 to 4 hours for a clean business site if you follow the steps above.'),
    p('Browse the full collection of free and premium HTML CSS templates at TemplateLayer, all with live interactive previews so you see exactly how your site will look before you download. No account required, no email signup, no strings attached.'),
  ];

  console.log('📝 Uploading article...');
  const post = await client.create({
    _type: 'blogPost',
    title: '6 Best Free HTML CSS Business Website Templates 2025 — Download',
    slug: { _type: 'slug', current: slug },
    excerpt: 'Looking for a free HTML CSS business website template that actually looks professional? We curated the best ones available in 2025 — all with live previews, clean code, and no signup required.',
    body,
    category: { _type: 'reference', _ref: catId },
    publishedAt: new Date().toISOString(),
    readTime: '9 min read',
    seoTitle: '6 Best Free HTML CSS Business Website Templates 2025 — Free Download',
    seoDescription: 'Download the best free HTML CSS business website templates for 2025. Clean code, responsive design, live previews — no email signup required.',
  });
  console.log('✅ Article uploaded:', post._id);

  // Photo by Igor Miske on Unsplash — clean desk/business setup
  console.log('🖼️  Uploading image...');
  const buffer = await downloadImage('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=630&fit=crop&q=80');
  const asset = await client.assets.upload('image', buffer, { filename: 'free-html-business-website-templates.jpg', contentType: 'image/jpeg' });
  await client.patch(post._id).set({ thumbnail: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } }).commit();
  console.log('✅ Image attached');
  console.log('\n🎉 Done! → /blog/' + slug);
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
