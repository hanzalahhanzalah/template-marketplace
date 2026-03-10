'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '@/app/(site)/templates/[slug]/page.module.css';

interface BuyLink {
    platform: string;
    url: string;
    price: string;
    icon?: string;
}

interface TemplatePreviewClientProps {
    slug: string;
    title: string;
    description: string;
    category: string;
    thumbnailUrl: string;
    pricingType: string;
    price: string;
    features: string[];
    technologies: string[];
    buyLinks: BuyLink[];
    downloadUrl: string | null;
    demoUrl: string;
}

export default function TemplatePreviewClient({
    slug,
    title,
    description,
    category,
    thumbnailUrl,
    pricingType,
    features,
    technologies,
    buyLinks,
    downloadUrl,
    demoUrl,
}: TemplatePreviewClientProps) {
    const [, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const isFree = pricingType === 'free';

    void demoUrl; // available for live preview link if needed
    void setViewMode;

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
                                <img src={thumbnailUrl} alt={title} className={styles.mainThumbnail} />
                            ) : (
                                <div className={styles.placeholderThumbnail}>
                                    <span>{title}</span>
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
                            <span className="badge">{category}</span>
                            <h1 className={styles.title}>{title}</h1>
                            <p className={styles.description}>{description}</p>

                            {/* Features */}
                            {features.length > 0 && (
                                <div className={styles.featuresSection}>
                                    <h3>Features</h3>
                                    <ul className={styles.featuresList}>
                                        {features.map((feature) => (
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
                            {technologies.length > 0 && (
                                <div className={styles.techSection}>
                                    <h3>Technologies Used</h3>
                                    <div className={styles.techList}>
                                        {technologies.map((tech) => (
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
                                            href={downloadUrl || '#'}
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
                                            {buyLinks.map((link) => (
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
