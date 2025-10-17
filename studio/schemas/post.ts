// studio/schemas/post.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  groups: [{ name: 'seo', title: 'SEO' }],
  fields: [
    defineField({ name:'title', type:'string', validation: r => r.required() }),
    defineField({ name:'slug', type:'slug', options:{ source:'title' }, validation: r => r.required() }),
    defineField({ name:'excerpt', type:'text' }),
    defineField({ name:'cover', type:'image', options: { hotspot: true } }),

    // NEW — simple tags as strings (you can switch to a Tag doc later)
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' }, // gives a tag UI in Studio
    }),

    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: ['Design Leadership', 'Systems & Strategy', 'Process & Practice', 'Career & Growth', 'Human-Centered Design & AI', 'Case Studies']
      }
    }),

    defineField({
      name:'author',
      type:'object',
      fields:[
        defineField({ name:'name', type:'string' }),
        defineField({ name:'image', type:'image', options: { hotspot: true } }),
      ],
    }),

    defineField({ name:'publishedAt', type:'datetime' }),
    defineField({ name:'readTime', type:'number' }),

    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),

    // NEW — manual override list (optional)
    defineField({
      name: 'relatedManual',
      title: 'Related posts (manual)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      description: 'Optional: pick exact related posts. If empty, we auto-suggest by tags.',
    }),
  ],
})
