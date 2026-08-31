import { useLanguage } from '../context/LanguageProvider'

export default function Footer() {
  const { copy, isArabic } = useLanguage()
  return (
    <footer className="border-t bg-white/20 px-6 py-8 text-center backdrop-blur" style={{ borderColor: 'rgba(209,148,153,0.15)' }}>
      <p className={`text-xl font-bold text-rose ${isArabic ? 'font-arabic' : 'font-serif'}`}>{copy.namesLine}</p>
      <p className={`mt-2 text-sm font-bold uppercase tracking-[0.24em] text-ink ${isArabic ? 'font-arabic tracking-[0.1em] normal-case text-base' : ''}`}>
        {copy.dateShort}
      </p>
      <p className={`mt-4 text-[10px] uppercase tracking-[0.25em] text-dim/80 ${isArabic ? 'font-arabic tracking-[0.12em] normal-case' : ''}`}>
        {copy.closing}
      </p>
    </footer>
  )
}
