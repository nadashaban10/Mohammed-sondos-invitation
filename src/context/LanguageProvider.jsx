import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { INVITATION, detectBrowserLanguage } from '../invitationData'

const LanguageContext = createContext(null)
const STORAGE_KEY = 'invite-lang'

function readStoredLang() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'ar' || stored === 'en') return stored
  } catch {
    /* ignore */
  }
  return detectBrowserLanguage()
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    const initial = readStoredLang()
    if (typeof document !== 'undefined') {
      document.documentElement.lang = initial
      document.documentElement.dir = initial === 'ar' ? 'rtl' : 'ltr'
    }
    return initial
  })

  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    document.documentElement.style.colorScheme = 'light'
    document.title = INVITATION.copy[lang].documentTitle
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const setLang = useCallback((next) => {
    setLangState(next === 'ar' ? 'ar' : 'en')
  }, [])

  const toggleLang = useCallback(() => {
    setLangState((current) => (current === 'ar' ? 'en' : 'ar'))
  }, [])

  const value = useMemo(() => {
    const copy = INVITATION.copy[lang]
    return {
      lang,
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      isArabic: lang === 'ar',
      setLang,
      toggleLang,
      copy,
      invitation: INVITATION,
    }
  }, [lang, setLang, toggleLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
