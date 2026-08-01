"use client";

import Link from "next/link";

import {
  Alert,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import {
  useGetProductsQuery,
  useGetAllOrdersQuery,
} from "../../redux/api/maketplaceApi";

export default function MarketplaceDashboardPage() {
  const {
    data: productsData,
    isLoading: productsLoading,
    isError: productsError,
  } = useGetProductsQuery();

  const {
    data: ordersData,
    isLoading: ordersLoading,
    isError: ordersError,
  } = useGetAllOrdersQuery();

  if (productsLoading || ordersLoading) {
    return (
      <Container
        maxWidth="xl"
        sx={{
          py: 8,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (productsError || ordersError) {
    return (
      <Container
        maxWidth="xl"
        sx={{ py: 4 }}
      >
        <Alert severity="error">
          Failed to load dashboard data.
        </Alert>
      </Container>
    );
  }

  const products =
    productsData?.products ?? [];

  const orders =
    ordersData?.orders ?? [];

  const totalRevenue =
    orders.reduce(
      (sum, order) =>
        sum + order.totalAmount,
      0
    );

  const lowStock =
    products.filter(
      (product) =>
        product.stock <= 5
    );

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4 }}
    >
      <Stack spacing={4}>
        <Typography
          variant="h4"
          sx={{fontWeight:700}}
        >
          Marketplace Dashboard
        </Typography>

        <Grid
          container
          spacing={3}
        >
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Inventory2Icon
                    color="primary"
                    fontSize="large"
                  />

                  <Typography color="text.secondary">
                    Total Products
                  </Typography>

                  <Typography
                    variant="h4"
                   sx={{fontWeight:700}}
                  >
                    {products.length}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <ShoppingCartIcon
                    color="success"
                    fontSize="large"
                  />

                  <Typography color="text.secondary">
                    Total Orders
                  </Typography>

                  <Typography
                    variant="h4"
                   sx={{fontWeight:700}}
                  >
                    {orders.length}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <CurrencyRupeeIcon
                    color="warning"
                    fontSize="large"
                  />

                  <Typography color="text.secondary">
                    Revenue
                  </Typography>

                  <Typography
                    variant="h4"
                     sx={{fontWeight:700}}
                  >
                    ₹{totalRevenue}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 3,
            }}
          >
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <WarningAmberIcon
                    color="error"
                    fontSize="large"
                  />

                  <Typography color="text.secondary">
                    Low Stock
                  </Typography>

                  <Typography
                    variant="h4"
                     sx={{fontWeight:700}}
                  >
                    {lowStock.length}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card>
          <CardContent>
            <Typography
              variant="h6"
              sx={{fontWeight:700,mb:3}}
             
            >
              Quick Actions
            </Typography>

            <Stack
         sx={{     direction:"row",
              spacing:2,
              flexWrap:"wrap"}}
            >
              <Button
                component={Link}
                href="/admin/marketplace/create"
                variant="contained"
                startIcon={<AddCircleIcon />}
              >
                Add Product
              </Button>

              <Button
                component={Link}
                href="/admin/marketplace/products"
                variant="outlined"
              >
                Manage Products
              </Button>

              <Button
                component={Link}
                href="/admin/marketplace/orders"
                variant="outlined"
              >
                Manage Orders
              </Button>

              <Button
                component={Link}
                href="/admin/marketplace/reports"
                variant="outlined"
              >
                Reports
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}