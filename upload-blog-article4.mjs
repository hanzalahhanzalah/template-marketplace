import { createClient } from '@sanity/client';
const client = createClient({ projectId: 'ath1uvh6', dataset: 'production', apiVersion: '2024-01-01', useCdn: false, token: process.env.SANITY_API_TOKEN });
const k = () => Math.random().toString(36).substr(2, 9);
const b = (text, style = 'normal') => ({ _type: 'block', _key: k(), style, markDefs: [], children: [{ _type: 'span', _key: k(), text, marks: [] }] });
const h2 = t => b(t, 'h2');
const h3 = t => b(t, 'h3');
const p = t => b(t, 'normal');

async function main() {
  const slug = 'wix-vs-squarespace-vs-wordpress-2025';
  const existing = await client.fetch(`*[_type == "blogPost" && slug.current == $slug][0]{ _id }`, { slug });
  if (existing?._id) { console.log('Already exists'); return; }

  let catId;
  const ec = await client.fetch(`*[_type == "category" && title == "Hosting & Tools" && categoryType == "blog"][0]{ _id }`);
  catId = ec?._id;

  const body = [
    p('Choosing between Wix, Squarespace, and WordPress is one of the most common questions beginners ask. All three can build a professional website — but they are designed for completely different types of people and projects. This guide cuts through the marketing and tells you exactly which one fits your situation.'),

    h2('Quick Summary — Who Each One Is For'),
    p('Wix: Best for beginners who want drag-and-drop freedom and do not want to touch code. The widest range of templates and apps. Slightly cheaper entry price.'),
    p('Squarespace: Best for creative professionals — designers, photographers, restaurants, and small businesses who prioritize visual quality. Better looking templates out of the box.'),
    p('WordPress: Best for anyone who wants full control, serious blogging, or e-commerce at scale. Steeper learning curve but unlimited flexibility. Powers 43% of all websites on the internet.'),

    h2('Wix — The Drag and Drop Builder'),
    h3('What Wix Does Well'),
    p('Wix gives you a true drag-and-drop editor where you can place any element anywhere on the page. No restrictions on layout. This level of creative freedom is unmatched among hosted website builders. Wix also has an enormous app market with over 300 integrations including booking systems, live chat, eCommerce, and social media tools.'),
    p('The Wix ADI (Artificial Design Intelligence) feature can build you a starter website automatically by asking a few questions about your business. For a complete beginner, this removes the blank page problem entirely.'),
    p('Pricing starts at around $17/month for the Light plan (no ads). For eCommerce you need the Core plan at $29/month or higher.'),

    h3('Wix Weaknesses'),
    p('The freedom that makes Wix great also creates problems. Because you can place anything anywhere, it is easy to accidentally create an inconsistent, messy layout. Wix sites also cannot be migrated to another platform — if you ever want to move away from Wix, you have to rebuild your site from scratch.'),
    p('SEO capabilities have improved significantly but still lag behind WordPress. The page speed of Wix sites, while better than it used to be, is generally slower than a well-optimized WordPress or Squarespace site.'),

    h2('Squarespace — The Design-First Builder'),
    h3('What Squarespace Does Well'),
    p('Squarespace consistently produces the most beautiful websites of the three platforms. Their templates are professionally designed and maintained by a full-time design team. The editor is section-based rather than free-form drag-and-drop, which means it is harder to create an ugly site by accident — everything snaps into a clean layout grid.'),
    p('Squarespace is particularly strong for portfolios, restaurants, wedding websites, and service-based businesses. Built-in features include scheduling and appointment booking, email marketing, and a solid eCommerce system with no transaction fees on higher plans.'),
    p('Pricing starts at $16/month for the Personal plan. Business plan at $23/month adds JavaScript injection and professional email. Commerce plans start at $28/month.'),

    h3('Squarespace Weaknesses'),
    p('The editor is less flexible than Wix — you can customize within sections but cannot freely position elements anywhere. The app ecosystem is much smaller than Wix. If you need a very specific integration that Squarespace does not natively support, you will struggle.'),
    p('Customer support, while available 24/7 via email, does not offer real-time phone support. Live chat is available but only during business hours.'),

    h2('WordPress — The Flexible Powerhouse'),
    h3('What WordPress Does Well'),
    p('WordPress (specifically WordPress.org, the self-hosted version) is the most powerful website platform in existence. It is open source and free — you only pay for hosting and your domain. With over 60,000 free plugins and thousands of premium themes, you can build virtually anything: blogs, membership sites, online stores, marketplaces, forums, and custom web applications.'),
    p('WordPress gives you complete control over your SEO, site speed, code, and design. Tools like Rank Math or Yoast SEO give you granular control over every SEO factor. WooCommerce turns WordPress into a full eCommerce platform that rivals Shopify. For serious bloggers and businesses, WordPress is the clear choice.'),
    p('Hosting costs vary. A quality shared host like SiteGround or Hostinger costs $3-8/month. Add a premium theme ($50-100 one-time) and you have a professional site for under $150/year.'),

    h3('WordPress Weaknesses'),
    p('WordPress has a real learning curve. Setting up a new site involves choosing hosting, installing WordPress, installing a theme, installing plugins, and configuring everything. For a complete non-technical beginner, this process can take a full day.'),
    p('WordPress also requires ongoing maintenance. You need to keep WordPress, plugins, and themes updated regularly. Outdated plugins are the most common security vulnerability on the web. If you want a site that runs itself, WordPress is not that platform.'),

    h2('Side-by-Side Comparison'),
    p('Ease of use: Wix wins. Squarespace is second. WordPress requires technical comfort.'),
    p('Design quality: Squarespace wins. Wix is second. WordPress depends entirely on your theme choice.'),
    p('Flexibility and features: WordPress wins by a massive margin. No contest.'),
    p('SEO capability: WordPress wins. Squarespace is second. Wix has improved but is still third.'),
    p('eCommerce: WordPress (WooCommerce) for large stores. Squarespace for small stores. Wix for very simple selling.'),
    p('Price: WordPress is cheapest long-term. Wix and Squarespace have comparable pricing.'),
    p('Portability: WordPress wins — you own your data and can move hosts. Wix and Squarespace lock you in.'),

    h2('Which Should You Choose?'),
    p('Choose Wix if: You are a complete beginner, you want to launch a basic business site or personal site quickly, and design perfection is not critical.'),
    p('Choose Squarespace if: You are a creative professional, photographer, restaurateur, or small business owner who needs a beautiful, polished site without technical complexity.'),
    p('Choose WordPress if: You are building a blog, want full SEO control, plan to scale, need custom functionality, or want to spend less money long-term.'),

    h2('The HTML Template Alternative'),
    p('There is a fourth option that many developers and businesses use: a professionally designed HTML CSS template hosted on a fast server like Cloudflare Pages or Netlify.'),
    p('An HTML template gives you complete control with zero monthly platform fees. You pay for a domain ($12/year) and optionally hosting ($0-36/year). TemplateLayer offers free and premium HTML templates for restaurants, agencies, SaaS products, portfolios, and more — you can preview them live before downloading.'),
    p('This approach is best for developers or business owners who want a fast, custom website without being locked into any platform. No subscriptions, no limitations, no surprise price increases at renewal.'),

    h2('Final Verdict'),
    p('For most beginners starting a simple business website: Squarespace. The design quality justifies the price and you will not embarrass yourself with bad layouts.'),
    p('For bloggers and growing businesses: WordPress. The investment in learning it pays back quickly.'),
    p('For developers and people who want full control: HTML template + your own hosting. Fastest, cheapest, most flexible.'),
  ];

  const post = await client.create({
    _type: 'blogPost',
    title: 'Wix vs Squarespace vs WordPress 2025 — Which Is Best for Your Website?',
    slug: { _type: 'slug', current: slug },
    excerpt: 'Wix, Squarespace, and WordPress all claim to be the best website builder. Here is an honest, no-marketing comparison to help you pick the right one for your situation.',
    body,
    category: { _type: 'reference', _ref: catId },
    publishedAt: new Date().toISOString(),
    readTime: '10 min read',
    seoTitle: 'Wix vs Squarespace vs WordPress 2025 — Honest Comparison',
    seoDescription: 'Wix, Squarespace, or WordPress? We compare all three honestly on ease of use, design, SEO, pricing, and flexibility so you can make the right choice.',
  });
  console.log('✅ Article 4 uploaded:', post._id);
  console.log('   /blog/' + slug);
}
main().catch(e => { console.error('❌', e.message); process.exit(1); });
