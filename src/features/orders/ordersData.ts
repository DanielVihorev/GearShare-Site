export type OrderStatus = "Processing" | "Shipped" | "Delivered" | "Cancelled";

export interface Order {
  id: string;
  customer: string;
  part: string;
  date: string;
  total: string;
  status: OrderStatus;
}

export const mockOrders: Order[] = [];
