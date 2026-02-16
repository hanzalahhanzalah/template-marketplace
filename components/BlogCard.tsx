import Image from 'next/image';
import Link from 'next/link';
import styles from './BlogCard.module.css';

interface BlogCardProps {
    title: string;
    slug: string;
    excerpt: string;
    thumbnail: string;
    category: string;
    publishedAt: string;
    readTime?: string;
}

export default function BlogCard({
    title,
    slug,
    excerpt,
    thumbnail,
    category,
    publishedAt,
    readTime = '5 min',
}: BlogCardProps) {
    const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    return (
        <article className={styles.card}>
            <Link href={`/blog/${slug}`} className={styles.imageWrapper}>
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
                        <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                        </svg>
                    </div>
                )}
            </Link>

            <div className={styles.content}>
                <div className={styles.meta}>
                    <span className={styles.category}>{category}</span>
                    <span className={styles.divider}>•</span>
                    <time>{formattedDate}</time>
                </div>

                <Link href={`/blog/${slug}`}>
                    <h3 className={styles.title}>{title}</h3>
                </Link>

                <p className={styles.excerpt}>{excerpt}</p>

                <Link href={`/blog/${slug}`} className={styles.readMore}>
                    Read More →
                </Link>
            </div>
        </article>
    );
}
