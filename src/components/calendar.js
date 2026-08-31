function pad(n) {
  return String(n).padStart(2, '0')
}
function toICSDateUTC(date) {
  const d = new Date(date)
  return (
    d.getUTCFullYear() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    'T' +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    'Z'
  )
}
export function buildGoogleCalendarUrl({ title, start, end, location, description }) {
  const base = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
  const params = new URLSearchParams()
  params.set('text', title)
  params.set('dates', `${toICSDateUTC(start)}/${toICSDateUTC(end)}`)
  if (location) params.set('location', location)
  if (description) params.set('details', description)
  return `${base}&${params.toString()}`
}
