"use client";

import { useRouter } from "next/navigation";

import {
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import ProductForm from "@/components/admin/marketplace/ProductForm";

import {
  useCreateProductMutation,
} from "@/redux/api/marketplaceApi";

import {
  ProductFormValues,
} from "@/types/marketplace.types";

export default function CreateProductPage() {
  const router = useRouter();

  const [createProduct, { isLoading }] =
    useCreateProductMutation();

  const handleSubmit = async (
    values: ProductFormValues
  ) => {
    try {
      await createProduct(values).unwrap();

      router.push(
        "/admin/marketplace/products"
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 4 }}
    >
      <Paper
        elevation={3}
        sx={{ p: 4 }}
      >
        <Stack spacing={3}>
          <Typography
            variant="h4"
            fontWeight={700}
          >
            Add New Product
          </Typography>

          <Typography
            color="text.secondary"
          >
            Fill in the information below to
            create a new marketplace product.
          </Typography>

          <ProductForm
            loading={isLoading}
            onSubmit={handleSubmit}
          />
        </Stack>
      </Paper>
    </Container>
  );
}