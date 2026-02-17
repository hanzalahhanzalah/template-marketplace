import Image from 'next/image';
import Link from 'next/link';
import styles from './TemplateCard.module.css';

interface TemplateCardProps {
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
    category: string;
    demoUrl?: string;
    price?: string;
}

export default function TemplateCard({
    title,
    slug,
    description,
    thumbnail,
    category,
    demoUrl = '#',
    price,
}: TemplateCardProps) {
    const isFree = !price || price === 'free' || price === 'Free';

    return (
        <article className={styles.card}>
            {/* Thumbnail with browser mockup */}
            <Link href={`/templates/${slug}`} className={styles.imageWrapper}>
                {/* Price Badge */}
                <span className={`${styles.badge} ${isFree ? styles.badgeFree : styles.badgePremium}`}>
                    {isFree ? 'FREE' : price}
                </span>

                <div className={styles.browserFrame}>
                    <div className={styles.browserDots}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className={styles.imageContainer}>
                    {thumbnail ? (
                        <Image
                            src={thumbnail}
                            alt={title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className={styles.image}
                        />
                    ) : (
                        <div className={styles.placeholder}>
                            <span>Preview</span>
                        </div>
                    )}
                </div>
            </Link>

            {/* Content */}
            <div className={styles.content}>
                <Link href={`/templates/${slug}`} className={styles.titleLink}>
                    <h3 className={styles.title}>{title}</h3>
                </Link>

                <p className={styles.description}>{description}</p>

                <div className={styles.meta}>
                    <span className={styles.category}>{category}</span>
                </div>

                <div className={styles.actions}>
                    <Link href={`/templates/${slug}`} className={styles.previewBtn}>
                        More Info
                    </Link>
                    {isFree ? (
                        <Link href={`/templates/${slug}`} className={styles.downloadBtn}>
                            Download
                        </Link>
                    ) : (
                        <Link
                            href={`/preview/${slug}`}
                            className={styles.demoBtn}
                        >
                            Live Demo
                        </Link>
                    )}
                </div>
            </div>
        </article>
    );
}
