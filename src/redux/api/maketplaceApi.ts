import { baseApi } from "./baseApi";

import type {
  ProductResponse,
  ProductsResponse,
  CreateOrderPayload,
  OrderResponse,
  OrdersResponse,
} from "@/src/types/marketplace.types";

export const marketplaceApi =
  baseApi.injectEndpoints({
    endpoints: (builder) => ({
      getProducts: builder.query<
        ProductsResponse,
        void
      >({
        query: () => ({
          url: "/marketplace/products",
          method: "GET",
        }),

        providesTags: ["Marketplace"],
      }),

      getProduct: builder.query<
        ProductResponse,
        string
      >({
        query: (id) => ({
          url: `/marketplace/products/${id}`,
          method: "GET",
        }),

        providesTags: ["Marketplace"],
      }),

      createOrder: builder.mutation<
        OrderResponse,
        CreateOrderPayload
      >({
        query: (body) => ({
          url: "/marketplace/orders",
          method: "POST",
          body,
        }),

        invalidatesTags: ["Marketplace"],
      }),

      getMyOrders: builder.query<
        OrdersResponse,
        void
      >({
        query: () => ({
          url: "/marketplace/orders/my",
          method: "GET",
        }),

        providesTags: ["Marketplace"],
      }),
    }),
  });

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateOrderMutation,
  useGetMyOrdersQuery,
} = marketplaceApi;