import { createClient } from '@sanity/client';
import fs from 'fs';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function audit() {
  console.log('🔍 Fetching templates from Sanity for SEO audit...');
  try {
    const templates = await client.fetch(`*[_type == "template"]{
      _id,
      title,
      slug,
      seoTitle,
      seoDescription,
      tags,
      technologies
    }`);
    
    fs.writeFileSync('sanity_templates_audit.json', JSON.stringify(templates, null, 2));
    console.log(`✅ Successfully fetched ${templates.length} templates. Data saved to sanity_templates_audit.json`);
  } catch (error) {
    console.error('❌ Audit failed:', error.message);
  }
}

audit();
