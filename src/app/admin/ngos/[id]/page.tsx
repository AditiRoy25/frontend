"use client";

import { useParams, useRouter } from "next/navigation";

import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";

import { useGetNgoByIdQuery } from "@/src/redux/api/ngoApi";

export default function NgoDetailsPage() {
  const router = useRouter();

  const { id } = useParams<{
    id: string;
  }>();

  const {
    data,
    isLoading,
    isError,
  } = useGetNgoByIdQuery(id);

  const ngo =
    data?.ngo ??
    data?.data;

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        py={10}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (isError || !ngo) {
    return (
      <Container maxWidth="md">
        <Alert severity="error">
          NGO not found.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Stack spacing={3}>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => router.back()}
          >
            Back
          </Button>

          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() =>
              router.push(
                `/admin/ngos/edit/${ngo._id}`
              )
            }
          >
            Edit NGO
          </Button>
        </Stack>

        <Card>
          <CardContent>

            <Stack
              spacing={2}
              alignItems="center"
              mb={4}
            >
              <Avatar
                src={ngo.profileImage}
                sx={{
                  width: 120,
                  height: 120,
                }}
              />

              <Typography variant="h4">
                {ngo.name}
              </Typography>

              <Stack
                direction="row"
                spacing={2}
              >
                <Chip
                  label={
                    ngo.isVerified
                      ? "Verified"
                      : "Pending"
                  }
                  color={
                    ngo.isVerified
                      ? "success"
                      : "warning"
                  }
                />

                <Chip
                  label={
                    ngo.isBlocked
                      ? "Blocked"
                      : "Active"
                  }
                  color={
                    ngo.isBlocked
                      ? "error"
                      : "success"
                  }
                />
              </Stack>
            </Stack>

            <Divider sx={{ mb: 4 }} />

            <Grid
              container
              spacing={3}
            >
              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <Typography color="text.secondary">
                  Organization Name
                </Typography>

                <Typography>
                  {ngo.name}
                </Typography>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <Typography color="text.secondary">
                  Email
                </Typography>

                <Typography>
                  {ngo.email}
                </Typography>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <Typography color="text.secondary">
                  Phone
                </Typography>

                <Typography>
                  {ngo.phone}
                </Typography>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                  md: 6,
                }}
              >
                <Typography color="text.secondary">
                  Role
                </Typography>

                <Typography>
                  {ngo.role}
                </Typography>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                }}
              >
                <Typography color="text.secondary">
                  Address
                </Typography>

                <Typography>
                  {ngo.address || "-"}
                </Typography>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                }}
              >
                <Typography color="text.secondary">
                  Description
                </Typography>

                <Typography>
                  {ngo.description || "-"}
                </Typography>
              </Grid>

              <Grid
                size={{
                  xs: 12,
                }}
              >
                <Typography color="text.secondary">
                  Joined
                </Typography>

                <Typography>
                  {ngo.createdAt
                    ? new Date(
                        ngo.createdAt
                      ).toLocaleDateString()
                    : "-"}
                </Typography>
              </Grid>

            </Grid>

          </CardContent>
        </Card>

      </Stack>
    </Container>
  );
}