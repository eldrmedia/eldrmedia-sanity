import { defineType } from 'sanity'
export default defineType({
  name:'siteSettings', title:'Site Settings', type:'document',
  fields:[
    {name:'title', type:'string'},
    {name:'description', type:'text'},
    {name: 'defaultSeo', title: 'Default SEO', type: 'seo' },
    {name: 'siteUrl', title: 'Site URL', type: 'url' },
    {name:'social', type:'object', fields:[
      {name:'twitter', type:'url'}, {name:'github', type:'url'}, {name:'linkedin', type:'url'}
    ]}
  ]
})
