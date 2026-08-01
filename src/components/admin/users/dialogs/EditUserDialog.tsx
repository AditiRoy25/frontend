"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  addUserSchema,
  AddUserForm,
} from "../../../../validations/userValidation";

interface Props {
  open: boolean;
  onClose: () => void;
  user?: Partial<AddUserForm>;
}

const roles = [
  "Farmer",
  "NGO",
  "Officer",
  "Ministry",
  "Admin",
];

// const status = [
//   "Active",
//   "Pending",
//   "Blocked",
// ];

export default function EditUserDialog({
  open,
  onClose,
  user,
}: Props) {
  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddUserForm>({
    resolver: yupResolver(addUserSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        role: user.role ?? "",
        // status: user.status ?? "",
        password: "",
        confirmPassword: "",
        image: null,
      });
    }
  }, [user, reset]);

  const onSubmit = (data: AddUserForm) => {
    console.log(data);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          Edit User

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Full Name"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Phone"
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                select
                label="Role"
                defaultValue=""
                {...register("role")}
                error={!!errors.role}
                helperText={errors.role?.message}
              >
                {roles.map((role) => (
                  <MenuItem
                    key={role}
                    value={role}
                  >
                    {role}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              {/* <TextField
                fullWidth
                select
                label="Status"
                defaultValue=""
                {...register("status")}
                error={!!errors.status}
                helperText={errors.status?.message}
              >
                {status.map((item) => (
                  <MenuItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </MenuItem>
                ))}
              </TextField> */}
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Button
                component="label"
                variant="outlined"
                fullWidth
              >
                Change Profile Image

                <input
                  hidden
                  type="file"
                  {...register("image")}
                />
              </Button>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowPassword(!showPassword)
                          }
                        >
                          {showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Confirm Password"
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                {...register("confirmPassword")}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirmPassword(
                              !showConfirmPassword
                            )
                          }
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
          >
            Update User
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}