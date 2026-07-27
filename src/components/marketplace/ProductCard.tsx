"use client";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";

interface ProductProps {
  product: {
    _id: string;
    name: string;
    image: string;
    category: string;
    price: number;
    originalPrice: number;
    rating: number;
    seller: string;
    discount: number;
  };
}

export default function ProductCard({
  product,
}: ProductProps) {
  return (

    <Link href={`/marketplace/${product._id}`}>
    <Card
      sx={{
        borderRadius: 4,
        height: "100%",
        transition: ".3s",

        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow:
            "0 15px 30px rgba(0,0,0,.08)",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Chip
          label={`${product.discount}% OFF`}
          color="success"
          size="small"
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            fontWeight: 700,
          }}
        />

        <IconButton
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            bgcolor: "#fff",
          }}
        >
          <FavoriteBorderIcon />
        </IconButton>

        <Box
          component="img"
          src={product.image}
          sx={{
            width: "100%",
            height: 220,
            objectFit: "contain",
            p: 2,
          }}
        />
      </Box>

      <CardContent>
        <Typography
          variant="h6"
         sx={{ fontWeight:700}}
        >
          {product.name}
        </Typography>

        <Typography
          sx={{color:"text.secondary",
          mt:1}}
        >
          {product.category}
        </Typography>

        <Box
          sx={{display:"flex",
          alignItems:"center",
          mt:2}}
        >
          <Rating
            value={product.rating}
            precision={0.5}
            size="small"
            readOnly
          />

          <Typography
           sx={{ ml:1,
            fontSize:14}}
          >
            {product.rating}
          </Typography>
        </Box>

        <Typography
        
          variant="h5"
          sx={{fontWeight:700,
          color:"primary",
        mt:2}}
        >
          ${product.price}
        </Typography>

        <Typography
          sx={{
            textDecoration:
              "line-through",
            color: "gray",
          }}
        >
          ${product.originalPrice}
        </Typography>

        <Typography
         sx={{ mt:1,
          color:"text.secondary"}}
        >
          Seller: {product.seller}
        </Typography>

        <Button
          fullWidth
          variant="contained"
          startIcon={
            <ShoppingCartIcon />
          }
          sx={{
            mt: 3,
          }}
        >
          Add To Cart
        </Button>
      </CardContent>
    </Card>
    </Link>

  );
}