import { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';
import { getBlogPosts, getCategories } from '@/sanity/lib/queries';
import { urlFor } from '@/sanity/lib/client';
import styles from './page.module.css';

export const revalidate = 60; // Revalidate every 60 seconds (Standard for SEO & Speed)

export const metadata: Metadata = {
    title: 'Blog | TemplateLayer - Web Design Tips & Tutorials',
    description: 'Learn web design tips, development tutorials, and industry insights. Stay updated with the latest trends in HTML, CSS, and JavaScript.',
};


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
        posts = sanityPosts?.length > 0 ? sanityPosts.map(mapPost) : [];
        if (sanityCategories?.length > 0) {
            categoryNames = ['All', ...sanityCategories.map((c: { title: string }) => c.title)];
        }
    } catch {
        posts = [];
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
                    {posts.length > 0 ? (
                        <>
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
                        </>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                            <h3>No blog posts found</h3>
                            <p>We haven&apos;t published any articles yet. Check back later!</p>
                        </div>
                    )}
                </div>
            </section>

        </div>
    );
}
