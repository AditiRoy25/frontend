"use client";

import SearchIcon from "@mui/icons-material/Search";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import SecurityIcon from "@mui/icons-material/Security";

import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function MarketplaceHero() {
  return (
    <Box
      sx={{
        bgcolor: "#F8FBF8",
        py: 8,
      }}
    >
      <Container maxWidth="xl">

        <Grid
          container
          sx={{spacing:5,
          alignItems:"center"}}
        >

          {/* Left */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Typography
              sx={{
                bgcolor: "#E8F5E9",
                display: "inline-block",
                px: 2,
                py: 1,
                borderRadius: 5,
                fontWeight: 600,
                mb: 3,
              }}
            >
              🌾 Trusted Agriculture Marketplace
            </Typography>

            <Typography
              variant="h2"
              sx={{fontWeight:700}}
            >
              India's Trusted

              <Box
                component="span"
                color="primary.main"
              >
                {" "}Agriculture
              </Box>

              Marketplace
            </Typography>

            <Typography
              sx={{
                mt: 3,
                color: "text.secondary",
                fontSize: 18,
                lineHeight: 1.8,
              }}
            >
              Buy quality seeds,
              fertilizers,
              equipment and farming
              products directly from
              trusted sellers.
            </Typography>

            {/* Search */}

          <Paper
  sx={{
    mt: 5,
    display: "flex",
    alignItems: "center",
    p: 0.5,
    borderRadius: 3,
    maxWidth: 500,
  }}
>
  <TextField
    fullWidth
    size="small"
    placeholder="Search products..."
    variant="standard"
    slotProps={{
      input: {
        disableUnderline: true,
        startAdornment: (
          <SearchIcon
            sx={{
              mr: 1,
              fontSize: 20,
            }}
          />
        ),
      },
    }}
    sx={{
      "& .MuiInputBase-root": {
        fontSize: 15,
      },
    }}
  />

  <Button
    variant="contained"
    size="small"
    sx={{
      px: 3,
      py: 1,
      borderRadius: 2,
      ml: 1,
    }}
  >
    Search
  </Button>
</Paper>

           <Stack
  direction="row"
  spacing={3}
  sx={{
    mt: 4,
    flexWrap: "wrap",
    alignItems: "center",
  }}
>
  <Stack sx={{direction:"row", spacing:1, alignItems:"center"}}>
    <VerifiedIcon color="success" />
    <Typography>Quality Assured</Typography>
  </Stack>

  <Stack sx={{direction:"row", spacing:1, alignItems:"center"}}>
    <SecurityIcon color="success" />
    <Typography>Secure Payments</Typography>
  </Stack>

  <Stack sx={{direction:"row", spacing:1, alignItems:"center"}}>
    <LocalShippingIcon color="success" />
    <Typography>Fast Delivery</Typography>
  </Stack>

  {/* <Stack direction="row" spacing={1} alignItems="center">
    <AutorenewIcon color="success" />
    <Typography>Easy Returns</Typography>
  </Stack> */}
</Stack>

          </Grid>

          {/* Right */}

    <Grid
  size={{
    xs: 12,
    md: 6,
  }}
>
  <Box
    sx={{
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    }}
  >
    <Box
      component="img"
      src="/images/seedthrow.jpg"
      alt="Agriculture"
      sx={{
        width: "100%",
        maxWidth: 600,
        display: "block",
        mixBlendMode: "multiply",
        opacity: 0.95,
        maskImage:
          "linear-gradient(to bottom, black 85%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, black 85%, transparent)",
      }}
    />
  </Box>
</Grid>

        </Grid>

      </Container>
    </Box>
  );
}