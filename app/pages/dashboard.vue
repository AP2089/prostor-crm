<script setup lang="ts">
const { t } = useI18n();
const ordersStore = useOrdersStore();

const formatPrice = (value: number) =>
  new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(value);

const stats = computed(() => {
  const orders = ordersStore.orders ?? [];
  const status = (o: (typeof orders)[number]) => o.status ?? 'new';
  return {
    total: orders.length,
    new: orders.filter((o) => status(o) === 'new').length,
    paid: orders.filter((o) => status(o) === 'paid').length,
    delivery: orders.filter((o) => status(o) === 'delivery').length,
    cancelled: orders.filter((o) => status(o) === 'cancelled').length,
    revenue: orders
      .filter((o) => status(o) === 'paid')
      .reduce((s, o) => s + o.total, 0),
  };
});

const cards = computed(() => [
  {
    label: t('dashboard.total'),
    value: stats.value.total,
    accent: 'border-t-white/20',
    icon: '📋',
  },
  {
    label: t('dashboard.new'),
    value: stats.value.new,
    accent: 'border-t-ocean-500',
    icon: '🆕',
  },
  {
    label: t('dashboard.paid'),
    value: stats.value.paid,
    accent: 'border-t-green-500',
    icon: '✅',
  },
  {
    label: t('dashboard.delivery'),
    value: stats.value.delivery,
    accent: 'border-t-yellow-500',
    icon: '🚚',
  },
  {
    label: t('dashboard.cancelled'),
    value: stats.value.cancelled,
    accent: 'border-t-red-500',
    icon: '❌',
  },
  {
    label: t('dashboard.revenue'),
    value: formatPrice(stats.value.revenue),
    accent: 'border-t-ocean-400',
    icon: '💰',
  },
]);
</script>

<template>
  <div>
    <h1 class="font-display font-bold text-2xl tracking-wide text-white mb-8">
      {{ t('dashboard.title') }}
    </h1>

    <Loader v-if="ordersStore.pendingOrders" />

    <div v-else class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      <div
        v-for="card in cards"
        :key="card.label"
        class="glass border border-white/10 border-t-2 rounded-xl p-5"
        :class="card.accent"
      >
        <div class="text-xl mb-3">{{ card.icon }}</div>
        <p class="text-xs text-white/50 uppercase tracking-wider leading-tight">
          {{ card.label }}
        </p>
        <p class="text-2xl font-bold text-white mt-1.5 tracking-tight">
          {{ card.value }}
        </p>
      </div>
    </div>
  </div>
</template>
