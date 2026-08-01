"use client";

import Link from "next/link";

import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import SchoolIcon from "@mui/icons-material/School";

import { useProgressQuery } from "@/src/redux/api/learningApi";

export default function LearningPortal() {
  const {
    data,
    isLoading,
    isError,
  } = useProgressQuery(undefined);

  if (isLoading) {
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
          <Box
            sx={{ display: "flex", justifyContent: "center", py: 5 }}
          >
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert severity="error">
        Failed to load learning progress.
      </Alert>
    );
  }

  const course = data?.course;

  if (!course) {
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
            sx={{ fontWeight: 700 }}
          >
            Learning Portal
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 2 }}
          >
            No active course found.
          </Typography>

          <Button
            component={Link}
            href="/learning"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
          >
            Browse Courses
          </Button>
        </CardContent>
      </Card>
    );
  }

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
        <Stack
          spacing={1}
          sx={{ flexDirection: "row", alignItems: "center", mb: 3 }}
        >
          <SchoolIcon color="success" />

          <Typography
            variant="h6"
            sx={{ fontWeight: 700 }}
          >
            Learning Progress
          </Typography>
        </Stack>

        <Typography sx={{ fontWeight: 600 }}>
          {course.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          {course.category}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={course.progress}
          sx={{
            mt: 3,
            mb: 2,
            height: 8,
            borderRadius: 10,
          }}
        />

        <Typography color="text.secondary">
          {course.progress}% Completed
        </Typography>

        <Button
          component={Link}
          href={`/learning/${course._id}`}
          variant="outlined"
          fullWidth
          sx={{ mt: 3 }}
        >
          Continue Learning
        </Button>
      </CardContent>
    </Card>
  );
}
