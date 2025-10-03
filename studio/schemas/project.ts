import { defineType } from 'sanity'
export default defineType({
  name:'project', title:'Project / Case Study', type:'document',
  fields:[
    {name:'title', type:'string'},
    {name:'slug', type:'slug', options:{source:'title'}},
    {name:'brandTheme', title:'Brand Theme', type:'object', fields:[
      {name:'primary', type:'color'}, {name:'primaryDark', type:'color'}, {name:'accent', type:'color'}, {name:'onPrimary', type:'color'}
    ]},
    {name:'cover', type:'image'},
    {name:'excerpt', type:'text'},
    {name:'tags', type:'array', of:[{type:'string'}]},
    {name:'snapshot', type:'array', of:[{type:'object', fields:[{name:'label', type:'string'},{name:'value', type:'string'}]}], options:{layout:'grid'}},
    {name:'challenge', type:'text'},
    {name:'heroMedia', type:'image'},
    {name:'modules', type:'array', of:[
      {type:'processModule'},{type:'evidenceModule'},{type:'solutionModule'},{type:'impactModule'},{type:'governanceModule'},{type:'testimonialModule'},{type:'ctaModule'}
    ]}
  ]
})
