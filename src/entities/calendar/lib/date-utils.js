const pad2 = (n) => String(n).padStart(2, '0')

const formatISODate = (date) =>
  `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`

const parseISODate = (v) => {
  if (!v || typeof v !== 'string') return new Date()
  const [y, m, d] = v.split('-').map(Number)
  return new Date(y, m - 1, d)
}

const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate()

const isToday = (date) => isSameDay(date, new Date())

const createMonthCells = (year, month, firstDayOfWeek = 1) => {
  const cells = []
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const startOffset = (first.getDay() - firstDayOfWeek + 7) % 7
  for (let i = 0; i < startOffset; i++) cells.push({ date: null })
  for (let d = 1; d <= last.getDate(); d++) cells.push({ date: new Date(year, month, d) })
  while (cells.length % 7 !== 0) cells.push({ date: null })
  return cells
}

export { formatISODate, parseISODate, isSameDay, isToday, createMonthCells }
