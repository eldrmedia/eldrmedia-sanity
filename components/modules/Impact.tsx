import React from 'react'
import SectionHeader from '../SectionHeader'

export default function Impact({data}:{data:any}){
  return (
    <section className={data.bg || ''}>
      <div className="container section">
        <SectionHeader superTitle={data.superTitle} title={data.title} subtitle={data.subtitle}/>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.kpis?.map((k:any,i:number)=>(
            <div key={i} className="card p-6 text-center">
              <div className="text-3xl font-semibold">{k.value}</div>
              <div className="text-sm text-neutral-600 mt-1">{k.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
