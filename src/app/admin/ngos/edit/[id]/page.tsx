"use client";

import Link from "next/link";
import { useState } from "react";

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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RefreshIcon from "@mui/icons-material/Refresh";

import {
  useApproveNgoMutation,
  useDeleteNgoMutation,
  useGetNgosQuery,
} from "@/src/redux/api/ngoApi";

import type {
  INgo,
} from "@/src/types/ngo.types";

export default function AdminNgoPage() {
  const [page] = useState(1);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetNgosQuery({
    page,
    limit: 10,
  });

  const [approveNgo] =
    useApproveNgoMutation();

  const [deleteNgo] =
    useDeleteNgoMutation();

  const ngos: INgo[] =
    data?.data ?? [];

  const handleApprove = async (
    id: string
  ) => {
    try {
      await approveNgo(id).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (
    id: string
  ) => {
    if (
      !window.confirm(
        "Delete this NGO?"
      )
    )
      return;

    try {
      await deleteNgo(id).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "logo",
      headerName: "Logo",
      width: 90,

      renderCell: ({ row }) => (
        <Avatar
          src={row.logo}
        />
      ),
    },

    {
      field: "organizationName",
      headerName:
        "Organization",
      flex: 1.5,
    },

    {
      field:
        "registrationNumber",
      headerName:
        "Registration",
      flex: 1,
    },

    {
      field: "address",
      headerName: "Address",
      flex: 2,
    },

    {
      field:
        "ministryApproval",
      headerName: "Status",
      width: 150,

      renderCell: ({ value }) => (
        <Chip
          label={
            value
              ? "Approved"
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
      field: "actions",
      headerName: "Actions",
      width: 220,
      sortable: false,

      renderCell: ({ row }) => (
        <Stack
          direction="row"
          spacing={1}
        >
          <Tooltip title="View">
            <IconButton
              component={Link}
              href={`/admin/ngos/${row._id}`}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit">
            <IconButton
              component={Link}
              href={`/admin/ngos/edit/${row._id}`}
              color="primary"
            >
              <EditIcon />
            </IconButton>
          </Tooltip>

          {!row.ministryApproval && (
            <Tooltip title="Approve">
              <IconButton
                color="success"
                onClick={() =>
                  handleApprove(
                    row._id
                  )
                }
              >
                <CheckCircleIcon />
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Delete">
            <IconButton
              color="error"
              onClick={() =>
                handleDelete(
                  row._id
                )
              }
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
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
      <Container
        maxWidth="lg"
      >
        <Alert severity="error">
          Failed to load NGOs.
        </Alert>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
      }}
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
            NGO Management
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
            rows={ngos}
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
                paginationModel:
                  {
                    page: 0,
                    pageSize: 10,
                  },
              },
            }}
          />
        </Paper>
      </Stack>
    </Container>
  );
}