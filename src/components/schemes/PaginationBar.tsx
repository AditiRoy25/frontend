"use client";

import { Box, Pagination } from "@mui/material";

interface PaginationBarProps {
  page?: number;
  totalPages?: number;
  onChange?: (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => void;
}

export default function PaginationBar({
  page = 1,
  totalPages = 10,
  onChange,
}: PaginationBarProps) {
  return (
    <Box
      sx={{display:"flex",
      justifyContent:"center",
      mt:4}}
    >
      <Pagination
        page={page}
        count={totalPages}
        color="primary"
        size="large"
        shape="rounded"
        onChange={onChange}
        showFirstButton
        showLastButton
      />
    </Box>
  );
}