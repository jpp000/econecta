import { create } from "zustand";
import { axiosInstance } from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/handleApiError";
import type { Course } from "@/interfaces/course";

export type Lesson = {
  _id: string;
  title: string;
  description?: string;
  courseId: string;
};

interface CoursesState {
  courses: Course[];
  course: Course | null;
  isLoading: boolean;
  error: string | null;
  getCourses: () => Promise<void>;
  getCourseById: (id: string) => Promise<void>;
  createCourse: ({ title, description }: Omit<Course, "_id" | "lessons">) => Promise<void>;
  clearError: () => void;
}

export const useCoursesStore = create<CoursesState>((set) => ({
  courses: [],
  course: null,
  isLoading: false,
  error: null,

  getCourses: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get("/courses");
      set({ courses: res.data, isLoading: false });
    } catch (err) {
      handleApiError(err, "Erro ao buscar cursos.");
      set({ isLoading: false, error: "Erro ao buscar cursos." });
    }
  },

  getCourseById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get(`/courses/${id}`);
      set({ course: res.data, isLoading: false });
    } catch (err) {
      handleApiError(err, "Erro ao buscar curso.");
      set({ isLoading: false, error: "Erro ao buscar curso." });
    }
  },

  createCourse: async ({ title, description }: Omit<Course, "_id" | "lessons">) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post("/courses", { title, description });

      const courses = useCoursesStore.getState().courses;

      set({ courses: [...courses, res.data], isLoading: false });
    } catch (err) {
      handleApiError(err, "Erro ao criar curso.");
      set({ isLoading: false, error: "Erro ao criar curso." });
    }
  },

  clearError: () => set({ error: null }),
}));
