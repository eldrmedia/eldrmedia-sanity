import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'SEO Title', type: 'string', validation: r => r.max(70) }),
    defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 3, validation: r => r.max(160) }),
    defineField({ name: 'ogImage', title: 'Open Graph Image', type: 'image', options: {hotspot: true} }),
    defineField({ name: 'canonical', title: 'Canonical URL', type: 'url' }),
    defineField({ name: 'noindex', title: 'Noindex', type: 'boolean' }),
  ],
})
