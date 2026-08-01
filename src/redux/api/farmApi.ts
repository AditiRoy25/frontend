import { baseApi } from "./baseApi";

import type {
  FarmsResponse,
  FarmResponse,
  CreateFarmPayload,
  UpdateFarmPayload,
  DeleteFarmResponse,
} from "@/src/types/farm.types";

export const farmApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // Get all farms
    getMyFarms: builder.query<FarmsResponse, void>({
      query: () => ({
        url: "/farms",
        method: "GET",
      }),

      providesTags: ["Farm"],
    }),

    // Get single farm
    getFarm: builder.query<FarmResponse, string>({
      query: (id) => ({
        url: `/farms/${id}`,
        method: "GET",
      }),

      providesTags: ["Farm"],
    }),

    // Create farm
    createFarm: builder.mutation<
      FarmResponse,
      CreateFarmPayload
    >({
      query: (data) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("cropName", data.cropName);
        formData.append("area", String(data.area));
        formData.append("areaUnit", data.areaUnit);
        formData.append("location", data.location);

        if (data.image) {
          formData.append("image", data.image);
        }

        return {
          url: "/farms",
          method: "POST",
          body: formData,
        };
      },

      invalidatesTags: ["Farm"],
    }),

    // Update farm
    updateFarm: builder.mutation<
      FarmResponse,
      UpdateFarmPayload
    >({
      query: ({ id, ...data }) => {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("cropName", data.cropName);
        formData.append("area", String(data.area));
        formData.append("areaUnit", data.areaUnit);
        formData.append("location", data.location);

        if (data.image) {
          formData.append("image", data.image);
        }

        return {
          url: `/farms/${id}`,
          method: "PUT",
          body: formData,
        };
      },

      invalidatesTags: ["Farm"],
    }),

    // Delete farm
    deleteFarm: builder.mutation<
      DeleteFarmResponse,
      string
    >({
      query: (id) => ({
        url: `/farms/${id}`,
        method: "DELETE",
      }),

      invalidatesTags: ["Farm"],
    }),
  }),
});

export const {
  useGetMyFarmsQuery,
  useGetFarmQuery,
  useCreateFarmMutation,
  useUpdateFarmMutation,
  useDeleteFarmMutation,
} = farmApi;