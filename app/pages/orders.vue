<script setup lang="ts">
import type { Order, OrderStatus } from '~/types/order';
import { toast } from 'vue-sonner';

const { t } = useI18n();
const ordersStore = useOrdersStore();
const deleteDialogOpen = ref(false);
const orderToDelete = ref<number | null>(null);
const detailsDialogOpen = ref(false);
const selectedOrder = ref<Order | null>(null);

const ORDER_STATUSES: OrderStatus[] = ['new', 'paid', 'delivery', 'cancelled'];

const STATUS_CLASS: Record<OrderStatus, string> = {
  new: 'bg-ocean-500/20 text-ocean-300 border-ocean-500/30',
  paid: 'bg-green-500/20 text-green-300 border-green-500/30',
  delivery: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  cancelled: 'bg-red-500/20 text-red-300 border-red-500/30',
};

const statusClass = (s: string | undefined) =>
  STATUS_CLASS[(s as OrderStatus) ?? 'new'] ?? STATUS_CLASS.new;

const onStatusChange = async (id: number, event: Event) =>
  ordersStore.updateStatus(
    id,
    (event.target as HTMLSelectElement).value as OrderStatus
  );

const openDeleteDialog = (id: number) => {
  orderToDelete.value = id;
  deleteDialogOpen.value = true;
};

const openDetailsDialog = (order: Order) => {
  selectedOrder.value = order;
  detailsDialogOpen.value = true;
};

const confirmDelete = async () => {
  const id = orderToDelete.value;

  if (id === null) return;

  await ordersStore.deleteOrder(id);

  orderToDelete.value = null;
};

watch(
  () => ordersStore.errorOrderUpdate,
  (newVal) => {
    if (newVal) {
      toast.error(t('errors.orderStatus'));
    }
  }
);

watch(
  () => ordersStore.errorOrderDelete,
  (newVal) => {
    if (newVal) {
      toast.error(t('errors.orderDelete'));
    }
  }
);
</script>

<template>
  <div>
    <h1 class="font-display font-bold text-2xl tracking-wide text-white mb-8">
      {{ t('orders.title') }}
    </h1>

    <Loader v-if="ordersStore.pendingOrders" />

    <div v-else class="glass border border-white/10 rounded-xl overflow-hidden">
      <table class="w-full text-sm">
        <thead class="bg-white/5 border-b border-white/10">
          <tr>
            <th
              class="text-left px-4 py-3 text-xs font-medium text-white/50 uppercase tracking-wider"
            >
              {{ t('orders.number') }}
            </th>
            <th
              class="text-left px-4 py-3 text-xs font-medium text-white/50 uppercase tracking-wider"
            >
              {{ t('orders.customer') }}
            </th>
            <th
              class="text-left px-4 py-3 text-xs font-medium text-white/50 uppercase tracking-wider"
            >
              {{ t('orders.items') }}
            </th>
            <th
              class="text-left px-4 py-3 text-xs font-medium text-white/50 uppercase tracking-wider"
            >
              {{ t('orders.total') }}
            </th>
            <th
              class="text-left px-4 py-3 text-xs font-medium text-white/50 uppercase tracking-wider"
            >
              {{ t('orders.status') }}
            </th>
            <th
              class="text-left px-4 py-3 text-xs font-medium text-white/50 uppercase tracking-wider"
            >
              {{ t('orders.date') }}
            </th>
            <th
              class="text-left px-4 py-3 text-xs font-medium text-white/50 uppercase tracking-wider"
            >
              {{ t('orders.actions') }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-white/5">
          <tr
            v-for="order in ordersStore.orders ?? []"
            :key="order.id"
            class="hover:bg-white/5 transition-colors duration-150"
          >
            <td class="px-4 py-3 font-mono text-xs text-white/40">
              {{ order.orderNumber }}
            </td>
            <td class="px-4 py-3">
              <p class="font-medium text-white">{{ order.customer.name }}</p>
              <p class="text-xs text-white/40 mt-0.5">
                {{ order.customer.phone }}
              </p>
            </td>
            <td class="px-4 py-3">
              <p
                v-for="item in order.items"
                :key="item.boardId"
                class="text-xs text-white/70"
              >
                {{ item.boardName }} × {{ item.quantity }}
              </p>
            </td>
            <td class="px-4 py-3 font-semibold text-white">
              {{ formatPrice(order.total) }}
            </td>
            <td class="px-4 py-3">
              <select
                :key="`${order.id}-${order.status ?? 'new'}`"
                :value="order.status ?? 'new'"
                class="text-xs rounded-md px-2.5 py-1 border bg-transparent focus:outline-none cursor-pointer font-medium transition-colors"
                :class="statusClass(order.status)"
                :disabled="ordersStore.pendingOrderUpdate"
                @change="onStatusChange(order.id, $event)"
              >
                <option
                  v-for="status in ORDER_STATUSES"
                  :key="status"
                  :value="status"
                  class="bg-[#0a1628] text-white"
                >
                  {{ t(`status.${status}`) }}
                </option>
              </select>
            </td>
            <td class="px-4 py-3 text-xs text-white/40">
              {{ formatDate(order.createdAt) }}
            </td>
            <td class="px-4 py-3">
              <div class="flex gap-2">
                <button
                  class="text-xs px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 transition-colors font-medium"
                  @click="openDetailsDialog(order)"
                >
                  {{ t('orders.deleteDetails') }}
                </button>
                <button
                  class="text-xs px-2.5 py-1 rounded-md bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30 transition-colors font-medium"
                  @click="openDeleteDialog(order.id)"
                >
                  {{ t('orders.delete') }}
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div
        v-if="!ordersStore.orders?.length"
        class="text-center py-16 text-white/30"
      >
        {{ t('orders.empty') }}
      </div>
    </div>

    <AlertDialog v-model:open="deleteDialogOpen">
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{{ t('orders.delete') }}</AlertDialogTitle>
          <AlertDialogDescription>
            {{ t('orders.confirmDelete') }}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            :disabled="ordersStore.pendingOrderDelete"
            @click="orderToDelete = null"
          >
            {{ t('orders.cancel') }}
          </AlertDialogCancel>
          <AlertDialogAction
            :disabled="ordersStore.pendingOrderDelete"
            @click="confirmDelete"
          >
            <IconSpinner
              v-if="ordersStore.pendingOrderDelete"
              class="w-4 h-4 animate-spin"
            />
            <template v-else>{{ t('orders.delete') }}</template>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <OrderDetailsDialog
      v-model:open="detailsDialogOpen"
      :order="selectedOrder"
    />
  </div>
</template>
