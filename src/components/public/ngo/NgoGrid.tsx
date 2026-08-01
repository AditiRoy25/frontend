"use client";

import {
  Box,
  Button,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";

import NgoCard, {
  PublicNgo,
} from "./NgoCard";

interface Props {
  ngos: PublicNgo[];

  loading?: boolean;

  onRefresh?: () => void;
}

export default function NgoGrid({
  ngos,
  loading = false,
  onRefresh,
}: Props) {
  if (loading) {
    return (
      <Grid
        container
        spacing={3}
      >
        {Array.from({
          length: 8,
        }).map((_, index) => (
          <Grid
            key={index}
            size={{
              xs: 12,
              sm: 6,
              md: 4,
              lg: 3,
            }}
          >
            <Skeleton
              variant="rounded"
              height={420}
            />
          </Grid>
        ))}
      </Grid>
    );
  }

  if (!ngos.length) {
    return (
      <Box
        sx={{
          py: 10,
          textAlign: "center",
        }}
      >
        <Stack
          spacing={3}
          alignItems="center"
        >
          <Typography
            variant="h5"
            fontWeight={700}
          >
            No NGOs Found
          </Typography>

          <Typography
            color="text.secondary"
          >
            No NGO matches your
            current filters.
          </Typography>

          {onRefresh && (
            <Button
              variant="contained"
              startIcon={
                <RefreshIcon />
              }
              onClick={onRefresh}
            >
              Refresh
            </Button>
          )}
        </Stack>
      </Box>
    );
  }

  return (
    <Grid
      container
      spacing={3}
    >
      {ngos.map((ngo) => (
        <Grid
          key={ngo._id}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
          }}
        >
          <NgoCard ngo={ngo} />
        </Grid>
      ))}
    </Grid>
  );
}