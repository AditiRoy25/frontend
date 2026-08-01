"use client";

import {
  Card,
  CardContent,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

const schedules = [
  {
    crop: "Rice",
    task: "Watering",
    date: "Today",
  },
  {
    crop: "Potato",
    task: "Fertilizer",
    date: "Tomorrow",
  },
  {
    crop: "Wheat",
    task: "Pesticide Spray",
    date: "25 July",
  },
];

export default function CropCalendar() {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #ECECEC",
        height: "100%",
      }}
    >
      <CardContent>

        <Typography
          variant="h6"
         sx={{ fontWeight:700,
          mb:3}}
        >
          Crop Calendar
        </Typography>

        {schedules.map((item, index) => (
          <>
            <Stack
              key={item.crop}
              sx={{direction:"row",
              justifyContent:"space-between",
              alignItems:"center",
              py:1.5}}
            >
              <Stack>

                <Typography sx={{fontWeight:600}}>
                  {item.crop}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {item.task}
                </Typography>

              </Stack>

              <Chip
                color="success"
                label={item.date}
              />
            </Stack>

            {index !== schedules.length - 1 && (
              <Divider />
            )}
          </>
        ))}

      </CardContent>
    </Card>
  );
}