'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { getTemplateBySlug } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/client';
import styles from './page.module.css';

interface BundleItem {
    label: string;
    path: string;
    description?: string;
    icon?: string;
}

interface Template {
    title: string;
    slug: string;
    description: string;
    thumbnail?: any;
    category?: string;
    demoUrl?: string;
    demoZipUrl?: string;
    downloadUrl?: string;
    pricingType: 'free' | 'premium';
    price?: string;
    buyLinks?: { label: string; url: string }[];
    technologies?: string[];
    features?: string[];
    bundleItems?: BundleItem[];
}

// Bundle item colour accents cycling
const BUNDLE_ACCENTS = [
    { bg: '#EBF5FB', accent: '#1A73E8', emoji: '🤖' },
    { bg: '#EAFAF1', accent: '#1E8449', emoji: '💳' },
    { bg: '#FEF9E7', accent: '#B7950B', emoji: '👥' },
    { bg: '#FDEDEC', accent: '#C0392B', emoji: '📣' },
];

export default function PreviewPage() {
    const { slug } = useParams();
    const searchParams = useSearchParams();
    const subPath = searchParams.get('sub'); // e.g. "ai-ml-saas/index.html"

    const [template, setTemplate] = useState<Template | null>(null);
    const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const [loading, setLoading] = useState(true);
    const [activeSub, setActiveSub] = useState<string | null>(subPath);

    useEffect(() => {
        async function fetchTemplate() {
            try {
                const data = await getTemplateBySlug(slug as string);
                setTemplate(data);
                // If ?sub= is in the URL and we haven't set one yet, use it
                if (subPath && !activeSub) setActiveSub(subPath);
            } catch (error) {
                console.error('Failed to fetch template:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchTemplate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    if (loading) {
        return (
            <div className={styles.page} style={{ alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                <p>Loading Preview...</p>
            </div>
        );
    }

    if (!template) {
        return (
            <div className={styles.page} style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: 16, minHeight: '100vh' }}>
                <p>Template not found.</p>
                <Link href="/templates" className="btn btn-primary">Back to Marketplace</Link>
            </div>
        );
    }

    const isBundle = template.bundleItems && template.bundleItems.length > 0;

    // --- BUNDLE MODE: show selector if no sub selected ---
    if (isBundle && !activeSub) {
        const bgThumbnail = template.thumbnail
            ? urlFor(template.thumbnail).width(1600).url()
            : null;

        return (
            <div className={styles.page}>
                {/* Top Bar */}
                <header className={styles.deviceBar}>
                    <div className={styles.left}>
                        <Link href={`/templates/${slug}`} className={styles.backBtn}>
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M19 12H5m7-7l-7 7 7 7" />
                            </svg>
                            <span>Back to Details</span>
                        </Link>
                    </div>
                    <div className={styles.center}>
                        <span className={styles.bundleTitle}>{template.title}</span>
                    </div>
                    <div className={styles.right} />
                </header>

                {/* Bundle Selector Landing */}
                <main
                    className={styles.bundleLanding}
                    style={bgThumbnail ? {
                        backgroundImage: `url('${bgThumbnail}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center top',
                    } : undefined}
                >
                    {bgThumbnail && <div className={styles.bgOverlay} />}

                    <div className={styles.bundleLandingInner}>
                        <div className={styles.bundleHeader}>
                            <span className={styles.bundleBadge}>Bundle Preview</span>
                            <h1>{template.title}</h1>
                            <p>This bundle contains <strong>{template.bundleItems!.length} complete templates</strong>. Choose one below to launch the live preview.</p>
                        </div>

                        <div className={styles.bundleSelectorGrid}>
                            {template.bundleItems!.map((item, i) => {
                                const accent = BUNDLE_ACCENTS[i % BUNDLE_ACCENTS.length];
                                return (
                                    <button
                                        key={item.path}
                                        className={styles.bundleSelectorCard}
                                        onClick={() => setActiveSub(item.path)}
                                        style={{ '--card-accent': accent.accent, '--card-bg': accent.bg } as React.CSSProperties}
                                    >
                                        <span className={styles.bundleSelectorIcon}>{item.icon || accent.emoji}</span>
                                        <strong>{item.label}</strong>
                                        {item.description && <p>{item.description}</p>}
                                        <span className={styles.bundleSelectorCta}>
                                            Launch Preview →
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </main>
            </div>
        );
    }

    // --- SINGLE TEMPLATE MODE (or bundle sub selected) ---
    let demoUrl: string;
    if (isBundle && activeSub) {
        demoUrl = `/api/serve-demo/${slug}/${activeSub}`;
    } else if (template.demoZipUrl) {
        demoUrl = `/api/serve-demo/${slug}/index.html`;
    } else {
        demoUrl = template.demoUrl || '#';
    }

    const bgThumbnail = template.thumbnail
        ? urlFor(template.thumbnail).width(1200).url()
        : null;

    // Which label to show in the header
    const activeLabel = isBundle && activeSub
        ? template.bundleItems!.find(b => b.path === activeSub)?.label || 'Preview'
        : template.title;

    return (
        <div className={styles.page}>
            {/* Top Bar */}
            <header className={styles.deviceBar}>
                <div className={styles.left}>
                    {isBundle ? (
                        // In bundle mode: "Back to Bundle" button
                        <button className={styles.backBtn} onClick={() => setActiveSub(null)}>
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M19 12H5m7-7l-7 7 7 7" />
                            </svg>
                            <span>All Templates</span>
                        </button>
                    ) : (
                        <Link href={`/templates/${slug}`} className={styles.backBtn}>
                            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M19 12H5m7-7l-7 7 7 7" />
                            </svg>
                            <span>Back to Details</span>
                        </Link>
                    )}
                </div>

                <div className={styles.center}>
                    {/* Bundle sub-template switcher */}
                    {isBundle && template.bundleItems && (
                        <div className={styles.bundleSwitcher}>
                            {template.bundleItems.map((item) => (
                                <button
                                    key={item.path}
                                    onClick={() => setActiveSub(item.path)}
                                    className={`${styles.switcherBtn} ${activeSub === item.path ? styles.switcherActive : ''}`}
                                >
                                    {item.icon && <span>{item.icon}</span>}
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Normal device toggles for non-bundle */}
                    {!isBundle && (
                        <>
                            <button onClick={() => setViewMode('desktop')} className={`${styles.deviceBtn} ${viewMode === 'desktop' ? styles.activeDevice : ''}`} aria-label="Desktop View">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
                                </svg>
                            </button>
                            <button onClick={() => setViewMode('tablet')} className={`${styles.deviceBtn} ${viewMode === 'tablet' ? styles.activeDevice : ''}`} aria-label="Tablet View">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="4" y="2" width="16" height="20" rx="2" /><circle cx="12" cy="18" r="1" />
                                </svg>
                            </button>
                            <button onClick={() => setViewMode('mobile')} className={`${styles.deviceBtn} ${viewMode === 'mobile' ? styles.activeDevice : ''}`} aria-label="Mobile View">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="5" y="2" width="14" height="20" rx="2" /><circle cx="12" cy="18" r="1" />
                                </svg>
                            </button>
                        </>
                    )}
                </div>

                <div className={styles.right}>
                    {isBundle && (
                        <span className={styles.subLabel}>{activeLabel}</span>
                    )}
                    {!isBundle && template.pricingType === 'free' && (
                        <Link href={template.downloadUrl || '#'} className={styles.buyBtn}>
                            Download Free
                        </Link>
                    )}
                </div>
            </header>

            {/* Preview Area */}
            <main
                className={styles.previewArea}
                style={bgThumbnail ? {
                    backgroundImage: `url('${bgThumbnail}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                } : undefined}
            >
                {bgThumbnail && <div className={styles.bgOverlay} />}

                <div className={`${styles.iframeWrapper} ${isBundle ? styles.desktop : styles[viewMode]}`}>
                    {/* Watermark */}
                    <div className={styles.watermark}>
                        <span className={styles.watermarkText}>TEMPLATELAYER</span>
                    </div>
                    <iframe
                        key={demoUrl}
                        src={demoUrl}
                        className={styles.iframe}
                        title={`${activeLabel} Preview`}
                    />
                </div>
            </main>
        </div>
    );
}
