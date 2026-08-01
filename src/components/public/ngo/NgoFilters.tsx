"use client";

import {
  Button,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  Switch,
  TextField,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

export interface NgoFilterValues {
  search: string;
  verified: boolean;
}

interface Props {
  value: NgoFilterValues;
  onChange: (
    value: NgoFilterValues
  ) => void;
}

export default function NgoFilters({
  value,
  onChange,
}: Props) {
  const handleChange = (
    key: keyof NgoFilterValues,
    val: string | boolean
  ) => {
    onChange({
      ...value,
      [key]: val,
    });
  };

  const handleReset = () => {
    onChange({
      search: "",
      verified: false,
    });
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >
      <Grid
        container
       sx={{ spacing:3,
        alignItems:"center"}}
      >
        <Grid
          size={{
            xs: 12,
            md: 8,
          }}
        >
          <TextField
            fullWidth
            label="Search NGO"
            placeholder="Search by organization name..."
            value={value.search}
            onChange={(e) =>
              handleChange(
                "search",
                e.target.value
              )
            }
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Grid>

        <Grid
          size={{
            xs: 12,
            md: 4,
          }}
        >
          <Stack
           sx={{ direction:"row",
            spacing:2,
            justifyContent:"space-between",
            alignItems:"center"}}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={value.verified}
                  onChange={(e) =>
                    handleChange(
                      "verified",
                      e.target.checked
                    )
                  }
                />
              }
              label="Approved Only"
            />

            <Button
              variant="outlined"
              startIcon={
                <RestartAltIcon />
              }
              onClick={handleReset}
            >
              Reset
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}