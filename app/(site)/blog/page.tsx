import { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';
import { getBlogPosts, getCategories } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/client';
import styles from './page.module.css';

export const revalidate = 60; // Revalidate every 60 seconds (Standard for SEO & Speed)

export const metadata: Metadata = {
    title: 'Blog | TemplateForge - Web Design Tips & Tutorials',
    description: 'Learn web design tips, development tutorials, and industry insights. Stay updated with the latest trends in HTML, CSS, and JavaScript.',
};

// Fallback
const fallbackPosts = [
    { title: 'Top 10 Web Design Trends for 2025', slug: 'web-design-trends-2025', excerpt: 'Discover the latest design trends including glassmorphism, 3D elements, dark themes, and AI-powered interfaces that will dominate the web in 2025.', thumbnail: '', category: 'Design Trends', publishedAt: '2025-02-05', readTime: '8 min read' },
    { title: 'How to Choose the Right Template for Your Business', slug: 'choose-right-template', excerpt: 'A comprehensive guide to selecting website templates that align with your brand identity and business goals.', thumbnail: '', category: 'Tips & Guides', publishedAt: '2025-02-01', readTime: '6 min read' },
    { title: 'CSS Grid vs Flexbox: When to Use Each', slug: 'css-grid-vs-flexbox', excerpt: 'Learn the key differences between CSS Grid and Flexbox, and when to use each layout method for optimal results.', thumbnail: '', category: 'Development', publishedAt: '2025-01-28', readTime: '10 min read' },
    { title: 'Optimizing Images for Web Performance', slug: 'image-optimization-guide', excerpt: 'Master the art of image optimization to boost your website speed and improve user experience.', thumbnail: '', category: 'Performance', publishedAt: '2025-01-22', readTime: '7 min read' },
    { title: 'Building Accessible Websites: A Complete Guide', slug: 'accessibility-guide', excerpt: 'Learn how to create inclusive websites that work for everyone, including users with disabilities.', thumbnail: '', category: 'Accessibility', publishedAt: '2025-01-18', readTime: '12 min read' },
    { title: 'Introduction to CSS Custom Properties', slug: 'css-custom-properties', excerpt: 'Unlock the power of CSS variables to create maintainable and dynamic stylesheets.', thumbnail: '', category: 'Development', publishedAt: '2025-01-15', readTime: '9 min read' },
];

const defaultCategories = ['All', 'Design Trends', 'Development', 'Tips & Guides', 'Performance', 'Accessibility'];

function mapPost(p: Record<string, unknown>) {
    return {
        title: p.title as string,
        slug: p.slug as string,
        excerpt: p.excerpt as string,
        thumbnail: p.thumbnail && typeof p.thumbnail === 'object' ? urlFor(p.thumbnail).width(600).height(375).url() : '',
        category: p.category as string,
        publishedAt: p.publishedAt as string,
        readTime: (p.readTime as string) || '5 min read',
    };
}

export default async function BlogPage() {
    let posts: { title: string; slug: string; excerpt: string; thumbnail: string; category: string; publishedAt: string; readTime: string }[];
    let categoryNames = defaultCategories;

    try {
        const [sanityPosts, sanityCategories] = await Promise.all([
            getBlogPosts(),
            getCategories('blog'),
        ]);
        posts = sanityPosts?.length > 0 ? sanityPosts.map(mapPost) : fallbackPosts;
        if (sanityCategories?.length > 0) {
            categoryNames = ['All', ...sanityCategories.map((c: { title: string }) => c.title)];
        }
    } catch {
        posts = fallbackPosts;
    }

    return (
        <div className={styles.page}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container">
                    <span className="badge">Our Blog</span>
                    <h1>Insights & Tutorials</h1>
                    <p>Tips, tutorials, and insights to help you build better websites.</p>
                </div>
            </section>

            {/* Filters */}
            <section className={styles.filters}>
                <div className="container">
                    <div className={styles.filterBar}>
                        <div className={styles.categories}>
                            {categoryNames.map((cat) => (
                                <button
                                    key={cat}
                                    className={`${styles.categoryBtn} ${cat === 'All' ? styles.active : ''}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className={styles.blog}>
                <div className="container">
                    <div className={`grid grid-3 ${styles.grid}`}>
                        {posts.map((post) => (
                            <BlogCard key={post.slug} {...post} />
                        ))}
                    </div>

                    {/* Load More */}
                    <div className={styles.loadMore}>
                        <button className="btn btn-secondary">
                            Load More Articles
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
}
