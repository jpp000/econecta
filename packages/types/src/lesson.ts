export interface Lesson {
  _id: string;
  title: string;
  description?: string;
  videoUrl: string;
  courseId: string;
  completed: boolean;
}

