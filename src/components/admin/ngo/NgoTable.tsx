"use client";

import {
  Avatar,
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import type { INgo } from "@/src/types/ngo.types";

interface NgoTableProps {
  ngos: INgo[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onBlock: (id: string) => void;
  onUnblock: (id: string) => void;
}

export default function NgoTable({
  ngos,
  onView,
  onEdit,
  onBlock,
  onUnblock,
}: NgoTableProps) {
  return (
    <TableContainer component={Paper}>
      <Table>

        <TableHead>
          <TableRow>
            <TableCell>NGO</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Verification</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {ngos.map((ngo) => (
            <TableRow
              key={ngo._id}
              hover
            >
              <TableCell>
                <Stack
                  sx={{direction:"row",
                  spacing:2,
                  alignItems:"center"}}
                >
                  <Avatar
                    src={ngo.profileImage}
                    alt={ngo.name}
                  />

                  <Typography>
                    {ngo.name}
                  </Typography>
                </Stack>
              </TableCell>

              <TableCell>
                {ngo.email}
              </TableCell>

              <TableCell>
                {ngo.phone}
              </TableCell>

              <TableCell>
                {ngo.role}
              </TableCell>

              <TableCell>
                <Chip
                  size="small"
                  color={
                    ngo.isVerified
                      ? "success"
                      : "warning"
                  }
                  label={
                    ngo.isVerified
                      ? "Verified"
                      : "Pending"
                  }
                />
              </TableCell>

              <TableCell>
                <Chip
                  size="small"
                  color={
                    ngo.isBlocked
                      ? "error"
                      : "success"
                  }
                  label={
                    ngo.isBlocked
                      ? "Blocked"
                      : "Active"
                  }
                />
              </TableCell>

              <TableCell align="center">

                <Tooltip title="View">
                  <IconButton
                    onClick={() =>
                      onView(ngo._id)
                    }
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Edit">
                  <IconButton
                    color="primary"
                    onClick={() =>
                      onEdit(ngo._id)
                    }
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                {ngo.isBlocked ? (
                  <Tooltip title="Unblock">
                    <IconButton
                      color="success"
                      onClick={() =>
                        onUnblock(
                          ngo._id
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
                        onBlock(
                          ngo._id
                        )
                      }
                    >
                      <BlockIcon />
                    </IconButton>
                  </Tooltip>
                )}

              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}