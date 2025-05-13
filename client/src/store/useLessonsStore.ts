import { create } from 'zustand';
import { axiosInstance } from '@/lib/axiosInstance';
import { handleApiError } from '@/lib/handleApiError';
import type { Lesson } from '@/interfaces/course';

interface LessonsState {
  lessons: Lesson[];
  isLoading: boolean;
  error: string | null;
  getLessonsByCourse: (courseId: string) => Promise<void>;
  createLesson: (courseId: string, title: string, description?: string) => Promise<void>;
  clearError: () => void;
}

export const useLessonsStore = create<LessonsState>((set) => ({
  lessons: [],
  isLoading: false,
  error: null,

  getLessonsByCourse: async (courseId: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get(`/lessons?courseId=${courseId}`);
      set({ lessons: res.data, isLoading: false });
    } catch (err) {
      handleApiError(err, 'Erro ao buscar aulas.');
      set({ isLoading: false, error: 'Erro ao buscar aulas.' });
    }
  },

  createLesson: async (courseId, title, description) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post('/lessons', { courseId, title, description });
      set({ isLoading: false });
    } catch (err) {
      handleApiError(err, 'Erro ao criar aula.');
      set({ isLoading: false, error: 'Erro ao criar aula.' });
    }
  },

  clearError: () => set({ error: null }),
})); 