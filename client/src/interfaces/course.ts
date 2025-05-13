export interface Lesson {
  _id: string;
  title: string;
  description?: string;
  courseId: string;
}

export interface Course {
  _id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
} 