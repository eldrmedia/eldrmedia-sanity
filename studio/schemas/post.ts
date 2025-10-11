import { defineType } from 'sanity'
export default defineType({
  name:'post', title:'Blog Post', type:'document',
  groups: [
    {name: 'seo', title: 'SEO'},
  ],  
  fields:[
    {name:'title', type:'string'},
    {name:'slug', type:'slug', options:{source:'title'}},
    {name:'excerpt', type:'text'},
    {name:'cover', type:'image'},
    {name:'category', type:'string'},
    {name:'author', type:'object', fields:[{name:'name', type:'string'},{name:'image', type:'image'}]},
    {name:'publishedAt', type:'datetime'},
    {name:'readTime', type:'number'},
    {name:'body', type:'array', of:[{type:'block'},{type:'image'}]}
  ]
})
