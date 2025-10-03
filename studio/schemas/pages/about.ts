// schemas/docs/about.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'}
  ],
  fields: [
    defineField({ name: 'title', type: 'string', initialValue: 'About' }),
    defineField({ name: 'slug', type: 'slug', options: { source: 'title' }, hidden: true }),
    defineField({
      name: 'modules',
      title: 'Modules',
      type: 'array',
      of: [
        { type: 'heroModule' },           // reuse Hero
        { type: 'aboutSplitModule' },
        { type: 'capabilitiesModule' },   // reuse as "Key Highlights"
        { type: 'valuesModule' },         // NEW (below)
        { type: 'testimonialModule' },
        { type: 'ctaModule' }
      ],
    }),
  ],
})
