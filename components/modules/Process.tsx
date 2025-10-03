import React from 'react'
import SectionHeader from '../SectionHeader'

export default function Process({data}:{data:any}){
  const phases = data.phases || []
  return (
    <section className={data.bg || ''}>
      <div className="container section">
        <SectionHeader superTitle={data.superTitle} title={data.title} subtitle={data.subtitle}/>
        <ol className="grid md:grid-cols-2 gap-6">
          {phases.map((p:any,i:number)=>(
            <li key={i} className="card p-5">
              <div className="text-xs text-neutral-500 mb-2">Phase {i+1}</div>
              <h3 className="font-semibold">{p.title}</h3>
              <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="font-medium mb-1">Activities</div>
                  <ul className="list-disc ml-4 space-y-1">{p.activities?.map((a:string,idx:number)=>(<li key={idx}>{a}</li>))}</ul>
                </div>
                <div>
                  <div className="font-medium mb-1">Artifacts</div>
                  <ul className="list-disc ml-4 space-y-1">{p.artifacts?.map((a:string,idx:number)=>(<li key={idx}>{a}</li>))}</ul>
                </div>
              </div>
              {p.outcome && <p className="text-sm text-neutral-600 mt-3"><span className="font-medium">Outcome:</span> {p.outcome}</p>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
