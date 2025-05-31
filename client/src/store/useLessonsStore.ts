import { create } from 'zustand';
import { axiosInstance } from '@/lib/axiosInstance';
import { handleApiError } from '@/lib/handleApiError';
import type { Lesson } from '@/interfaces/course';
import toast from 'react-hot-toast';

interface LessonsState {
  lessons: Lesson[];
  lesson: Lesson | null;
  isLoading: boolean;
  error: string | null;
  getLessonsByCourse: (courseId: string) => Promise<void>;
  getLessonById: (lessonId: string) => Promise<void>;
  createLesson: (courseId: string, title: string, videoUrl: string, description?: string) => Promise<Lesson | null>;
  updateLesson: (lessonId: string, title: string, videoUrl: string, description?: string) => Promise<void>;
  completeLesson: (lessonId: string) => Promise<void>;
  deleteLesson: (lessonId: string) => Promise<void>;
  clearError: () => void;
}

export const useLessonsStore = create<LessonsState>((set, get) => ({
  lessons: [],
  lesson: null,
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

  getLessonById: async (lessonId: string) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get(`/lessons/${lessonId}`);
      set({ lesson: res.data, isLoading: false });
    } catch (err) {
      handleApiError(err, 'Erro ao buscar aula.');
      set({ isLoading: false, error: 'Erro ao buscar aula.' });
    }
  },

  createLesson: async (courseId, title, videoUrl, description) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post('/lessons', { courseId, title, videoUrl, description });
      const newLesson = res.data;
      
      // Atualizar a lista de lições
      const lessons = get().lessons;
      set({ 
        lessons: [...lessons, newLesson], 
        isLoading: false 
      });
      
      return newLesson;
    } catch (err) {
      handleApiError(err, 'Erro ao criar aula.');
      set({ isLoading: false, error: 'Erro ao criar aula.' });
      return null;
    }
  },
  
  updateLesson: async (lessonId, title, videoUrl, description) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.put(`/lessons/${lessonId}`, { title, videoUrl, description });
      
      // Atualizar a lição na lista
      const lessons = get().lessons;
      const updatedLessons = lessons.map(lesson => 
        lesson._id === lessonId ? { ...lesson, ...res.data } : lesson
      );
      
      set({ 
        lessons: updatedLessons,
        lesson: res.data,
        isLoading: false 
      });
    } catch (err) {
      handleApiError(err, 'Erro ao atualizar aula.');
      set({ isLoading: false, error: 'Erro ao atualizar aula.' });
    }
  },

  completeLesson: async (lessonId: string) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.put(`/lessons/${lessonId}/complete`);
      toast.success('Aula marcada como concluída!');
    } catch (err) {
      handleApiError(err, "Erro ao completar lição.");
      set({ isLoading: false, error: 'Erro ao completar lição.' });
    }
  },

  deleteLesson: async (lessonId) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/lessons/${lessonId}`);
      
      // Remover a lição da lista
      const lessons = get().lessons;
      const filteredLessons = lessons.filter(lesson => lesson._id !== lessonId);
      
      set({ 
        lessons: filteredLessons,
        lesson: null,
        isLoading: false 
      });
    } catch (err) {
      handleApiError(err, 'Erro ao excluir aula.');
      set({ isLoading: false, error: 'Erro ao excluir aula.' });
    }
  },

  clearError: () => set({ error: null }),
})); 