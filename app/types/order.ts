export type OrderStatus = 'new' | 'paid' | 'delivery' | 'cancelled';

export interface OrderItem {
  boardId: number;
  boardName: string;
  boardSubtitle: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: number;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    delivery: string;
    address: string;
    comment?: string;
  };
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  createdAt: string;
}
