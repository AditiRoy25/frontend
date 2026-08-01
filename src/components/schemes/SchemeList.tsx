"use client";

import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

import SchemeCard from "./SchemeCard";

import { useGetSchemesQuery } from "@/src/redux/api/schemeApi";

export default function SchemeList() {
  const {
    data,
    isLoading,
    isError,
  } = useGetSchemesQuery();
  console.log("Scheme API Response:", data);

  if (isLoading) {
    return (
      <Box
        sx={{
          py: 8,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        Failed to load government schemes.
      </Alert>
    );
  }

  if (!data?.schemes?.length) {
    return (
      <Box
        sx={{
          py: 8,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
        >
          No Schemes Found
        </Typography>

        <Typography color="text.secondary">
          There are currently no government schemes available.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid
      container
      spacing={3}
    >
      {data.schemes.map((scheme) => (
        <Grid
          key={scheme._id}
          size={{
            xs: 12,
            md: 6,
            lg: 4,
          }}
        >
          <SchemeCard
            scheme={scheme}
            isLoggedIn={false}
          />
        </Grid>
      ))}
    </Grid>
  );
}