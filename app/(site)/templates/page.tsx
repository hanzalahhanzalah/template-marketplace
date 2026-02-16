import { Metadata } from 'next';
import TemplateCard from '@/components/TemplateCard';
import { getPremiumTemplates, getCategories } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/client';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Website Templates | TemplateForge - Premium HTML, CSS & JS Templates',
    description: 'Browse our collection of premium, hand-crafted website templates. Fast, responsive, and SEO-optimized for modern web projects.',
};

// Fallback
const fallbackTemplates = [
    { title: 'CryptoNexus - Crypto Landing Page', slug: 'cryptonexus', description: 'Modern cryptocurrency landing page with animated charts, ICO countdown, and dark futuristic design.', thumbnail: '', category: 'Crypto', demoUrl: '#', price: '$29' },
    { title: 'Savoria - Restaurant Template', slug: 'savoria', description: 'Elegant restaurant website with menu sections, reservations, and beautiful food galleries.', thumbnail: '', category: 'Restaurant', demoUrl: '#', price: '$24' },
    { title: 'Nexus Agency - Creative Portfolio', slug: 'nexus-agency', description: 'One-page agency template with smooth animations, portfolio grid, and modern glassmorphism design.', thumbnail: '', category: 'Agency', demoUrl: '#', price: '$19' },
    { title: 'EduPro - Online Learning Platform', slug: 'edupro', description: 'Complete education website template with course listings, instructor profiles, and learning management features.', thumbnail: '', category: 'Education', demoUrl: '#', price: '$34' },
    { title: 'Zoner - Real Estate Platform', slug: 'zoner', description: 'Premium real estate template with property listings, search filters, and agent profiles.', thumbnail: '', category: 'Real Estate', demoUrl: '#', price: '$39' },
    { title: 'SaaSify - SaaS Landing Page', slug: 'saasify', description: 'Modern SaaS landing page with pricing tables, feature sections, and testimonials carousel.', thumbnail: '', category: 'SaaS', demoUrl: '#', price: '$22' },
];

function mapTemplate(t: Record<string, unknown>) {
    return {
        title: t.title as string,
        slug: t.slug as string,
        description: t.description as string,
        thumbnail: t.thumbnail ? urlFor(t.thumbnail).width(600).height(375).url() : '',
        category: t.category as string,
        demoUrl: (t.demoUrl as string) || '#',
        price: (t.price as string) || '$0',
    };
}

const defaultCategories = ['All', 'Crypto', 'Restaurant', 'Agency', 'Education', 'Real Estate', 'SaaS', 'E-Commerce', 'Portfolio'];

export default async function TemplatesPage() {
    let templates: { title: string; slug: string; description: string; thumbnail: string; category: string; demoUrl: string; price: string }[];
    let categoryNames = defaultCategories;

    try {
        const [sanityTemplates, sanityCategories] = await Promise.all([
            getPremiumTemplates(),
            getCategories('template'),
        ]);
        templates = sanityTemplates?.length > 0 ? sanityTemplates.map(mapTemplate) : fallbackTemplates;
        if (sanityCategories?.length > 0) {
            categoryNames = ['All', ...sanityCategories.map((c: { title: string }) => c.title)];
        }
    } catch {
        templates = fallbackTemplates;
    }

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <span className="badge">Browse Collection</span>
                    <h1>Website Templates</h1>
                    <p>Hand-crafted, pixel-perfect website templates ready to launch your next project.</p>
                </div>
            </section>

            {/* Filters */}
            <section className={styles.filters}>
                <div className="container">
                    <div className={styles.filterBar}>
                        <div className={styles.categories}>
                            {categoryNames.map((cat) => (
                                <button
                                    key={cat}
                                    className={`${styles.categoryBtn} ${cat === 'All' ? styles.active : ''}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className={styles.search}>
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35" />
                            </svg>
                            <input type="text" placeholder="Search templates..." className={styles.searchInput} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Templates Grid */}
            <section className={styles.templates}>
                <div className="container">
                    <div className={`grid grid-3 ${styles.grid}`}>
                        {templates.map((template) => (
                            <TemplateCard key={template.slug} {...template} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
