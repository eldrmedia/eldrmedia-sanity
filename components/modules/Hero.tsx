import React from 'react'
import SectionHeader from '../SectionHeader'

export default function Hero({data}:{data:any}){
  return (
    <section className={data.bg || ''}>
      <div className="container section grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6">
          <SectionHeader superTitle={data.superTitle} title={data.title} subtitle={data.subtitle}/>
          <div className="flex gap-3">
            {data.actions?.map((a:any, i:number)=>(
              <a key={i} href={a?.href || '#'} className="inline-flex items-center rounded-full px-4 py-2 bg-sun-500 text-white hover:bg-sun-600">{a?.label||'Learn more'}</a>
            ))}
          </div>
        </div>
        <div className="lg:col-span-6">
          <div className="card aspect-[16/10] bg-neutral-100">
            {data.media?.url && <img src={data.media.url} alt="" className="w-full h-full object-cover rounded-2xl"/>}
          </div>
        </div>
      </div>
    </section>
  )
}
