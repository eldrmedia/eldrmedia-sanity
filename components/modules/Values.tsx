import SectionHeader from '../SectionHeader'

export default function Values({ data }: { data: any }) {
  const items = data.values || []
  return (
    <section className={data.bg || 'bg-neutral-50'}>
      <div className="container section">
        <SectionHeader superTitle={data.superTitle} title={data.title} />
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((v: any, i: number) => (
            <li key={i} className="rounded-lg border border-neutral-200 bg-white p-4">
              <div className="eyelash">{v.label}</div>
              {v.description && <p className="mt-1 text-sm text-neutral-700">{v.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
