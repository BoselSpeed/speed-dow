import { useState } from 'react'
import { useI18n } from '../i18n/I18nContext'
import Reveal from './Reveal'

export default function Faq() {
  const { t } = useI18n()
  const [openIdx, setOpenIdx] = useState<number | null>(0)

  const faqs = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A },
    { q: t.faq5Q, a: t.faq5A },
    { q: t.faq6Q, a: t.faq6A },
    { q: t.faq7Q, a: t.faq7A },
    { q: t.faq8Q, a: t.faq8A },
  ]

  return (
    <section id="faq" className="scroll-mt-24 py-20" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-primary)' }}>{t.faqEyebrow}</span>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl" style={{ color: 'var(--color-text)' }}>{t.faqTitle}</h2>
            <p className="mt-4 text-lg" style={{ color: 'var(--color-text-secondary)' }}>{t.faqSubtitle}</p>
          </div>
        </Reveal>

        <div className="mt-12 space-y-3">
          {faqs.map((f, i) => {
            const open = openIdx === i
            return (
              <Reveal key={i} delay={i * 40}>
                <div className="card overflow-hidden rounded-2xl">
                  <button
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    onClick={() => setOpenIdx(open ? null : i)}
                    aria-expanded={open}
                  >
                    <span className="text-base font-bold" style={{ color: 'var(--color-text)' }}>{f.q}</span>
                    <span
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-lg transition-transform"
                      style={{ color: 'var(--color-primary)', backgroundColor: 'var(--color-primary-soft)', transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: open ? 300 : 0 }}
                  >
                    <p className="px-5 pb-4 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{f.a}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
