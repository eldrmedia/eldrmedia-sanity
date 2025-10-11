// components/ModuleRenderer.tsx
import React, { ComponentType } from 'react'
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

type ModuleProps = { data: any }
type Module = { _type?: string; _key?: string; _id?: string; disabled?: boolean } & Record<string, any>

const REGISTRY: Record<string, ComponentType<ModuleProps>> = {
  heroModule: Hero,
  bentoModule: Bento,
  capabilitiesModule: Capabilities,
  testimonialModule: TestimonialBlock,
  blogFeaturedModule: BlogFeatured,
  ctaModule: CTAFull,
  processModule: Process,
  evidenceModule: Evidence,
  solutionModule: Solution,
  impactModule: Impact,
  governanceModule: Governance,
  valuesModule: Values,
  aboutSplitModule: AboutSplit,
}

export default function ModuleRenderer({ modules }: { modules?: Module[] }) {
  if (!Array.isArray(modules) || modules.length === 0) return null

  return (
    <>
      {modules
        .filter(Boolean)
        .map((m, i) => {
          if (!m || m.disabled) return null
          const Comp = REGISTRY[m._type ?? '']
          if (!Comp) {
            if (process.env.NODE_ENV !== 'production') {
              console.warn(`ModuleRenderer: no renderer for type "${m?._type}"`, m)
            }
            return null
          }
          const key = m._key || m._id || `${m._type}-${i}`
          return <Comp key={key} data={m} />
        })}
    </>
  )
}
