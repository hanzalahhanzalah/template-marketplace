import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'contactMessage',
    title: 'Contact Messages',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'email',
            title: 'Email',
            type: 'string',
            validation: (Rule) => Rule.required().email(),
        }),
        defineField({
            name: 'subject',
            title: 'Subject',
            type: 'string',
            options: {
                list: [
                    { title: 'General Inquiry', value: 'general' },
                    { title: 'Technical Support', value: 'support' },
                    { title: 'Custom Development', value: 'custom' },
                    { title: 'Partnership', value: 'partnership' },
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'message',
            title: 'Message',
            type: 'text',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'receivedAt',
            title: 'Received At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            readOnly: true,
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'subject',
        },
    },
});
