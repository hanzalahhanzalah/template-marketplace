import { defineType, defineField } from 'sanity';

export default defineType({
    name: 'faq',
    title: 'FAQ',
    type: 'document',
    fields: [
        defineField({
            name: 'question',
            title: 'Question',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'answer',
            title: 'Answer',
            type: 'text',
            rows: 4,
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'page',
            title: 'Show On Page',
            type: 'string',
            options: {
                list: [
                    { title: 'Contact Page', value: 'contact' },
                    { title: 'About Page', value: 'about' },
                ],
            },
            initialValue: 'contact',
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
    ],
    preview: {
        select: {
            title: 'question',
            subtitle: 'page',
        },
    },
});
