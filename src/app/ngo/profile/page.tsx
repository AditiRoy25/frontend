"use client";

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import NgoProfileCard from "@/src/components/ngo/NgoProfileCard";

import {
  useGetMyNgoQuery,
} from "@/src/redux/api/ngoApi";

export default function NgoProfilePage() {

  const {
    data,
    isLoading,
    isError,
  } = useGetMyNgoQuery();

  const ngo =
    data?.ngo ??
    data?.data;

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !ngo) {
    return (
      <Container
        maxWidth="lg"
        sx={{ py: 5 }}
      >
        <Alert severity="error">
          Failed to load NGO profile.
        </Alert>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4 }}
    >
      <Stack spacing={4}>

        <Typography
          variant="h4"
          fontWeight={700}
        >
          My NGO Profile
        </Typography>

        <Typography
          color="text.secondary"
        >
          View and manage your NGO
          information.
        </Typography>

        <NgoProfileCard
          ngo={ngo}
        />

      </Stack>
    </Container>
  );
}