import React from 'react'
import SectionHeader from '../SectionHeader'

export default function Evidence({data}:{data:any}){
  return (
    <section className={data.bg || ''}>
      <div className="container section">
        <SectionHeader superTitle={data.superTitle} title={data.title} subtitle={data.subtitle}/>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card overflow-hidden">{data.before?.url && <img src={data.before.url} alt="Before" className="w-full h-full object-cover"/>}</div>
          <div className="card overflow-hidden">{data.after?.url && <img src={data.after.url} alt="After" className="w-full h-full object-cover"/>}</div>
        </div>
        {data.milestones?.length>0 && (
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {data.milestones.map((m:any,i:number)=>(
              <div key={i} className="card p-4">
                <div className="text-xs text-neutral-500">{m.quarter}</div>
                <div className="font-semibold">{m.title}</div>
                <div className="text-sm text-neutral-600">Owner: {m.owner}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
