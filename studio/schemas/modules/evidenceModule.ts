import { defineType } from 'sanity'
export default defineType({
  name: 'evidenceModule',
  title: 'Evidence',
  type: 'object',
  fields: [
    { name:'superTitle', type:'string', title:'Super title (eyebrow)' },
    { name:'title', type:'string' },
    { name:'subtitle', type:'text' },
    { name:'bg', type:'string', description:'Tailwind background class or hex' },
    { name:'before', type:'image' }, { name:'after', type:'image' }, { name:'milestones', type:'array', of:[{ type:'milestone' }]}
  ].filter(Boolean)
})
