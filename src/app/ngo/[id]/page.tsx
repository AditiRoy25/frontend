"use client";

import { useParams } from "next/navigation";

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
} from "@mui/material";

import {
  useGetNgoByIdQuery,
} from "@/src/redux/api/ngoApi";

import NgoDetailsHeader from "@/src/components/public/ngo/NgoDetailsHeader";
import NgoAboutCard from "@/src/components/public/ngo/NgoAboutCard";
import NgoWorkshopList from "@/src/components/public/ngo/NgoWorkshopList";
import NgoGallery from "@/src/components/public/ngo/NgoGallery";
import NgoContactCard from "@/src/components/public/ngo/NgoContactCard";

export default function NgoDetailsPage() {
  const params = useParams();

  const id = params.id as string;

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetNgoByIdQuery(id);

  if (isLoading) {
    return (
      <Box
       sx={{ display:"flex",
        justifyContent:"center",
        alignItems:"center",
        minHeight:"70vh"}}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !data?.data) {
    return (
      <Container
        maxWidth="lg"
        sx={{ py: 5 }}
      >
        <Alert
          severity="error"
          onClose={() => refetch()}
        >
          Failed to load NGO details.
        </Alert>
      </Container>
    );
  }

  const ngo = data.data;

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 5 }}
    >
      <Stack spacing={4}>

        {/* Header */}

        <NgoDetailsHeader
          ngo={ngo}
        />

        <Grid
          container
          spacing={4}
        >

          {/* Left */}

          <Grid
            size={{
              xs: 12,
              md: 8,
            }}
          >
            <Stack spacing={4}>
              <NgoAboutCard
                ngo={ngo}
              />

              <NgoWorkshopList />

              <NgoGallery />
            </Stack>
          </Grid>

          {/* Right */}

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            <NgoContactCard
              ngo={ngo}
            />
          </Grid>

        </Grid>

      </Stack>
    </Container>
  );
}