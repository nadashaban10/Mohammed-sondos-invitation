import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useLanguage } from '../context/LanguageProvider'

function invitationUrl() {
  const { origin, pathname } = window.location
  return `${origin}${pathname}`
}

function buildSharePayload(copy) {
  const url = invitationUrl()
  const title = `${copy.namesLine} — ${copy.eventLabel}`
  const details = [copy.weekday, copy.date, copy.time].filter(Boolean).join(' · ')
  const place = [copy.venueName, copy.venueArea].filter(Boolean).join(' — ')
  const text = [copy.namesLine, copy.inviteLine, details, place].filter(Boolean).join('\n')
  return { title, text, url }
}

export default function ShareButton() {
  const { copy, isArabic } = useLanguage()
  const [toast, setToast] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!toast) return undefined
    const id = window.setTimeout(() => setToast(''), 2600)
    return () => window.clearTimeout(id)
  }, [toast])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onPointer = (event) => {
      if (!rootRef.current?.contains(event.target)) setMenuOpen(false)
    }
    const onKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const copyLink = async (url) => {
    await navigator.clipboard.writeText(url)
    setToast(copy.shareCopied)
    setMenuOpen(false)
  }

  const openWhatsApp = (payload) => {
    const message = `${payload.title}\n\n${payload.text}\n\n${payload.url}`
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    setMenuOpen(false)
  }

  const handleShare = async () => {
    const payload = buildSharePayload(copy)
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: payload.title,
          text: payload.text,
          url: payload.url,
        })
        return
      } catch (err) {
        if (err?.name === 'AbortError') return
      }
    }
    setMenuOpen((open) => !open)
  }

  const payload = buildSharePayload(copy)

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="outline-btn inline-flex min-h-11 items-center gap-2.5"
        onClick={handleShare}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
      >
        <EnvelopeIcon />
        {copy.shareCta}
      </button>

      {menuOpen ? (
        <div className="share-menu" role="menu" aria-label={copy.shareCta}>
          <button
            type="button"
            role="menuitem"
            className="share-menu-item"
            onClick={() => copyLink(payload.url).catch(() => {})}
          >
            {copy.shareCopyLink}
          </button>
          <button type="button" role="menuitem" className="share-menu-item" onClick={() => openWhatsApp(payload)}>
            {copy.shareWhatsApp}
          </button>
        </div>
      ) : null}

      {createPortal(
        <div className={`invite-toast ${toast ? 'show' : ''} ${isArabic ? 'font-arabic' : 'font-serif'}`} role="status" aria-live="polite">
          {toast}
        </div>,
        document.body,
      )}
    </div>
  )
}

function EnvelopeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.25" y="6.25" width="17.5" height="11.5" rx="1.4" stroke="currentColor" strokeWidth="1.25" />
      <path d="M4.2 7.1 12 13.1l7.8-6" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  )
}
