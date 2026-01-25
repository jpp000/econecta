import { Lesson } from './lesson';

export interface Course {
  _id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
}

