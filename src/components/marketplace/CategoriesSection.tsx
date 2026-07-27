"use client";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import AgricultureIcon from "@mui/icons-material/Agriculture";
import CompostIcon from "@mui/icons-material/Compost";
import YardIcon from "@mui/icons-material/Yard";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import OpacityIcon from "@mui/icons-material/Opacity";
import AppsIcon from "@mui/icons-material/Apps";

const categories = [
  {
    name: "Seeds",
    products: "120+ Products",
    icon: <AgricultureIcon sx={{ fontSize: 42 }} />,
  },
  {
    name: "Bio Fertilizers",
    products: "80+ Products",
    icon: <CompostIcon sx={{ fontSize: 42 }} />,
  },
  {
    name: "Fertilizers",
    products: "70+ Products",
    icon: <YardIcon sx={{ fontSize: 42 }} />,
  },
  {
    name: "Equipment",
    products: "150+ Products",
    icon: (
      <PrecisionManufacturingIcon
        sx={{ fontSize: 42 }}
      />
    ),
  },
  {
    name: "Irrigation",
    products: "60+ Products",
    icon: <OpacityIcon sx={{ fontSize: 42 }} />,
  },
  {
    name: "View All",
    products: "Categories",
    icon: <AppsIcon sx={{ fontSize: 42 }} />,
  },
];

export default function CategoriesSection() {
  return (
    <Box sx={{py:8}}>
      <Container maxWidth="xl">
        <Typography
          variant="h4"
         sx={{ fontWeight:700,
          mb:5}}
        >
          Shop by Categories
        </Typography>

        <Grid container spacing={3}>
          {categories.map((item) => (
            <Grid
              key={item.name}
              size={{
                xs: 6,
                sm: 4,
                md: 2,
              }}
            >
              <Card
                elevation={0}
                sx={{
                  border: "1px solid #E8E8E8",
                  borderRadius: 4,
                  transition: ".3s",

                  "&:hover": {
                    transform:
                      "translateY(-8px)",
                    boxShadow:
                      "0 12px 25px rgba(0,0,0,.08)",
                    borderColor:
                      "primary.main",
                  },
                }}
              >
                <CardActionArea>
                  <CardContent
                    sx={{
                      textAlign: "center",
                      py: 5,
                    }}
                  >
                    <Box
                      sx={{
                        width: 75,
                        height: 75,
                        borderRadius: "50%",
                        bgcolor: "#F3FAF3",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "primary.main",
                        mx: "auto",
                        mb: 3,
                      }}
                    >
                      {item.icon}
                    </Box>

                    <Typography
                      sx={{fontWeight:700}}
                    >
                      {item.name}
                    </Typography>

                    <Typography
                      sx={{color:"text.secondary",
                      mt:1,
                      fontSize:14}}
                    >
                      {item.products}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}