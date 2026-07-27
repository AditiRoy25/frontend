"use client";

import {
  Button,
  Rating,
  Stack,
  Typography,
  TextField,
} from "@mui/material";

interface ProductInfoProps {
  product: {
    _id: string;
    name: string;
    brand?: string;
    category: string;
    price: number;
    stock: number;
    description?: string;
  };
}

export default function ProductInfo({
  product,
}: ProductInfoProps) {
  return (
    <>
      <Typography
        variant="h4"
        sx={{ fontWeight: 700 }}
      >
        {product.name}
      </Typography>

      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        sx={{ mt: 2 }}
      >
        <Rating
          value={4.5}
          precision={0.5}
          readOnly
        />

        <Typography>
          4.5
        </Typography>
      </Stack>

      <Typography
        variant="h3"
        color="primary"
        sx={{
          fontWeight: 700,
          mt: 3,
        }}
      >
        ${product.price}
      </Typography>

      <Typography sx={{ mt: 2 }}>
        Brand:
        <b> {product.brand || "N/A"}</b>
      </Typography>

      <Typography sx={{ mt: 1 }}>
        Category:
        <b> {product.category}</b>
      </Typography>

      <Typography sx={{ mt: 1 }}>
        Stock:
        <b> {product.stock} Available</b>
      </Typography>

      <TextField
        type="number"
        label="Quantity"
        defaultValue={1}
        size="small"
        sx={{
          mt: 3,
          width: 150,
        }}
      />

      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 4 }}
      >
        <Button variant="contained">
          Add To Cart
        </Button>

        <Button variant="outlined">
          Buy Now
        </Button>
      </Stack>
    </>
  );
}