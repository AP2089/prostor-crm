<script setup lang="ts">
import { Toaster as SonnerToaster } from 'vue-sonner';
</script>

<template>
  <SonnerToaster
    theme="dark"
    position="top-center"
    :toast-options="{
      classes: {
        toast: 'glass border border-white/10 bg-[#0a1628] text-white shadow-lg',
        description: 'text-white/60',
        actionButton: 'bg-ocean-500 text-white',
        cancelButton: 'bg-white/10 text-white',
      },
    }"
  />
</template>
