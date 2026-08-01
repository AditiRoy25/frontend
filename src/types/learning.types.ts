export interface LearningCourse {
  _id: string;
  title: string;
  category: string;
  progress: number;
}

export interface LearningProgressResponse {
  success: boolean;
  course: LearningCourse;
}