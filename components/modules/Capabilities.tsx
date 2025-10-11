import SectionHeader from '../SectionHeader'
import dynamic from 'next/dynamic'
const InlineSvg = dynamic(() => import('@/components/InlineSvg'), { ssr: false })
import clsx from 'clsx'

export default function Capabilities({ data }: { data: any }) {
  return (
    <section className={data.bg || ''}>
      <div className="container section">
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
          <SectionHeader superTitle={data.superTitle} title={data.title} subtitle={data.subtitle} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {data.features?.map((f: any, i: number) => {
              const size = f?.iconSize || 'h-6 w-6'
              const color = f?.iconColor || 'text-current'
              return (
                <article key={i} className="p-4">
                  <div className={clsx('leading-none bg-white rounded-xl shadow-lg h-12 w-12 grid place-items-center mb-6', color)}>
                    {f?.svg ? (
                      <InlineSvg
                        svg={f.svg}
                        className="block [&_svg]:inline-block [&_svg]:h-6 [&_svg]:w-6 text-current"
                      />
                    ) : f?.icon ? (
                      <i className={`bi bi-${f.icon} text-2xl`} aria-hidden="true" />
                    ) : (
                      <span role="img" aria-label="decorative">✦</span>
                    )}
                  </div>

                  <h3 className="text-lg font-body font-medium mb-2">{f.title}</h3>
                  {f.description && <p className="text-base text-neutral-600 mt-1">{f.description}</p>}
                </article>
              )
            })}
        </div>
        </div>
      </div>
    </section>
  )
}
