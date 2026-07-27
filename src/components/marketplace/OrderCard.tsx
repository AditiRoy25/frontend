"use client";

import {
  Box,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

interface OrderCardProps {
  order: {
    _id: string;
    totalAmount: number;
    status: string;
    createdAt: string;
    paymentMethod: string;
  };
}

export default function OrderCard({
  order,
}: OrderCardProps) {
  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        borderRadius: 4,
      }}
    >
      <Stack
        sx={{direction:"row",
        justifyContent:"space-between"}}
      >
        <Box>
          <Typography
            variant="h6"
          sx={{  fontWeight:700}}
          >
            Order #{order._id}
          </Typography>

          <Typography
            color="text.secondary"
          >
            {new Date(
              order.createdAt
            ).toLocaleDateString()}
          </Typography>

          <Typography sx={{mt:1}}>
            Payment :
            {" "}
            {order.paymentMethod}
          </Typography>
        </Box>

        <Box sx={{textAlign:"right"}}>
          <Typography
            variant="h6"
            sx={{color:"primary",
            fontWeight:700}}
          >
            ${order.totalAmount}
          </Typography>

          <Chip
            label={order.status}
            color={
              order.status ===
              "DELIVERED"
                ? "success"
                : order.status ===
                  "PENDING"
                ? "warning"
                : "info"
            }
            sx={{ mt: 1 }}
          />
        </Box>
      </Stack>
    </Paper>
  );
}