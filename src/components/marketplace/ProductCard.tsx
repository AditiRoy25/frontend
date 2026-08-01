"use client";

import Link from "next/link";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from "@mui/material";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Product } from "@/types/marketplace.types";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const image =
    product.images?.length > 0
      ? product.images[0]
      : "/images/product-placeholder.png";

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="220"
          image={image}
          alt={product.name}
        />

        <Chip
          label={
            product.status === "available"
              ? "Available"
              : product.status === "out_of_stock"
              ? "Out of Stock"
              : "Inactive"
          }
          color={
            product.status === "available"
              ? "success"
              : product.status === "out_of_stock"
              ? "warning"
              : "default"
          }
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Stack spacing={1}>
          <Typography
            variant="h6"
            fontWeight={700}
            noWrap
          >
            {product.name}
          </Typography>

          {product.brand && (
            <Typography
              variant="body2"
              color="text.secondary"
            >
              Brand: {product.brand}
            </Typography>
          )}

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Category: {product.category}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            Stock: {product.stock}
          </Typography>

          <Typography
            variant="h6"
            color="primary.main"
            fontWeight={700}
          >
            ₹{product.price.toLocaleString()}
          </Typography>
        </Stack>
      </CardContent>

      <CardActions
        sx={{
          p: 2,
          gap: 1,
        }}
      >
        <Button
          component={Link}
          href={`/marketplace/${product._id}`}
          variant="outlined"
          fullWidth
        >
          Details
        </Button>

        <Button
          variant="contained"
          fullWidth
          startIcon={<ShoppingCartIcon />}
          disabled={
            product.status !== "available"
          }
          onClick={() =>
            onAddToCart?.(product)
          }
        >
          Cart
        </Button>
      </CardActions>
    </Card>
  );
}