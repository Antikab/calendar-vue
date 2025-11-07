<script setup>
import { ref } from 'vue'
import { Toaster, toast } from 'vue-sonner'
import AppCalendar from '@/components/AppCalendar.vue'

const selected = ref('')

function onSelect(date) {
  toast.success(`Вы выбрали дату: ${date}`)
}
</script>

<template>
  <main class="min-h-screen flex flex-col items-center pt-30 bg-gray-50">
    <h1 class="mb-4 text-2xl font-bold text-gray-800">Календарь</h1>
    <AppCalendar v-model="selected" locale="ru" @select="onSelect" />
    <p v-if="selected" class="mt-4 text-gray-600 text-sm">Выбрано: {{ selected }}</p>
    <Toaster position="top-right" richColors />
  </main>
</template>
