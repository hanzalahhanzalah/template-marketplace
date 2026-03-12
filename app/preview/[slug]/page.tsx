'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getTemplateBySlug } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/client';
import styles from './page.module.css';

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
}

export default function PreviewPage() {
    const { slug } = useParams();
    const [template, setTemplate] = useState<Template | null>(null);
    const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTemplate() {
            try {
                const data = await getTemplateBySlug(slug as string);
                setTemplate(data);
            } catch (error) {
                console.error('Failed to fetch template:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchTemplate();
    }, [slug]);

    if (loading) {
        return (
            <div className={styles.page} style={{ alignItems: 'center', justifyContent: 'center' }}>
                <p>Loading Preview...</p>
            </div>
        );
    }

    if (!template) {
        return (
            <div className={styles.page} style={{ alignItems: 'center', justifyContent: 'center' }}>
                <p>Template not found.</p>
                <Link href="/templates" className="btn btn-primary">Back to Marketplace</Link>
            </div>
        );
    }

    // Determine the source URL
    // Priority: Automated ZIP Proxy > Manual demoUrl
    const demoUrl = template.demoZipUrl
        ? `/api/serve-demo/${slug}/index.html`
        : (template.demoUrl || '#');

    // Build thumbnail URL for background
    const bgThumbnail = template.thumbnail
        ? urlFor(template.thumbnail).width(1200).url()
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
                    <button
                        onClick={() => setViewMode('desktop')}
                        className={`${styles.deviceBtn} ${viewMode === 'desktop' ? styles.activeDevice : ''}`}
                        aria-label="Desktop View"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="3" width="20" height="14" rx="2" />
                            <path d="M8 21h8M12 17v4" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setViewMode('tablet')}
                        className={`${styles.deviceBtn} ${viewMode === 'tablet' ? styles.activeDevice : ''}`}
                        aria-label="Tablet View"
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="4" y="2" width="16" height="20" rx="2" />
                            <circle cx="12" cy="18" r="1" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setViewMode('mobile')}
                        className={`${styles.deviceBtn} ${viewMode === 'mobile' ? styles.activeDevice : ''}`}
                        aria-label="Mobile View"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="5" y="2" width="14" height="20" rx="2" />
                            <circle cx="12" cy="18" r="1" />
                        </svg>
                    </button>
                </div>

                <div className={styles.right}>
                    <Link href={template.pricingType === 'premium' ? (template.buyLinks?.[0]?.url || '#') : template.downloadUrl || '#'} className={styles.buyBtn}>
                        {template.pricingType === 'premium' ? 'Purchase Now' : 'Download Free'}
                    </Link>
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
                {/* Dark overlay for readability */}
                {bgThumbnail && <div className={styles.bgOverlay} />}

                <div className={`${styles.iframeWrapper} ${styles[viewMode]}`}>
                    {/* Watermark Overlay */}
                    <div className={styles.watermark}>
                        <span className={styles.watermarkText}>TEMPLATELAYER</span>
                    </div>

                    <iframe
                        src={demoUrl}
                        className={styles.iframe}
                        title={`${template.title} Preview`}
                    />
                </div>
            </main>
        </div>
    );
}
