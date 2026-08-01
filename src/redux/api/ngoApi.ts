import { baseApi } from "./baseApi";

import type {
  INgo,
  NgoQuery,
} from "../../types/ngo.types";

import type {
  PaginatedResponse,
  SingleResponse,
} from "../../types/api.types";

export const ngoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ===========================
    // PUBLIC
    // ===========================

    // GET /ngo
    getNgos: builder.query<
      PaginatedResponse<INgo>,
      NgoQuery | void
    >({
      query: (params) => ({
        url: "/ngo",
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["NGOs"],
    }),

    // GET /ngo/:id
    getNgoById: builder.query<
      SingleResponse<INgo>,
      string
    >({
      query: (id) => ({
        url: `/ngo/${id}`,
      }),
      providesTags: (_r, _e, id) => [
        {
          type: "NGOs",
          id,
        },
      ],
    }),

    // ===========================
    // NGO USER
    // ===========================

    // POST /ngo
    registerNgo: builder.mutation<
      SingleResponse<INgo>,
      FormData
    >({
      query: (body) => ({
        url: "/ngo",
        method: "POST",
        body,
      }),
      invalidatesTags: ["NGOs"],
    }),

    // PUT /ngo/:id
    updateNgo: builder.mutation<
      SingleResponse<INgo>,
      {
        id: string;
        body: FormData;
      }
    >({
      query: ({ id, body }) => ({
        url: `/ngo/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_r, _e, { id }) => [
        "NGOs",
        {
          type: "NGOs",
          id,
        },
      ],
    }),

    // GET /ngo/:id/workshops
    getNgoWorkshops: builder.query<
      any,
      string
    >({
      query: (id) => ({
        url: `/ngo/${id}/workshops`,
      }),
      providesTags: ["Workshops"],
    }),

    // ===========================
    // ADMIN / MINISTRY
    // ===========================

    // PUT /ngo/approve/:id
    approveNgo: builder.mutation<
      SingleResponse<INgo>,
      string
    >({
      query: (id) => ({
        url: `/ngo/approve/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["NGOs"],
    }),

    // DELETE /ngo/:id
    deleteNgo: builder.mutation<
      SingleResponse<INgo>,
      string
    >({
      query: (id) => ({
        url: `/ngo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NGOs"],
    }),

    // ===========================
    // ANALYTICS
    // ===========================

    // GET /ngo/analytics
    getNgoAnalytics: builder.query<
      any,
      void
    >({
      query: () => ({
        url: "/ngo/analytics",
      }),
      providesTags: ["Analytics"],
    }),

    // GET /ngo/performance-report
    getNgoPerformanceReport:
      builder.query<any, void>({
        query: () => ({
          url: "/ngo/performance-report",
        }),
        providesTags: ["Analytics"],
      }),

  }),

  overrideExisting: false,
});

export const {

  // Public
  useGetNgosQuery,
  useGetNgoByIdQuery,

  // NGO
  useRegisterNgoMutation,
  useUpdateNgoMutation,
  useGetNgoWorkshopsQuery,

  // Admin
  useApproveNgoMutation,
  useDeleteNgoMutation,

  // Analytics
  useGetNgoAnalyticsQuery,
  useGetNgoPerformanceReportQuery,

} = ngoApi;