import { fetchQuery } from '@/lib/sanityClient'
import { postsQuery } from '@/lib/queries'
import { BlogCard } from '@/components/Cards'

export default async function BlogIndex(){
  const posts = await fetchQuery<any[]>(postsQuery)
  return (
    <div className="container section">
      <header className="mb-10">
        <div className="kicker">Insights & Ideas</div>
        <h1 className="h1 mt-2">Latest blog posts</h1>
        <p className="lead">Discover stories, tips, and resources to inspire your next big idea.</p>
      </header>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(p => <BlogCard key={p.slug.current} {...p} meta={`${p.author?.name||''} · ${p.readTime||3} min`} />)}
      </div>
    </div>
  )
}
