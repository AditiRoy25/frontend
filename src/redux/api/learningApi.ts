import { baseApi } from "./baseApi";
import type { LearningProgressResponse } from "@/src/types/learning.types";

export const learningApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    progress: builder.query<LearningProgressResponse, void>({
      query: () => ({
        url: "/learning/progress",
        method: "GET",
      }),
      providesTags: ["Learning"],
    }),
  }),
});

export const {
  useProgressQuery,
} = learningApi;


// Learning
// GET /admin/courses

// POST /admin/courses

// PUT /admin/courses/:id

// DELETE /admin/courses/:id