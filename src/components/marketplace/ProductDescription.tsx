"use client";

import {
  Paper,
  Typography,
} from "@mui/material";

interface ProductDescriptionProps {
  product: {
    description?: string;
  };
}

export default function ProductDescription({
  product,
}: ProductDescriptionProps) {
  return (
    <Paper
      sx={{
        mt: 6,
        p: 4,
        borderRadius: 4,
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: 700 }}
      >
        Description
      </Typography>

      <Typography
        sx={{
          mt: 2,
          color: "text.secondary",
        }}
      >
        {product.description ||
          "No description available."}
      </Typography>
    </Paper>
  );
}