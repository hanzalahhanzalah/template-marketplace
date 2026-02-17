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
            title: 'Thumbnail',
            type: 'image',
            options: { hotspot: true },
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
