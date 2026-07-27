"use client";

import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import ProductCard from "./ProductCard";

const products = [
  {
    _id: "1",
    name: "Hybrid Maize Seeds",
    image:
      "/images/seed.png",
    category: "Seeds",
    price: 320,
    originalPrice: 400,
    rating: 4.5,
    seller: "Green Harvest",
    discount: 20,
  },

  {
    _id: "2",
    name: "Vermi Compost",
    image:
      "/images/compos.jpg",
    category: "Bio Fertilizer",
    price: 212,
    originalPrice: 250,
    rating: 4.7,
    seller: "Organic India",
    discount: 15,
  },

  {
    _id: "3",
    name: "Battery Sprayer",
    image:
      "/images/spry.webp",
    category: "Equipment",
    price: 1799,
    originalPrice: 2000,
    rating: 4.4,
    seller: "Kisan Mart",
    discount: 10,
  },

  {
    _id: "4",
    name: "DAP Fertilizer",
    image:
      "/images/fer.webp",
    category: "Fertilizer",
    price: 1350,
    originalPrice: 1800,
    rating: 4.7,
    seller: "Bharat Fertilizers",
    discount: 25,
  },
];

export default function TopProducts() {
  return (
    <Box sx={{py:8}}>
      <Container maxWidth="xl">

        <Typography
          variant="h4"
        sx={{  fontWeight:700,
          mb:5}}
        >
          Top Products
        </Typography>

        <Grid
          container
          spacing={3}
        >
          {products.map((product) => (
            <Grid
              key={product._id}
              size={{
                xs: 12,
                sm: 6,
                md: 3,
              }}
            >
              <ProductCard
                product={product}
              />
            </Grid>
          ))}
        </Grid>

      </Container>
    </Box>
  );
}