"use client";

import Link from "next/link";

import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import GroupsIcon from "@mui/icons-material/Groups";

export default function NgoHero() {
  return (
    <Box
      sx={{
        py: 10,
        background:
          "linear-gradient(135deg,#1B5E20,#43A047)",
        color: "#fff",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={4}
          alignItems="center"
          textAlign="center"
        >
          <GroupsIcon
            sx={{
              fontSize: 70,
            }}
          />

          <Typography
            variant="h2"
            fontWeight={700}
          >
            Partner NGOs
          </Typography>

          <Typography
            maxWidth={750}
            fontSize={20}
          >
            Discover trusted NGOs
            working with AgroSphere to
            improve agriculture,
            empower farmers and deliver
            government schemes across
            India.
          </Typography>

          <Stack
            direction={{
              xs: "column",
              sm: "row",
            }}
            spacing={2}
          >
            <Button
              component={Link}
              href="/register"
              size="large"
              variant="contained"
              color="warning"
            >
              Register NGO
            </Button>

            <Button
              component={Link}
              href="/about"
              size="large"
              variant="outlined"
              sx={{
                color: "#fff",
                borderColor: "#fff",
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}