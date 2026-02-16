import Link from 'next/link';
import { getBlogPostBySlug } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/client';
import { PortableText } from 'next-sanity';
import styles from './page.module.css';

// Fallback
const fallbackPost = {
    title: 'Top 10 Web Design Trends for 2025',
    excerpt: 'Discover the latest design trends including glassmorphism, 3D elements, dark themes, and AI-powered interfaces.',
    body: null,
    htmlContent: `
    <p>The web design landscape is constantly evolving, and 2025 brings exciting new trends that are reshaping how we create digital experiences.</p>
    <h2>1. Glassmorphism 2.0</h2>
    <p>Building on the glassmorphism trend from previous years, designers are now creating more sophisticated frosted glass effects with improved accessibility.</p>
    <h2>2. Dark Mode as Default</h2>
    <p>More websites are adopting dark mode as their primary color scheme. This not only reduces eye strain but also gives websites a premium, modern feel.</p>
    <h2>3. AI-Powered Personalization</h2>
    <p>Artificial intelligence is enabling unprecedented levels of personalization.</p>
    `,
    thumbnail: null,
    category: 'Design Trends',
    publishedAt: '2025-02-05',
    readTime: '8 min read',
    author: { name: 'Sarah Johnson', avatar: null, role: 'Senior Designer' },
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let post;

    try {
        const sanityPost = await getBlogPostBySlug(slug);
        post = sanityPost || fallbackPost;
    } catch {
        post = fallbackPost;
    }

    const formattedDate = new Date(post.publishedAt || '2025-01-01').toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const authorInitials = post.author?.name
        ? post.author.name.split(' ').map((n: string) => n[0]).join('')
        : 'TF';

    const thumbnailUrl = post.thumbnail && typeof post.thumbnail === 'object'
        ? urlFor(post.thumbnail).width(1200).height(600).url()
        : null;

    return (
        <div className={styles.page}>
            {/* Header */}
            <header className={styles.header}>
                <div className="container">
                    <Link href="/blog" className={styles.backLink}>
                        <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Blog
                    </Link>

                    <div className={styles.meta}>
                        <span className="badge">{post.category || 'General'}</span>
                        <span className={styles.dot}>•</span>
                        <time>{formattedDate}</time>
                        <span className={styles.dot}>•</span>
                        <span>{post.readTime || '5 min read'}</span>
                    </div>

                    <h1 className={styles.title}>{post.title}</h1>
                    <p className={styles.excerpt}>{post.excerpt}</p>

                    {post.author && (
                        <div className={styles.author}>
                            <div className={styles.authorAvatar}>
                                <span>{authorInitials}</span>
                            </div>
                            <div className={styles.authorInfo}>
                                <span className={styles.authorName}>{post.author.name}</span>
                                <span className={styles.authorRole}>{post.author.role}</span>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Featured Image */}
            {thumbnailUrl && (
                <div className={styles.featuredImage}>
                    <div className={styles.imageWrapper}>
                        <img src={thumbnailUrl} alt={post.title} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                    </div>
                </div>
            )}
            {!thumbnailUrl && (
                <div className={styles.featuredImage}>
                    <div className={styles.imageWrapper}>
                        <div className={styles.imagePlaceholder}>
                            <span>Featured Image</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Content */}
            <article className={styles.article}>
                <div className="container">
                    {post.body ? (
                        <div className={styles.content}>
                            <PortableText value={post.body} />
                        </div>
                    ) : (
                        <div className={styles.content} dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }} />
                    )}
                </div>
            </article>

            {/* Share */}
            <section className={styles.share}>
                <div className="container">
                    <div className={styles.shareBox}>
                        <span>Share this article:</span>
                        <div className={styles.shareLinks}>
                            <a href="#" className={styles.shareLink}>Twitter</a>
                            <a href="#" className={styles.shareLink}>LinkedIn</a>
                            <a href="#" className={styles.shareLink}>Facebook</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
