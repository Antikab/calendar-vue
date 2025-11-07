<script setup>
defineProps({ dir: { type: String, default: 'left' } })
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="[
      'w-4 h-4  transition-colors duration-150 pointer-events-none',
      dir === 'right' ? 'rotate-180' : ''
    ]"
  >
    <path d="M15 18L9 12l6-6" />
  </svg>
</template>
