<script setup>
import { ref } from 'vue'
import { toast } from 'vue-sonner'

import LocaleSelect from '@features/locale-select/ui/LocaleSelect.vue'
import Calendar from '@entities/calendar/ui/Calendar.vue'

const selected = ref('')
const locale = ref('ru')

const onSelect = (date) => {
  toast.success(`Вы выбрали дату: ${date}`)
}
</script>

<template>
  <main class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <div class="flex items-center gap-3 mb-4">
      <h1 class="text-2xl font-bold text-gray-800">Календарь</h1>
      <LocaleSelect v-model="locale" />
    </div>

    <Calendar v-model="selected" :locale="locale" @select="onSelect" />

    <p v-if="selected" class="mt-4 text-gray-600 text-sm">Выбрано: {{ selected }}</p>
  </main>
</template>
