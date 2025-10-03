import React from 'react'
export default function CTAFull({data}:{data:any}){
  const a = data.action || {}
  return (
    <section className={data.bg || 'bg-sun-300/70'}>
      <div className="container section text-center">
        {data.superTitle && <div className="kicker">{data.superTitle}</div>}
        {data.title && <h2 className="h2 mt-2">{data.title}</h2>}
        {data.subtitle && <p className="lead mt-2">{data.subtitle}</p>}
        <a href={a.href || '#'} className="inline-flex mt-6 rounded-full bg-neutral-900 text-white px-5 py-2 hover:bg-neutral-800">{a.label || 'Start a Conversation'}</a>
      </div>
    </section>
  )
}
