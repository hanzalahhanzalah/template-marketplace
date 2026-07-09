import { createClient } from '@sanity/client';
const client = createClient({ projectId: 'ath1uvh6', dataset: 'production', apiVersion: '2024-01-01', useCdn: false, token: process.env.SANITY_API_TOKEN });
const k = () => Math.random().toString(36).substr(2, 9);
const b = (text, style = 'normal') => ({ _type: 'block', _key: k(), style, markDefs: [], children: [{ _type: 'span', _key: k(), text, marks: [] }] });
const h2 = t => b(t, 'h2');
const h3 = t => b(t, 'h3');
const p = t => b(t, 'normal');

async function main() {
  const slug = 'how-to-create-portfolio-website-html-css';
  const existing = await client.fetch(`*[_type == "blogPost" && slug.current == $slug][0]{ _id }`, { slug });
  if (existing?._id) { console.log('Already exists'); return; }
  let catId;
  const ec = await client.fetch(`*[_type == "category" && title == "Tutorials" && categoryType == "blog"][0]{ _id }`);
  catId = ec?._id;
  const body = [
    p('A portfolio website is the most important tool a developer or designer can have. It is your resume, work showcase, and first impression all in one. The best portfolios are built with clean HTML and CSS — fast, professional, and under your full control. This guide shows you exactly how to build one.'),
    h2('What Your Portfolio Must Have'),
    p('A strong hero with your name and title. A projects section showing 3 to 6 of your best works. An about section with 2 to 3 sentences about you. A skills list. A working contact form or email link. Links to GitHub and LinkedIn.'),
    h2('Step 1 — Set Up Your File Structure'),
    p('Create a root folder called portfolio. Inside it: index.html, a css folder with style.css, a js folder with main.js, and an images folder for project screenshots. Clean structure from the start prevents chaos later.'),
    h2('Step 2 — Build the HTML Skeleton'),
    p('Use semantic HTML5 elements throughout. Use header for navigation, main for your content sections, and footer for copyright and social links. Inside main, create section elements for: hero, projects, about, skills, and contact. Never use div when a semantic element like section, article, or nav is more appropriate.'),
    h2('Step 3 — Style with CSS Variables'),
    p('At the top of style.css, define your design system as CSS custom properties: --color-primary for your accent color, --color-bg for background, --color-text for body text, --font-sans for your font stack, --radius for border radius, --shadow for box shadows. This means changing your entire color scheme later takes editing 3 lines.'),
    h2('Step 4 — Make It Responsive'),
    p('Use CSS Grid for your projects section. The rule grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)) gives you a responsive card grid with no media queries required. Use Flexbox for navigation and hero alignment. For your hamburger mobile menu, a small JavaScript click toggle is all you need.'),
    h2('Step 5 — Typography'),
    p('Use Google Fonts. Two fonts maximum: one for headings, one for body. Strong pairings for developer portfolios: Inter alone (clean and professional), or Space Grotesk with DM Sans. Set font-size: 62.5% on html so 1rem equals 10px for easy math.'),
    h2('Step 6 — Add Dark Mode'),
    p('Add a data-theme attribute to your html element. Define light values as default CSS variables, then override them inside [data-theme="dark"]. A toggle button in the navbar switches the attribute. Save the preference to localStorage so it persists across visits.'),
    h2('Step 7 — Contact Form Without a Backend'),
    p('Use Formspree (formspree.io) — free up to 50 submissions per month. Set your form action to the Formspree endpoint URL. No server-side code needed. Alternatively, use Netlify Forms if you host on Netlify: just add data-netlify="true" to your form element.'),
    h2('Step 8 — Deploy for Free'),
    p('GitHub Pages: push your project to a GitHub repo, enable Pages in settings — your site goes live instantly at yourusername.github.io. Netlify: drag your folder onto netlify.com and it deploys in seconds. Cloudflare Pages: connect your repo for automatic deploys on every push. All three are completely free.'),
    h2('Use a Portfolio Template to Launch Faster'),
    p('Building from scratch teaches you a lot. But if you need something professional live today, starting from a well-coded HTML CSS portfolio template cuts development time from days to hours. You get the layout, animations, and responsive structure done — then replace the content with your own projects. TemplateLayer offers free portfolio HTML CSS templates with live previews so you can see exactly what you are getting before downloading.'),
    h2('Launch Checklist'),
    p('Run Google PageSpeed Insights — aim for 85+ on mobile. Test all links. Check on both mobile and desktop. Test your contact form. Add your URL to your LinkedIn profile and GitHub bio. Submit to Google Search Console.'),
  ];
  const post = await client.create({
    _type: 'blogPost',
    title: 'How to Create a Portfolio Website with HTML and CSS (Step-by-Step 2025)',
    slug: { _type: 'slug', current: slug },
    excerpt: 'Build a professional portfolio website from scratch using HTML and CSS. Covers structure, responsive layout, dark mode, contact forms, and free deployment options.',
    body,
    category: { _type: 'reference', _ref: catId },
    publishedAt: new Date(Date.now() - 3600000).toISOString(),
    readTime: '9 min read',
    seoTitle: 'How to Create a Portfolio Website with HTML and CSS — Full Guide 2025',
    seoDescription: 'Step-by-step guide to building a portfolio website with pure HTML and CSS. Learn layout, dark mode, animations, contact forms, and free deployment.',
  });
  console.log('✅ Article 5:', post._id, '— /blog/' + slug);
}
main().catch(e => { console.error('❌', e.message); process.exit(1); });
