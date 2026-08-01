"use client";

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";

import Sidebar from "./Sidebar";
import Header from "./Header";
import WelcomeBanner from "./WelcomeBanner";
import StatsCards from "./StartsCard";
import FarmOverview from "./FarmOverview";
import WeatherCard from "./WeatherCard";
import QuickActions from "./QuickActions";
import CropCalendar from "./CropCalender";
import AIRecommendation from "./AIRecommendation";
import Notifications from "./Notifications";
import LearningPortal from "./LearningProtal";
import DashboardCharts from "./DashboardCharts";
import MarketplaceOrders from "./MarketplaceOrder";
import GovernmentSchemeCard from "./GovernmentSchemeCard";
import SoilHealthCard from "./SoilHealth";
import WeatherForecast from "./WeatherCard";
import RecentActivity from "./RecentActivity";
import HelpCard from "./Helpcard";

export default function DashboardLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F5F7FA",
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            bgcolor: "#F5F7FA",
            overflowY: "auto",
          }}
        >
          {/* Welcome */}
          <WelcomeBanner />

          {/* Statistics */}
          <StatsCards />

          {/* Farm + Weather */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, lg: 8 }}>
              <FarmOverview />
            </Grid>

            <Grid size={{ xs: 12, lg: 4 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <WeatherCard />
                <QuickActions />
              </Box>
            </Grid>
          </Grid>

          {/* Calendar + AI + Notifications + Learning */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <CropCalendar />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <AIRecommendation />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Notifications />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <LearningPortal />
            </Grid>
          </Grid>

          {/* Analytics */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, lg: 8 }}>
              <DashboardCharts />
            </Grid>

            <Grid size={{ xs: 12, lg: 4 }}>
              <MarketplaceOrders />
            </Grid>
          </Grid>

          {/* Schemes + Soil */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <GovernmentSchemeCard />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <SoilHealthCard />
            </Grid>
          </Grid>

          {/* Forecast + Activities */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, lg: 6 }}>
              <WeatherForecast />
            </Grid>

            <Grid size={{ xs: 12, lg: 6 }}>
              <RecentActivity />
            </Grid>
          </Grid>

          {/* Help */}
          <Box sx={{mt:3}}>
            <HelpCard />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
