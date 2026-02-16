import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'author',
    title: 'Author',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'name', maxLength: 96 },
        }),
        defineField({
            name: 'avatar',
            title: 'Avatar',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
            description: 'e.g. "Senior Designer", "Lead Developer"',
        }),
        defineField({
            name: 'bio',
            title: 'Bio',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'social',
            title: 'Social Links',
            type: 'object',
            fields: [
                defineField({ name: 'twitter', title: 'Twitter', type: 'url' }),
                defineField({ name: 'github', title: 'GitHub', type: 'url' }),
                defineField({ name: 'linkedin', title: 'LinkedIn', type: 'url' }),
                defineField({ name: 'website', title: 'Website', type: 'url' }),
            ],
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'role',
            media: 'avatar',
        },
    },
});
