import React from 'react'
import SectionHeader from '../SectionHeader'

export default function TestimonialBlock({data}:{data:any}){
  const t = data.testimonial
  if(!t) return null
  return (
    <section className={data.bg || ''}>
      <div className="container section">
        <SectionHeader superTitle={data.superTitle} title={data.title} subtitle={data.subtitle}/>
        <figure className="card bg-neutral-900 text-white p-8">
          <div className="text-yellow-300">★★★★★</div>
          <blockquote className="text-xl mt-3">“{t.quote}”</blockquote>
          <figcaption className="mt-3 text-sm text-neutral-300">{t.person} — {t.role}</figcaption>
        </figure>
      </div>
    </section>
  )
}
