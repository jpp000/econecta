export interface Lesson {
  _id: string;
  title: string;
  description?: string;
  videoUrl: string;
  courseId: string;
  completed: boolean;
}

export interface Course {
  _id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
} 