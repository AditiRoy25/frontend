"use client";

import { useState } from "react";

import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  MenuItem,
  Button,
  Chip,
  Avatar,
  IconButton,
  CircularProgress,
} from "@mui/material";

import Grid from "@mui/material/Grid";

import {
  DataGrid,
  GridColDef,
} from "@mui/x-data-grid";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useBlockUserMutation,
  useUnblockUserMutation,
} from "../../../redux/api/adminApi";

import AddUserDialog from "../../../components/admin/users/AddUserDialog";
import EditUserDialog from "../../../components/admin/users/dialogs/EditUserDialog";

import type { IUser } from "../../../types/user.types";

export default function AdminUsersPage() {
  const [page, setPage] = useState(1);

  const [limit] = useState(10);

  const [search, setSearch] = useState("");

  const [role, setRole] = useState("");

  const [openAdd, setOpenAdd] =
    useState(false);

  const [openEdit, setOpenEdit] =
    useState(false);

  const [selectedUser, setSelectedUser] =
    useState<IUser | null>(null);

  const {
    data,
    isLoading,
  } = useGetUsersQuery({
    page,
    limit,
    search,
    role,
  });

  const [deleteUser] =
    useDeleteUserMutation();

  const [blockUser] =
    useBlockUserMutation();

  const [unblockUser] =
    useUnblockUserMutation();

  const columns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      width: 80,
      renderCell: (params) => (
        <Avatar src={params.row.image} />
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
      flex: 1.3,
    },

    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
    },

    {
      field: "role",
      headerName: "Role",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color="primary"
          size="small"
        />
      ),
    },

    {
      field: "isVerified",
      headerName: "Verified",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={
            params.value
              ? "Verified"
              : "Pending"
          }
          color={
            params.value
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
      renderCell: (params) => (
        <Chip
          label={
            params.value
              ? "Blocked"
              : "Active"
          }
          color={
            params.value
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
      width: 220,
      sortable: false,

      renderCell: ({ row }) => (
        <Stack
          direction="row"
          spacing={1}
        >
          <IconButton
            color="primary"
            onClick={() => {
              setSelectedUser(row);
              setOpenEdit(true);
            }}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color="error"
            onClick={() =>
              deleteUser(row._id)
            }
          >
            <DeleteIcon />
          </IconButton>

          {row.isBlocked ? (
            <IconButton
              color="success"
              onClick={() =>
                unblockUser(row._id)
              }
            >
              <CheckCircleIcon />
            </IconButton>
          ) : (
            <IconButton
              color="warning"
              onClick={() =>
                blockUser(row._id)
              }
            >
              <BlockIcon />
            </IconButton>
          )}
        </Stack>
      ),
    },
  ];

  return (
    <Box>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
        }}
      >
        <Stack
        sx={{  direction:"row",
          justifyContent:"space-between",
          mb:3}}
        >
          <Typography variant="h5">
            Users Management
          </Typography>

          <Button
            startIcon={<AddIcon />}
            variant="contained"
            onClick={() =>
              setOpenAdd(true)
            }
          >
            Add User
          </Button>
        </Stack>

        <Grid
          container
        sx={{  spacing:2,
          mb:3}}
        >
          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              fullWidth
              placeholder="Search user..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 3,
            }}
          >
            <TextField
              fullWidth
              select
              label="Role"
              value={role}
              onChange={(e) =>
                setRole(
                  e.target.value
                )
              }
            >
              <MenuItem value="">
                All
              </MenuItem>

              <MenuItem value="farmer">
                Farmer
              </MenuItem>

              <MenuItem value="ngo">
                NGO
              </MenuItem>

              <MenuItem value="officer">
                Officer
              </MenuItem>

              <MenuItem value="ministry">
                Ministry
              </MenuItem>

              <MenuItem value="admin">
                Admin
              </MenuItem>
            </TextField>
          </Grid>
        </Grid>

        {isLoading ? (
          <CircularProgress />
        ) : (
          <DataGrid
            autoHeight
            rows={data?.data ?? []}
            columns={columns}
            getRowId={(row) =>
              row._id
            }
            rowCount={
              data?.total ?? 0
            }
            paginationMode="server"
            paginationModel={{
              page: page - 1,
              pageSize: limit,
            }}
            onPaginationModelChange={(
              model
            ) =>
              setPage(
                model.page + 1
              )
            }
          />
        )}
      </Paper>

      <AddUserDialog
        open={openAdd}
        onClose={() =>
          setOpenAdd(false)
        }
      />

      <EditUserDialog
        open={openEdit}
        onClose={() =>
          setOpenEdit(false)
        }
        user={selectedUser ?? undefined}
      />
    </Box>
  );
}