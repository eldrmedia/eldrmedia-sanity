import React from 'react'
import Hero from './modules/Hero'
import Bento from './modules/Bento'
import Capabilities from './modules/Capabilities'
import TestimonialBlock from './modules/TestimonialBlock'
import BlogFeatured from './modules/BlogFeatured'
import CTAFull from './modules/CTAFull'
import Process from './modules/Process'
import Evidence from './modules/Evidence'
import Solution from './modules/Solution'
import Impact from './modules/Impact'
import Governance from './modules/Governance'
import Values from './modules/Values'
import AboutSplit from './modules/AboutSplit'

export default function ModuleRenderer({modules}:{modules:any[]}){
  return (
    <>
      {modules?.map((m:any, idx:number)=>{
        switch(m._type){
          case 'heroModule': return <Hero key={idx} data={m}/>
          case 'bentoModule': return <Bento key={idx} data={m}/>
          case 'capabilitiesModule': return <Capabilities key={idx} data={m}/>
          case 'testimonialModule': return <TestimonialBlock key={idx} data={m}/>
          case 'blogFeaturedModule': return <BlogFeatured key={idx} data={m}/>
          case 'ctaModule': return <CTAFull key={idx} data={m}/>
          case 'processModule': return <Process key={idx} data={m}/>
          case 'evidenceModule': return <Evidence key={idx} data={m}/>
          case 'solutionModule': return <Solution key={idx} data={m}/>
          case 'impactModule': return <Impact key={idx} data={m}/>
          case 'governanceModule': return <Governance key={idx} data={m}/>
          case 'valuesModule': return <Values key={idx} data={m} />
          case 'aboutSplitModule': return <AboutSplit key={idx} data={m} />
          default: return null
        }
      })}
    </>
  )
}
