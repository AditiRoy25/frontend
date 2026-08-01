"use client";

import { useState } from "react";

import Link from "next/link";

import {
  Alert,
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  DataGrid,
  GridColDef,
} from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RefreshIcon from "@mui/icons-material/Refresh";

import {
  useBlockFarmerMutation,
  useGetFarmersQuery,
  useUnblockFarmerMutation,
} from "@/src/redux/api/farmerApi";

import type { IFarmer } from "@/src/types/farmer.types";

export default function FarmersPage() {
  const [page] = useState(1);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetFarmersQuery({
    page,
    limit: 10,
  });

  const [blockFarmer] =
    useBlockFarmerMutation();

  const [unblockFarmer] =
    useUnblockFarmerMutation();

  const farmers: IFarmer[] =
    data?.data ?? [];

  const columns: GridColDef[] = [
    {
      field: "profileImage",
      headerName: "Image",
      width: 90,

      renderCell: ({ row }) => (
        <Avatar
          src={row.profileImage}
        />
      ),
    },

    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1.2,
    },

    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },

    {
      field: "isVerified",
      headerName: "Verified",
      width: 120,

      renderCell: ({ value }) => (
        <Chip
          label={
            value
              ? "Verified"
              : "Pending"
          }
          color={
            value
              ? "success"
              : "warning"
          }
          size="small"
        />
      ),
    },

    {
      field: "isBlocked",
      headerName: "Status",
      width: 120,

      renderCell: ({ value }) => (
        <Chip
          label={
            value
              ? "Blocked"
              : "Active"
          }
          color={
            value
              ? "error"
              : "success"
          }
          size="small"
        />
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 180,

      sortable: false,

      renderCell: ({ row }) => (
        <Stack
          direction="row"
          spacing={1}
        >
          <Tooltip title="View">
            <IconButton
              component={Link}
              href={`/admin/farmers/${row._id}`}
              color="primary"
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>

          {row.isBlocked ? (
            <Tooltip title="Unblock">
              <IconButton
                color="success"
                onClick={() =>
                  unblockFarmer(
                    row._id
                  )
                }
              >
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Block">
              <IconButton
                color="error"
                onClick={() =>
                  blockFarmer(
                    row._id
                  )
                }
              >
                <BlockIcon />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      ),
    },
  ];

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

  if (isError) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error">
          Failed to load farmers.
        </Alert>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4 }}
    >
      <Stack spacing={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h4"
            fontWeight={700}
          >
            Farmers
          </Typography>

          <Tooltip title="Refresh">
            <IconButton
              onClick={() =>
                refetch()
              }
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        <Paper sx={{ p: 2 }}>
          <DataGrid
            autoHeight
            rows={farmers}
            columns={columns}
            getRowId={(row) =>
              row._id
            }
            disableRowSelectionOnClick
            pageSizeOptions={[
              10,
              20,
              50,
            ]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                  page: 0,
                },
              },
            }}
          />
        </Paper>
      </Stack>
    </Container>
  );
}