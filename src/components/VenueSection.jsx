import { useState } from 'react'
import { useLanguage } from '../context/LanguageProvider'

export default function VenueSection() {
  const { copy, invitation, isArabic } = useLanguage()
  const images = invitation.venueImages
  const [active, setActive] = useState(0)
  const current = images[active] || images[0]

  return (
    <section id="venue" className="snap-panel flex flex-col items-center justify-center bg-transparent px-5 py-8 sm:px-8 sm:py-10">
      <div className="mx-auto w-full max-w-3xl">
        <div className="divider mb-6 animate-fade-up sm:mb-8">{copy.venueKicker}</div>

        <article
          className="overflow-hidden rounded-[28px] animate-fade-up anim-delay-1 backdrop-blur-md"
          style={{
            border: '1px solid rgba(209, 148, 153, 0.22)',
            background: 'rgba(255,255,255,0.32)',
            boxShadow: '0 22px 60px rgba(209,148,153,0.12)',
          }}
        >
          <div className="p-3 sm:p-4" style={{ background: 'rgba(255,255,255,0.18)' }}>
            <div
              className="relative overflow-hidden rounded-[22px]"
              style={{
                border: '3px double rgba(209, 148, 153, 0.45)',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.6)',
              }}
            >
              {current && (
                <img
                  src={current.src}
                  alt={copy.venueAlts[current.key]}
                  className="h-[240px] w-full object-cover sm:h-[340px]"
                />
              )}
              <div
                className="pointer-events-none absolute inset-0"
                style={{ background: 'linear-gradient(180deg, rgba(44,38,34,0.04), rgba(44,38,34,0.32))' }}
              />
              <div className="absolute bottom-4 start-5 end-5">
                <p className={`text-[10px] uppercase tracking-[0.42em] text-white/90 ${isArabic ? 'font-arabic tracking-[0.14em] text-sm normal-case' : ''}`}>
                  {copy.eventLabel}
                </p>
                <p className={`font-serif text-3xl font-light text-white sm:text-4xl ${isArabic ? 'font-arabic' : ''}`}>
                  {copy.time}
                </p>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2 sm:gap-3">
              {images.map((img, index) => {
                const on = active === index
                return (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActive(index)}
                    className="overflow-hidden rounded-[14px] focus:outline-none focus-visible:ring-2 focus-visible:ring-rose/40"
                    style={{
                      border: on ? '2px solid rgba(209,148,153,0.7)' : '2px solid rgba(209,148,153,0.22)',
                    }}
                    aria-label={copy.venueAlts[img.key]}
                    aria-pressed={on}
                  >
                    <img src={img.src} alt="" className="h-[64px] w-full object-cover sm:h-[88px]" loading="lazy" />
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-4 px-7 py-8 text-center sm:px-10">
            <h2 className={`text-ink ${isArabic ? 'font-arabic text-3xl' : 'font-serif text-3xl font-light sm:text-4xl'}`}>
              {copy.venueName}
            </h2>
            {!isArabic && (
              <p className="font-arabic text-lg text-muted" lang="ar">
                {copy.venueArabicName}
              </p>
            )}
            <p className={`text-sm leading-relaxed text-muted ${isArabic ? 'font-arabic text-base' : ''}`}>
              {copy.venueDescription}
            </p>
            <p className={`text-sm text-muted ${isArabic ? 'font-arabic' : ''}`}>{copy.venueArea}</p>
            <div className="flex justify-center pt-2">
              <a href={invitation.mapsUrl} target="_blank" rel="noopener noreferrer">
                <button type="button" className="outline-btn">
                  {copy.locationCta}
                </button>
              </a>
            </div>
            <p className="border-t pt-5 text-xs italic text-dim" style={{ borderColor: 'rgba(209,148,153,0.2)' }}>
              {copy.venueNote}
            </p>
          </div>
        </article>
      </div>
    </section>
  )
}
