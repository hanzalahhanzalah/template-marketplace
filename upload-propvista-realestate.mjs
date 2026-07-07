import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Sanity document ID from audit: XejQA1ZUhEQcECOLGp60VZ
const TEMPLATE_ID = 'XejQA1ZUhEQcECOLGp60VZ';
const SLUG = 'propvista-real-estate-html-template';

async function patchPropVista() {
  console.log('🏠 Patching PropVista Real Estate template on live site...');

  // Verify it exists first
  const existing = await client.fetch(
    `*[_type == "template" && slug.current == $slug][0]{ _id, title, slug }`,
    { slug: SLUG }
  );

  if (!existing?._id) {
    console.log('⚠️  Template not found by slug. Trying by ID...');
    const byId = await client.fetch(`*[_id == $id][0]{ _id, title, slug }`, { id: TEMPLATE_ID });
    if (!byId?._id) {
      console.log('❌ Template not found. Run the upload script first.');
      return;
    }
    console.log(`✅ Found by ID: ${byId._id} — "${byId.title}"`);
  } else {
    console.log(`✅ Found: ${existing._id} — "${existing.title}"`);
  }

  // PATCH: Update title, seoTitle, seoDescription to ensure PropVista naming
  const patched = await client
    .patch(existing?._id || TEMPLATE_ID)
    .set({
      title: 'PropVista — Premium Real Estate Website Template',
      seoTitle: 'PropVista — Premium Real Estate Website | HTML Template',
      seoDescription: 'Premium 12-page real estate HTML template with interactive map, property listing grid, agent profiles, and sign-in pages. Built with Leaflet.js and Swiper.js.',
      // Confirm slug is correct
      slug: { _type: 'slug', current: SLUG },
    })
    .commit();

  console.log('✅ Live site patched successfully!');
  console.log('   ID    :', patched._id);
  console.log('   Title :', patched.title);
  console.log('   Slug  :', patched.slug?.current);
  console.log('\n🎉 PropVista is fully updated on the live site!');
}

patchPropVista().catch((err) => {
  console.error('❌ Patch failed:', err.message);
  process.exit(1);
});
