import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'template',
    title: 'Template',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title', maxLength: 96 },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 3,
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'thumbnail',
            title: 'Thumbnail (Screenshot)',
            type: 'image',
            options: { hotspot: true },
            description: 'Upload a high-quality screenshot of the template (16:10 aspect ratio recommended). The system will automatically wrap it in a professional browser mockup.',
        }),
        defineField({
            name: 'gallery',
            title: 'Image Gallery (Multiple Screenshots)',
            type: 'array',
            of: [{ type: 'image', options: { hotspot: true } }],
            description: 'Upload up to 8 additional screenshots. These appear as a clickable thumbnail strip on the product page.',
        }),
        defineField({
            name: 'bundleItems',
            title: 'Bundle Sub-Templates',
            type: 'array',
            description: 'For bundle products: list each sub-template inside the ZIP. Users can click to preview each one individually.',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'label', title: 'Template Name', type: 'string', description: 'e.g. "AI/ML Platform"' }),
                        defineField({ name: 'path', title: 'Path inside ZIP', type: 'string', description: 'e.g. "ai-ml-saas/index.html"' }),
                        defineField({ name: 'description', title: 'Short Description', type: 'string' }),
                        defineField({ name: 'icon', title: 'Emoji Icon', type: 'string', description: 'e.g. "🤖" (optional)' }),
                    ],
                    preview: {
                        select: { title: 'label', subtitle: 'path' },
                    },
                },
            ],
        }),
        defineField({
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'pricingType',
            title: 'Pricing Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Free', value: 'free' },
                    { title: 'Premium', value: 'premium' },
                ],
                layout: 'radio',
            },
            initialValue: 'free',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'price',
            title: 'Price (for premium)',
            type: 'string',
            description: 'e.g. "$29" — leave empty for free templates',
            hidden: ({ parent }) => parent?.pricingType === 'free',
        }),
        defineField({
            name: 'demoUrl',
            title: 'Live Demo URL',
            type: 'url',
        }),
        defineField({
            name: 'demoZip',
            title: 'Template Demo (ZIP File)',
            type: 'file',
            options: {
                accept: '.zip',
            },
            description: 'Upload the ZIP file containing index.html and other assets for the live preview.',
        }),
        defineField({
            name: 'downloadUrl',
            title: 'Download URL (for free templates)',
            type: 'url',
            hidden: ({ parent }) => parent?.pricingType === 'premium',
        }),
        defineField({
            name: 'buyLinks',
            title: 'Buy Links (for premium templates)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'platform', title: 'Platform', type: 'string' }),
                        defineField({ name: 'url', title: 'URL', type: 'url' }),
                        defineField({ name: 'price', title: 'Price', type: 'string' }),
                    ],
                    preview: {
                        select: { title: 'platform', subtitle: 'price' },
                    },
                },
            ],
            hidden: ({ parent }) => parent?.pricingType === 'free',
        }),
        defineField({
            name: 'technologies',
            title: 'Technologies',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        }),
        defineField({
            name: 'features',
            title: 'Features',
            type: 'array',
            of: [{ type: 'string' }],
        }),
        defineField({
            name: 'tags',
            title: 'Tags / Keywords',
            type: 'array',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
            description: 'Add SEO keywords users search for — e.g. "dark theme", "Bootstrap 5", "one-page", "restaurant website". These power search rankings and site filters.',
        }),
        defineField({
            name: 'isFeatured',
            title: 'Featured on Homepage?',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            initialValue: 0,
        }),
        // ── SEO Fields ──────────────────────────────────────────────
        defineField({
            name: 'seoTitle',
            title: 'SEO Title',
            type: 'string',
            description: 'Custom title for Google/search engines. Leave blank to auto-generate from template title. Max 60 characters.',
            validation: (rule) => rule.max(60),
        }),
        defineField({
            name: 'seoDescription',
            title: 'SEO Description',
            type: 'text',
            rows: 2,
            description: 'Custom meta description for Google. Leave blank to use the template description. Max 160 characters.',
            validation: (rule) => rule.max(160),
        }),
        defineField({
            name: 'metaImage',
            title: 'Social Share Image (OG Image)',
            type: 'image',
            description: 'Optional. If set, this image is used when the template page is shared on Twitter/LinkedIn. Recommended: 1200×630px. Falls back to thumbnail if not set.',
        }),
    ],
    orderings: [
        { title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
        { title: 'Title', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'pricingType',
            media: 'thumbnail',
        },
        prepare({ title, subtitle, media }) {
            return {
                title,
                subtitle: subtitle === 'free' ? '🟢 FREE' : '🔵 PREMIUM',
                media,
            };
        },
    },
});
