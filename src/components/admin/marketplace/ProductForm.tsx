"use client";

import * as React from "react";

import {
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  Controller,
  useForm,
} from "react-hook-form";

import type {
  CreateProductPayload,
} from "@/src/types/marketplace.types";

interface ProductFormProps {
  defaultValues?: Partial<CreateProductPayload>;
  loading?: boolean;
  onSubmit: (
    values: CreateProductPayload
  ) => void;
}

const initialValues: CreateProductPayload = {
  name: "",
  description: "",
  category: "seed",
  price: 0,
  stock: 0,
  status: "available",
  image: null,
};

export default function ProductForm({
  defaultValues,
  loading = false,
  onSubmit,
}: ProductFormProps) {
  const [preview, setPreview] =
    React.useState<string>();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } =
    useForm<CreateProductPayload>({
      defaultValues: {
        ...initialValues,
        ...defaultValues,
      },
    });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid
        container
        spacing={2}
      >
        {/* Product Name */}

        <Grid
          size={{ xs: 12 }}
        >
          <TextField
            label="Product Name"
            fullWidth
            error={!!errors.name}
            helperText={
              errors.name?.message
            }
            {...register("name", {
              required:
                "Product name is required",
              minLength: {
                value: 3,
                message:
                  "Minimum 3 characters",
              },
            })}
          />
        </Grid>

        {/* Description */}

        <Grid
          size={{ xs: 12 }}
        >
          <TextField
            label="Description"
            multiline
            rows={4}
            fullWidth
            error={
              !!errors.description
            }
            helperText={
              errors.description
                ?.message
            }
            {...register(
              "description",
              {
                required:
                  "Description is required",
              }
            )}
          />
        </Grid>

        {/* Category */}

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Controller
            name="category"
            control={control}
            rules={{
              required:
                "Category is required",
            }}
            render={({
              field,
            }) => (
              <TextField
                {...field}
                select
                label="Category"
                fullWidth
                error={
                  !!errors.category
                }
                helperText={
                  errors.category
                    ?.message
                }
              >
                <MenuItem value="seed">
                  Seed
                </MenuItem>

                <MenuItem value="fertilizer">
                  Fertilizer
                </MenuItem>

                <MenuItem value="tractor">
                  Tractor
                </MenuItem>

                <MenuItem value="harvester">
                  Harvester
                </MenuItem>

                <MenuItem value="pump">
                  Pump
                </MenuItem>

                <MenuItem value="sprayer">
                  Sprayer
                </MenuItem>

                <MenuItem value="tool">
                  Tool
                </MenuItem>
              </TextField>
            )}
          />
        </Grid>

        {/* Price */}

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <TextField
            label="Price"
            type="number"
            fullWidth
            error={!!errors.price}
            helperText={
              errors.price?.message
            }
            {...register("price", {
              required:
                "Price is required",
              valueAsNumber: true,
              min: {
                value: 1,
                message:
                  "Price must be greater than 0",
              },
            })}
          />
        </Grid>

        {/* Stock */}

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <TextField
            label="Stock"
            type="number"
            fullWidth
            error={!!errors.stock}
            helperText={
              errors.stock?.message
            }
            {...register("stock", {
              required:
                "Stock is required",
              valueAsNumber: true,
              min: {
                value: 0,
                message:
                  "Stock cannot be negative",
              },
            })}
          />
        </Grid>

        {/* Status */}

        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <Controller
            name="status"
            control={control}
            render={({
              field,
            }) => (
              <TextField
                {...field}
                select
                label="Status"
                fullWidth
              >
                <MenuItem value="available">
                  Available
                </MenuItem>

                <MenuItem value="out_of_stock">
                  Out of Stock
                </MenuItem>

                <MenuItem value="inactive">
                  Inactive
                </MenuItem>
              </TextField>
            )}
          />
        </Grid>

        {/* Image */}

        <Grid
          size={{ xs: 12 }}
        >
          <Controller
            name="image"
            control={control}
            rules={{
              required:
                "Product image is required",
            }}
            render={({
              field: {
                onChange,
              },
            }) => (
              <>
                <Typography
                  variant="body2"
                  mb={1}
                >
                  Product Image
                </Typography>

                <input
                  type="file"
                  accept="image/*"
                  onChange={(
                    e
                  ) => {
                    const file =
                      e.target
                        .files?.[0] ??
                      null;

                    onChange(file);

                    if (file) {
                      setPreview(
                        URL.createObjectURL(
                          file
                        )
                      );
                    }
                  }}
                />

                {errors.image && (
                  <Typography
                    color="error"
                    variant="body2"
                    mt={1}
                  >
                    {
                      errors.image
                        .message
                    }
                  </Typography>
                )}

                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    style={{
                      width: 180,
                      marginTop: 16,
                      borderRadius: 8,
                      objectFit:
                        "cover",
                    }}
                  />
                )}
              </>
            )}
          />
        </Grid>
      </Grid>

      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        mt={4}
      >
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : "Save Product"}
        </Button>
      </Stack>
    </form>
  );
}