import { defineType } from 'sanity'
export default defineType({
  name: 'blogFeaturedModule',
  title: 'Blog Featured',
  type: 'object',
  fields: [
    { name:'superTitle', type:'string', title:'Super title (eyebrow)' },
    { name:'title', type:'string' },
    { name:'subtitle', type:'text' },
    { name:'bg', type:'string', description:'Tailwind background class or hex' },
    { name:'posts', type:'array', of:[{ type:'reference', to:[{type:'post'}]}] }
  ].filter(Boolean)
})
