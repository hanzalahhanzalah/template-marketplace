export interface TemplateCardData {
    title: string;
    slug: string;
    description: string;
    thumbnail: string;
    category: string;
    demoUrl?: string;
    price?: string;
}

export interface BlogPostData {
    title: string;
    slug: string;
    excerpt: string;
    thumbnail: string;
    category: string;
    publishedAt: string;
    readTime?: string;
}
