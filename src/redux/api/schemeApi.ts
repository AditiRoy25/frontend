import { baseApi } from "./baseApi";

import {
  GovernmentSchemesResponse,
  GovernmentSchemeResponse,
  CreateSchemePayload,
  UpdateSchemePayload,
  ApplySchemePayload,
  SchemeApplicationResponse,
  MySchemesResponse,
  SchemeQuery,
} from "../../types/scheme";

export const schemeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // =========================
    // PUBLIC
    // =========================

    getSchemes: builder.query<
      GovernmentSchemesResponse,
      SchemeQuery | void
    >({
      query: (params) => ({
        url: "/schemes",
        method: "GET",
        params,
      }),
      providesTags: ["Scheme"],
    }),

    getSchemeById: builder.query<
      GovernmentSchemeResponse,
      string
    >({
      query: (id) => ({
        url: `/schemes/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [
        {
          type: "Scheme",
          id,
        },
      ],
    }),

    // =========================
    // ADMIN
    // =========================

    createScheme: builder.mutation<
      GovernmentSchemeResponse,
      CreateSchemePayload
    >({
      query: (body) => ({
        url: "/schemes",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Scheme"],
    }),

    updateScheme: builder.mutation<
      GovernmentSchemeResponse,
      {
        id: string;
        body: UpdateSchemePayload;
      }
    >({
      query: ({ id, body }) => ({
        url: `/schemes/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        "Scheme",
        {
          type: "Scheme",
          id,
        },
      ],
    }),

    deleteScheme: builder.mutation<
      {
        success: boolean;
        message: string;
      },
      string
    >({
      query: (id) => ({
        url: `/schemes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Scheme"],
    }),

    // =========================
    // FARMER
    // =========================

    applyScheme: builder.mutation<
      SchemeApplicationResponse,
      ApplySchemePayload
    >({
      query: (body) => ({
        url: "/schemes/apply",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Scheme"],
    }),

    mySchemes: builder.query<
      MySchemesResponse,
      void
    >({
      query: () => ({
        url: "/schemes/my",
        method: "GET",
      }),
      providesTags: ["Scheme"],
    }),

  }),
});

export const {
  useGetSchemesQuery,
  useGetSchemeByIdQuery,

  useCreateSchemeMutation,
  useUpdateSchemeMutation,
  useDeleteSchemeMutation,

  useApplySchemeMutation,
  useMySchemesQuery,
} = schemeApi;