import { defineType } from 'sanity'
export default defineType({
  name:'navigation', title:'Navigation', type:'document',
  fields:[{name:'items', type:'array', of:[{type:'object', fields:[
    {name:'label', type:'string'}, {name:'href', type:'string'}
  ]}]}]
})
