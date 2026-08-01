// src/types/marketplace.types.ts

/* ===========================
   PRODUCT
=========================== */

export type ProductStatus =
  | "available"
  | "out_of_stock"
  | "inactive";

export type ProductCategory =
  | "tractor"
  | "harvester"
  | "pump"
  | "sprayer"
  | "tool"
  | "seed"
  | "fertilizer";

export interface Product {
  _id: string;

  name: string;

  category: ProductCategory;

  brand?: string;

  price: number;

  stock: number;

  specifications?: Record<string, string>;

  images: string[];

  description?: string;

   status: ProductStatus;
  

  createdAt: string;

  updatedAt: string;

}

export interface ProductResponse {
  success: boolean;
  message?: string;
  product: Product;
}

export interface ProductsResponse {
  success: boolean;
  message?: string;
  total?: number;
  products: Product[];
}

/* ===========================
   ORDER
=========================== */

export interface OrderProduct {
  product: string;

  quantity: number;

  price: number;
}

export interface CreateOrderPayload {
  products: OrderProduct[];
}

export interface Order {
  _id: string;

  farmer: string;

  products: OrderProduct[];

  totalAmount: number;

  paymentStatus:
    | "pending"
    | "paid"
    | "failed";

  orderStatus:
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled";

  createdAt: string;

  updatedAt: string;
}

export interface OrderResponse {
  success: boolean;
  order: Order;
}

export interface OrdersResponse {
  success: boolean;
  message?: string;
  orders: Order[];
}

export interface CreateProductPayload {
  name: string;

  description: string;

  price: number;

  category: string;

  stock: number;

  image?: File | string;
  status: ProductStatus;
}

export type UpdateProductPayload =
  Partial<CreateProductPayload>;