"use client";

import Link from "next/link";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedIcon from "@mui/icons-material/Verified";
import BadgeIcon from "@mui/icons-material/Badge";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import type { INgo } from "@/src/types/ngo.types";

interface Props {
  ngo: INgo;
}

export default function NgoCard({
  ngo,
}: Props) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        transition: ".3s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 8,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          mb={2}
        >
          <Avatar
            src={ngo.logo}
            sx={{
              width: 70,
              height: 70,
            }}
          />

          <Stack flex={1}>
            <Typography
              variant="h6"
              fontWeight={700}
            >
              {ngo.organizationName}
            </Typography>

            {ngo.ministryApproval && (
              <Chip
                icon={<VerifiedIcon />}
                label="Approved"
                size="small"
                color="success"
                sx={{
                  mt: 1,
                  width: "fit-content",
                }}
              />
            )}
          </Stack>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          mb={2}
        >
          <BadgeIcon
            color="primary"
            fontSize="small"
          />

          <Typography variant="body2">
            {ngo.registrationNumber}
          </Typography>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          alignItems="flex-start"
        >
          <LocationOnIcon
            color="action"
            fontSize="small"
          />

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {ngo.address || "Address not available"}
          </Typography>
        </Stack>
      </CardContent>

      <CardActions sx={{ p: 2 }}>
        <Button
          fullWidth
          component={Link}
          href={`/ngo/${ngo._id}`}
          variant="contained"
          endIcon={<ArrowForwardIcon />}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
}