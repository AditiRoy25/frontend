"use client";

import {
  Container,
  Grid,
  Stack,
} from "@mui/material";

import NgoDashboardHeader from "@/src/components/ngo/NgoDashboardHeader";
import NgoStatsCards from "@/src/components/ngo/NgoStatsCards";
import NgoQuickActions from "@/src/components/ngo/NgoQuickActions";
import NgoRecentActivities from "@/src/components/ngo/NgoRecentActivities";

import {
  useGetMyStatisticsQuery,
  useGetMyNgoQuery,
} from "@/src/redux/api/ngoApi";

export default function NgoDashboardPage() {

  const {
    data: ngoData,
  } = useGetMyNgoQuery();

  const {
    data: statsData,
    isLoading,
  } = useGetMyStatisticsQuery();

  const ngo =
    ngoData?.ngo ??
    ngoData?.data;

  const stats =
    statsData?.statistics ??
    {};

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4 }}
    >
      <Stack spacing={4}>

        <NgoDashboardHeader
          ngoName={
            ngo?.name ??
            "NGO"
          }
        />

        <NgoStatsCards
          totalWorkshops={
            stats.totalWorkshops ??
            0
          }
          totalBeneficiaries={
            stats.totalBeneficiaries ??
            0
          }
          totalReports={
            stats.totalReports ??
            0
          }
          totalDonations={
            stats.totalDonations ??
            0
          }
        />

        <NgoQuickActions />

        <Grid
          container
          spacing={3}
        >
          <Grid
            size={{
              xs: 12,
              md: 8,
            }}
          >
            <NgoRecentActivities />
          </Grid>

          <Grid
            size={{
              xs: 12,
              md: 4,
            }}
          >
            {/* Upcoming:
                Notification Card
                Profile Completion
                Upcoming Workshops
            */}
          </Grid>
        </Grid>

      </Stack>
    </Container>
  );
}