import { Metadata } from 'next';
import TemplateCard from '@/components/TemplateCard';
import { getFreeTemplates, getCategories } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/client';
import styles from './page.module.css';

export const metadata: Metadata = {
    title: 'Free Templates | TemplateForge - Download Free HTML, CSS & JS Templates',
    description: 'Download free responsive website templates. Beautiful, hand-crafted HTML5 templates built with Bootstrap 5, Tailwind CSS, and modern JavaScript.',
};

// Fallback
const fallbackTemplates = [
    { title: 'Developer - Portfolio Template', slug: 'developer-portfolio', description: 'Clean and minimal portfolio template perfect for developers and designers.', thumbnail: '', category: 'Portfolio', demoUrl: '#', price: 'free' },
    { title: 'BusinessBox - Corporate Template', slug: 'businessbox', description: 'Professional business template with modern design and easy customization.', thumbnail: '', category: 'Business', demoUrl: '#', price: 'free' },
    { title: 'CryptoLand - Cryptocurrency Template', slug: 'cryptoland', description: 'Modern crypto landing page with ICO countdown and token sale features.', thumbnail: '', category: 'Crypto', demoUrl: '#', price: 'free' },
    { title: 'FoodHunt - Restaurant Template', slug: 'foodhunt', description: 'Elegant restaurant template with menu sections and reservation form.', thumbnail: '', category: 'Restaurant', demoUrl: '#', price: 'free' },
    { title: 'Flavor - Food Blog Template', slug: 'flavor', description: 'Beautiful food blog template with recipe cards and gallery sections.', thumbnail: '', category: 'Blog', demoUrl: '#', price: 'free' },
    { title: 'Agency - Creative Landing Page', slug: 'agency-landing', description: 'One-page agency template with smooth animations and portfolio grid.', thumbnail: '', category: 'Agency', demoUrl: '#', price: 'free' },
];

function mapTemplate(t: Record<string, unknown>) {
    return {
        title: t.title as string,
        slug: t.slug as string,
        description: t.description as string,
        thumbnail: t.thumbnail ? urlFor(t.thumbnail).width(1000).height(625).quality(90).auto('format').url() : '',
        category: t.category as string,
        demoUrl: (t.demoUrl as string) || '#',
        price: 'free' as string,
    };
}

const defaultCategories = ['All', 'Portfolio', 'Business', 'Crypto', 'Restaurant', 'Blog', 'Agency', 'Health'];

export default async function FreeTemplatesPage() {
    let templates: { title: string; slug: string; description: string; thumbnail: string; category: string; demoUrl: string; price: string }[];
    let categoryNames = defaultCategories;

    try {
        const [sanityTemplates, sanityCategories] = await Promise.all([
            getFreeTemplates(),
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
                    <span className="badge">Free Downloads</span>
                    <h1>Free Website Templates</h1>
                    <p>Download our collection of free, responsive HTML templates. No strings attached.</p>
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
                            <input type="text" placeholder="Search free templates..." className={styles.searchInput} />
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
