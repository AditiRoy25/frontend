"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import NgoTable from "@/src/components/admin/ngos/NgoTable";
import NgoFilters, {
  NgoFilterValues,
} from "@/src/components/admin/ngos/NgoFilters";
import NgoDetailsDialog from "@/src/components/admin/ngos/NgoDetailsDialog";
import BlockNgoDialog from "@/src/components/admin/ngos/BlockNgoDialog";

import {
  useBlockNgoMutation,
  useGetNgosQuery,
  useUnblockNgoMutation,
} from "@/src/redux/api/ngoApi";

import type { INgo } from "@/src/types/ngo.types";

export default function NgoManagementPage() {
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetNgosQuery();

  const [blockNgo] =
    useBlockNgoMutation();

  const [unblockNgo] =
    useUnblockNgoMutation();

  const [selectedNgo, setSelectedNgo] =
    useState<INgo | null>(null);

  const [detailsOpen, setDetailsOpen] =
    useState(false);

  const [blockDialogOpen, setBlockDialogOpen] =
    useState(false);

  const [filters, setFilters] =
    useState<NgoFilterValues>({
      search: "",
      status: "",
      verified: "",
    });

  const ngos =
    data?.ngos ??
    data?.data ??
    [];

  const filteredNgos = useMemo(() => {
    return ngos.filter((ngo) => {
      const matchSearch =
        !filters.search ||
        ngo.name
          ?.toLowerCase()
          .includes(
            filters.search.toLowerCase()
          ) ||
        ngo.email
          ?.toLowerCase()
          .includes(
            filters.search.toLowerCase()
          );

      const matchStatus =
        !filters.status ||
        (filters.status ===
          "blocked"
          ? ngo.isBlocked
          : !ngo.isBlocked);

      const matchVerified =
        !filters.verified ||
        (filters.verified ===
          "true"
          ? ngo.isVerified
          : !ngo.isVerified);

      return (
        matchSearch &&
        matchStatus &&
        matchVerified
      );
    });
  }, [ngos, filters]);

  const handleView = (
    id: string
  ) => {
    const ngo =
      ngos.find(
        (item) => item._id === id
      ) || null;

    setSelectedNgo(ngo);
    setDetailsOpen(true);
  };

  const handleEdit = (
    id: string
  ) => {
    router.push(
      `/admin/ngos/edit/${id}`
    );
  };

  const handleBlockClick = (
    id: string
  ) => {
    const ngo =
      ngos.find(
        (item) => item._id === id
      ) || null;

    setSelectedNgo(ngo);
    setBlockDialogOpen(true);
  };

  const handleConfirm = async () => {
    if (!selectedNgo) return;

    try {
      if (selectedNgo.isBlocked) {
        await unblockNgo(
          selectedNgo._id
        ).unwrap();
      } else {
        await blockNgo(
          selectedNgo._id
        ).unwrap();
      }

      setBlockDialogOpen(false);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

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
          Failed to load NGOs.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl">
      <Stack spacing={3}>
        <Typography
          variant="h4"
          fontWeight={700}
        >
          NGO Management
        </Typography>

        <NgoFilters
          values={filters}
          onChange={(key, value) =>
            setFilters((prev) => ({
              ...prev,
              [key]: value,
            }))
          }
          onReset={() =>
            setFilters({
              search: "",
              status: "",
              verified: "",
            })
          }
        />

        <NgoTable
          ngos={filteredNgos}
          onView={handleView}
          onEdit={handleEdit}
          onBlock={handleBlockClick}
          onUnblock={
            handleBlockClick
          }
        />

        <NgoDetailsDialog
          open={detailsOpen}
          ngo={selectedNgo}
          onClose={() =>
            setDetailsOpen(false)
          }
        />

        <BlockNgoDialog
          open={blockDialogOpen}
          isBlocked={
            selectedNgo?.isBlocked ??
            false
          }
          onClose={() =>
            setBlockDialogOpen(false)
          }
          onConfirm={handleConfirm}
        />
      </Stack>
    </Container>
  );
}