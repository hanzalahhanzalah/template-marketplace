import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Helper to create a Portable Text block
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
  console.log('🚀 Uploading Article 1: Best Web Hosting for Small Business...');

  const slug = 'best-web-hosting-for-small-business-2025';

  const existing = await client.fetch(`*[_type == "blogPost" && slug.current == $slug][0]{ _id }`, { slug });
  if (existing?._id) {
    console.log('⚠️  Already exists:', existing._id);
    return;
  }

  // Find or create blog category
  let catId;
  const existingCat = await client.fetch(`*[_type == "category" && title == "Hosting & Tools" && categoryType == "blog"][0]{ _id }`);
  if (existingCat?._id) {
    catId = existingCat._id;
  } else {
    const cat = await client.create({
      _type: 'category',
      title: 'Hosting & Tools',
      slug: { _type: 'slug', current: 'hosting-tools' },
      categoryType: 'blog',
      order: 1,
    });
    catId = cat._id;
    console.log('✅ Created blog category:', catId);
  }

  const body = [
    p('Choosing the right web hosting is one of the most important decisions for your small business website. A slow or unreliable host hurts your Google rankings, drives visitors away, and costs you customers. We tested and compared the top providers to help you make the right choice.'),

    h2('What to Look for in Small Business Web Hosting'),
    p('Before we dive into the best options, here are the key factors that matter for small business hosting:'),
    p('Uptime guarantee: Look for 99.9% or better. Downtime means lost sales and damaged trust.'),
    p('Page speed: Google uses page speed as a ranking factor. Your host\'s server performance directly affects your SEO.'),
    p('Customer support: Small businesses need responsive support — look for 24/7 live chat.'),
    p('Scalability: As your business grows, your host should scale with you without forcing a full migration.'),
    p('Price: First-term discounts are common. Always check the renewal rate — some hosts triple the price at renewal.'),

    h2('1. Hostinger — Best Overall for Small Business'),
    p('Hostinger consistently offers the best value in shared hosting. Their Premium Shared plan starts at around $2.99/month (promotional) and includes a free domain, free SSL, 100 websites, and unlimited bandwidth. Performance is excellent for the price — powered by LiteSpeed servers with built-in caching.'),
    p('Renewal rates are higher but still competitive. Their hPanel control panel is clean and beginner-friendly. Uptime is consistently above 99.9%. For a small business that needs reliable, fast hosting without spending a lot, Hostinger is our top pick.'),
    p('Best for: Startups, freelancers, small business owners on a budget.'),

    h2('2. SiteGround — Best for WordPress and Support'),
    p('SiteGround is premium priced but delivers premium performance. Their shared hosting plans use Google Cloud infrastructure, meaning fast servers globally. They include free SSL, daily backups, and a CDN on all plans.'),
    p('What sets SiteGround apart is their support quality. They have one of the most responsive customer service teams in the industry — live chat wait times are typically under 2 minutes. If you run a WordPress site, their staging environments and automatic updates are invaluable.'),
    p('Starting price is around $2.99/month (introductory), renewing at $14.99/month. The renewal jump is significant, so factor that in.'),
    p('Best for: WordPress sites, businesses that prioritize support and performance over price.'),

    h2('3. Bluehost — Best for WordPress Beginners'),
    p('Bluehost is officially recommended by WordPress.org, which gives it credibility. Their Basic plan starts at $2.95/month and includes a free domain for the first year, free SSL, and 1-click WordPress installation.'),
    p('Performance is solid, though not as fast as SiteGround or Hostinger on benchmarks. Their dashboard integrates seamlessly with WordPress, making it genuinely beginner-friendly. Support is available 24/7 via chat and phone.'),
    p('Note that Bluehost\'s renewal rates are higher (typically $10.99/month), so plan accordingly.'),
    p('Best for: Small businesses and bloggers using WordPress for the first time.'),

    h2('4. Cloudflare Pages + Namecheap — Best for HTML/Static Sites'),
    p('If your website is an HTML template site (not WordPress), this combination is unbeatable on value. Namecheap provides affordable domain registration and hosting, while Cloudflare Pages offers free hosting for static sites with a global CDN.'),
    p('For businesses using HTML website templates, this setup delivers blazing fast load times and zero monthly hosting costs. It\'s more technical to set up, but extremely powerful and cost-effective.'),
    p('Best for: Developers, businesses using HTML/CSS website templates, static sites.'),

    h2('5. Kinsta — Best Managed WordPress Hosting'),
    p('Kinsta is a premium managed WordPress host built on Google Cloud Platform. It\'s expensive (starting at $35/month) but offers enterprise-level performance, daily backups, a free CDN, and expert 24/7 support.'),
    p('For small businesses with higher traffic or e-commerce stores where performance and security are critical, Kinsta is worth the investment. Not recommended for very small or budget-conscious operations.'),
    p('Best for: Established small businesses, WooCommerce stores, high-traffic sites.'),

    h2('How to Choose the Right Host for Your Business'),
    p('Here is a simple decision framework:'),
    p('Just starting out with a small budget → Hostinger'),
    p('Running WordPress and need excellent support → SiteGround'),
    p('First WordPress site, need simplicity → Bluehost'),
    p('Using an HTML website template → Cloudflare Pages + Namecheap'),
    p('High traffic WordPress or e-commerce → Kinsta'),

    h2('Final Verdict'),
    p('For most small businesses, Hostinger offers the best combination of performance, features, and price. SiteGround is the better choice if support and WordPress performance are your priorities. Avoid making your decision based purely on the promotional price — always check the renewal rate.'),
    p('If you are building your business website using an HTML template, you can get started today with a free or premium template from TemplateLayer and pair it with Cloudflare Pages for free hosting.'),
  ];

  const post = await client.create({
    _type: 'blogPost',
    title: 'Best Web Hosting for Small Business in 2025 — Compared',
    slug: { _type: 'slug', current: slug },
    excerpt: 'Choosing the right web host for your small business matters more than most people realize. We compare the top options — Hostinger, SiteGround, Bluehost, and more — to help you make the right call.',
    body,
    category: { _type: 'reference', _ref: catId },
    publishedAt: new Date().toISOString(),
    readTime: '8 min read',
    seoTitle: 'Best Web Hosting for Small Business 2025 — Top 5 Compared',
    seoDescription: 'Looking for the best web hosting for your small business? We compare Hostinger, SiteGround, Bluehost, and more on speed, price, and support.',
  });

  console.log('✅ Article 1 uploaded:', post._id);
  console.log('   URL: /blog/' + slug);
}

upload().catch((err) => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
