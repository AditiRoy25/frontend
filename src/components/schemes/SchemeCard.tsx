"use client";

import Link from "next/link";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

interface SchemeCardProps {
  scheme: {
    _id: string;
    title: string;
    description: string;
    amount: number;
    eligibility: string;
    status: string;
  };

  isLoggedIn?: boolean;
}

export default function SchemeCard({
  scheme,
  isLoggedIn = false,
}: SchemeCardProps) {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #ECECEC",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack
        sx={{  direction:"row",
          spacing:2,
          alignItems:"center",
          mb:2}}
        >
          <AccountBalanceIcon
            color="success"
            fontSize="large"
          />

          <Typography
            variant="h6"
           sx={{ fontWeight:700}}
          >
            {scheme.title}
          </Typography>
        </Stack>

        <Chip
          label={scheme.status}
          color={
            scheme.status === "Active"
              ? "success"
              : "default"
          }
          size="small"
          sx={{ mb: 2 }}
        />

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          {scheme.description}
        </Typography>

        <Typography
          variant="body2"
          sx={{ mb: 1 }}
        >
          <strong>Benefit:</strong> ₹
          {scheme.amount.toLocaleString()}
        </Typography>

        <Typography variant="body2">
          <strong>Eligibility:</strong>{" "}
          {scheme.eligibility}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          px: 2,
          pb: 2,
          gap: 1,
        }}
      >
        <Button
          component={Link}
          href={`/schemes/${scheme._id}`}
          variant="outlined"
          fullWidth
        >
          View Details
        </Button>

        <Button
          component={Link}
          href={
            isLoggedIn
              ? `/schemes/${scheme._id}`
              : "/login"
          }
          variant="contained"
          fullWidth
        >
          {isLoggedIn
            ? "Apply Now"
            : "Login to Apply"}
        </Button>
      </CardActions>
    </Card>
  );
}