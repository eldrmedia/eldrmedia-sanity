import React from 'react'
import SectionHeader from '../SectionHeader'
import { BlogCard } from '../Cards'

export default function BlogFeatured({data}:{data:any}){
  const posts = data.posts || []
  return (
    <section className={data.bg || ''}>
      <div className="container section">
        <SectionHeader superTitle={data.superTitle} title={data.title} subtitle={data.subtitle}/>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p:any)=>(
            <BlogCard key={p.slug.current} {...p} meta={`${p.author?.name||''} · ${p.readTime||3} min`} />
          ))}
        </div>
      </div>
    </section>
  )
}
