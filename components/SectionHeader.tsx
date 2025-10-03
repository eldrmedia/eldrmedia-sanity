import React from 'react'
export default function SectionHeader({superTitle, title, subtitle}:{superTitle?:string; title?:string; subtitle?:string}){
  return (
    <header className="mb-8">
      {superTitle && <div className="kicker">{superTitle}</div>}
      {title && <h1 className="h1 mt-2">{title}</h1>}
      {subtitle && <p className="lead mt-2">{subtitle}</p>}
    </header>
  )
}
