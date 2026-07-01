<script setup lang="ts">
import type { Order } from '~/types/order';

const open = defineModel<boolean>('open', { default: false });

defineProps<{
  order: Order | null;
}>();

const { t } = useI18n();
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent v-if="order" class="max-w-5xl">
      <DialogHeader>
        <DialogTitle>
          {{ t('orders.detailsTitle', { number: order.orderNumber }) }}
        </DialogTitle>
      </DialogHeader>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
        <section class="space-y-4">
          <h3 class="text-xs text-white/40 uppercase tracking-wider">
            {{ t('orders.number') }}
          </h3>
          <div>
            <p class="text-xs text-white/40 uppercase tracking-wider mb-1">
              {{ t('orders.status') }}
            </p>
            <p class="text-white">
              {{ t(`status.${order.status ?? 'new'}`) }}
            </p>
          </div>
          <div>
            <p class="text-xs text-white/40 uppercase tracking-wider mb-1">
              {{ t('orders.date') }}
            </p>
            <p class="text-white">{{ formatDate(order.createdAt) }}</p>
          </div>
          <div>
            <p class="text-xs text-white/40 uppercase tracking-wider mb-1">
              {{ t('orders.total') }}
            </p>
            <p class="text-white font-semibold">
              {{ formatPrice(order.total) }}
            </p>
          </div>
        </section>

        <section class="space-y-4">
          <h3 class="text-xs text-white/40 uppercase tracking-wider">
            {{ t('orders.customer') }}
          </h3>
          <dl class="space-y-3">
            <div>
              <dt class="text-white/40 text-xs">{{ t('orders.name') }}</dt>
              <dd class="text-white mt-0.5">{{ order.customer.name }}</dd>
            </div>
            <div>
              <dt class="text-white/40 text-xs">{{ t('orders.phone') }}</dt>
              <dd class="text-white mt-0.5">{{ order.customer.phone }}</dd>
            </div>
            <div>
              <dt class="text-white/40 text-xs">{{ t('orders.email') }}</dt>
              <dd class="text-white mt-0.5">{{ order.customer.email }}</dd>
            </div>
            <div>
              <dt class="text-white/40 text-xs">{{ t('orders.delivery') }}</dt>
              <dd class="text-white mt-0.5">{{ order.customer.delivery }}</dd>
            </div>
            <div>
              <dt class="text-white/40 text-xs">{{ t('orders.address') }}</dt>
              <dd class="text-white mt-0.5">{{ order.customer.address }}</dd>
            </div>
            <div v-if="order.customer.comment">
              <dt class="text-white/40 text-xs">{{ t('orders.comment') }}</dt>
              <dd class="text-white mt-0.5">{{ order.customer.comment }}</dd>
            </div>
          </dl>
        </section>

        <section class="space-y-4 min-w-0">
          <h3 class="text-xs text-white/40 uppercase tracking-wider">
            {{ t('orders.items') }}
          </h3>
          <div class="space-y-2 max-h-64 overflow-y-auto pr-1">
            <div
              v-for="item in order.items"
              :key="item.boardId"
              class="rounded-lg border border-white/10 bg-white/5 px-3 py-2.5"
            >
              <p class="text-white font-medium">{{ item.boardName }}</p>
              <p class="text-xs text-white/40 mt-0.5">
                {{ item.boardSubtitle }}
              </p>
              <p class="text-xs text-white/50 mt-1">
                {{ item.quantity }} × {{ formatPrice(item.price) }}
              </p>
              <p class="text-white font-medium mt-1.5">
                {{ formatPrice(item.total) }}
              </p>
            </div>
          </div>
        </section>
      </div>

      <div class="flex justify-end pt-2">
        <DialogClose>{{ t('orders.close') }}</DialogClose>
      </div>
    </DialogContent>
  </Dialog>
</template>
