import { baseApi } from "./baseApi";

import type {
  ApiResponse,
  PaginatedResponse,
} from "../../types/api.types";

import type {
  IUser,
  UserQuery,
} from "../../types/user.types";

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ======================
    // Dashboard
    // ======================

    getDashboardStats: builder.query<any, void>({
      query: () => "/admin/dashboard",

      providesTags: ["Dashboard"],
    }),

    // ======================
    // Users
    // ======================

    getUsers: builder.query<
      PaginatedResponse<IUser>,
      UserQuery
    >({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        role = "",
        isBlocked,
      }) => ({
        url: "/admin/users",

        params: {
          page,
          limit,
          search,
          role,
          isBlocked,
        },
      }),

      providesTags: (result) =>
        result
          ? [
              ...result.data.map((user) => ({
                type: "Users" as const,
                id: user._id,
              })),
              {
                type: "Users",
                id: "LIST",
              },
            ]
          : [
              {
                type: "Users",
                id: "LIST",
              },
            ],
    }),

    getUserById: builder.query<
      {
        success: boolean;
        message: string;
        user: IUser;
      },
      string
    >({
      query: (id) => `/admin/users/${id}`,

      providesTags: (_r, _e, id) => [
        {
          type: "Users",
          id,
        },
      ],
    }),

    createUser: builder.mutation<
      ApiResponse,
      FormData
    >({
      query: (body) => ({
        url: "/admin/users",

        method: "POST",

        body,
      }),

      invalidatesTags: [
        {
          type: "Users",
          id: "LIST",
        },
      ],
    }),

    updateUser: builder.mutation<
      ApiResponse,
      {
        id: string;
        body: FormData;
      }
    >({
      query: ({ id, body }) => ({
        url: `/admin/users/${id}`,

        method: "PUT",

        body,
      }),

      invalidatesTags: (_r, _e, arg) => [
        {
          type: "Users",
          id: arg.id,
        },
        {
          type: "Users",
          id: "LIST",
        },
      ],
    }),

    deleteUser: builder.mutation<
      ApiResponse,
      string
    >({
      query: (id) => ({
        url: `/admin/users/${id}`,

        method: "DELETE",
      }),

      invalidatesTags: [
        {
          type: "Users",
          id: "LIST",
        },
      ],
    }),

    blockUser: builder.mutation<
      ApiResponse,
      string
    >({
      query: (id) => ({
        url: `/admin/users/${id}/block`,

        method: "PATCH",
      }),

      invalidatesTags: (_r, _e, id) => [
        {
          type: "Users",
          id,
        },
        {
          type: "Users",
          id: "LIST",
        },
      ],
    }),

    unblockUser: builder.mutation<
      ApiResponse,
      string
    >({
      query: (id) => ({
        url: `/admin/users/${id}/unblock`,

        method: "PATCH",
      }),

      invalidatesTags: (_r, _e, id) => [
        {
          type: "Users",
          id,
        },
        {
          type: "Users",
          id: "LIST",
        },
      ],
    }),

    // ======================
    // Reports
    // ======================

    getReports: builder.query<any, void>({
      query: () => "/admin/reports",

      providesTags: ["Reports"],
    }),

    // ======================
    // Analytics
    // ======================

    getAnalytics: builder.query<any, void>({
      query: () => "/admin/analytics",

      providesTags: ["Dashboard"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetDashboardStatsQuery,

  useGetUsersQuery,
  useGetUserByIdQuery,

  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,

  useBlockUserMutation,
  useUnblockUserMutation,

  useGetReportsQuery,
  useGetAnalyticsQuery,
} = adminApi;