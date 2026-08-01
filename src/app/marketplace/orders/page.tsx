"use client";

import {
  Box,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { useGetMyOrdersQuery } from "../../../redux/api/maketplaceApi";

export default function OrdersPage() {
  const {
    data,
    isLoading,
    isError,
  } = useGetMyOrdersQuery();

  if (isLoading) {
    return (
      <Container sx={{ py: 5 }}>
        <Typography>
          Loading orders...
        </Typography>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container sx={{ py: 5 }}>
        <Typography color="error">
          Failed to load orders.
        </Typography>
      </Container>
    );
  }

  if (!data?.orders.length) {
    return (
      <Container sx={{ py: 5 }}>
        <Typography
          variant="h5"
         sx={{ textAlign:"center"}}
        >
          No Orders Found
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ py: 5 }}
    >
      <Typography
        variant="h4"
         sx={{fontWeight:700,
            mb:4}}
        
      >
        My Orders
      </Typography>

      <Stack spacing={3}>
        {data.orders.map((order) => (
          <Card key={order._id}>
            <CardContent>
              <Stack spacing={2}>
                <Grid
                  container
                  spacing={2}
                >
                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <Typography
                       sx={{fontWeight:700}}
                    >
                      Order ID
                    </Typography>

                    <Typography
                      color="text.secondary"
                    >
                      {order._id}
                    </Typography>
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <Typography
                       sx={{fontWeight:700}}
                    >
                      Farmer
                    </Typography>

                    <Typography
                      color="text.secondary"
                    >
                      {order.farmer}
                    </Typography>
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <Typography
                        sx={{fontWeight:700}}
                    >
                      Payment Status
                    </Typography>

                    <Chip
                      label={
                        order.paymentStatus
                      }
                      color={
                        order.paymentStatus ===
                        "paid"
                          ? "success"
                          : order.paymentStatus ===
                            "pending"
                          ? "warning"
                          : "error"
                      }
                    />
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                      md: 6,
                    }}
                  >
                    <Typography
                      sx={{fontWeight:700}}
                    >
                      Order Status
                    </Typography>

                    <Chip
                      label={
                        order.orderStatus
                      }
                      color={
                        order.orderStatus ===
                        "delivered"
                          ? "success"
                          : order.orderStatus ===
                            "processing"
                          ? "warning"
                          : order.orderStatus ===
                            "shipped"
                          ? "info"
                          : "error"
                      }
                    />
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                    }}
                  >
                    <Typography
                       sx={{fontWeight:700}}
                    >
                      Ordered Products
                    </Typography>

                    <Divider
                      sx={{ my: 1 }}
                    />

                    <Stack spacing={1}>
                      {order.products.map(
                        (
                          product,
                          index
                        ) => (
                          <Box
                            key={index}
                          >
                            <Typography>
                              Product ID:
                              {" "}
                              {
                                product.product
                              }
                            </Typography>

                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              Quantity:
                              {" "}
                              {
                                product.quantity
                              }
                            </Typography>

                            <Typography
                              variant="body2"
                              color="text.secondary"
                            >
                              Price:
                              ₹
                              {product.price.toLocaleString()}
                            </Typography>
                          </Box>
                        )
                      )}
                    </Stack>
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                    }}
                  >
                    <Divider
                      sx={{ my: 2 }}
                    />

                    <Stack
                     sx={{ direction:"row",
                      justifyContent:"space-between"}}
                    >
                      <Typography
                        variant="h6"
                        sx={{fontWeight:700}}
                      >
                        Total Amount
                      </Typography>

                      <Typography
                        variant="h6"
                          sx={{fontWeight:700}}
                        color="primary.main"
                      >
                        ₹
                        {order.totalAmount.toLocaleString()}
                      </Typography>
                    </Stack>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                     sx={{ mt:1}}
                    >
                      Ordered on{" "}
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </Typography>
                  </Grid>
                </Grid>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}