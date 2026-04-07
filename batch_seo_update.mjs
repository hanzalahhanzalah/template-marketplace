import { createClient } from '@sanity/client';
import fs from 'fs';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function runUpdates() {
  const auditData = JSON.parse(fs.readFileSync('sanity_templates_audit.json', 'utf8'));
  console.log(`🚀 Starting batch SEO update for ${auditData.length} templates...`);

  for (const template of auditData) {
    console.log(`\n📦 Processing: ${template.title}`);

    // Optimization Logic
    let newSeoTitle = template.seoTitle;
    let newSeoDescription = template.seoDescription;
    let newTags = [...(template.tags || [])];
    let newTech = [...(template.technologies || [])];

    // 1. Title Standardization
    if (newSeoTitle.length < 50 || !newSeoTitle.includes('|')) {
      newSeoTitle = `${template.title.split(' — ')[0]} — ${template.title.split(' — ')[1] || 'Premium Template'} | Elegant & Responsive HTML5`;
      if (newSeoTitle.length > 70) newSeoTitle = newSeoTitle.substring(0, 67) + '...';
    }

    // 2. Tag Expansion
    const essentialTags = ['premium html', 'responsive design', 'marketplace ready', 'seo optimized', 'high performance'];
    essentialTags.forEach(t => {
      if (!newTags.includes(t)) newTags.push(t);
    });

    // 3. Technology Consistency
    const essentialTech = ['HTML5', 'CSS3', 'Vanilla JavaScript'];
    essentialTech.forEach(t => {
      if (!newTech.some(existing => existing.toLowerCase().includes(t.toLowerCase()))) {
        newTech.push(t);
      }
    });

    // 4. Description Polish (Ensure high character count & specific value props)
    if (newSeoDescription.length < 140) {
      newSeoDescription += ` Built with semantic HTML5 and elite performance optimization for modern web browsers. Fully customizable and marketplace-ready for global deployment.`;
      if (newSeoDescription.length > 160) newSeoDescription = newSeoDescription.substring(0, 157) + '...';
    }

    try {
      await client
        .patch(template._id)
        .set({
          seoTitle: newSeoTitle,
          seoDescription: newSeoDescription,
          tags: newTags,
          technologies: newTech
        })
        .commit();
      console.log(`✅ Updated: ${template.slug.current}`);
    } catch (err) {
      console.error(`❌ Failed ${template.slug.current}:`, err.message);
    }
  }

  console.log('\n🎉 Batch SEO Update Complete!');
}

runUpdates();
