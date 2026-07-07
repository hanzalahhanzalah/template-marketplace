import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

function block(text, style = 'normal') {
  return {
    _type: 'block',
    _key: Math.random().toString(36).substr(2, 9),
    style,
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).substr(2, 9), text, marks: [] }],
  };
}

function h2(text) { return block(text, 'h2'); }
function h3(text) { return block(text, 'h3'); }
function p(text) { return block(text, 'normal'); }

async function upload() {
  console.log('🚀 Uploading Article 3: How to Make a Restaurant Website...');

  const slug = 'how-to-make-a-restaurant-website-step-by-step';

  const existing = await client.fetch(`*[_type == "blogPost" && slug.current == $slug][0]{ _id }`, { slug });
  if (existing?._id) {
    console.log('⚠️  Already exists:', existing._id);
    return;
  }

  let catId;
  const existingCat = await client.fetch(`*[_type == "category" && title == "Tutorials" && categoryType == "blog"][0]{ _id }`);
  if (existingCat?._id) {
    catId = existingCat._id;
  } else {
    const cat = await client.create({
      _type: 'category',
      title: 'Tutorials',
      slug: { _type: 'slug', current: 'tutorials' },
      categoryType: 'blog',
      order: 3,
    });
    catId = cat._id;
    console.log('✅ Created blog category:', catId);
  }

  const body = [
    p('Every restaurant needs a website in 2025. Not having one means losing customers to competitors who are easier to find on Google. The good news: you do not need to hire an expensive agency or learn complex coding to get a professional restaurant website online. This guide walks you through the entire process step by step.'),

    h2('What Your Restaurant Website Needs'),
    p('Before building anything, know what a restaurant website must have to actually convert visitors into customers:'),
    p('Menu: Your most visited page. Should be easy to read on mobile, ideally HTML-based (not a PDF — PDFs rank poorly on Google and are hard to read on phones).'),
    p('Location and hours: Displayed clearly on every page. Put it in the footer. Many customers visit just for this.'),
    p('Online reservation or booking form: Even a simple contact form is better than nothing. Consider integrating OpenTable or Resy if you take reservations.'),
    p('Food photos: High-quality photos of your dishes are essential. This is not optional. Bad food photography kills conversions.'),
    p('Contact information: Phone number, email, physical address with a Google Maps embed.'),
    p('About section: Your story, what makes your restaurant unique. This builds trust and personality.'),

    h2('Step 1 — Choose How You Will Build It'),
    p('You have three realistic options:'),

    h3('Option A: Use an HTML Restaurant Template (Recommended for Control and Speed)'),
    p('Starting from a professionally designed HTML restaurant template gives you full control over the design, no monthly platform fees, and a fast, SEO-optimized website. You download the template, customize the content, and host it for as little as a few dollars a month — or free on Cloudflare Pages.'),
    p('This approach requires basic knowledge of HTML and CSS, but even beginners can make content changes (text, colors, images) without deep technical knowledge. TemplateLayer offers restaurant HTML templates you can preview live before downloading.'),

    h3('Option B: Use WordPress with a Restaurant Theme'),
    p('WordPress powers over 40% of the web. With a restaurant theme like Astra or OceanWP plus a page builder like Elementor, you can build a restaurant site without code. You will pay for hosting ($5-15/month) and potentially a premium theme or plugins.'),
    p('WordPress is more flexible for non-developers but comes with regular updates, plugin management, and security patches to maintain.'),

    h3('Option C: Use a Website Builder (Wix, Squarespace)'),
    p('Website builders like Wix and Squarespace are the easiest option with no technical knowledge required. Squarespace in particular has excellent restaurant templates. The tradeoff is monthly subscription costs ($16-40/month), less design flexibility, and slightly worse SEO control versus custom HTML or WordPress.'),
    p('For a restaurant owner who wants something live quickly without touching code, Squarespace is a solid choice.'),

    h2('Step 2 — Get a Domain Name'),
    p('Your domain name is your website address (like bestpizzanyc.com). Tips for choosing a good restaurant domain:'),
    p('Keep it short and memorable. Avoid hyphens and numbers.'),
    p('Include your restaurant name or city if possible (e.g., mariospizzachicago.com).'),
    p('Use .com if available. .restaurant and .food extensions exist but .com is still the most trusted.'),
    p('Register your domain at Namecheap or Google Domains. Expect to pay around $10-15 per year.'),

    h2('Step 3 — Choose Web Hosting'),
    p('If you are using an HTML template or WordPress, you need web hosting — a server where your website files live.'),
    p('For HTML templates: Cloudflare Pages (free), Netlify (free tier), or Hostinger shared hosting ($2-3/month) are excellent options.'),
    p('For WordPress: SiteGround, Hostinger, or Bluehost all offer one-click WordPress installation. Expect to pay $3-10/month.'),
    p('For Wix or Squarespace: Hosting is included in your subscription. No separate hosting needed.'),

    h2('Step 4 — Customize Your Template or Theme'),
    p('Once you have your domain, hosting, and template chosen, the customization begins. Here is what to update:'),
    p('Replace all placeholder text with your real restaurant name, story, menu items, and contact details.'),
    p('Swap placeholder images with your actual food photography. Use high-resolution images (minimum 1200px wide).'),
    p('Set your color scheme to match your brand. If you use an HTML template with CSS custom properties, this takes changing 3-4 hex codes in a single CSS file.'),
    p('Update the navigation links. Make sure every section (Menu, About, Contact, Reservations) has a working link.'),
    p('Add your Google Maps embed to the location section.'),

    h2('Step 5 — Set Up Your Menu Page'),
    p('Your menu page is the most important page on your website. Follow these rules:'),
    p('Write your menu as real HTML text, not an image or PDF. Search engines cannot read images or PDFs properly.'),
    p('Organize by section: Starters, Mains, Desserts, Drinks.'),
    p('Include prices. Customers who cannot find prices leave immediately.'),
    p('Keep it updated. An outdated menu with wrong prices destroys trust.'),
    p('Add brief descriptions for each dish. This helps with SEO and makes items sound more appealing.'),

    h2('Step 6 — Add an Online Reservation System'),
    p('Even if you do not take reservations, a contact form is essential. Options:'),
    p('OpenTable: The most widely used reservation platform. Free to set up, charges per-cover fees.'),
    p('Resy: Popular alternative to OpenTable with lower fees.'),
    p('Simple contact form: If you only take phone bookings, a basic email contact form is sufficient.'),
    p('You can embed OpenTable or Resy widgets directly into your HTML template or WordPress site.'),

    h2('Step 7 — Optimize for Local SEO'),
    p('Local SEO is how your restaurant gets found on Google when someone nearby searches "pizza near me" or "best Italian restaurant in Chicago."'),
    p('Set up Google Business Profile (free): This is the single most important step for local restaurants. Go to business.google.com, claim your listing, and fill in every field — hours, photos, menu, phone number.'),
    p('Use local keywords in your page titles: "Mario\'s Pizza — Best Pizza in Chicago" is better than just "Home | Mario\'s Pizza."'),
    p('Get reviews: Ask satisfied customers to leave Google reviews. Reviews directly impact your local ranking.'),
    p('Add schema markup: Use LocalBusiness schema (JSON-LD) on your homepage. This gives Google structured information about your restaurant.'),

    h2('Step 8 — Go Live and Test'),
    p('Before announcing your website, test it thoroughly:'),
    p('Open it on your phone. Does everything look right on mobile? This is how most of your customers will view it.'),
    p('Test all links. Make sure navigation, buttons, and reservation links work.'),
    p('Check load speed at PageSpeed Insights (pagespeed.web.dev). Aim for a score above 70 on mobile.'),
    p('Submit your site to Google Search Console (search.google.com/search-console) so Google can find and index it.'),

    h2('How Much Does a Restaurant Website Cost?'),
    p('Here is a realistic breakdown:'),
    p('HTML template approach: Domain ($12/year) + Hosting ($24-36/year) + Template ($0-30 one-time) = Under $80/year total.'),
    p('WordPress approach: Domain ($12/year) + Hosting ($60-120/year) + Premium theme ($50-100 one-time) = $120-230 first year.'),
    p('Wix or Squarespace: $192-480/year (monthly subscription).'),
    p('Hiring a web designer: $500-5,000+ depending on complexity.'),
    p('For most small restaurants, the HTML template or WordPress approach offers the best balance of cost, control, and quality.'),

    h2('Final Thoughts'),
    p('Getting your restaurant online does not require a big budget or technical expertise. Start with a professional HTML template or a website builder, get your menu and contact information online, and set up your Google Business Profile. Those three steps alone will bring in more customers than not having a website at all.'),
    p('If you are looking for a professionally designed restaurant website template, browse our free and premium HTML templates at TemplateLayer — all templates come with live previews so you can see exactly what you are getting before you download.'),
  ];

  const post = await client.create({
    _type: 'blogPost',
    title: 'How to Make a Restaurant Website — Step-by-Step Guide (2025)',
    slug: { _type: 'slug', current: slug },
    excerpt: 'Every restaurant needs a website. This step-by-step guide shows you exactly how to build one — from choosing a domain and hosting to setting up your menu, reservations, and local SEO.',
    body,
    category: { _type: 'reference', _ref: catId },
    publishedAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    readTime: '11 min read',
    seoTitle: 'How to Make a Restaurant Website (Step-by-Step Guide 2025)',
    seoDescription: 'Learn how to build a professional restaurant website from scratch. Step-by-step guide covering templates, hosting, menu setup, reservations, and local SEO.',
  });

  console.log('✅ Article 3 uploaded:', post._id);
  console.log('   URL: /blog/' + slug);
}

upload().catch((err) => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
