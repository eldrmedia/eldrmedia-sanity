import { defineType } from 'sanity'
export default defineType({
  name: 'impactModule',
  title: 'Impact & Results',
  type: 'object',
  fields: [
    { name:'superTitle', type:'string', title:'Super title (eyebrow)' },
    { name:'title', type:'string' },
    { name:'subtitle', type:'text' },
    { name:'bg', type:'string', description:'Tailwind background class or hex' },
    { name:'kpis', type:'array', of:[{ type:'kpi' }] }
  ].filter(Boolean)
})
