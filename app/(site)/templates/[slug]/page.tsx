'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { useParams } from 'next/navigation';
import { client, urlFor } from '@/sanity/lib/client';

// Fallback data
const fallbackData = {
    title: 'CryptoNexus - Crypto Landing Page',
    description: 'A stunning, modern cryptocurrency landing page template featuring animated charts, ICO countdown timers, and a dark futuristic design. Perfect for crypto startups, ICO launches, token sales, and blockchain projects.',
    category: 'Crypto',
    thumbnail: '/demos/crypto-thumb.jpg',
    demoUrl: '/demos/cryptonexus/index.html',
    pricingType: 'premium',
    price: '$29',
    features: [
        'Fully Responsive Design',
        'Dark Futuristic Theme',
        'Animated Token Statistics',
        'ICO Countdown Timer',
        'Token Sale Progress Bar',
        'Team Section with Hover Effects',
        'Roadmap Timeline',
        'FAQ Accordion',
        'Newsletter Subscription',
        'Cross-browser Compatible',
        'Clean & Well-commented Code',
        'Easy to Customize',
    ],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP Animations'],
    buyLinks: [
        { platform: 'ThemeForest', url: '#', price: '$29', icon: '🛒' },
        { platform: 'TemplateMonster', url: '#', price: '$25', icon: '👾' },
        { platform: 'Creative Market', url: '#', price: '$27', icon: '🎨' },
        { platform: 'Gumroad', url: '#', price: '$22', icon: '💳' },
    ],
    downloadUrl: null,
};

interface TemplateData {
    title: string;
    description: string;
    category: string;
    thumbnail: unknown;
    demoUrl: string;
    pricingType: string;
    price: string;
    features: string[];
    technologies: string[];
    buyLinks: { platform: string; url: string; price: string; icon?: string }[];
    downloadUrl: string | null;
}

export default function TemplateDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const [templateData, setTemplateData] = useState<TemplateData>(fallbackData);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const [isFullscreen, setIsFullscreen] = useState(false);

    useEffect(() => {
        async function fetchTemplate() {
            try {
                const data = await client.fetch(`
                    *[_type == "template" && slug.current == $slug][0] {
                        title,
                        "slug": slug.current,
                        description,
                        thumbnail,
                        "category": category->title,
                        demoUrl,
                        downloadUrl,
                        pricingType,
                        price,
                        buyLinks,
                        technologies,
                        features
                    }
                `, { slug });
                if (data) {
                    setTemplateData({
                        ...data,
                        demoUrl: data.demoUrl || '#',
                        features: data.features || [],
                        technologies: data.technologies || [],
                        buyLinks: data.buyLinks || [],
                    });
                }
            } catch (err) {
                console.log('Using fallback template data', err);
            } finally {
                setLoading(false);
            }
        }
        fetchTemplate();
    }, [slug]);

    const viewModes = {
        desktop: { width: '100%', label: 'Desktop' },
        tablet: { width: '768px', label: 'Tablet' },
        mobile: { width: '375px', label: 'Mobile' },
    };

    const isFree = templateData.pricingType === 'free';
    const thumbnailUrl = templateData.thumbnail && typeof templateData.thumbnail === 'object'
        ? urlFor(templateData.thumbnail).width(800).url()
        : '';

    if (loading) {
        return (
            <div className={styles.page}>
                <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>
                    <p>Loading template...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            {/* Back Link */}
            <div className={`container ${styles.backContainer}`}>
                <Link href={isFree ? '/free-templates' : '/templates'} className={styles.backLink}>
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to {isFree ? 'Free Templates' : 'Templates'}
                </Link>
            </div>

            {/* Live Preview Hero Section */}
            <section className={styles.previewHero}>
                <div className="container">
                    <div className={styles.previewHeroContent}>
                        <div className={styles.thumbnailWrapper}>
                            {thumbnailUrl ? (
                                <img src={thumbnailUrl} alt={templateData.title} className={styles.mainThumbnail} />
                            ) : (
                                <div className={styles.placeholderThumbnail}>
                                    <span>{templateData.title}</span>
                                </div>
                            )}
                            <div className={styles.thumbnailOverlay}>
                                <Link href={`/preview/${slug}`} className={styles.launchBtn}>
                                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    Launch Live Preview
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Template Info */}
            <section className={styles.infoSection}>
                <div className="container">
                    <div className={styles.infoGrid}>
                        {/* Main Content */}
                        <div className={styles.mainContent}>
                            <span className="badge">{templateData.category}</span>
                            <h1 className={styles.title}>{templateData.title}</h1>
                            <p className={styles.description}>{templateData.description}</p>

                            {/* Features */}
                            {templateData.features.length > 0 && (
                                <div className={styles.featuresSection}>
                                    <h3>Features</h3>
                                    <ul className={styles.featuresList}>
                                        {templateData.features.map((feature) => (
                                            <li key={feature} className={styles.featureItem}>
                                                <svg width="16" height="16" fill="none" stroke="var(--accent-primary)" strokeWidth="2" viewBox="0 0 24 24">
                                                    <path d="M20 6L9 17l-5-5" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Technologies */}
                            {templateData.technologies.length > 0 && (
                                <div className={styles.techSection}>
                                    <h3>Technologies Used</h3>
                                    <div className={styles.techList}>
                                        {templateData.technologies.map((tech) => (
                                            <span key={tech} className={styles.techBadge}>{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <aside className={styles.sidebar}>
                            <div className={styles.buyCard}>
                                {isFree ? (
                                    <>
                                        <h3>Download Free</h3>
                                        <p>This template is completely free. Download and use it for personal or commercial projects.</p>
                                        <a
                                            href={templateData.downloadUrl || '#'}
                                            className={`btn btn-primary ${styles.downloadBtnLarge}`}
                                            style={{ display: 'block', textAlign: 'center', marginBottom: '1rem' }}
                                        >
                                            Download Template
                                        </a>
                                    </>
                                ) : (
                                    <>
                                        <h3>Buy This Template</h3>
                                        <p>Choose your preferred marketplace to purchase this template.</p>
                                        <div className={styles.buyLinks}>
                                            {templateData.buyLinks.map((link) => (
                                                <a
                                                    key={link.platform}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={styles.buyLink}
                                                >
                                                    <span className={styles.buyPlatform}>
                                                        <span className={styles.buyIcon}>{link.icon || '🛒'}</span>
                                                        {link.platform}
                                                    </span>
                                                    <span className={styles.buyPrice}>{link.price}</span>
                                                </a>
                                            ))}
                                        </div>
                                    </>
                                )}

                                <div className={styles.buyNote}>
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="M12 16v-4M12 8h.01" />
                                    </svg>
                                    <span>{isFree ? 'Free for personal and commercial use.' : 'All purchases include lifetime updates and support.'}</span>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
}
