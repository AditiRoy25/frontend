"use client";

import {
  Box,
  Container,
  Stack,
} from "@mui/material";

import HeroSection from "../../components/schemes/SchemeHeroSection";
import SearchFilters from "@/src/components/schemes/SearchFilters";
import SchemeStats from "@/src/components/schemes/SchemeStats";
import SchemeList from "@/src/components/schemes/SchemeList";
import PaginationBar from "@/src/components/schemes/PaginationBar";

export default function SchemesPage() {
  return (
    <Box sx={{py:5}}>
      <Container maxWidth="xl">
        <Stack spacing={4}>
          <HeroSection />

          <SearchFilters />

          <SchemeStats />

          <SchemeList />

          <PaginationBar />
        </Stack>
      </Container>
    </Box>
  );
}