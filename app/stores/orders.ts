import type { Order, OrderStatus } from '~/types/order';

export const useOrdersStore = defineStore('orders', () => {
  const orderId = ref<number | null>(null);
  const orderState = ref<OrderStatus | null>(null);

  const orderStatusBody = computed(() => ({ status: orderState.value }));

  const { data: orders, pending: pendingOrders } =
    useAPIContent<Order[]>('/orders');

  const {
    pending: pendingOrderUpdate,
    error: errorOrderUpdate,
    refresh: refreshOrderStatus,
  } = useAPIContent<Order>(() => `/orders/${orderId.value}`, {
    method: 'PATCH',
    body: orderStatusBody,
    immediate: false,
    watch: false,
  });

  const {
    pending: pendingOrderDelete,
    error: errorOrderDelete,
    refresh: refreshOrderDelete,
  } = useAPIContent<Order>(() => `/orders/${orderId.value}`, {
    method: 'DELETE',
    immediate: false,
    watch: false,
  });

  const updateStatus = async (id: number, status: OrderStatus) => {
    orderId.value = id;
    orderState.value = status;

    await refreshOrderStatus();

    if (errorOrderUpdate.value) return;

    if (orders.value) {
      orders.value = orders.value.map((order) =>
        order.id === id ? { ...order, status } : order
      );
    }

    orderId.value = null;
    orderState.value = null;
  };

  const deleteOrder = async (id: number) => {
    orderId.value = id;

    await refreshOrderDelete();

    if (errorOrderDelete.value) return;

    if (orders.value) {
      orders.value = orders.value.filter((o) => o.id !== id);
    }

    orderId.value = null;
  };

  return {
    orders,
    pendingOrders,
    pendingOrderUpdate,
    errorOrderUpdate,
    pendingOrderDelete,
    errorOrderDelete,
    updateStatus,
    deleteOrder,
  };
});
