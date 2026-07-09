import { createClient } from '@sanity/client';
const client = createClient({ projectId: 'ath1uvh6', dataset: 'production', apiVersion: '2024-01-01', useCdn: false, token: process.env.SANITY_API_TOKEN });
const k = () => Math.random().toString(36).substr(2, 9);
const b = (text, style = 'normal') => ({ _type: 'block', _key: k(), style, markDefs: [], children: [{ _type: 'span', _key: k(), text, marks: [] }] });
const h2 = t => b(t, 'h2');
const h3 = t => b(t, 'h3');
const p = t => b(t, 'normal');

async function main() {
  const slug = 'namecheap-vs-godaddy-2025-best-domain-registrar';
  const existing = await client.fetch(`*[_type == "blogPost" && slug.current == $slug][0]{ _id }`, { slug });
  if (existing?._id) { console.log('Already exists'); return; }
  let catId;
  const ec = await client.fetch(`*[_type == "category" && title == "Hosting & Tools" && categoryType == "blog"][0]{ _id }`);
  catId = ec?._id;
  const body = [
    p('Your domain name is the foundation of your online presence. GoDaddy and Namecheap are the two most popular domain registrars in the world — but they are very different products with different pricing strategies, renewal costs, and upsell approaches. This comparison tells you exactly which one to use and when.'),
    h2('The Core Difference'),
    p('GoDaddy is the largest domain registrar in the world with over 80 million domains under management. It has the widest brand recognition and aggressive promotional pricing on first-year registrations. The catch: renewal prices are significantly higher than the promotional rate, and GoDaddy is famous for its checkout upsell process that adds unwanted products to your cart.'),
    p('Namecheap is smaller but highly regarded in the developer and tech community for transparent pricing, lower renewal costs, free WhoisGuard privacy protection, and a cleaner buying experience with far fewer upsells.'),
    h2('Price Comparison — Registration and Renewal'),
    p('For .com domains (the most common extension): GoDaddy charges around $0.99 to $2.99 for the first year (promotional rate), then $21.99 to $24.99 per year at renewal. Namecheap charges around $6.98 to $9.98 for the first year, then $13.98 to $15.98 per year at renewal.'),
    p('This matters a lot long-term. If you register a .com for 5 years, Namecheap saves you $40 to $50 over GoDaddy. For multiple domains, this difference compounds quickly. GoDaddy wins on the promotional first year. Namecheap wins on every year after that.'),
    h2('Privacy Protection (WHOIS)'),
    p('When you register a domain, your personal information (name, email, phone number, address) is added to the public WHOIS database by default. Privacy protection hides this information from public view.'),
    p('Namecheap includes WhoisGuard privacy protection free for life on all eligible domains. GoDaddy charges around $9.99 per year per domain for privacy protection — called "Domain Privacy + Protection."'),
    p('This single difference makes Namecheap significantly cheaper for anyone who values their privacy (which should be everyone).'),
    h2('Domain Management Interface'),
    p('GoDaddy has redesigned its interface multiple times. The current version is functional but bloated — it is clearly designed to upsell hosting, email, and security products at every turn. Finding basic DNS settings takes more clicks than it should.'),
    p('Namecheap has a cleaner, more developer-friendly interface. The Advanced DNS panel gives you direct control over DNS records without confusion. For developers and technical users, Namecheap is the more comfortable experience.'),
    h2('Customer Support'),
    p('GoDaddy has 24/7 phone support — a genuine advantage if you prefer calling over chat. Their support quality is inconsistent; some representatives are helpful, others are primarily focused on upselling additional products.'),
    p('Namecheap offers 24/7 live chat support and a ticketing system. No phone support. Their chat agents are generally knowledgeable and focused on solving your problem. Wait times are usually short.'),
    h2('Hosting Integration'),
    p('Both GoDaddy and Namecheap offer web hosting in addition to domain registration. In both cases, we recommend buying your domain from one provider and hosting separately from a specialized host like Hostinger, SiteGround, or Cloudflare Pages for better performance and pricing.'),
    p('Bundling your domain with hosting from the same provider is convenient but often locks you into higher pricing or makes it harder to switch hosts later. Keeping domain and hosting separate gives you maximum flexibility.'),
    h2('Other Domain Registrars Worth Considering'),
    p('Cloudflare Registrar: Sells domains at cost price (no markup). The cheapest option for .com renewals at around $8.57/year. No privacy protection needed — Cloudflare automatically protects WHOIS. The major limitation is that you must use Cloudflare for DNS.'),
    p('Google Domains (now Squarespace Domains): Was excellent before Google sold it. The current Squarespace Domains product offers a clean interface and reasonable pricing but lacks the history and reputation of Namecheap.'),
    p('Porkbun: Highly competitive pricing, free WHOIS privacy, and a clean interface. Less well-known but growing in popularity among developers.'),
    h2('Which Domain Registrar Should You Use?'),
    p('For most people, most of the time: Namecheap. The combination of competitive pricing, free WHOIS privacy, clean interface, and honest renewal rates makes it the best overall value.'),
    p('If cost is your absolute top priority and you already use Cloudflare: Cloudflare Registrar at cost price.'),
    p('If you want phone support and do not mind paying more: GoDaddy — but watch out for checkout upsells and calculate the true multi-year cost before registering.'),
    h2('Choosing Your Domain Name'),
    p('Before you register, a few rules for a good domain name: Keep it short — under 15 characters if possible. Use .com if available. Avoid hyphens and numbers. Make it easy to say aloud without spelling it out. Check that no trademark exists for your exact name.'),
    p('Once you have your domain, you will need to connect it to your website. If you are using an HTML website template, Cloudflare Pages or Netlify both offer clear tutorials for connecting your custom domain in under 10 minutes.'),
  ];
  const post = await client.create({
    _type: 'blogPost',
    title: 'Namecheap vs GoDaddy 2025 — Which Domain Registrar Is Better?',
    slug: { _type: 'slug', current: slug },
    excerpt: 'GoDaddy has aggressive first-year pricing but expensive renewals. Namecheap is cheaper long-term with free WHOIS privacy. Here is the honest comparison.',
    body,
    category: { _type: 'reference', _ref: catId },
    publishedAt: new Date(Date.now() - 10800000).toISOString(),
    readTime: '8 min read',
    seoTitle: 'Namecheap vs GoDaddy 2025 — Honest Domain Registrar Comparison',
    seoDescription: 'Namecheap or GoDaddy? We compare registration price, renewal cost, WHOIS privacy, and support to tell you exactly which domain registrar is better value.',
  });
  console.log('✅ Article 7:', post._id, '— /blog/' + slug);
}
main().catch(e => { console.error('❌', e.message); process.exit(1); });
