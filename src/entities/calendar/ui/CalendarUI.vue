<script setup>
import { IconArrow } from '@shared'
import { useCalendar } from '../model/useCalendar'
import { isToday } from '../lib/date-utils'

const model = defineModel({ type: String, default: '' })
const emit = defineEmits(['select'])
const props = defineProps({
  locale: { type: String, default: 'ru' }
})
const { loc, title, cells, prevMonth, nextMonth, onSelect, isSelected } = useCalendar(
  model,
  emit,
  props
)
</script>

<template>
  <div
    class="w-[300px] bg-white border border-gray-400 rounded-xl shadow-sm select-none overflow-hidden"
  >
    <div
      class="flex justify-between items-center px-3 py-2 border-b border-gray-400 text-sm font-medium text-gray-700"
    >
      <button
        class="p-2 rounded hover:text-blue-500 transition-colors cursor-pointer"
        @click="prevMonth"
      >
        <IconArrow />
      </button>
      <div>{{ title }}</div>
      <button
        class="p-2 rounded hover:text-blue-500 transition-colors cursor-pointer"
        @click="nextMonth"
      >
        <IconArrow class="rotate-180" />
      </button>
    </div>

    <div
      class="grid grid-cols-7 text-center text-xs font-medium text-gray-500 border-b border-gray-400"
    >
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
