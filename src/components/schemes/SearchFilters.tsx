"use client";

import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import {
  Button,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function SearchFilters() {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          <Stack
           sx={{ direction:"row",
            spacing:1,
            alignItems:"center"}}
          >
            <FilterAltIcon color="primary" />

            <Typography
              variant="h6"
             sx={{ fontWeight:600}}
            >
              Search & Filter Schemes
            </Typography>
          </Stack>

          <Grid
            container
            spacing={2}
          >
            <Grid
              size={{
                xs: 12,
                md: 4,
              }}
            >
        <TextField
  fullWidth
  placeholder="Search by scheme name..."
  slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">
          <SearchIcon color="action" />
        </InputAdornment>
      ),
    },
  }}
/>
            </Grid>

            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 2,
              }}
            >
              <TextField
                select
                fullWidth
                label="Category"
                defaultValue=""
              >
                <MenuItem value="">
                  All Categories
                </MenuItem>

                <MenuItem value="central">
                  Central Scheme
                </MenuItem>

                <MenuItem value="state">
                  State Scheme
                </MenuItem>

                <MenuItem value="subsidy">
                  Subsidy
                </MenuItem>

                <MenuItem value="insurance">
                  Insurance
                </MenuItem>
              </TextField>
            </Grid>

            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 2,
              }}
            >
              <TextField
                select
                fullWidth
                label="State"
                defaultValue=""
              >
                <MenuItem value="">
                  All States
                </MenuItem>

                <MenuItem value="wb">
                  West Bengal
                </MenuItem>

                <MenuItem value="odisha">
                  Odisha
                </MenuItem>

                <MenuItem value="bihar">
                  Bihar
                </MenuItem>

                <MenuItem value="assam">
                  Assam
                </MenuItem>
              </TextField>
            </Grid>

            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 2,
              }}
            >
              <TextField
                select
                fullWidth
                label="Eligibility"
                defaultValue=""
              >
                <MenuItem value="">
                  All Farmers
                </MenuItem>

                <MenuItem value="small">
                  Small Farmer
                </MenuItem>

                <MenuItem value="marginal">
                  Marginal Farmer
                </MenuItem>

                <MenuItem value="women">
                  Women Farmer
                </MenuItem>
              </TextField>
            </Grid>

            <Grid
              size={{
                xs: 12,
                sm: 6,
                md: 2,
              }}
            >
              <Stack
                direction="row"
                spacing={1}
              >
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<SearchIcon />}
                  sx={{
                    height: 56,
                  }}
                >
                  Search
                </Button>

                <Button
                  variant="outlined"
                  color="inherit"
                  sx={{
                    minWidth: 56,
                    height: 56,
                  }}
                >
                  <RestartAltIcon />
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}