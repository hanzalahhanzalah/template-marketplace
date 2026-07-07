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
  console.log('🚀 Uploading Article 2: Free Admin Dashboard Templates...');

  const slug = 'best-free-admin-dashboard-templates-html-css-2025';

  const existing = await client.fetch(`*[_type == "blogPost" && slug.current == $slug][0]{ _id }`, { slug });
  if (existing?._id) {
    console.log('⚠️  Already exists:', existing._id);
    return;
  }

  let catId;
  const existingCat = await client.fetch(`*[_type == "category" && title == "Templates" && categoryType == "blog"][0]{ _id }`);
  if (existingCat?._id) {
    catId = existingCat._id;
  } else {
    const cat = await client.create({
      _type: 'category',
      title: 'Templates',
      slug: { _type: 'slug', current: 'templates' },
      categoryType: 'blog',
      order: 2,
    });
    catId = cat._id;
    console.log('✅ Created blog category:', catId);
  }

  const body = [
    p('An admin dashboard template is one of the most time-saving tools a developer can have. Instead of building data tables, charts, sidebars, and navigation from scratch, you start with a solid foundation and focus on your actual application logic. But with hundreds of options available, which ones are actually worth using?'),
    p('We have curated the best free admin dashboard templates built with clean HTML and CSS — no bloated dependencies, no paywalls. These are tested, well-coded, and production-ready.'),

    h2('What Makes a Good Admin Dashboard Template?'),
    p('Before we get to the list, here is what separates a great dashboard template from a mediocre one:'),
    p('Clean code: The HTML and CSS should be readable, commented, and easy to customize. Messy code wastes hours.'),
    p('Real components: Look for templates that include tables, charts, forms, cards, sidebar navigation, and user profile sections — not just a pretty landing screen.'),
    p('Responsive design: Dashboards need to work on tablets and sometimes mobile. Make sure the template handles smaller viewports gracefully.'),
    p('Performance: A dashboard should load fast. Avoid templates that load 10+ external libraries when 2 would do.'),
    p('Dark mode support: Modern dashboards almost always need a dark mode option.'),

    h2('1. CRM Pro Dashboard — TemplateLayer'),
    p('Our own CRM Pro template is one of the most fully-featured free-to-preview HTML dashboard templates available. It includes a full CRM layout with sales pipeline tracking, customer data tables with search and filtering, revenue charts powered by Chart.js, and a polished dark/light mode toggle.'),
    p('Built with pure HTML5, CSS3, and Vanilla JavaScript — zero frameworks, zero bloat. The code is clean, commented, and easy to customize. It uses CSS custom properties throughout, so rebranding takes minutes not hours.'),
    p('Key features: Revenue overview with Chart.js, deal pipeline board, customer directory, tasks panel, message inbox, settings page, full dark and light mode, responsive sidebar.'),
    p('View the live preview and download at TemplateLayer.'),

    h2('2. AdminLTE'),
    p('AdminLTE is arguably the most widely used open-source admin template in existence. Built on Bootstrap 4/5, it includes an enormous component library: dozens of chart types, data tables, form controls, buttons, cards, and complete page templates for login, 404 errors, and more.'),
    p('It is free and MIT licensed. The downside is its size — AdminLTE ships with a lot of JavaScript dependencies. For internal tools where load time is not a priority, this is a solid choice.'),
    p('Best for: Internal tools and enterprise applications that need maximum component variety.'),

    h2('3. Tabler'),
    p('Tabler is a beautiful, modern admin dashboard built on Bootstrap 5. The design quality is exceptional — clean typography, consistent spacing, and a professional color palette that does not look like generic Bootstrap.'),
    p('It is open source (MIT license) and actively maintained. The component set includes charts, tables, calendars, kanban boards, and a full icon library. Performance is better than AdminLTE because it uses fewer JavaScript dependencies.'),
    p('Best for: Projects that need a polished, modern look with Bootstrap 5.'),

    h2('4. CoreUI'),
    p('CoreUI offers both a free and a paid tier. The free version is well-featured and available in multiple flavors — plain HTML/CSS, Bootstrap, React, Angular, and Vue. This makes it particularly useful if you plan to migrate from a static template to a JavaScript framework later.'),
    p('The free version includes the core layout, navigation, and basic components. Charts and some advanced components require the paid plan.'),
    p('Best for: Teams that may need to port the design to React or Vue in the future.'),

    h2('5. Volt Dashboard'),
    p('Volt is a free Bootstrap 5 admin dashboard from Themesberg. It is clean, lightweight, and specifically optimized for performance. The JavaScript is minimal and the CSS is well-organized.'),
    p('Includes: Statistics cards, line and bar charts, a data table, forms, and utility pages. Not as feature-rich as Tabler but easier to customize from scratch.'),
    p('Best for: Smaller projects that need a fast, clean starting point without the overhead of larger templates.'),

    h2('How to Choose the Right Dashboard Template'),
    p('For a custom CRM or internal business tool with dark mode support → CRM Pro (TemplateLayer)'),
    p('For maximum components and Bootstrap compatibility → AdminLTE'),
    p('For the best visual design with Bootstrap 5 → Tabler'),
    p('For a multi-framework compatible template → CoreUI'),
    p('For a fast, lightweight starting point → Volt Dashboard'),

    h2('Final Thoughts'),
    p('All five templates on this list are genuinely free and production-ready. The best choice depends on your project\'s complexity, your team\'s stack, and how much customization you plan to do.'),
    p('If you want a CRM-specific dashboard with a premium UI design built on pure HTML and CSS with no framework dependency, the CRM Pro template at TemplateLayer is the strongest option on this list. Preview it live and download it for free today.'),
  ];

  const post = await client.create({
    _type: 'blogPost',
    title: '5 Best Free Admin Dashboard Templates HTML CSS (2025)',
    slug: { _type: 'slug', current: slug },
    excerpt: 'Stop building dashboards from scratch. These are the 5 best free admin dashboard HTML CSS templates — tested, ranked, and compared so you can pick the right one for your project.',
    body,
    category: { _type: 'reference', _ref: catId },
    publishedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    readTime: '7 min read',
    seoTitle: '5 Best Free Admin Dashboard Templates HTML CSS 2025',
    seoDescription: 'Looking for the best free admin dashboard HTML CSS template? We compare 5 top options including CRM Pro, AdminLTE, Tabler, CoreUI, and Volt.',
  });

  console.log('✅ Article 2 uploaded:', post._id);
  console.log('   URL: /blog/' + slug);
}

upload().catch((err) => {
  console.error('❌ Failed:', err.message);
  process.exit(1);
});
