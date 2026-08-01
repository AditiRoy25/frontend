"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { useChangePasswordMutation } from "@/src/redux/api/profileApi";

const schema = yup.object({
  currentPassword: yup
    .string()
    .required("Current password is required"),

  newPassword: yup
    .string()
    .required("New password is required")
    .min(
      6,
      "Password must be at least 6 characters"
    ),

  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf(
      [yup.ref("newPassword")],
      "Passwords do not match"
    ),
});

type ChangePasswordForm = yup.InferType<
  typeof schema
>;

export default function ChangePassword() {
  const [
    changePassword,
    { isLoading },
  ] = useChangePasswordMutation();

  const [serverError, setServerError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (
    data: ChangePasswordForm
  ) => {
    setServerError("");
    setSuccess("");

    try {
      const res =
        await changePassword({
          currentPassword:
            data.currentPassword,
          newPassword:
            data.newPassword,
        }).unwrap();

      setSuccess(res.message);

      reset();
    } catch (err: unknown) {
      const message =
        typeof err === "object" &&
        err !== null &&
        "data" in err &&
        typeof err.data === "object" &&
        err.data !== null &&
        "message" in err.data &&
        typeof err.data.message === "string"
          ? err.data.message
          : "Something went wrong.";

      setServerError(message);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #ECECEC",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mb: 3 }}
        >
          Change Password
        </Typography>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
        >
          <Stack spacing={2}>
            {success && (
              <Alert severity="success">
                {success}
              </Alert>
            )}

            {serverError && (
              <Alert severity="error">
                {serverError}
              </Alert>
            )}

            <TextField
              label="Current Password"
              type="password"
              fullWidth
              {...register(
                "currentPassword"
              )}
              error={
                !!errors.currentPassword
              }
              helperText={
                errors.currentPassword
                  ?.message
              }
            />

            <TextField
              label="New Password"
              type="password"
              fullWidth
              {...register("newPassword")}
              error={
                !!errors.newPassword
              }
              helperText={
                errors.newPassword
                  ?.message
              }
            />

            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              {...register(
                "confirmPassword"
              )}
              error={
                !!errors.confirmPassword
              }
              helperText={
                errors.confirmPassword
                  ?.message
              }
            />

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                py: 1.5,
                borderRadius: 2,
              }}
            >
              {isLoading
                ? "Changing..."
                : "Change Password"}
            </Button>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
}
