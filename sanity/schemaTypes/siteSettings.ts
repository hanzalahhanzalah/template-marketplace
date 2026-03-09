import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'siteName',
            title: 'Site Name',
            type: 'string',
            description: 'The name shown in browser tabs and search results',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'logoText',
            title: 'Logo Text (First Part)',
            type: 'string',
            description: 'e.g. "template" in "templatelayer"',
        }),
        defineField({
            name: 'logoAccent',
            title: 'Logo Text (Accent Part)',
            type: 'string',
            description: 'e.g. "layer" in "templatelayer"',
        }),
        defineField({
            name: 'siteDescription',
            title: 'Site Description',
            type: 'text',
            rows: 2,
            description: 'Default meta description for SEO',
        }),
        defineField({
            name: 'siteKeywords',
            title: 'SEO Keywords',
            type: 'string',
            description: 'Comma-separated keywords for SEO',
        }),
        defineField({
            name: 'footerDescription',
            title: 'Footer Description',
            type: 'text',
            rows: 2,
            description: 'Short description shown in the footer',
        }),
        defineField({
            name: 'socialLinks',
            title: 'Social Media Links',
            type: 'object',
            fields: [
                defineField({ name: 'twitter', title: 'Twitter', type: 'url' }),
                defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
                defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
                defineField({ name: 'github', title: 'GitHub', type: 'url' }),
                defineField({ name: 'youtube', title: 'YouTube', type: 'url' }),
            ],
        }),
    ],
    preview: {
        prepare() {
            return { title: '⚙️ Site Settings' };
        },
    },
});
