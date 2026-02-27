import { Metadata } from 'next';
import { Suspense } from 'react';
import TemplateCard from '@/components/TemplateCard';
import { getPremiumTemplates, getCategories } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/client';
import styles from './page.module.css';

export const revalidate = 60; // Revalidate every 60 seconds

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
        thumbnail: t.thumbnail ? urlFor(t.thumbnail).width(1000).height(625).quality(90).auto('format').url() : '',
        category: t.category as string,
        demoUrl: (t.demoUrl as string) || '#',
        price: (t.price as string) || '$0',
    };
}

const defaultCategories = ['All', 'Crypto', 'Restaurant', 'Agency', 'Education', 'Real Estate', 'SaaS', 'E-Commerce', 'Portfolio'];

import TemplateFilters from '@/components/TemplateFilters';

export default async function TemplatesPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    let allTemplates: { title: string; slug: string; description: string; thumbnail: string; category: string; demoUrl: string; price: string }[];
    let categoryNames = defaultCategories;

    const resolvedParams = await searchParams;
    const currentCategory = (resolvedParams.category as string) || 'All';
    const searchQuery = (resolvedParams.q as string) || '';

    try {
        const [sanityTemplates, sanityCategories] = await Promise.all([
            getPremiumTemplates(),
            getCategories('template'),
        ]);
        allTemplates = sanityTemplates?.length > 0 ? sanityTemplates.map(mapTemplate) : fallbackTemplates;
        if (sanityCategories?.length > 0) {
            categoryNames = ['All', ...sanityCategories.map((c: { title: string }) => c.title)];
        }
    } catch {
        allTemplates = fallbackTemplates;
    }

    // Filter templates based on category and search query
    const filteredTemplates = allTemplates.filter((template) => {
        const matchesCategory =
            currentCategory === 'All' ||
            template.category?.toLowerCase() === currentCategory.toLowerCase();

        const matchesSearch =
            !searchQuery ||
            template.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            template.description?.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
    });

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
                    <Suspense fallback={<div className={styles.filterPlaceholder}>Loading filters...</div>}>
                        <TemplateFilters categories={categoryNames} baseUrl="/templates" />
                    </Suspense>
                </div>
            </section>

            {/* Templates Grid */}
            <section className={styles.templates}>
                <div className="container">
                    {filteredTemplates.length > 0 ? (
                        <div className={`grid grid-3 ${styles.grid}`}>
                            {filteredTemplates.map((template) => (
                                <TemplateCard key={template.slug} {...template} />
                            ))}
                        </div>
                    ) : (
                        <div className={styles.noResults}>
                            <h3>No templates found</h3>
                            <p>Try adjusting your search or filters to find what you&apos;re looking for.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
