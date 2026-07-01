<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { DialogClose } from 'radix-vue';
import { cn } from '~/utils/merge';
import { buttonVariants } from '../button';

const props = defineProps<{ class?: HTMLAttributes['class'] }>();
</script>

<template>
  <DialogClose
    :class="
      cn(
        buttonVariants({ variant: 'outline' }),
        'border-white/10 bg-transparent text-white hover:bg-white/10 hover:text-white',
        props.class
      )
    "
  >
    <slot />
  </DialogClose>
</template>
