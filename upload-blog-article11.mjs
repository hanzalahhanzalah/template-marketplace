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
  const slug = 'how-to-make-a-business-website-free-2025';
  const existing = await client.fetch(`*[_type == "blogPost" && slug.current == $slug][0]{ _id }`, { slug });
  if (existing?._id) { console.log('⚠️  Already exists'); return; }

  const catData = await client.fetch(`*[_type == "category" && title == "Tutorials" && categoryType == "blog"][0]{ _id }`);
  const catId = catData?._id;

  const body = [
    p('You do not need to spend money to build a professional business website in 2025. Between free website templates, free hosting platforms, and free domain options, it is genuinely possible to launch a credible business website for zero cost. This guide shows you exactly how.'),

    h2('What You Actually Need for a Business Website'),
    p('Strip it down to the essentials. A business website needs: a domain name (your web address), web hosting (a server to store your files), and a website design (the actual pages and content). Most paid website solutions bundle these together and charge $15-40/month. But each component can be obtained free or very cheaply when separated.'),

    h2('Option 1 — Completely Free (No Domain, No Hosting Cost)'),
    p('If your budget is literally zero, this setup works: use GitHub Pages for free hosting and the free subdomain it gives you (yourbusiness.github.io). This is a legitimate URL that works for portfolios, freelancers, and early-stage businesses. No credit card required, no expiry date, completely free forever.'),
    p('Steps: Create a free GitHub account at github.com. Create a new repository named yourusername.github.io. Upload your HTML website files to the repository. Enable GitHub Pages in the repository settings. Your website is live at yourusername.github.io within minutes.'),
    p('The limitation is the subdomain — yourbusiness.github.io looks less professional than yourbusiness.com. If budget allows, a custom .com domain costs around $10-12/year and can be connected to GitHub Pages for free.'),

    h2('Option 2 — Free Hosting + Cheap Domain ($10-12/year total)'),
    p('This is the best value setup for a real business. Use Cloudflare Pages for hosting (completely free, no limits, global CDN performance) and Namecheap for your domain (around $9-11/year for a .com).'),
    p('Cloudflare Pages connects to your GitHub repository and deploys your website automatically. Every time you update your files and push to GitHub, your live website updates within seconds. Your site is served from Cloudflare\'s global network — the same infrastructure used by millions of enterprise websites — at zero cost.'),
    p('This combination gives you a professional custom domain, world-class hosting performance, automatic HTTPS, and unlimited bandwidth for under $12 per year total.'),

    h2('Step 1 — Choose Your Website Design'),
    p('The fastest way to build a professional business website for free is to start from a free HTML CSS template. Building from scratch takes weeks. A template gives you a professionally designed, responsive, coded website in minutes — you just replace the content with your own.'),
    p('TemplateLayer offers free HTML CSS business website templates including options for agencies, startups, SaaS products, restaurants, portfolios, and more. All templates have live previews so you can see exactly how your site will look before downloading. No account required.'),
    p('Download the template that fits your business type. You will get a zip file containing your HTML, CSS, JavaScript, and image files.'),

    h2('Step 2 — Customize the Template'),
    p('Open the HTML files in a free code editor. VS Code (code.visualstudio.com) is the best free option — download and install it, then open your template folder.'),
    h3('Replace the content'),
    p('Use Edit → Find and Replace (Ctrl+H) to swap placeholder text with your real business information. Replace: company name, tagline, service descriptions, phone number, email address, and physical address if applicable.'),
    h3('Update the colors'),
    p('Most modern HTML templates use CSS custom properties for colors. Open the main CSS file and look for a :root block near the top containing variables like --color-primary. Change these hex color values to match your brand colors. The entire site updates automatically.'),
    h3('Replace images'),
    p('Replace placeholder images with your own photos. If you do not have professional photos, use Unsplash (unsplash.com) for free high-quality photos with no copyright restrictions. Download images at 1200px width and compress them at tinypng.com before adding them to your site.'),

    h2('Step 3 — Set Up Free Hosting on Cloudflare Pages'),
    p('Create a free account at cloudflare.com. Navigate to Workers and Pages, then Pages, then Create a project. You have two options: connect your GitHub repository for automatic deployments, or use Direct Upload to drag and drop your website folder.'),
    p('For beginners without GitHub experience, Direct Upload is the easiest path. Drag your entire template folder onto the upload area. Cloudflare deploys it instantly and gives you a URL like yourproject.pages.dev. This URL is live and accessible immediately.'),

    h2('Step 4 — Connect Your Custom Domain'),
    p('If you have purchased a domain from Namecheap, connecting it to Cloudflare Pages takes about 10 minutes. In your Cloudflare Pages project, go to Custom Domains and add your domain. Cloudflare will show you the DNS records to add. Log into Namecheap, go to your domain\'s Advanced DNS settings, and add the CNAME records Cloudflare provides. DNS updates typically propagate within 5-30 minutes. Your custom domain is then live.'),

    h2('Step 5 — Set Up Your Contact Form for Free'),
    p('A static HTML website cannot send email on its own. Use Formspree (formspree.io) to handle form submissions for free. Create a free account, create a new form, and copy the endpoint URL they provide. In your HTML template, set the form\'s action attribute to this endpoint URL. Your contact form will now send email directly to your inbox. The free tier allows 50 submissions per month.'),

    h2('Step 6 — Add Basic SEO'),
    p('Before going live, do these SEO basics to help Google find your site:'),
    p('Page title: In your HTML head section, update the title tag to include your business name, service type, and location. Example: "ABC Plumbing — Emergency Plumber in Denver, CO".'),
    p('Meta description: Update the meta description tag with a 150-160 character summary of your business. This is what appears under your link in Google search results.'),
    p('Image alt text: Add descriptive alt attributes to all img tags. "Denver plumber repairing kitchen sink" not just "image1.jpg".'),
    p('Submit to Google: After going live, go to search.google.com/search-console, add your property, and submit your sitemap. This tells Google to crawl your site.'),

    h2('Step 7 — Set Up Google Business Profile (Free)'),
    p('If you serve customers at a physical location or in a local area, Google Business Profile is more important than your website for getting found. Go to business.google.com, claim or create your listing, and fill in every field: hours, photos, description, phone number, and website URL. This gets your business on Google Maps and in local search results — completely free.'),

    h2('Free Business Website Checklist'),
    p('Before announcing your website live, check: homepage loads in under 3 seconds, all links work correctly, contact form sends email to your inbox, site looks correct on mobile phone, address and phone number are visible, and page title is customized for your business.'),

    h2('What Free Does Not Include'),
    p('Being honest: the free approach has real limitations. You will not have a professional email address (name@yourbusiness.com) without paying for Google Workspace ($6/month) or Zoho Mail (free tier available). You will not have eCommerce functionality without adding a payment processor integration. And some website templates have more limited free versions with premium upgrades available.'),
    p('For a business website that displays your services, hours, contact information, and portfolio, the free setup described above covers everything you need.'),

    h2('Final Verdict'),
    p('Building a free business website in 2025 is genuinely achievable and the result can look fully professional. The formula: free HTML template from TemplateLayer, free hosting on Cloudflare Pages, free contact form via Formspree, and optionally a $10/year domain from Namecheap for the complete package.'),
    p('Start by browsing the free HTML CSS templates at TemplateLayer — all with live previews so you know exactly what you are getting. Download, customise, deploy, and your business website is live today.'),
  ];

  console.log('📝 [Article 11] Uploading: How to Make a Business Website Free...');
  const post = await client.create({
    _type: 'blogPost',
    title: 'How to Make a Business Website for Free in 2025 (Step-by-Step)',
    slug: { _type: 'slug', current: slug },
    excerpt: 'You do not need to spend money to build a professional business website in 2025. This step-by-step guide shows you how to go live with a free template, free hosting, and a free domain option.',
    body,
    category: { _type: 'reference', _ref: catId },
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    readTime: '10 min read',
    seoTitle: 'How to Make a Business Website for Free in 2025 — Step by Step Guide',
    seoDescription: 'Learn how to build a free business website in 2025 using free HTML templates, Cloudflare Pages hosting, and a cheap domain. Full step-by-step guide.',
  });
  console.log('✅ Uploaded:', post._id);

  console.log('🖼️  Uploading image...');
  // Photo: person working on laptop — Unsplash free
  const buf = await downloadImage('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=630&fit=crop&q=80');
  const asset = await client.assets.upload('image', buf, { filename: 'make-business-website-free.jpg', contentType: 'image/jpeg' });
  await client.patch(post._id).set({ thumbnail: { _type: 'image', asset: { _type: 'reference', _ref: asset._id } } }).commit();
  console.log('✅ Image attached');
  console.log('🎉 Done! → /blog/' + slug);
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
