import { baseApi } from "./baseApi";

import {
  LoginPayload,
  RegisterPayload,
  VerifyPayload,
  
  
} from "../../types/auth.types";

export const authApi =
  baseApi.injectEndpoints({
    endpoints: (builder) => ({
      register: builder.mutation({
        query: (
          data: RegisterPayload
        ) => {
          const formData =
            new FormData();

          formData.append(
            "name",
            data.name
          );

          formData.append(
            "email",
            data.email
          );

          formData.append(
            "phone",
            data.phone
          );

          formData.append(
            "password",
            data.password
          );

          formData.append(
            "role",
            data.role
          );

          if (data.image) {
            formData.append(
              "image",
              data.image
            );
          }

          return {
            url: "/register",
            method: "POST",
            body: formData,
          };
        },
      }),

      login: builder.mutation({
        query: (
          data: LoginPayload
        ) => ({
          url: "/login",
          method: "POST",
          body: data,
        }),
      }),

      verifyEmail:
        builder.mutation({
          query: (
            data: VerifyPayload
          ) => ({
            url: "/verify",
            method: "POST",
            body: data,
          }),
        }),


        resendOTP:
builder.mutation({
  query: (email:string) => ({
    url: "/resend-otp",
    method: "POST",
    body: { email },
  }),
}),
    }),
  });

export const {
  useRegisterMutation,
  useLoginMutation,
  useVerifyEmailMutation,
  useResendOTPMutation
} = authApi;