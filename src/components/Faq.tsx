import { useState } from 'react'
import { useI18n } from '../i18n/I18nContext'
import Reveal from './Reveal'

const FAQ_KEYS = [
  ['faq1Q', 'faq1A'],
  ['faq2Q', 'faq2A'],
  ['faq3Q', 'faq3A'],
  ['faq4Q', 'faq4A'],
  ['faq5Q', 'faq5A'],
  ['faq6Q', 'faq6A'],
  ['faq7Q', 'faq7A'],
  ['faq8Q', 'faq8A'],
] as const

export default function Faq() {
  const { t } = useI18n()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="relative py-20 sm:py-28" style={{ backgroundColor: 'var(--color-surface)' }}>
      <div className="geo-dots pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden="true" />
      <div className="relative mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--color-text-secondary)' }}>{t.faqEyebrow}</span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl" style={{ color: 'var(--color-text)' }}>{t.faqTitle}</h2>
            <p className="mt-4 text-lg" style={{ color: 'var(--color-text-secondary)' }}>{t.faqSubtitle}</p>
          </div>
        </Reveal>

        <div className="mt-12 space-y-3">
          {FAQ_KEYS.map(([qKey, aKey], i) => {
            const isOpen = openIndex === i
            return (
              <Reveal key={qKey} delay={i * 80}>
                <div className="card rounded-xl overflow-hidden">
                  <button
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-right"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-bold" style={{ color: 'var(--color-text)' }}>{t[qKey as keyof typeof t] as string}</span>
                    <span className="text-xl leading-none" style={{ color: 'var(--color-text-secondary)' }}>{isOpen ? '−' : '+'}</span>
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ maxHeight: isOpen ? '200px' : '0px', opacity: isOpen ? 1 : 0 }}
                  >
                    <p className="px-6 pb-5 text-sm leading-[1.9]" style={{ color: 'var(--color-text-secondary)' }}>{t[aKey as keyof typeof t] as string}</p>
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
