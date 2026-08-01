export interface Order {
  _id: string;
  quantity: number;
  totalAmount: number;
  status: "Pending" | "Confirmed" | "Shipped" | "Delivered" | "Cancelled";

  product: {
    _id: string;
    name: string;
  };
}

export interface OrdersResponse {
  success: boolean;
  orders: Order[];
}