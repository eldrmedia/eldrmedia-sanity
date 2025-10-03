import React from 'react'
import SectionHeader from '../SectionHeader'

export default function Solution({data}:{data:any}){
  return (
    <section className={data.bg || ''}>
      <div className="container section">
        <SectionHeader superTitle={data.superTitle} title={data.title} subtitle={data.subtitle}/>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.features?.map((f:any,i:number)=>(
            <div key={i} className="card p-5">
              <div className="text-2xl">{f.icon || '▦'}</div>
              <h3 className="font-semibold mt-2">{f.title}</h3>
              <p className="text-sm text-neutral-600 mt-1">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
