"use client";

import ProfileLayout from "@/src/components/profile/ProfileLayout";

import {
  useMyProfileQuery,
} from "@/src/redux/api/profileApi";

import {
  Alert,
  Box,
  CircularProgress,
} from "@mui/material";

export default function ProfilePage() {
  const {
    data,
    isLoading,
    isError,
  } = useMyProfileQuery(undefined);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data?.profile) {
    return (
      <Alert severity="error">
        Failed to load profile.
      </Alert>
    );
  }

  return (
    <ProfileLayout
      profile={data.profile}
    />
  );
}
