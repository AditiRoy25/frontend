"use client";

import { useMemo, useState } from "react";

import {
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";

import {
  useGetNgosQuery,
} from "@/src/redux/api/ngoApi";

import type {
  INgo,
} from "@/src/types/ngo.types";

import NgoHero from "@/src/components/public/ngo/NgoHero";
import NgoStatistics from "@/src/components/public/ngo/NgoStatistics";
import NgoFilters, {
  NgoFilterValues,
} from "@/src/components/public/ngo/NgoFilters";
import NgoCard from "@/src/components/public/ngo/NgoCard";

const PAGE_SIZE = 8;

export default function PublicNgoPage() {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGetNgosQuery(undefined);

  const [page, setPage] = useState(1);

  const [filters, setFilters] =
    useState<NgoFilterValues>({
      search: "",
      state: "",
      category: "",
      verified: false,
    });

  const ngos = useMemo<INgo[]>(() => {
  return data?.data ?? [];
}, [data]);
 const filteredNgos = useMemo(() => {
  return ngos.filter((ngo) => {
    const search =
      ngo.organizationName
        .toLowerCase()
        .includes(filters.search.toLowerCase());

    const verified =
      !filters.verified ||
      ngo.ministryApproval;

    return search && verified;
  });
}, [ngos, filters]);
  const totalPages =
    Math.ceil(
      filteredNgos.length /
        PAGE_SIZE
    );

  const paginated = filteredNgos.slice(
  (page - 1) * PAGE_SIZE,
  page * PAGE_SIZE
);


  return (
    <>
      <NgoHero />

      <NgoStatistics
        totalNgos={ngos.length}
        totalFarmers={0}
        totalWorkshops={0}
        totalStates={0}
      />

      <Container
        maxWidth="xl"
        sx={{
          py: 5,
        }}
      >
        <Stack spacing={4}>

          <Typography
            variant="h4"
            fontWeight={700}
          >
            Partner NGOs
          </Typography>

          <NgoFilters
            value={filters}
            onChange={(value) => {
              setFilters(
                value
              );
              setPage(1);
            }}
          />

          {isLoading && (
            <Box
              py={10}
              display="flex"
              justifyContent="center"
            >
              <CircularProgress />
            </Box>
          )}

          {isError && (
            <Alert
              severity="error"
            >
              Failed to load NGOs.
            </Alert>
          )}

          {!isLoading &&
            !isError && (
              <>
                <Grid
                  container
                  spacing={3}
                >
                  {paginated.map(
                    (ngo) => (
                      <Grid
                        key={
                          ngo._id
                        }
                        size={{
                          xs: 12,
                          sm: 6,
                          md: 4,
                          lg: 3,
                        }}
                      >
                        <NgoCard
                          ngo={ngo}
                        />
                      </Grid>
                    )
                  )}
                </Grid>

                {totalPages >
                  1 && (
                  <Box
                    display="flex"
                    justifyContent="center"
                    mt={4}
                  >
                    <Pagination
                      page={
                        page
                      }
                      count={
                        totalPages
                      }
                      color="primary"
                      onChange={(
                        _,
                        value
                      ) =>
                        setPage(
                          value
                        )
                      }
                    />
                  </Box>
                )}
              </>
            )}

        </Stack>
      </Container>
    </>
  );
}