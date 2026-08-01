"use client";

import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  useState,
  MouseEvent,
} from "react";

import { useDispatch, useSelector } from "react-redux";

import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import {
  logout,
} from "@/src/redux/slices/authSlice";

import type {
  RootState,
} from "@/src/redux/store";

import {
  roleRoutes,
} from "@/src/lib/permissions";

// ===============================
// Public Navbar Menu
// ===============================

const menus = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Marketplace",
    path: "/marketplace",
  },
  {
    name: "Learning",
    path: "/learning",
  },
  {
    name: "NGOs",
    path: "/ngo",
  },
  {
    name: "Schemes",
    path: "/schemes",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

export default function Navbar() {
  const pathname =
    usePathname();

  const router =
    useRouter();

  const dispatch =
    useDispatch();

  // ===============================
  // Redux Auth
  // ===============================

  const {
    user,
    isAuthenticated,
  } = useSelector(
    (state: RootState) =>
      state.auth
  );

  // ===============================
  // User Menu
  // ===============================

  const [
    anchorEl,
    setAnchorEl,
  ] =
    useState<null | HTMLElement>(
      null
    );

  const menuOpen =
    Boolean(anchorEl);

  const handleMenuOpen = (
    event: MouseEvent<HTMLElement>
  ) => {
    setAnchorEl(
      event.currentTarget
    );
  };

  const handleMenuClose =
    () => {
      setAnchorEl(null);
    };

  // ===============================
  // Dashboard
  // ===============================

  const handleDashboard =
    () => {
      handleMenuClose();

      if (!user) return;

      const role =
        user.role
          ?.trim()
          .toLowerCase();

      const destination =
        roleRoutes[
          role as keyof typeof roleRoutes
        ] ??
        "/farmer/dashboard";

      router.push(
        destination
      );
    };

  // ===============================
  // Logout
  // ===============================

  const handleLogout =
    () => {
      handleMenuClose();

      // Clear Redux +
      // localStorage
      dispatch(logout());

      // Redirect home
      router.replace("/");

      router.refresh();
    };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: "#fff",
        color: "#222",
        borderBottom:
          "1px solid #eee",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            py: 1,
          }}
        >
          {/* =====================
              LOGO
          ===================== */}

          <Typography
            component={Link}
            href="/"
            variant="h5"
            sx={{
              flexGrow: 1,

              fontWeight: 700,

              color:
                "primary.main",

              textDecoration:
                "none",
            }}
          >
            🌿 AgroSphere
          </Typography>

          {/* =====================
              NAVIGATION
          ===================== */}

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },

              gap: 3,

              alignItems:
                "center",
            }}
          >
            {menus.map(
              (menu) => {
                const active =
                  pathname ===
                    menu.path ||
                  (
                    menu.path !==
                      "/" &&
                    pathname.startsWith(
                      `${menu.path}/`
                    )
                  );

                return (
                  <Link
                    key={
                      menu.name
                    }
                    href={
                      menu.path
                    }
                    style={{
                      textDecoration:
                        "none",

                      color:
                        active
                          ? "#2E7D32"
                          : "#333",

                      fontWeight:
                        600,

                      borderBottom:
                        active
                          ? "2px solid #2E7D32"
                          : "2px solid transparent",

                      paddingBottom:
                        "4px",
                    }}
                  >
                    {
                      menu.name
                    }
                  </Link>
                );
              }
            )}
          </Box>

          {/* =====================
              AUTH SECTION
          ===================== */}

          <Box
            sx={{
              ml: 3,
              display: "flex",
              alignItems:
                "center",
              gap: 1,
            }}
          >
            {!isAuthenticated ||
            !user ? (
              <>
                {/* LOGIN */}

                <Button
                  variant="outlined"
                  component={
                    Link
                  }
                  href="/login"
                >
                  Login
                </Button>

                {/* REGISTER */}

                <Button
                  variant="contained"
                  component={
                    Link
                  }
                  href="/register"
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                {/* =================
                    LOGGED USER
                ================= */}

                <Button
                  onClick={
                    handleMenuOpen
                  }
                  endIcon={
                    <KeyboardArrowDownIcon />
                  }
                  sx={{
                    textTransform:
                      "none",

                    color:
                      "text.primary",

                    gap: 1,
                  }}
                >
                  <Avatar
                    src={
                      user.image
                    }
                    alt={
                      user.name
                    }
                    sx={{
                      width: 35,
                      height: 35,
                    }}
                  >
                    {user.name
                      ?.charAt(0)
                      .toUpperCase()}
                  </Avatar>

                  <Box
                    sx={{
                      display: {
                        xs: "none",
                        md: "block",
                      },

                      textAlign:
                        "left",
                    }}
                  >
                    <Typography
                      variant="body2"
                      fontWeight={
                        700
                      }
                    >
                      {
                        user.name
                      }
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{
                        textTransform:
                          "capitalize",
                      }}
                    >
                      {
                        user.role
                      }
                    </Typography>
                  </Box>
                </Button>

                {/* =================
                    USER DROPDOWN
                ================= */}

                <Menu
                  anchorEl={
                    anchorEl
                  }
                  open={
                    menuOpen
                  }
                  onClose={
                    handleMenuClose
                  }
                  anchorOrigin={{
                    vertical:
                      "bottom",
                    horizontal:
                      "right",
                  }}
                  transformOrigin={{
                    vertical:
                      "top",
                    horizontal:
                      "right",
                  }}
                >
                  {/* USER INFO */}

                  <Box
                    sx={{
                      px: 2,
                      py: 1,
                      minWidth:
                        200,
                    }}
                  >
                    <Typography
                      fontWeight={
                        700
                      }
                    >
                      {
                        user.name
                      }
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {
                        user.email
                      }
                    </Typography>
                  </Box>

                  {/* DASHBOARD */}

                  <MenuItem
                    onClick={
                      handleDashboard
                    }
                  >
                    <DashboardIcon
                      fontSize="small"
                      sx={{
                        mr: 1,
                      }}
                    />

                    Dashboard
                  </MenuItem>

                  {/* LOGOUT */}

                  <MenuItem
                    onClick={
                      handleLogout
                    }
                    sx={{
                      color:
                        "error.main",
                    }}
                  >
                    <LogoutIcon
                      fontSize="small"
                      sx={{
                        mr: 1,
                      }}
                    />

                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}