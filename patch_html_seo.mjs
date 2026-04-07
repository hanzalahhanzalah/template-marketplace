import fs from 'fs';
import path from 'path';

const auditData = JSON.parse(fs.readFileSync('sanity_templates_audit.json', 'utf8'));
const baseDir = 'D:\\downloads\\dproducts';

const mapping = {
  'cryptoverse-pro-multipage-crypto-html-template': 'cryptoverse-pro',
  'agency-starter-premium-one-page-template': 'agency-starter-template',
  'auto-fix-premium-car-repair-landing-page-template': 'car-repair-template',
  'everly-premium-multipage-wedding-template': 'Everly-Wedding-Template',
  'edu-pro-premium-online-course-education-template': 'edupro-template',
  'cryptonexus-premium-ico-defi-multipage-template': 'cryptonexus-template',
  'reeni-personal-portfolio-html-template': 'reeni-portfolio-template',
  'saas-pro-modern-landing-page-template': 'saas-landing-template',
  'urban-bites-premium-restaurant-dining-template': 'urban-bites',
  'admin-dashboard-premium-saas-backend-template': 'admin-dashboard',
  'crm-pro-premium-customer-relationship-management-dashboard': 'crm-dashboard',
  'eternal-love-premium-one-page-wedding-template': 'premium-wedding-onepage',
  'saas-pro-landing-premium-onepage-template': 'saas-landing-page',
  'clean-stream-modern-saas-landing-template': 'saas-landing',
  'savoria-restaurant-html-template': 'savoria-template',
  'propvista-real-estate-html-template': 'zoner-pro-realestate',
  'nexatoken-premium-ico-landing-page-template': 'nexatoken-ico-template',
  'anime-watchlist-personal-tracker-template': 'anime-watchlist',
  'anvena-minimal-saas-landing-page-template': 'anvena-template',
  'digi-store-premium-digital-products-marketplace-template': 'digital-products-template',
  'elegant-wedding-minimalist-multipage-template': 'elegantweeding',
  'whatsapp-business-kit-premium-saas-landing-template': 'whatsapp-business-kit',
  'metronic-pro-premium-enterprise-dashboard-ui-suite': 'metronic-dashboard',
  'saas-landing-premium-modern-software-template': 'saas-landing-template',
  'saas-bundle-enterprise-ui-kit-multipage-template': 'saas-bundle'
};

console.log('🛠️ Starting internal HTML SEO patching...');

for (const template of auditData) {
  const slug = template.slug.current;
  const folder = mapping[slug];
  
  if (!folder) {
    console.log(`⚠️ No mapping for ${slug}`);
    continue;
  }

  const folderPath = path.join(baseDir, folder);
  if (!fs.existsSync(folderPath)) {
    console.log(`❌ Folder not found: ${folderPath}`);
    continue;
  }

  // Find all HTML files in the root of the template folder
  const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.html'));
  
  for (const file of files) {
    const filePath = path.join(folderPath, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Update <title>
    // Matches <title>Something</title> regardless of attributes
    const titleRegex = /<title[^>]*>([\s\S]*?)<\/title>/i;
    if (titleRegex.test(content)) {
      content = content.replace(titleRegex, `<title>${template.seoTitle}</title>`);
    } else {
        // If meta exists but no title, add it after charset
        content = content.replace(/<meta charset[^>]*>/i, `$& \n    <title>${template.seoTitle}</title>`);
    }

    // Update <meta name="description" content="...">
    const descRegex = /<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i;
    if (descRegex.test(content)) {
      content = content.replace(descRegex, `<meta name="description" content="${template.seoDescription}">`);
    } else {
        // If no description meta exists, try to add it after title
        content = content.replace(/<\/title>/i, `$&\n    <meta name="description" content="${template.seoDescription}">`);
    }

    fs.writeFileSync(filePath, content);
    console.log(`✅ Patched: ${folder}/${file}`);
  }
}

console.log('\n🎉 HTML SEO Patching Complete!');
