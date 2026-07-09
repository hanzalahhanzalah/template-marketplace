import { createClient } from '@sanity/client';
const client = createClient({ projectId: 'ath1uvh6', dataset: 'production', apiVersion: '2024-01-01', useCdn: false, token: process.env.SANITY_API_TOKEN });
const k = () => Math.random().toString(36).substr(2, 9);
const b = (text, style = 'normal') => ({ _type: 'block', _key: k(), style, markDefs: [], children: [{ _type: 'span', _key: k(), text, marks: [] }] });
const h2 = t => b(t, 'h2');
const h3 = t => b(t, 'h3');
const p = t => b(t, 'normal');

async function main() {
  const slug = 'best-free-saas-landing-page-html-templates-2025';
  const existing = await client.fetch(`*[_type == "blogPost" && slug.current == $slug][0]{ _id }`, { slug });
  if (existing?._id) { console.log('Already exists'); return; }
  let catId;
  const ec = await client.fetch(`*[_type == "category" && title == "Templates" && categoryType == "blog"][0]{ _id }`);
  catId = ec?._id;
  const body = [
    p('SaaS landing pages follow a specific formula that converts visitors into trial signups and paying customers. The layout, the copy structure, the call-to-action placement — these patterns exist because they work. A great SaaS landing page template gives you this proven structure so you can focus on your product message instead of figuring out layout from scratch.'),
    p('Here are the best free SaaS landing page HTML templates available in 2025 — all tested, all responsive, all free to download.'),
    h2('What Makes a Great SaaS Landing Page Template?'),
    p('Before the list, here is what separates a high-converting SaaS template from a generic one:'),
    p('Hero section with a clear value proposition and primary CTA. Social proof section (logos, testimonials, review scores). Features section with icons and benefit-focused copy. Pricing table with clear tier comparison. FAQ section to handle objections. Footer with legal links. All of this above the fold on desktop.'),
    h2('1. SaaS Pro Landing — TemplateLayer'),
    p('The SaaS Pro Landing template on TemplateLayer is a premium-quality, single-page SaaS landing page built with pure HTML, CSS, and JavaScript. It includes every section a SaaS product needs: animated hero, feature showcases with icons, a three-tier pricing table, testimonial cards, an FAQ accordion, and a newsletter signup form.'),
    p('The design uses a clean dark-on-light color scheme with a strong blue accent that communicates trust and reliability — exactly what SaaS buyers need to see. Built with no framework dependencies, it loads fast and scores well on Google PageSpeed.'),
    p('Features: Animated hero section, sticky navigation, pricing table with toggle, testimonials grid, FAQ accordion, full dark mode support, responsive on all devices. Available as a free preview and download at TemplateLayer.'),
    h2('2. CleanStream Modern SaaS Template — TemplateLayer'),
    p('CleanStream takes a minimalist approach to SaaS landing pages. Where most templates are heavy with gradients and animations, CleanStream uses whitespace, sharp typography, and precise layout to communicate professionalism and focus.'),
    p('It is particularly effective for B2B SaaS products where your audience is other businesses and developers. The clean aesthetic signals that your product is serious, well-engineered, and built for professionals. Available on TemplateLayer with a live preview.'),
    h2('3. Tailwind UI — Open Source Components'),
    p('Tailwind UI is not a full template but rather a set of open-source Tailwind CSS components that includes SaaS landing page sections. Their Catalyst and Hero component sets include ready-to-use hero sections, feature grids, pricing tables, and testimonial layouts built with Tailwind CSS.'),
    p('Best for developers already using Tailwind CSS who want to assemble a custom landing page from premium-quality components. Requires basic Tailwind knowledge to assemble and customize.'),
    h2('4. Cruip Open-Source Templates'),
    p('Cruip offers several free, beautifully designed landing page templates including SaaS-focused designs. Their templates are built with Tailwind CSS and are available as plain HTML/CSS versions as well as React and Next.js versions. The design quality is consistently excellent — clean, modern, and conversion-focused.'),
    p('Best for: Developers who want production-ready code with minimal customization needed.'),
    h2('5. One Page Love — Free Landing Page Templates'),
    p('One Page Love is a curated directory rather than a template creator. They feature the best single-page website templates from around the web, including many SaaS landing page templates. The quality varies but the top-rated templates are genuinely excellent.'),
    p('Browse their "App" and "SaaS" categories to find options that match your product. Most featured templates are free to download.'),
    h2('What Every SaaS Landing Page Must Include'),
    p('Whatever template you choose, make sure your landing page has these elements:'),
    p('Clear headline that states what your product does in one sentence. Subheadline that explains who it is for and what problem it solves. Primary CTA button above the fold — "Start Free Trial", "Get Started Free", or "Try it Free". Social proof: logos of companies using your product, or a review score from G2 or Capterra. Three to five key features explained in benefit terms, not technical terms. A pricing section — hiding pricing increases bounce rate. An FAQ that addresses the top 5 objections to signing up.'),
    h2('Hosting Your SaaS Landing Page'),
    p('Once you have customized your HTML template, you have several options for free hosting:'),
    p('Cloudflare Pages: Best performance, global CDN, completely free. Connect your GitHub repo or drag and drop your folder. Netlify: Extremely easy deployment, free tier includes custom domain and HTTPS. Vercel: Same as Netlify in terms of ease and free tier, slightly better for JavaScript-heavy pages.'),
    p('For a pure HTML SaaS landing page, Cloudflare Pages is our recommendation for the fastest global load times.'),
    h2('Final Thoughts'),
    p('The SaaS market is competitive and your landing page is often the difference between a visitor becoming a customer or leaving to sign up with a competitor. Using a professionally designed HTML template gives you a conversion-tested layout you can customize to your brand and message.'),
    p('Browse the SaaS templates available on TemplateLayer with live previews — see exactly how your product page will look before you download and customize.'),
  ];
  const post = await client.create({
    _type: 'blogPost',
    title: '5 Best Free SaaS Landing Page HTML Templates 2025 — Download',
    slug: { _type: 'slug', current: slug },
    excerpt: 'Need a SaaS landing page that converts visitors into signups? These are the best free SaaS landing page HTML CSS templates tested and ranked for 2025.',
    body,
    category: { _type: 'reference', _ref: catId },
    publishedAt: new Date(Date.now() - 7200000).toISOString(),
    readTime: '8 min read',
    seoTitle: '5 Best Free SaaS Landing Page HTML Templates 2025 — Free Download',
    seoDescription: 'Download the best free SaaS landing page HTML CSS templates for 2025. Responsive, fast, and conversion-optimized — all with live previews.',
  });
  console.log('✅ Article 6:', post._id, '— /blog/' + slug);
}
main().catch(e => { console.error('❌', e.message); process.exit(1); });
