// schemas/modules/valuesModule.ts
import { defineType, defineField } from 'sanity'
import { ListIcon } from '@sanity/icons'

export default defineType({
  name: 'valuesModule',
  title: 'Philosophy / Values',
  type: 'object',
  icon: ListIcon,
  fields: [
    defineField({ name: 'superTitle', type: 'string', description: 'Optional eyelash' }),
    defineField({ name: 'title', type: 'string' }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'label', type: 'string' },
        { name: 'description', type: 'string' }
      ]}],
      validation: Rule => Rule.min(3).max(8)
    }),
    defineField({ name: 'bg', type: 'string', description: 'Tailwind bg classes (optional)' })
  ],
  preview: {
    select: {title: 'title'},
    prepare: ({title}) => ({title: title || 'Philosophy / Values'})
  }
})
