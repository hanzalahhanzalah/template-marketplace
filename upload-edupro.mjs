import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'ath1uvh6',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

async function upload() {
  console.log('🚀 Starting EduPro upload...');

  // Step 1: Find or create "Education" category
  const existing = await client.fetch(
    `*[_type == "category" && title == "Education"][0]{ _id }`
  );

  let categoryId;
  if (existing?._id) {
    categoryId = existing._id;
    console.log('✅ Category already exists:', categoryId);
  } else {
    const cat = await client.create({
      _type: 'category',
      title: 'Education',
      slug: { _type: 'slug', current: 'education' },
      categoryType: 'template',
      description: 'Clean, professional templates for schools, online courses, bootcamps, and educational platforms.',
      order: 110,
    });
    categoryId = cat._id;
    console.log('✅ Created category:', categoryId);
  }

  // Step 2: Skip if already uploaded
  const existingTemplate = await client.fetch(
    `*[_type == "template" && slug.current == "edu-pro-premium-online-course-education-template"][0]{ _id }`
  );
  if (existingTemplate?._id) {
    console.log('⚠️  Template already exists:', existingTemplate._id);
    return;
  }

  // Step 3: Create template document
  const template = await client.create({
    _type: 'template',
    title: 'EduPro — Premium Online Course & Education Template',
    slug: { _type: 'slug', current: 'edu-pro-premium-online-course-education-template' },
    description: `EduPro is a comprehensive and professionally designed multi-page HTML template for modern educational platforms, online course providers, and training centers. With 6 specialized pages—including a high-impact Homepage, Course Listings, detailed Lesson/Course View, and a dedicated Blog—EduPro provides a complete solution for showcasing educational content. It features a clean, scholarly design with a focus on readability and student engagement. Built with pure HTML5, CSS3, and Vanilla JavaScript, it ensures superior performance and a fluid mobile experience. The template includes interactive course cards, instructor profiles, and enrollment calls-to-action. Perfect for launching an LMS frontend or school website. Available exclusively on TemplateLayer: https://templatelayer.com/`,
    seoTitle: 'EduPro — Modern Online Course & Education HTML Template',
    seoDescription: 'Premium 6-page education HTML template. Features course grids, lesson details, instructor profiles, and blog. Fully responsive and optimized for speed.',
    category: { _type: 'reference', _ref: categoryId },
    pricingType: 'premium',
    price: '$25',
    technologies: [
      'HTML5 (Multipage)',
      'CSS3 (Flexbox/Grid)',
      'Vanilla JavaScript',
      'Google Fonts',
      'SVG Icons',
    ],
    features: [
      '6 Education-focused Pages: Home, Courses, Course Detail, Blog, About, Contact',
      'Interactive Course Carousel and Category filters',
      'Detailed Course Outline and Curriculum UI',
      'Instructor Bio and Profile sections',
      'Clean, academic design aesthetic',
      'Mobile-first Responsive Navigation',
      'Fast-loading and performance optimized',
      'SEO-ready semantic HTML structure',
      'Pure Vanilla JavaScript — zero heavy frameworks',
      'Easy to customize with CSS design tokens',
    ],
    tags: [
      'education template',
      'online course website',
      'LMS frontend template',
      'learning platform HTML',
      'school website template',
      'university landing page',
      'premium education UI',
      'course listing template',
      'responsive education website',
      'vanilla js education template',
    ],
    isFeatured: false,
    order: 13,
  });

  console.log('✅ Template uploaded successfully!');
  console.log('   ID   :', template._id);
  console.log('   Slug : edu-pro-premium-online-course-education-template');
  console.log('   Cat  :', categoryId);
  console.log('\n🎉 Done!');
}

upload().catch((err) => {
  console.error('❌ Upload failed:', err.message);
  process.exit(1);
});
