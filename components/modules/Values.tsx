import SectionHeader from '../SectionHeader'

export default function Values({ data }: { data: any }) {
  const items = data.values || []
  return (
    <section className={data.bg || 'bg-sun-400'}>
      <div className="container section">
        <div className="text-center">
          <SectionHeader superTitle={data.superTitle} title={data.title} subtitle={data.subtitle} />
        </div>
        <ul>
          {items.map((v: any, i: number) => (
            <li key={i} className="text-center">
              <span className="font-medium flex">{v.label}</span>
              {v.description && <p className="mt-1 text-sm text-neutral-700">{v.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
