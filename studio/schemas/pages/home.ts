import { defineType } from 'sanity'
export default defineType({
  name:'home', title:'Home', type:'document',
  fields:[
    {name:'title', type:'string'},
    {name:'modules', type:'array', of:[
      {type:'heroModule'},{type:'bentoModule'},{type:'capabilitiesModule'},{type:'testimonialModule'},{type:'blogFeaturedModule'},{type:'ctaModule'}
    ]}
  ]
})
