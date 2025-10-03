import { defineType } from 'sanity'
export default defineType({
  name:'page', title:'Page', type:'document',
  fields:[
    {name:'title', type:'string'},
    {name:'slug', type:'slug', options:{source:'title'}},
    {name:'modules', type:'array', of:[
      {type:'heroModule'},{type:'bentoModule'},{type:'capabilitiesModule'},{type:'testimonialModule'},{type:'blogFeaturedModule'},{type:'ctaModule'}
    ]}
  ]
})
