<script setup>
import { Toaster } from 'vue-sonner'

import { CalendarWidget } from '@widgets/calendar-widget'
</script>

<template>
  <main class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <Toaster position="top-right" richColors />
    <CalendarWidget />
  </main>
</template>
