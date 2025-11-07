<script setup>
import { ref, computed, watch } from 'vue'
import IconArrow from './icons/IconArrow.vue'
import { formatISODate, parseISODate, isSameDay, isToday, createMonthCells } from '@/shared/date'

const model = defineModel({ type: String, default: '' })
const emit = defineEmits(['select'])

const props = defineProps({
  locale: { type: String, default: 'ru' }
})

const locales = {
  ru: {
    months: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
      'Сентябрь',
      'Октябрь',
      'Ноябрь',
      'Декабрь'
    ],
    weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    fdw: 1
  },
  en: {
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ],
    weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    fdw: 0
  }
}

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
  const v = formatISODate(date)
  model.value = v
  emit('select', v)
}
const isSelected = (date) => isSameDay(date, parseISODate(model.value))

watch(model, (v) => {
  const d = parseISODate(v)
  viewYear.value = d.getFullYear()
  viewMonth.value = d.getMonth()
})
</script>

<template>
  <div class="w-[300px] bg-white border rounded-xl shadow-sm select-none overflow-hidden">
    <div
      class="flex justify-between items-center px-3 py-2 border-b text-sm font-medium text-gray-700"
    >
      <button class="p-2 rounded hover:text-blue-500 transition-colors" @click="prevMonth">
        <IconArrow dir="left" />
      </button>
      <div>{{ title }}</div>
      <button class="p-2 rounded hover:text-blue-500 transition-colors" @click="nextMonth">
        <IconArrow dir="right" />
      </button>
    </div>

    <div class="grid grid-cols-7 text-center text-xs font-medium text-gray-500 border-b">
      <div v-for="(d, i) in loc.weekdays" :key="i" class="py-1">{{ d }}</div>
    </div>

    <div class="grid grid-cols-7 gap-0.5 p-0.5 text-center">
      <button
        v-for="(cell, i) in cells"
        :key="i"
        class="aspect-square flex items-center justify-center text-sm rounded-md transition"
        :class="{
          'ring-2 ring-blue-500': cell.date && isSelected(cell.date),
          'ring-1 ring-blue-300': cell.date && isToday(cell.date) && !isSelected(cell.date),
          'text-gray-400': !cell.date,
          'hover:bg-gray-100': cell.date
        }"
        :disabled="!cell.date"
        @click="cell.date && onSelect(cell.date)"
      >
        {{ cell.date ? cell.date.getDate() : '' }}
      </button>
    </div>
  </div>
</template>
