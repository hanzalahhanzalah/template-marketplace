import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://templatelayer.com';

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/free-templates`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/templates`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
    ];

    // Template detail pages (will be dynamic from Sanity later)
    const templateSlugs = [
        'developer-portfolio',
        'businessbox',
        'cryptoland',
        'foodhunt',
        'flavor',
        'agency-landing',
        'cryptonexus',
        'savoria',
        'nexus-agency',
        'edupro',
        'zoner',
        'saasify',
    ];

    const templatePages: MetadataRoute.Sitemap = templateSlugs.map((slug) => ({
        url: `${baseUrl}/templates/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Blog post pages
    const blogSlugs = [
        'best-bootstrap-templates-2025',
        'how-to-choose-template',
        'css-grid-guide',
    ];

    const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }));

    return [...staticPages, ...templatePages, ...blogPages];
}
