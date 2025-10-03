import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutSplitModule',
  title: 'About • Split (Text Left, Image Right)',
  type: 'object',
  fields: [
    defineField({ name: 'kicker', title: 'Kicker', type: 'string' }),
    defineField({ name: 'title',  title: 'Title',  type: 'string' }),
    // Rich text left column
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: (r) => r.required(),
    }),
    // NEW: per-heading class overrides for the body rich text
    defineField({
      name: 'bodyHeadingClasses',
      title: 'Body Heading Classes (optional)',
      type: 'object',
      fields: [
        defineField({
          name: 'h1',
          title: 'h1 classes',
          type: 'string',
          description: 'Tailwind/classes for H1 inside Body (e.g. "text-4xl font-bold tracking-tight")',
        }),
        defineField({
          name: 'h2',
          title: 'h2 classes',
          type: 'string',
          description: 'Tailwind/classes for H2 inside Body',
        }),
        defineField({
          name: 'h3',
          title: 'h3 classes',
          type: 'string',
          description: 'Tailwind/classes for H3 inside Body',
        }),
        defineField({
          name: 'p',
          title: 'paragraph classes',
          type: 'string',
          description: 'Optional classes for paragraph blocks (normal)',
        }),
      ],
      options: { collapsible: true, collapsed: true },
    }),
    // Image right column
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [{ name: 'alt', title: 'Alt text', type: 'string' }]
    }),
    defineField({
      name: 'invertOnDesktop',
      title: 'Invert columns on desktop (image left, text right)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'bg',
      title: 'Background (token or hex, optional)',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'kicker', media: 'image' },
    prepare({ title, subtitle, media }) {
      return { title: title || 'About • Split', subtitle, media }
    },
  },
})
