"use client";

import { useRouter } from "next/navigation";

import {
  Alert,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  useRegisterNgoMutation,
} from "@/src/redux/api/ngoApi";

import NgoRegistrationForm, {
  NgoRegistrationFormValues,
} from "@/src/components/ngo/NgoRegistrationForm";

export default function NgoRegistrationPage() {
  const router = useRouter();

  const [
    registerNgo,
    {
      isLoading,
      isSuccess,
      isError,
      error,
    },
  ] = useRegisterNgoMutation();

  const handleSubmit = async (
    values: NgoRegistrationFormValues
  ) => {
    try {
      const formData =
        new FormData();

      formData.append(
        "name",
        values.name
      );

      formData.append(
        "registrationNumber",
        values.registrationNumber
      );

      formData.append(
        "email",
        values.email
      );

      formData.append(
        "phone",
        values.phone
      );

      formData.append(
        "website",
        values.website
      );

      formData.append(
        "state",
        values.state
      );

      formData.append(
        "district",
        values.district
      );

      formData.append(
        "pincode",
        values.pincode
      );

      formData.append(
        "address",
        values.address
      );

      formData.append(
        "description",
        values.description
      );

      if (values.logo) {
        formData.append(
          "logo",
          values.logo
        );
      }

      if (
        values.certificate
      ) {
        formData.append(
          "certificate",
          values.certificate
        );
      }

      await registerNgo(
        formData
      ).unwrap();

      router.push(
        "/ngo/dashboard"
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 5 }}
    >
      <Paper
        sx={{
          p: 4,
          borderRadius: 3,
        }}
      >
        <Stack spacing={3}>
          <Typography
            variant="h4"
            fontWeight={700}
          >
            NGO Registration
          </Typography>

          <Typography
            color="text.secondary"
          >
            Register your NGO
            to participate in
            AgroSphere
            programs,
            workshops,
            government
            schemes and
            donations.
          </Typography>

          {isSuccess && (
            <Alert severity="success">
              NGO registered
              successfully.
            </Alert>
          )}

          {isError && (
            <Alert severity="error">
              Registration
              failed.
            </Alert>
          )}

          <NgoRegistrationForm
            loading={
              isLoading
            }
            onSubmit={
              handleSubmit
            }
          />
        </Stack>
      </Paper>
    </Container>
  );
}