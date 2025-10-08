// app/services/page.tsx
import Link from "next/link"

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl">
          <div className="eyelash text-[11px] tracking-[0.2em] uppercase text-neutral-500">
            Services
          </div>
          <h1 className="text-4xl md:text-5xl font-heading leading-tight mt-2">
            Design systems, clarity, and measurable outcomes—available as consulting or project work.
          </h1>
          <p className="mt-4 text-neutral-600 text-lg">
            I help organizations ship faster with stronger design systems, accessible experiences,
            and better product operations. Whether you need a full system build, a rescue mission,
            or decision-making clarity, I bring 15 years of hands-on leadership across healthcare,
            SaaS, and government platforms.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              href="/about"
              className="inline-flex items-center rounded-md bg-sun-500 px-4 py-2 text-white hover:bg-sun-600 transition"
            >
              Start a conversation
            </Link>
            <a
              href="#packages"
              className="inline-flex items-center rounded-md border border-neutral-300 px-4 py-2 text-neutral-800 hover:bg-neutral-50 transition"
            >
              View packages
            </a>
          </div>
        </div>
      </section>

      {/* VALUE STRIP */}
      <section className="border-y border-neutral-200 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-sm text-neutral-500 eyelash">Focus</div>
              <p className="mt-1 font-medium">
                Design systems, accessibility, product ops, strategy
              </p>
            </div>
            <div>
              <div className="text-sm text-neutral-500 eyelash">Approach</div>
              <p className="mt-1 font-medium">
                Systems thinking, governance, measurable outcomes
              </p>
            </div>
            <div>
              <div className="text-sm text-neutral-500 eyelash">Industries</div>
              <p className="mt-1 font-medium">
                Gov/Health, B2B SaaS, enterprise platforms
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE BUNDLES */}
      <section id="packages" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl">
          <div className="eyelash text-neutral-500">Engagements</div>
          <h2 className="text-3xl md:text-4xl font-heading mt-2">How we can work together</h2>
          <p className="mt-4 text-neutral-600">
            Choose a focused advisory sprint, a fixed-scope build, or ongoing partnership. Every
            engagement includes clear documentation, decision records, and handoff.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          {/* Advisory Sprint */}
          <div className="card rounded-xl border border-neutral-200 p-6">
            <div className="eyelash text-neutral-500">Advisory Sprint (2–4 weeks)</div>
            <h3 className="text-xl font-medium mt-2">Design System & Product Ops Assessment</h3>
            <p className="mt-2 text-neutral-600">
              A fast, focused deep-dive that identifies blockers and opportunities across design,
              engineering, and operations. You’ll get a prioritized roadmap and governance starter.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              <li>• Audit of tokens, components, usage, and contribution</li>
              <li>• Current state → target state blueprint</li>
              <li>• Governance model & contribution flow draft</li>
              <li>• 60–90 min stakeholder readout with Q&A</li>
            </ul>
            <Link
              href="/about"
              className="mt-6 inline-flex rounded-md bg-neutral-900 text-white px-3 py-2 hover:bg-neutral-800 transition"
            >
              Request availability
            </Link>
          </div>

          {/* Fixed Scope */}
          <div className="card rounded-xl border border-neutral-200 p-6 ring-1 ring-sun-100">
            <div className="eyelash text-neutral-500">Fixed Scope (6–10 weeks)</div>
            <h3 className="text-xl font-medium mt-2">Design System Build or Modernization</h3>
            <p className="mt-2 text-neutral-600">
              A production-ready system built in Figma and documented for engineering—designed to
              scale and governed to last.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              <li>• Tokens, foundations, and core components</li>
              <li>• Accessibility baked in (WCAG 2.2-aware patterns)</li>
              <li>• Contribution model, templates, and ops workflows</li>
              <li>• Engineering handoff: spec + Storybook-ready guidance</li>
            </ul>
            <Link
              href="/about"
              className="mt-6 inline-flex rounded-md bg-sun-500 text-white px-3 py-2 hover:bg-sun-600 transition"
            >
              Kick off a build
            </Link>
          </div>

          {/* Ongoing */}
          <div className="card rounded-xl border border-neutral-200 p-6">
            <div className="eyelash text-neutral-500">Ongoing (quarterly)</div>
            <h3 className="text-xl font-medium mt-2">Fractional Design Systems Leadership</h3>
            <p className="mt-2 text-neutral-600">
              Hands-on leadership to keep momentum: roadmap care, quality gates, and stakeholder
              alignment. Ideal for orgs maturing their system.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-neutral-700">
              <li>• Quarterly roadmap, metrics, and OKRs</li>
              <li>• Release governance & change management</li>
              <li>• Partner with eng managers & PMs on adoption</li>
              <li>• Office hours / reviews / documentation updates</li>
            </ul>
            <Link
              href="/about"
              className="mt-6 inline-flex rounded-md border border-neutral-300 px-3 py-2 hover:bg-neutral-50 transition"
            >
              Discuss a retainer
            </Link>
          </div>
        </div>
      </section>

      {/* DETAILED SERVICES */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <div className="eyelash text-neutral-500">Capabilities</div>
            <h2 className="text-3xl font-heading mt-2">What I deliver</h2>
            <p className="mt-4 text-neutral-600">
              Strategy informs the system; the system shapes the product. I operate at both levels to
              remove ambiguity, speed delivery, and raise product quality.
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ServiceCard
              title="Design Systems & Governance"
              description="From tokens to contribution flows, I build systems that scale across products and teams."
              bullets={[
                "Figma libraries, tokens, components, documentation",
                "Governance models and contribution workflows",
                "Rollout plans, training, and adoption metrics",
              ]}
            />
            <ServiceCard
              title="Accessibility by Default"
              description="Accessibility isn’t a checkbox—it’s an operating principle that de-risks teams and improves everyone’s experience."
              bullets={[
                "WCAG-aware patterns & audit support",
                "Inclusive components and content guidance",
                "Review gates and a11y in design ops",
              ]}
            />
            <ServiceCard
              title="UX Strategy & Research"
              description="Transform vague goals into actionable strategy—and connect work to real outcomes."
              bullets={[
                "Opportunity framing & scoping",
                "Journey maps, workflows, and service blueprints",
                "Outcome-driven roadmaps and decision records",
              ]}
            />
            <ServiceCard
              title="Product Operations"
              description="Create clarity in how work moves: intake, prioritization, and cross-functional alignment."
              bullets={[
                "Design/eng rituals that unblock delivery",
                "Templates, checklists, and quality gates",
                "Portfolio views & progress reporting",
              ]}
            />
            <ServiceCard
              title="System Modernization"
              description="Upgrade legacy UI and fragmented systems without pausing the roadmap."
              bullets={[
                "Audit → plan for progressive migration",
                "Deprecation strategy and risk management",
                "Storybook-ready specs and pairing with engineers",
              ]}
            />
            <ServiceCard
              title="Org Enablement"
              description="Build the culture around the system—so it keeps working after we ship."
              bullets={[
                "Training, docs, and onboarding content",
                "Design tokens literacy for PM/Eng",
                "Communication, demos, and change stories",
              ]}
            />
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl">
          <div className="eyelash text-neutral-500">Approach</div>
          <h2 className="text-3xl font-heading mt-2">A practical, systems-first process</h2>
          <p className="mt-4 text-neutral-600">
            My process is deliberately simple: align on outcomes, reduce ambiguity, and establish
            operational rhythms that stick.
          </p>
        </div>

        <ol className="mt-10 grid md:grid-cols-3 gap-6">
          <ProcessStep
            step="01"
            title="Assess & Align"
            text="Clarify goals, constraints, and decision-makers. Audit what exists and define target outcomes."
          />
          <ProcessStep
            step="02"
            title="Design & Prove"
            text="Create tokens, patterns, and governance that fit your org. Pilot with one team and measure impact."
          />
          <ProcessStep
            step="03"
            title="Rollout & Enable"
            text="Scale libraries, documentation, and ops. Support adoption with training and change stories."
          />
        </ol>
      </section>

      {/* INDUSTRIES + SOCIAL PROOF */}
      <section className="border-t border-neutral-200 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-10">
            <div>
              <div className="eyelash text-neutral-500">Industries</div>
              <h3 className="text-2xl font-heading mt-2">Where this shines</h3>
              <ul className="mt-4 space-y-2 text-neutral-700">
                <li>• Government platforms and high-compliance environments</li>
                <li>• Healthcare portals and enterprise patient/provider tools</li>
                <li>• B2B SaaS with multi-product complexity</li>
              </ul>
            </div>
            <div className="card rounded-xl border border-neutral-200 p-6 bg-white">
              <div className="eyelash text-neutral-500">Testimonial</div>
              <p className="mt-2 text-neutral-800">
                “Will is one of the most dedicated, creative, and technically strong designers I’ve
                worked with. He brings clarity to complex problems and gets teams moving in the same
                direction.”
              </p>
              <div className="mt-3 text-sm text-neutral-500">
                Derrick Fulkerson — Sr. Manager, Media Operations & Technology
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl">
          <div className="eyelash text-neutral-500">FAQ</div>
          <h2 className="text-3xl font-heading mt-2">Common questions</h2>
        </div>
        <div className="mt-8 space-y-6 max-w-3xl">
          <Faq
            q="Can we start with a small engagement?"
            a="Yes. Many clients begin with a 2–4 week advisory sprint to get a roadmap, governance starter, and quick wins. If we continue, that work rolls into a fixed scope or retainer."
          />
          <Faq
            q="Do you partner with engineering?"
            a="Absolutely. Systems only work when design and engineering shape them together. I coordinate with tech leads on tokens, Storybook, quality gates, and rollout."
          />
          <Faq
            q="How do you handle accessibility?"
            a="Accessibility is integrated from day one: patterns are WCAG-aware, audits are documented, and release gates ensure issues don’t regress."
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sun-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <div className="eyelash text-white/80">My last pitch</div>
          <h2 className="text-3xl md:text-4xl font-heading mt-2">
            Let’s build something scalable.
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-white/90">
            Whether it’s a new design system, a platform redesign, or advisory support,
            I help teams move from ambiguity to clarity.
          </p>
          <div className="mt-6">
            <Link
              href="/about"
              className="inline-flex items-center rounded-md bg-neutral-900 px-4 py-2 hover:bg-neutral-800 transition"
            >
              Start a conversation
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

/* ——— Small presentational helpers ——— */
function ServiceCard({
  title,
  description,
  bullets,
}: {
  title: string
  description: string
  bullets: string[]
}) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-6">
      <h3 className="text-lg font-medium">{title}</h3>
      <p className="mt-2 text-neutral-600">{description}</p>
      <ul className="mt-4 space-y-2 text-sm text-neutral-700">
        {bullets.map((b, i) => <li key={i}>• {b}</li>)}
      </ul>
    </div>
  )
}

function ProcessStep({step, title, text}:{step:string; title:string; text:string}) {
  return (
    <li className="rounded-xl border border-neutral-200 p-6 bg-white">
      <div className="text-neutral-400 text-sm">{step}</div>
      <div className="mt-1 font-medium">{title}</div>
      <p className="mt-2 text-neutral-600 text-sm">{text}</p>
    </li>
  )
}

function Faq({q, a}:{q:string; a:string}) {
  return (
    <details className="group rounded-xl border border-neutral-200 bg-white p-5 open:shadow-sm">
      <summary className="cursor-pointer list-none">
        <div className="flex items-center justify-between">
          <span className="font-medium">{q}</span>
          <span className="ml-4 inline-block h-5 w-5 rounded-full border border-neutral-300 text-neutral-500 grid place-items-center group-open:rotate-45 transition">
            +
          </span>
        </div>
      </summary>
      <p className="mt-3 text-neutral-600">{a}</p>
    </details>
  )
}
