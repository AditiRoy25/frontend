"use client";

import { useState } from "react";
import { Box, Paper, Stack } from "@mui/material";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({
  images,
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(
    images[0] || "/images/no-image.png"
  );

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
      }}
    >
      {/* Main Image */}
      <Box
        component="img"
        src={selectedImage}
        alt="Product"
        sx={{
          width: "100%",
          height: 420,
          objectFit: "contain",
          mb: 3,
        }}
      />

      {/* Thumbnail Images */}
      <Stack
        sx={{direction:"row",
        spacing:2,
        justifyContent:"center",
        flexWrap:"wrap"}}
      >
        {images.map((image, index) => (
          <Box
            key={index}
            component="img"
            src={image}
            onClick={() => setSelectedImage(image)}
            sx={{
              width: 80,
              height: 80,
              objectFit: "contain",
              border: selectedImage === image
                ? "2px solid"
                : "1px solid #ddd",
              borderColor:
                selectedImage === image
                  ? "primary.main"
                  : "#ddd",
              borderRadius: 2,
              cursor: "pointer",
              p: 1,
              bgcolor: "#fff",

              "&:hover": {
                borderColor: "primary.main",
              },
            }}
          />
        ))}
      </Stack>
    </Paper>
  );
}