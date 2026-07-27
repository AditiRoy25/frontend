import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env.NEXT_PUBLIC_API_URL +
    "/api/v1",

  prepareHeaders: (
    headers
  ) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem(
            "accessToken"
          )
        : null;

    if (token) {
      headers.set(
        "Authorization",
        `Bearer ${token}`
      );
    }

    return headers;
  },
});

export const baseApi =
  createApi({
    reducerPath: "baseApi",

    baseQuery,

    tagTypes: [
      "Auth",
      "User",
      "Farm",
      "Seed",
      "Marketplace",
      "Course",
      "NGO",
      "Report",
      "Contact"
    ],

    endpoints: () => ({}),
  });