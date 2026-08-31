import { useCountdown } from './useCountdown'
import { buildGoogleCalendarUrl } from './calendar'
import WeddingCalendar from './WeddingCalendar'
import Petals from './Petals'
import { useLanguage } from '../context/LanguageProvider'

function CountCell({ label, value }) {
  return (
    <div className="countdown-cell">
      <div className="font-serif text-rose" style={{ fontSize: 'clamp(26px, 6vw, 38px)', fontWeight: 300 }}>
        {String(value).padStart(2, '0')}
      </div>
      <div className="mt-1 text-[9px] uppercase tracking-[0.32em] text-dim sm:text-[10px]">{label}</div>
    </div>
  )
}

export default function Hero() {
  const { copy, invitation, isArabic } = useLanguage()
  const start = new Date(invitation.weddingDate)
  const end = new Date(invitation.endDate)
  const { d, h, m, s } = useCountdown(start.getTime())
  const googleUrl = buildGoogleCalendarUrl({
    title: `${copy.namesLine} — ${copy.eventLabel}`,
    start,
    end,
    location: `${copy.venueName} — ${copy.venueArea}`,
    description: copy.inviteLine,
  })

  return (
    <section id="hero" className="snap-panel relative flex flex-col items-center justify-center bg-transparent px-5 pb-12 pt-[max(4.75rem,calc(env(safe-area-inset-top)+3.5rem))] sm:px-8 sm:pb-16 sm:pt-20">
      <Petals count={9} className="z-0 opacity-[0.5] motion-safe:animate-fade-in" />

      <div className="relative z-[1] flex w-full flex-col items-center justify-center">
        <p className={`mb-6 text-center text-[10px] uppercase tracking-[0.48em] text-rose sm:mb-8 animate-fade-in ${isArabic ? 'font-arabic tracking-[0.16em] text-sm normal-case' : ''}`}>
          {copy.kicker}
        </p>

        <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-14">
          <div className="relative flex justify-center animate-fade-up lg:justify-end">
            <div className="relative w-full max-w-[380px]">
              <span className="frame-ornament top-0 left-0 rounded-tl-[4px] border-l-2 border-t-2" aria-hidden />
              <span className="frame-ornament top-0 right-0 rounded-tr-[4px] border-r-2 border-t-2" aria-hidden />
              <span className="frame-ornament bottom-0 left-0 rounded-bl-[4px] border-b-2 border-l-2" aria-hidden />
              <span className="frame-ornament bottom-0 right-0 rounded-br-[4px] border-b-2 border-r-2" aria-hidden />

              <div
                className="relative rounded-[8px] p-[10px] animate-float-slow sm:p-3"
                style={{
                  background: 'linear-gradient(145deg, rgba(209,148,153,0.12), rgba(201,184,150,0.15))',
                  boxShadow: '0 28px 80px rgba(209,148,153,0.16)',
                }}
              >
                <div className="rounded-[6px] p-[6px]" style={{ border: '2px solid rgba(209, 148, 153, 0.55)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.55)' }}>
                  <div className="relative overflow-hidden rounded-[4px]">
                    <img
                      src={invitation.coupleImage}
                      alt={copy.coupleAlt}
                      className="aspect-[3/4] w-full object-cover object-[center_42%] transition-transform duration-[1.2s] ease-out hover:scale-[1.02]"
                      loading="eager"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`space-y-7 text-center animate-fade-up anim-delay-2 lg:text-start`}>
            <h1
              className={`leading-[1.05] text-ink ${isArabic ? 'font-arabic' : 'font-serif'}`}
              style={{ fontSize: 'clamp(40px, 7vw, 64px)', fontWeight: 300 }}
            >
              {copy.nameFirst}{' '}
              <span className={`text-rose italic ${isArabic ? 'not-italic' : ''}`}>&amp;</span> {copy.nameSecond}
            </h1>

            <p className={`text-lg text-muted tracking-wide sm:text-xl ${isArabic ? 'font-arabic' : 'font-serif italic'}`}>
              {copy.inviteLine}
            </p>

            <div className="space-y-1.5">
              <p className={`font-serif text-lg tracking-[0.1em] text-ink sm:text-lg ${isArabic ? 'font-arabic tracking-normal' : ''}`}>
                {copy.weekday} · {copy.date}
              </p>
              <p className={`text-sm tracking-[0.22em] text-dim ${isArabic ? 'font-arabic tracking-[0.12em] normal-case text-base' : 'uppercase'}`}>
                {copy.time} · {copy.venueName}
              </p>
            </div>

            <div>
              <p className={`mb-3 text-[10px] uppercase tracking-[0.4em] text-rose ${isArabic ? 'font-arabic tracking-[0.14em] text-sm normal-case' : ''}`}>
                {copy.countdown}
              </p>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:justify-start">
                <CountCell label={copy.days} value={d} />
                <CountCell label={copy.hours} value={h} />
                <CountCell label={copy.minutes} value={m} />
                <CountCell label={copy.seconds} value={s} />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-1 lg:justify-start">
              <a href={googleUrl} target="_blank" rel="noreferrer">
                <button type="button" className="outline-btn">
                  {copy.addCalendar}
                </button>
              </a>
            </div>

            <div className="mx-auto max-w-md pt-2 lg:mx-0 lg:max-w-none">
              <WeddingCalendar date={start} label={copy.calendarLabel} saveLabel={copy.saveTheDate} arabic={isArabic} />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-[2] flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-dim opacity-80">
        <span className={isArabic ? 'font-arabic tracking-[0.12em] normal-case' : ''}>{copy.scrollHint}</span>
        <span className="text-lg leading-none text-rose/70 motion-safe:animate-bounce">↓</span>
      </div>
    </section>
  )
}
