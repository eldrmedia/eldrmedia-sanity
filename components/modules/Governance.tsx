import React from 'react'
import SectionHeader from '../SectionHeader'

export default function Governance({data}:{data:any}){
  return (
    <section className={data.bg || ''}>
      <div className="container section">
        <SectionHeader superTitle={data.superTitle} title={data.title} subtitle={data.subtitle}/>
        <div className="grid md:grid-cols-3 gap-6">
          {data.quarters?.map((q:any,i:number)=>(
            <div key={i} className="card p-5">
              <div className="text-xs text-neutral-500">{q.quarter}</div>
              <div className="font-semibold">{q.title}</div>
              <p className="text-sm text-neutral-600 mt-1">{q.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
