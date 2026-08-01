"use client";

import { useState } from "react";

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

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  addUserSchema,
  AddUserForm,
} from "../../../validations/userValidation";
import { SubmitHandler } from "react-hook-form";
interface Props {
  open: boolean;
  onClose: () => void;
}

const roles = [
  {
    label: "Farmer",
    value: "farmer",
  },
  {
    label: "NGO",
    value: "ngo",
  },
  {
    label: "Officer",
    value: "officer",
  },
  {
    label: "Ministry",
    value: "ministry",
  },
  {
    label: "Admin",
    value: "admin",
  },
];

const genders = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Other",
    value: "other",
  },
];

export default function AddUserDialog({
  open,
  onClose,
}: Props) {
  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const {
  register,
  handleSubmit,
  setValue,
  formState: { errors },
} = useForm<AddUserForm>({
  resolver: yupResolver(addUserSchema),

  defaultValues: {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    gender: "",
    address: "",
    district: "",
    state: "",
    image: null,
  },
});

 

const onSubmit: SubmitHandler<AddUserForm> = (
  data
) => {
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
    <form
      onSubmit={handleSubmit(onSubmit)}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Add User

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Grid
          container
          spacing={2}
        >
          {/* Name */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              fullWidth
              label="Full Name"
              {...register("name")}
              error={!!errors.name}
              helperText={
                errors.name?.message
              }
            />
          </Grid>

          {/* Email */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              fullWidth
              label="Email"
              {...register("email")}
              error={!!errors.email}
              helperText={
                errors.email?.message
              }
            />
          </Grid>

          {/* Phone */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              fullWidth
              label="Phone Number"
              {...register("phone")}
              error={!!errors.phone}
              helperText={
                errors.phone?.message
              }
            />
          </Grid>

          {/* Role */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              select
              fullWidth
              label="Role"
              defaultValue=""
              {...register("role")}
              error={!!errors.role}
              helperText={
                errors.role?.message
              }
            >
              {roles.map((role) => (
                <MenuItem
                  key={role.value}
                  value={role.value}
                >
                  {role.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Gender */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              select
              fullWidth
              label="Gender"
              defaultValue=""
              {...register("gender")}
              error={!!errors.gender}
              helperText={
                errors.gender?.message
              }
            >
              {genders.map(
                (gender) => (
                  <MenuItem
                    key={gender.value}
                    value={
                      gender.value
                    }
                  >
                    {gender.label}
                  </MenuItem>
                )
              )}
            </TextField>
          </Grid>

          {/* State */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              fullWidth
              label="State"
              {...register("state")}
              error={!!errors.state}
              helperText={
                errors.state?.message
              }
            />
          </Grid>

          {/* District */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              fullWidth
              label="District"
              {...register(
                "district"
              )}
              error={
                !!errors.district
              }
              helperText={
                errors.district
                  ?.message
              }
            />
          </Grid>

          {/* Address */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Address"
              {...register(
                "address"
              )}
              error={
                !!errors.address
              }
              helperText={
                errors.address
                  ?.message
              }
            />
          </Grid>

          {/* Upload Image */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <Button
              variant="outlined"
              component="label"
              fullWidth
            >
              Upload Image

              <input
                hidden
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file =
                    e.target
                      .files?.[0] ??
                    null;

                  setValue(
                    "image",
                    file,
                    {
                      shouldValidate: true,
                    }
                  );
                }}
              />
            </Button>
          </Grid> 

                    {/* Password */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              fullWidth
              label="Password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              {...register("password")}
              error={!!errors.password}
              helperText={
                errors.password?.message
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowPassword(
                            !showPassword
                          )
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

          {/* Confirm Password */}

          <Grid
            size={{
              xs: 12,
              md: 6,
            }}
          >
            <TextField
              fullWidth
              label="Confirm Password"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              {...register(
                "confirmPassword"
              )}
              error={
                !!errors.confirmPassword
              }
              helperText={
                errors
                  .confirmPassword
                  ?.message
              }
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
          Save User
        </Button>
      </DialogActions>
    </form>
  </Dialog>
);
}