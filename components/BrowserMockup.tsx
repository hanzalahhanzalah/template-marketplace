'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import styles from './BrowserMockup.module.css';

interface BrowserMockupProps {
    src: string;
    alt: string;
    title?: string;
    priority?: boolean;
    gallery?: string[];
}

function BrowserCarousel({ images, alt, priority, isHovered }: { images: string[]; alt: string; priority: boolean; isHovered: boolean }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [
        Autoplay({ delay: 2500, stopOnInteraction: false, stopOnMouseEnter: false, playOnInit: false })
    ]);

    useEffect(() => {
        if (!emblaApi) return;
        const autoplay = emblaApi.plugins().autoplay;
        if (!autoplay) return;

        if (isHovered) {
            autoplay.play();
        } else {
            autoplay.stop();
        }
    }, [emblaApi, isHovered]);

    return (
        <div className={styles.embla} ref={emblaRef}>
            <div className={styles.emblaContainer}>
                {images.map((imgSrc, index) => (
                    <div className={styles.emblaSlide} key={imgSrc + index}>
                        <div className={styles.imageWrapper}>
                            <Image
                                src={imgSrc}
                                alt={`${alt} - view ${index + 1}`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className={styles.image}
                                priority={priority && index === 0}
                                loading={priority && index === 0 ? "eager" : "lazy"}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function BrowserMockup({ src, alt, title, priority = false, gallery = [] }: BrowserMockupProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [hasHoveredOnce, setHasHoveredOnce] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Deduplicate images and filter out empties
    const allImages = Array.from(new Set([src, ...(gallery || [])].filter(Boolean)));
    const hasMultipleImages = allImages.length > 1;

    // Use Intersection Observer for Mobile Devices (Fallback lazy initialization)
    useEffect(() => {
        if (!hasMultipleImages || hasHoveredOnce) return;
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                // If the device doesn't support hover (mobile), init immediately
                if (window.matchMedia('(hover: none)').matches) {
                    setHasHoveredOnce(true);
                }
            }
        });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [hasMultipleImages, hasHoveredOnce]);

    const handleMouseEnter = () => {
        setIsHovered(true);
        setHasHoveredOnce(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div 
            className={styles.browserContainer}
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
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
                {allImages.length > 0 ? (
                    hasMultipleImages && hasHoveredOnce ? (
                        <BrowserCarousel images={allImages} alt={alt} priority={priority} isHovered={isHovered} />
                    ) : (
                        <div className={styles.imageWrapper}>
                            <Image
                                src={allImages[0]}
                                alt={alt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className={styles.image}
                                priority={priority}
                            />
                        </div>
                    )
                ) : (
                    <div className={styles.placeholder}>
                        <span>Preview coming soon</span>
                    </div>
                )}
            </div>
        </div>
    );
}
