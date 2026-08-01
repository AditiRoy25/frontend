"use client";

import {
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import LocationCityOutlinedIcon from "@mui/icons-material/LocationCityOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const stats = [
  {
    title: "Total Schemes",
    value: 28,
    subtitle: "Government schemes",
    icon: <EmojiEventsOutlinedIcon color="success" />,
  },
  {
    title: "Central Schemes",
    value: 16,
    subtitle: "Available nationwide",
    icon: <AccountBalanceOutlinedIcon color="success" />,
  },
  {
    title: "State Schemes",
    value: 12,
    subtitle: "State specific",
    icon: <LocationCityOutlinedIcon color="success" />,
  },
  {
    title: "Eligible Schemes",
    value: 12,
    subtitle: "Based on filters",
    icon: <CheckCircleOutlineOutlinedIcon color="success" />,
  },
];

export default function SchemeStats() {
  return (
    <Grid
      container
      spacing={2}
    >
      {stats.map((item) => (
        <Grid
          key={item.title}
          size={{
            xs: 12,
            sm: 6,
            lg: 3,
          }}
        >
          <Card
            elevation={0}
            sx={{
              borderRadius: 4,
              border: "1px solid #ECECEC",
              height: "100%",
            }}
          >
            <CardContent>
              <Stack
                sx={{direction:"row",
                spacing:2,
                alignItems:"center"}}
              >
                {item.icon}

                <div>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="h4"
                    sx={{fontWeight:700}}
                  >
                    {item.value}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {item.subtitle}
                  </Typography>
                </div>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}