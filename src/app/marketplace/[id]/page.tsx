"use client";

import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

import ProductGallery from "@/src/components/marketplace/ProductGallery";
import ProductInfo from "@/src/components/marketplace/ProductInfo";
import ProductDescription from "@/src/components/marketplace/ProductDescription";
// import RelatedProducts from "@/src/components/marketplace/RelatedProducts";

import {
  Box,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import { useParams } from "next/navigation";
import { useGetProductQuery } from "../../../redux/api/maketplaceApi";

export default function ProductDetailsPage() {
  const params = useParams();

  const { data, isLoading, error } = useGetProductQuery(
    params.id as string
  );

  if (isLoading) {
    return (
      <Container sx={{ py: 10 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (error || !data?.product) {
    return (
      <Container sx={{ py: 10 }}>
        <Typography color="error">
          Product not found.
        </Typography>
      </Container>
    );
  }

  const product = data.product;

  return (
    <>
      <Navbar />

      <Box sx={{ py: 8 }}>
        <Container maxWidth="xl">
          <Grid
            container
            spacing={5}
          >
            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <ProductGallery
                images={product.images}
              />
            </Grid>

            <Grid
              size={{
                xs: 12,
                md: 6,
              }}
            >
              <ProductInfo
                product={product}
              />
            </Grid>
          </Grid>

          <ProductDescription
            product={product}
          />

          {/* <RelatedProducts /> */}
        </Container>
      </Box>

      <Footer />
    </>
  );
}