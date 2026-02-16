import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'category',
    title: 'Category',
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
            name: 'categoryType',
            title: 'Category Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Template', value: 'template' },
                    { title: 'Blog', value: 'blog' },
                ],
                layout: 'radio',
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'categoryType',
        },
        prepare({ title, subtitle }) {
            return {
                title,
                subtitle: subtitle === 'template' ? '📦 Template Category' : '📝 Blog Category',
            };
        },
    },
});
