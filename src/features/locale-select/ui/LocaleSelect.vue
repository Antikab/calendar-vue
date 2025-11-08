<script setup>
import IconArrow from '@shared/ui/IconArrow.vue'

const model = defineModel({
  type: String,
  default: 'ru'
})

const options = [
  { value: 'ru', iconFlag: '🇷🇺' },
  { value: 'en', iconFlag: '🇬🇧' }
]
</script>

<template>
  <div class="relative flex items-center group">
    <select
      v-model="model"
      class="pl-3 pr-8 py-1.5 text-sm bg-gray-100 border border-gray-400 hover:border-blue-500 rounded-md focus:outline-none hover:ring-2 hover:ring-blue-300 transition-all cursor-pointer appearance-none"
    >
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.iconFlag }}
      </option>
    </select>
    <div class="absolute right-2 pointer-events-none group-hover:text-blue-500">
      <IconArrow class="rotate-270" />
    </div>
  </div>
</template>
