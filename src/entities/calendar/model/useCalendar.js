import { ref, computed, watch } from 'vue'

import { formatISODate, parseISODate, isSameDay, createMonthCells } from '../lib/date-utils'
import { locales } from '../lib/locales'

const useCalendar = (model, emit, props) => {
  const loc = computed(() => locales[props.locale] ?? locales.ru)

  const current = ref(parseISODate(model.value))
  const viewYear = ref(current.value.getFullYear())
  const viewMonth = ref(current.value.getMonth())

  const title = computed(() => `${loc.value.months[viewMonth.value]} ${viewYear.value}`)
  const cells = computed(() => createMonthCells(viewYear.value, viewMonth.value, loc.value.fdw))

  const prevMonth = () => {
    if (viewMonth.value === 0) {
      viewMonth.value = 11
      viewYear.value--
    } else viewMonth.value--
  }

  const nextMonth = () => {
    if (viewMonth.value === 11) {
      viewMonth.value = 0
      viewYear.value++
    } else viewMonth.value++
  }

  const onSelect = (date) => {
    const formatted = formatISODate(date)
    model.value = formatted
    emit('select', formatted)
  }

  const isSelected = (date) => isSameDay(date, parseISODate(model.value))

  watch(model, (v) => {
    const d = parseISODate(v)
    viewYear.value = d.getFullYear()
    viewMonth.value = d.getMonth()
  })

  return {
    loc,
    title,
    cells,
    prevMonth,
    nextMonth,
    onSelect,
    isSelected
  }
}

export { useCalendar }
