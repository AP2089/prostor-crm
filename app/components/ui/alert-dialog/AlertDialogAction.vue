<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { AlertDialogAction } from 'radix-vue';
import { cn } from '~/utils/merge';
import { buttonVariants } from '../button';

const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>

<template>
  <AlertDialogAction
    :class="cn(buttonVariants({ variant: 'destructive' }), props.class)"
  >
    <slot />
  </AlertDialogAction>
</template>
