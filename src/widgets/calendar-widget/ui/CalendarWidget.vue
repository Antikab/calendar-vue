<script setup>
import { ref } from 'vue'
import { toast } from 'vue-sonner'

import { LocaleSelect } from '@features/locale-select'
import { CalendarUI } from '@entities/calendar'

const selected = ref('')
const locale = ref('ru')

const onSelect = (date) => {
  toast.success(`Вы выбрали дату: ${date}`)
}
</script>

<template>
  <div class="flex items-center gap-3 mb-4">
    <h1 class="text-2xl font-bold text-gray-800">Календарь</h1>
    <LocaleSelect v-model="locale" />
  </div>

  <CalendarUI v-model="selected" :locale="locale" @select="onSelect" />

  <p v-if="selected" class="mt-4 text-gray-600 text-sm">Выбрано: {{ selected }}</p>
</template>
