<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { AlertDialogCancel } from 'radix-vue';
import { cn } from '~/utils/merge';
import { buttonVariants } from '../button';

const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>

<template>
  <AlertDialogCancel
    :class="
      cn(
        buttonVariants({ variant: 'outline' }),
        'mt-2 border-white/10 bg-transparent text-white hover:bg-white/10 hover:text-white sm:mt-0',
        props.class
      )
    "
  >
    <slot />
  </AlertDialogCancel>
</template>
