'use client';

import Image from 'next/image';
import styles from './BrowserMockup.module.css';

interface BrowserMockupProps {
    src: string;
    alt: string;
    title?: string;
    priority?: boolean;
}

export default function BrowserMockup({ src, alt, title, priority = false }: BrowserMockupProps) {
    return (
        <div className={styles.browserContainer}>
            {/* Browser Header */}
            <div className={styles.browserHeader}>
                <div className={styles.windowControls}>
                    <span className={styles.close}></span>
                    <span className={styles.minimize}></span>
                    <span className={styles.maximize}></span>
                </div>
                <div className={styles.addressBar}>
                    <span className={styles.lockIcon}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z" />
                        </svg>
                    </span>
                    <span className={styles.addressText}>
                        {title || 'template-preview.com'}
                    </span>
                </div>
            </div>

            {/* Browser Body / Image */}
            <div className={styles.browserBody}>
                {src ? (
                    <div className={styles.imageWrapper}>
                        <Image
                            src={src}
                            alt={alt}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className={styles.image}
                            priority={priority}
                        />
                    </div>
                ) : (
                    <div className={styles.placeholder}>
                        <span>Preview coming soon</span>
                    </div>
                )}
            </div>
        </div>
    );
}
