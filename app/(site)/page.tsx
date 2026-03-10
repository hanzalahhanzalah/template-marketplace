import { Metadata } from 'next';
import Link from 'next/link';
import TemplateCard from '@/components/TemplateCard';
import BlogCard from '@/components/BlogCard';
import { getFeaturedFreeTemplates, getFeaturedPremiumTemplates } from '@/sanity/lib/queries';
import { getLatestBlogPosts, getSiteSettings } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/client';
import styles from './page.module.css';

export const revalidate = 60; // Revalidate every 60 seconds



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
  const siteName = settings?.siteName || 'TemplateLayer';

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

// Transform Sanity blog data to card props
function mapPost(p: Record<string, unknown>) {
  return {
    title: p.title as string,
    slug: p.slug as string,
    excerpt: p.excerpt as string,
    thumbnail: p.thumbnail ? urlFor(p.thumbnail).width(1000).height(625).quality(90).auto('format').url() : '',
    category: p.category as string,
    publishedAt: p.publishedAt as string,
    readTime: (p.readTime as string) || '5 min read',
  };
}

export default async function HomePage() {
  // Fetch from Sanity, fallback to demo data
  let freeTemplates, premiumTemplates, latestPosts, sanityCategories;

  try {
    const [sanityFree, sanityPremium, sanityPosts, categoriesData] = await Promise.all([
      getFeaturedFreeTemplates(6),
      getFeaturedPremiumTemplates(4),
      getLatestBlogPosts(3),
      getCategories('template'),
    ]);

    freeTemplates = sanityFree?.length > 0 ? sanityFree.map(mapTemplate) : [];
    premiumTemplates = sanityPremium?.length > 0 ? sanityPremium.map(mapTemplate) : [];
    latestPosts = sanityPosts?.length > 0 ? sanityPosts.map(mapPost) : [];
    sanityCategories = categoriesData;
  } catch {
    freeTemplates = [];
    premiumTemplates = [];
    latestPosts = [];
    sanityCategories = [];
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
      {sanityCategories?.length > 0 && (
        <section className={styles.categories}>
          <div className="container">
            <div className={styles.categoryList}>
              {sanityCategories.map((cat: any) => (
                <Link
                  key={cat.title}
                  href={`/templates?category=${cat.title.toLowerCase()}`}
                  className={styles.categoryItem}
                >
                  {cat.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Popular Free Templates — THE HOOK */}
      <section className={`section ${styles.templates}`}>
        <div className="container">
          <div className="section-header">
            <h2>Popular Free Templates</h2>
            <p>Download our best free templates. No sign-up, no payment — just free.</p>
          </div>

          {freeTemplates.length > 0 ? (
            <div className="grid grid-3">
              {freeTemplates.map((template: Record<string, unknown>) => (
                <TemplateCard key={template.slug as string} {...template as { title: string; slug: string; description: string; thumbnail: string; category: string; demoUrl?: string; price?: string }} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 0', gridColumn: '1 / -1' }}>
              <p>No free templates available yet. Check back soon!</p>
            </div>
          )}

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

          {premiumTemplates.length > 0 ? (
            <div className="grid grid-3">
              {premiumTemplates.map((template: Record<string, unknown>) => (
                <TemplateCard key={template.slug as string} {...template as { title: string; slug: string; description: string; thumbnail: string; category: string; demoUrl?: string; price?: string }} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 0', gridColumn: '1 / -1' }}>
              <p>No premium templates available right now. Check back soon!</p>
            </div>
          )}

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

          {latestPosts.length > 0 ? (
            <div className="grid grid-3">
              {latestPosts.map((post: Record<string, unknown>) => (
                <BlogCard key={post.slug as string} {...post as { title: string; slug: string; excerpt: string; thumbnail: string; category: string; publishedAt: string; readTime?: string }} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 0', gridColumn: '1 / -1' }}>
              <p>No blog posts published yet. Stay tuned!</p>
            </div>
          )}

          <div className={styles.viewAll}>
            <Link href="/blog" className="btn btn-secondary">
              Read More Articles
            </Link>
          </div>
        </div>
      </section>

    </>
  );
}
