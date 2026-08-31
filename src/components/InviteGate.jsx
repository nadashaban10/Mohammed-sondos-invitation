import { useState } from 'react'
import { QURAN } from '../invitationData'
import { useLanguage } from '../context/LanguageProvider'
import { useMusic } from '../context/MusicProvider'

const IMG_FLORA = '/images/flora.png'
const IMG_FLOWER = '/images/flower.png'
const IMG_FLOWERRR = '/images/flowerrr.png'

function GateBackdropBotanicals() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] min-h-[100dvh] overflow-hidden" aria-hidden>
      <img src={IMG_FLORA} alt="" className="absolute -bottom-[10%] -right-[12%] w-[min(56vw,300px)] max-w-none opacity-[0.52] mix-blend-multiply motion-safe:animate-float-slow" loading="lazy" decoding="async" />
      <img src={IMG_FLOWER} alt="" className="absolute -left-[16%] top-[5%] w-[min(48vw,260px)] max-w-none opacity-[0.44] mix-blend-multiply motion-safe:animate-float-slow motion-safe:[animation-delay:1s]" loading="lazy" decoding="async" />
      <img src={IMG_FLOWERRR} alt="" className="absolute left-1/2 top-[10%] w-[min(88vw,460px)] max-w-none -translate-x-1/2 opacity-[0.28] mix-blend-multiply motion-safe:animate-float-slow motion-safe:[animation-delay:0.45s]" loading="lazy" decoding="async" />
    </div>
  )
}

export default function InviteGate({ onOpen }) {
  const { copy, invitation, isArabic } = useLanguage()
  const { play } = useMusic()
  const [opened, setOpened] = useState(false)
  const [closing, setClosing] = useState(false)

  if (opened) return null

  return (
    <div className="fixed inset-0 z-[100] min-h-[100dvh] w-full max-w-none" role="dialog" aria-modal="true" aria-label={copy.openInvite}>
      <div className="absolute inset-0 min-h-[100dvh] w-full">
        <img src={invitation.coupleImage} alt="" className="h-full min-h-[100dvh] w-full object-cover" loading="eager" />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse 85% 55% at 50% 15%, rgba(201, 169, 166, 0.12) 0%, transparent 50%),
              linear-gradient(165deg, rgba(255,253,251,0.2) 0%, rgba(250,247,244,0.35) 45%, rgba(44, 38, 34, 0.28) 100%)
            `,
          }}
        />
      </div>

      <GateBackdropBotanicals />

      <div
        className="relative z-[3] flex min-h-[100dvh] w-full flex-col overflow-y-auto overscroll-y-contain transition-all duration-[700ms] ease-out"
        style={closing ? { opacity: 0, transform: 'scale(0.98) translateY(12px)' } : { opacity: 1 }}
      >
        <div
          className="relative flex min-h-[100dvh] w-full flex-1 flex-col justify-center px-6 pt-[max(4.75rem,calc(env(safe-area-inset-top)+3.5rem))] pb-[max(5.5rem,calc(env(safe-area-inset-bottom)+4.25rem))] text-ink backdrop-blur-xl sm:px-10"
          style={{
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.62) 0%, rgba(250, 247, 244, 0.5) 100%)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.35)',
          }}
        >
          <div
            className="pointer-events-none absolute left-6 right-6 top-0 h-px sm:left-10 sm:right-10"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(176, 137, 137, 0.45), transparent)' }}
            aria-hidden
          />

          <blockquote className="mx-auto mt-2 max-w-xl text-center font-arabic animate-fade-up anim-delay-1" dir="rtl" lang="ar" style={{ color: '#8a6a6a' }}>
            <p className="mb-3 text-[clamp(0.8rem,2.9vw,1.02rem)] leading-relaxed tracking-wide">{QURAN.basmala}</p>
            <p className="text-[clamp(0.72rem,2.6vw,0.95rem)] leading-[1.78]">{QURAN.verse}</p>
          </blockquote>

          <p className="mx-auto mt-3 max-w-md text-center font-serif text-[11px] italic leading-relaxed sm:text-[12px] animate-fade-up anim-delay-2" style={{ color: '#6b6058' }}>
            {QURAN.verseEn}
          </p>
          <p className="mt-4 text-center text-[10px] uppercase tracking-[0.38em] animate-fade-up anim-delay-1" style={{ color: '#8a6a6a' }}>
            {isArabic ? QURAN.ref : QURAN.refEn}
          </p>

          <div className="mx-auto mt-3 h-px w-20" style={{ background: 'linear-gradient(90deg, transparent, rgba(176, 137, 137, 0.5), transparent)' }} />

          <div
            className={`mx-auto mt-4 max-w-[min(100%,24rem)] text-center leading-none animate-fade-up anim-delay-3 ${isArabic ? 'font-arabic' : 'font-script'}`}
            style={{ fontSize: 'clamp(44px, 9.5vw, 72px)', color: '#8a6a6a' }}
          >
            {copy.namesScript}
          </div>

          <div className="mt-5 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.36em] animate-fade-up anim-delay-4" style={{ color: '#8a7e76' }}>
            <span className="h-px w-8" style={{ background: 'linear-gradient(to right, transparent, rgba(176, 137, 137, 0.55))' }} />
            <span className={`text-ink ${isArabic ? 'font-arabic tracking-[0.12em] normal-case' : ''}`}>{copy.dateShort}</span>
            <span className="h-px w-8" style={{ background: 'linear-gradient(to left, transparent, rgba(176, 137, 137, 0.55))' }} />
          </div>

          <p className={`mt-4 text-center text-[11px] uppercase tracking-[0.32em] animate-fade-up anim-delay-4 ${isArabic ? 'font-arabic tracking-[0.12em] normal-case' : ''}`} style={{ color: '#6b6058' }}>
            {copy.venueArea}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <button
              type="button"
              className="group relative isolate overflow-hidden rounded-full px-10 py-4 font-sans text-[10px] font-medium uppercase tracking-[0.38em] shadow-[inset_0_1px_0_rgba(255,255,255,0.65),0_8px_32px_rgba(44,38,34,0.08)] backdrop-blur-md transition-all duration-500 hover:-translate-y-0.5 sm:px-14 sm:text-[11px]"
              style={{
                color: '#8a6a6a',
                border: '1.5px solid rgba(176, 137, 137, 0.55)',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0.18))',
              }}
              onClick={() => {
                if (closing) return
                play()
                setClosing(true)
                window.setTimeout(() => {
                  setOpened(true)
                  onOpen?.()
                }, 680)
              }}
            >
              <span className={`relative flex items-center justify-center gap-3 sm:gap-4 ${isArabic ? 'font-arabic tracking-[0.12em] text-sm normal-case' : ''}`}>
                <span className="h-px w-7" style={{ background: 'linear-gradient(to right, transparent, rgba(176,137,137,0.8))' }} aria-hidden />
                <span className="whitespace-nowrap">{copy.openInvite}</span>
                <span className="h-px w-7" style={{ background: 'linear-gradient(to left, transparent, rgba(176,137,137,0.8))' }} aria-hidden />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
