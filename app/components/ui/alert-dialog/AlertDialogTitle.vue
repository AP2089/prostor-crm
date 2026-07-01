<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { AlertDialogTitle } from 'radix-vue';
import { cn } from '~/utils/merge';

const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>

<template>
  <AlertDialogTitle
    :class="cn('text-lg font-semibold text-white', props.class)"
  >
    <slot />
  </AlertDialogTitle>
</template>
