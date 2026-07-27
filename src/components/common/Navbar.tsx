"use client";

import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Container,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { usePathname } from "next/navigation";
const menus = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Marketplace", path: "/marketplace" },
  { name: "Learning", path: "/learning" },
  { name: "NGOs", path: "/ngo" },
  { name: "Schemes", path: "/schemes" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#fff",
        color: "#222",
        borderBottom: "1px solid #eee",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ py: 1 }}>
          <Typography
            variant="h5"
            
            sx={{ flexGrow: 1 ,

              fontWeight:700,
            color:"primary"
            }}
          >
            🌿 AgroSphere
          </Typography>

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              gap: 3,
            }}
          >
         {menus.map((menu) => (
  <Link
    key={menu.name}
    href={menu.path}
    style={{
      textDecoration: "none",
      color:
        pathname === menu.path
          ? "#2E7D32"
          : "#333",
      fontWeight: 600,
      borderBottom:
        pathname === menu.path
          ? "2px solid #2E7D32"
          : "2px solid transparent",
      paddingBottom: "4px",
    }}
  >
    {menu.name}
  </Link>
))}
          </Box>

          

          <Box sx={{ml:2}}>
           <Button
  variant="outlined"
  component={Link}
  href="/login"
  sx={{ mr: 2 }}
>
              Login
            </Button>

           <Button
  variant="outlined"
  component={Link}
  href="/register"
  sx={{ mr: 2 }}
>
              Register
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}