import { Metadata } from 'next';
import Link from 'next/link';
import TemplateCard from '@/components/TemplateCard';
import BlogCard from '@/components/BlogCard';
import { getFeaturedFreeTemplates, getFeaturedPremiumTemplates } from '@/sanity/lib/queries';
import { getLatestBlogPosts, getSiteSettings } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/client';
import styles from './page.module.css';

export const revalidate = 60; // Revalidate every 60 seconds

// Fallback data when Sanity is empty
const fallbackFreeTemplates = [
  { title: 'Developer - Portfolio Template', slug: 'developer-portfolio', description: 'Clean and minimal portfolio template perfect for developers and designers.', thumbnail: '', category: 'Portfolio', demoUrl: '#', price: 'free' },
  { title: 'BusinessBox - Corporate Template', slug: 'businessbox', description: 'Professional business template with modern design and easy customization.', thumbnail: '', category: 'Business', demoUrl: '#', price: 'free' },
  { title: 'CryptoLand - Cryptocurrency Template', slug: 'cryptoland', description: 'Modern crypto landing page with ICO countdown and token sale features.', thumbnail: '', category: 'Crypto', demoUrl: '#', price: 'free' },
  { title: 'FoodHunt - Restaurant Template', slug: 'foodhunt', description: 'Elegant restaurant template with menu sections and reservation form.', thumbnail: '', category: 'Restaurant', demoUrl: '#', price: 'free' },
  { title: 'Flavor - Food Blog Template', slug: 'flavor', description: 'Beautiful food blog template with recipe cards and gallery sections.', thumbnail: '', category: 'Blog', demoUrl: '#', price: 'free' },
  { title: 'Agency - Creative Landing Page', slug: 'agency-landing', description: 'One-page agency template with smooth animations and portfolio grid.', thumbnail: '', category: 'Agency', demoUrl: '#', price: 'free' },
];

const fallbackPremiumTemplates = [
  { title: 'CryptoNexus - Crypto Landing Page', slug: 'cryptonexus', description: 'Modern cryptocurrency landing page with animated charts, ICO countdown, and dark futuristic design.', thumbnail: '', category: 'Crypto', demoUrl: '#', price: '$29' },
  { title: 'Savoria - Restaurant Template', slug: 'savoria', description: 'Elegant restaurant website with menu sections, reservations, and beautiful food galleries.', thumbnail: '', category: 'Restaurant', demoUrl: '#', price: '$24' },
  { title: 'Nexus Agency - Creative Portfolio', slug: 'nexus-agency', description: 'One-page agency template with smooth animations, portfolio grid, and modern glassmorphism design.', thumbnail: '', category: 'Agency', demoUrl: '#', price: '$19' },
  { title: 'EduPro - Online Learning Platform', slug: 'edupro', description: 'Complete education website template with course listings, instructor profiles, and learning management features.', thumbnail: '', category: 'Education', demoUrl: '#', price: '$34' },
];

const fallbackPosts = [
  { title: '25 Best Free Bootstrap Templates 2025', slug: 'best-bootstrap-templates-2025', excerpt: 'A curated collection of the best free Bootstrap templates for your next web project.', thumbnail: '', category: 'Resources', publishedAt: '2025-02-05', readTime: '10 min' },
  { title: 'How to Choose the Right Template', slug: 'how-to-choose-template', excerpt: 'Tips and guidelines for selecting the perfect template for your website.', thumbnail: '', category: 'Tips', publishedAt: '2025-02-01', readTime: '7 min' },
  { title: 'CSS Grid Layout: A Complete Guide', slug: 'css-grid-guide', excerpt: 'Learn everything you need to know about CSS Grid layout for modern websites.', thumbnail: '', category: 'Tutorial', publishedAt: '2025-01-28', readTime: '12 min' },
];

const categories = [
  { name: 'Business', count: 45 },
  { name: 'Portfolio', count: 32 },
  { name: 'E-Commerce', count: 28 },
  { name: 'Blog', count: 24 },
  { name: 'Restaurant', count: 18 },
  { name: 'Agency', count: 15 },
];

const trustPoints = [
  {
    icon: (<svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>),
    title: 'Fully Responsive',
    description: 'Every template is tested across all devices and screen sizes.',
  },
  {
    icon: (<svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>),
    title: 'Lightning Fast',
    description: 'Optimized code, minimal dependencies, and blazing-fast load times.',
  },
  {
    icon: (<svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /><path d="M8 11h6" /><path d="M11 8v6" /></svg>),
    title: 'SEO Optimized',
    description: 'Built with semantic HTML, meta tags, and fast performance for search engines.',
  },
  {
    icon: (<svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>),
    title: 'Clean Code',
    description: 'Well-structured, documented, and easy to customize for your needs.',
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings().catch(() => null);
  const siteName = settings?.siteName || 'TemplateForge';

  return {
    title: `${siteName} — Free & Premium Website Templates`,
    description: settings?.siteDescription || 'Download free and premium responsive HTML5/CSS3 website templates.',
    openGraph: {
      title: `${siteName} — Free & Premium Website Templates`,
      description: settings?.siteDescription || 'Download free and premium responsive HTML5/CSS3 website templates.',
      type: 'website',
    },
  };
}

// Transform Sanity template data to card props
function mapTemplate(t: Record<string, unknown>) {
  return {
    title: t.title as string,
    slug: t.slug as string,
    description: t.description as string,
    thumbnail: t.thumbnail ? urlFor(t.thumbnail).width(1000).height(625).quality(90).auto('format').url() : '',
    category: t.category as string,
    demoUrl: (t.demoUrl as string) || '#',
    price: t.pricingType === 'free' ? 'free' : (t.price as string) || 'free',
  };
}

export default async function HomePage() {
  // Fetch from Sanity, fallback to demo data
  let freeTemplates, premiumTemplates, latestPosts;

  try {
    const [sanityFree, sanityPremium, sanityPosts] = await Promise.all([
      getFeaturedFreeTemplates(6),
      getFeaturedPremiumTemplates(4),
      getLatestBlogPosts(3),
    ]);

    freeTemplates = sanityFree?.length > 0 ? sanityFree.map(mapTemplate) : fallbackFreeTemplates;
    premiumTemplates = sanityPremium?.length > 0 ? sanityPremium.map(mapTemplate) : fallbackPremiumTemplates;
    latestPosts = sanityPosts?.length > 0 ? sanityPosts : fallbackPosts;
  } catch {
    freeTemplates = fallbackFreeTemplates;
    premiumTemplates = fallbackPremiumTemplates;
    latestPosts = fallbackPosts;
  }

  return (
    <>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <h1>Professional Website Templates</h1>
            <p>
              Download free and premium responsive HTML5/CSS3 website templates.
              Built with Bootstrap 5, Tailwind CSS, and modern JavaScript.
            </p>
            <div className={styles.heroActions}>
              <Link href="/free-templates" className="btn btn-primary">
                Free Templates
              </Link>
              <Link href="/templates" className="btn btn-secondary">
                Premium Templates
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className={styles.categories}>
        <div className="container">
          <div className={styles.categoryList}>
            {categories.map((cat) => (
              <Link
                key={cat.name}
                href={`/templates?category=${cat.name.toLowerCase()}`}
                className={styles.categoryItem}
              >
                {cat.name}
                <span>({cat.count})</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Free Templates — THE HOOK */}
      <section className={`section ${styles.templates}`}>
        <div className="container">
          <div className="section-header">
            <h2>Popular Free Templates</h2>
            <p>Download our best free templates. No sign-up, no payment — just free.</p>
          </div>

          <div className="grid grid-3">
            {freeTemplates.map((template: Record<string, unknown>) => (
              <TemplateCard key={template.slug as string} {...template as { title: string; slug: string; description: string; thumbnail: string; category: string; demoUrl?: string; price?: string }} />
            ))}
          </div>

          <div className={styles.viewAll}>
            <Link href="/free-templates" className="btn btn-primary">
              View All Free Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Our Templates — TRUST BUILDER */}
      <section className={`section ${styles.trust}`}>
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Our Templates</h2>
            <p>Every template is crafted to the highest standards.</p>
          </div>

          <div className={styles.trustGrid}>
            {trustPoints.map((point) => (
              <div key={point.title} className={styles.trustCard}>
                <div className={styles.trustIcon}>{point.icon}</div>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Website Templates — THE UPSELL */}
      <section className={`section ${styles.premium}`}>
        <div className="container">
          <div className="section-header">
            <h2>Premium Templates</h2>
            <p>Take your project to the next level with our premium, feature-rich templates.</p>
          </div>

          <div className="grid grid-3">
            {premiumTemplates.map((template: Record<string, unknown>) => (
              <TemplateCard key={template.slug as string} {...template as { title: string; slug: string; description: string; thumbnail: string; category: string; demoUrl?: string; price?: string }} />
            ))}
          </div>

          <div className={styles.viewAll}>
            <Link href="/templates" className="btn btn-secondary">
              Browse All Premium Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className={`section ${styles.blog}`}>
        <div className="container">
          <div className="section-header">
            <h2>Latest from Our Blog</h2>
            <p>Web design tips, tutorials, and industry insights.</p>
          </div>

          <div className="grid grid-3">
            {latestPosts.map((post: Record<string, unknown>) => (
              <BlogCard key={post.slug as string} {...post as { title: string; slug: string; excerpt: string; thumbnail: string; category: string; publishedAt: string; readTime?: string }} />
            ))}
          </div>

          <div className={styles.viewAll}>
            <Link href="/blog" className="btn btn-secondary">
              Read More Articles
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={styles.newsletter}>
        <div className="container">
          <div className={styles.newsletterBox}>
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get notified when we release new templates and publish new articles.</p>
            <form className={styles.newsletterForm}>
              <input
                type="email"
                placeholder="Enter your email address"
                className={styles.emailInput}
              />
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
