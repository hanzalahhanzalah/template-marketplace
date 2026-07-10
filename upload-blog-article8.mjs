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
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, (res) => {
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
  const slug = 'best-cheap-web-hosting-2025';

  const existing = await client.fetch(`*[_type == "blogPost" && slug.current == $slug][0]{ _id }`, { slug });
  if (existing?._id) { console.log('⚠️  Already exists'); return; }

  const catData = await client.fetch(`*[_type == "category" && title == "Hosting & Tools" && categoryType == "blog"][0]{ _id }`);
  const catId = catData?._id;

  const body = [
    p('Cheap web hosting does not have to mean bad web hosting. The difference between a $2/month plan and a $20/month plan is often just marketing — many budget hosts use the same server infrastructure as premium ones. The real questions are: how fast is the server, what is the actual uptime, how bad are the renewal prices, and what do you get for the price?'),
    p('We tested and compared the best cheap web hosting plans for 2025 — focusing on real performance, honest renewal rates, and what each plan actually includes. No inflated claims.'),

    h2('What "Cheap" Actually Means in Web Hosting'),
    p('Every cheap hosting provider advertises heavily discounted first-year pricing — $0.99/month, $1.99/month, $2.99/month. These prices are real but temporary. The renewal rate — what you pay from year two onwards — is always significantly higher. A host charging $1.99/month promotional but $14.99/month at renewal is not actually cheap. Always calculate the two-year or three-year total cost.'),
    p('The other trap is feature limits. Cheap plans often cap the number of websites, storage space, email accounts, or monthly visitor bandwidth. Before buying, confirm the plan supports what you need.'),

    h2('1. Hostinger — Best Overall Cheap Hosting'),
    p('Hostinger is the clear winner for budget web hosting in 2025. Their Premium Shared Hosting plan is regularly available at $2.99/month (promotional) and renews at around $7.99/month — one of the lowest renewal rates in the industry. It includes hosting for 100 websites, 100GB SSD storage, unlimited bandwidth, a free domain for the first year, free SSL, and weekly backups.'),
    p('Performance is genuinely impressive for the price. Hostinger uses LiteSpeed web servers with built-in caching, which delivers faster page loads than traditional Apache servers. In independent speed tests, Hostinger consistently ranks among the fastest shared hosts available.'),
    p('Their custom hPanel control panel is clean and beginner-friendly — notably easier to use than the industry-standard cPanel. WordPress installs in one click. Support is available 24/7 via live chat with reasonable response times.'),
    p('One limitation: no phone support. Live chat only. For most users this is fine, but if you need phone access, look elsewhere.'),
    p('Best for: Beginners, bloggers, small businesses, developers managing multiple sites on a budget.'),

    h2('2. Namecheap Shared Hosting — Best for Simple Sites'),
    p('Namecheap is primarily known as a domain registrar but their shared hosting is genuinely competitive. The Stellar plan starts at around $1.98/month (promotional) and renews at $4.48/month — making it one of the cheapest renewal rates available for single-site hosting.'),
    p('The plan includes hosting for 3 websites, 20GB SSD storage, free SSL, and a free domain for the first year. Performance is solid for low-to-medium traffic sites. The cPanel interface is familiar to anyone who has used hosting before.'),
    p('Namecheap does not offer phone support — live chat and ticketing only. Their support quality is generally good with knowledgeable agents.'),
    p('Best for: Personal websites, portfolios, small blogs with moderate traffic. Not ideal for sites with 10,000+ monthly visitors.'),

    h2('3. Bluehost Basic — Best Cheap WordPress Hosting'),
    p('Bluehost is officially recommended by WordPress.org, which carries genuine weight. Their Basic plan starts at $2.95/month (promotional) and includes one website, 10GB SSD storage, a free domain for the first year, and a free SSL certificate.'),
    p('The WordPress integration is seamless — one-click installation, automatic updates, and a WordPress-specific dashboard. Performance on Bluehost has improved significantly after they moved infrastructure to SSD storage.'),
    p('The catch: Bluehost renewal rates are higher than Hostinger and Namecheap, typically $10.99/month for the Basic plan. If you plan to host for multiple years, this adds up. Also, the Basic plan limits you to one website — if you need to host multiple sites, you would need to upgrade.'),
    p('Best for: WordPress beginners who want the official WordPress-recommended host and a smooth setup experience.'),

    h2('4. InterServer — Best Fixed-Price Hosting'),
    p('InterServer is unusual in the hosting industry because they offer price-lock guarantee hosting — the price you pay today is the price you pay at renewal. No promotional rate tricks, no surprise price jumps. Their standard web hosting plan is around $2.50/month and stays at that price indefinitely.'),
    p('The plan includes unlimited websites, unlimited storage, unlimited email accounts, free SSL, and free website migration. Performance is reliable if not exceptional. They have been in business since 1999, which gives them credibility that newer hosts lack.'),
    p('Best for: Anyone who is tired of promotional pricing games and wants a straightforward, honest price that does not change.'),

    h2('5. Cloudflare Pages — Best Free Hosting for HTML Sites'),
    p('If your website is built with an HTML CSS template (not WordPress), Cloudflare Pages is the best option available — and it is completely free. There are no storage limits, no bandwidth limits, and no monthly fees for static HTML sites.'),
    p('Cloudflare Pages connects to your GitHub repository and deploys automatically every time you push code. Your site is served from Cloudflare global CDN with data centers in 275+ cities, which means blazing fast load times for visitors anywhere in the world.'),
    p('Custom domain support is included free. HTTPS is automatic. For HTML website templates specifically, this combination of free hosting and world-class performance is unbeatable.'),
    p('Best for: Developers and businesses using HTML CSS website templates who want maximum performance at zero cost.'),

    h2('Cheap Hosting Comparison at a Glance'),
    p('Hostinger Premium: $2.99/month promo, $7.99/month renewal. 100 sites, 100GB SSD. Best overall value.'),
    p('Namecheap Stellar: $1.98/month promo, $4.48/month renewal. 3 sites, 20GB SSD. Cheapest renewals.'),
    p('Bluehost Basic: $2.95/month promo, $10.99/month renewal. 1 site, 10GB SSD. Best for WordPress beginners.'),
    p('InterServer Standard: $2.50/month fixed. Unlimited sites, unlimited storage. No price surprises ever.'),
    p('Cloudflare Pages: Free. Unlimited. Only for static HTML/CSS sites. Fastest performance.'),

    h2('What to Watch Out For When Buying Cheap Hosting'),
    p('Renewal price shock: Always check the renewal rate before buying. A host offering $0.99/month that renews at $15.99/month is not cheap.'),
    p('Hidden limits: Read the fine print on "unlimited" storage and bandwidth. Many hosts throttle accounts that use "too much" of their unlimited resources.'),
    p('Upsells at checkout: GoDaddy, Bluehost, and others add paid extras to your cart automatically. Review your cart before paying.'),
    p('Free domain expiry: The "free domain" included in most hosting plans is only free for the first year. You pay full renewal price (typically $12–18/year) from year two.'),
    p('Backup policies: Cheap hosts often offer "weekly backups" not daily backups. If your site breaks between backups, you could lose a week of content. Consider whether you need daily backups and pay for them if so.'),

    h2('How to Choose the Right Cheap Host'),
    p('Running an HTML website template or static site → Cloudflare Pages (free, fastest).'),
    p('Building a WordPress blog or small business site → Hostinger Premium for best overall value.'),
    p('Hosting one WordPress site on the tightest budget → Namecheap Stellar for lowest renewal rates.'),
    p('First WordPress site and want simplicity → Bluehost Basic for seamless WordPress experience.'),
    p('Tired of promotional pricing games → InterServer for honest fixed pricing.'),

    h2('Final Verdict'),
    p('For the majority of small businesses and bloggers, Hostinger offers the best combination of performance, features, and pricing in the cheap hosting category. Their renewal rates are fair, their servers are fast, and their interface is beginner-friendly.'),
    p('If you are building a website using an HTML template from TemplateLayer, skip paid hosting entirely and use Cloudflare Pages — free, global CDN, automatic HTTPS, and zero monthly fees. Pair it with a domain from Namecheap for the most cost-effective website setup possible.'),
  ];

  // Upload article
  console.log('📝 Uploading article...');
  const post = await client.create({
    _type: 'blogPost',
    title: 'Best Cheap Web Hosting 2025 — Honest Comparison (No Hype)',
    slug: { _type: 'slug', current: slug },
    excerpt: 'Cheap hosting is full of tricks — promotional pricing, hidden limits, and renewal price shocks. We tested the top budget hosts and ranked them honestly so you can make the right call.',
    body,
    category: { _type: 'reference', _ref: catId },
    publishedAt: new Date().toISOString(),
    readTime: '9 min read',
    seoTitle: 'Best Cheap Web Hosting 2025 — Top 5 Budget Hosts Compared Honestly',
    seoDescription: 'Looking for cheap web hosting that actually works? We compare Hostinger, Namecheap, Bluehost, InterServer, and Cloudflare Pages on real price, speed, and value.',
  });
  console.log('✅ Article uploaded:', post._id);

  // Upload and attach image
  console.log('🖼️  Uploading image...');
  // Photo by Ales Nesetril on Unsplash — free license
  const buffer = await downloadImage('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=630&fit=crop&q=80&sat=-20');
  const asset = await client.assets.upload('image', buffer, { filename: 'cheap-web-hosting-2025.jpg', contentType: 'image/jpeg' });
  await client.patch(post._id).set({ thumbnail: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } }).commit();
  console.log('✅ Image attached');
  console.log('\n🎉 Done! Live at: /blog/' + slug);
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
