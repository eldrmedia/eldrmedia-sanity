import { defineType } from 'sanity'
export default defineType({
  name: 'capabilitiesModule',
  title: 'Capabilities',
  type: 'object',
  fields: [
    { name:'superTitle', type:'string', title:'Super title (eyebrow)' },
    { name:'title', type:'string' },
    { name:'subtitle', type:'text' },
    { name:'bg', type:'string', description:'Tailwind background class or hex' },
    { name:'features', type:'array', of:[{ type:'feature' }], options:{sortable:true} }
  ].filter(Boolean)
})
