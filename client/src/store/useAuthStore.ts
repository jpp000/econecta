import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/handleApiError";
import { LoginData } from "@/schemas/loginSchema";
import { SignupData } from "@/schemas/signupSchema";

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  initializeAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (data) => {
        set({ isLoading: true });
        try {
          const response = await axiosInstance.post("/auth/login", data);
          const { user, token } = response.data;

          set({
            user,
            token,
            isAuthenticated: true,
          });
        } catch (error) {
          handleApiError(error, "Erro ao fazer login.");
          set({ user: null, token: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },

      signup: async (data) => {
        set({ isLoading: true });
        try {
          const response = await axiosInstance.post("/auth/signup", data);
          const { user, token } = response.data;

          set({
            user,
            token,
            isAuthenticated: true,
          });
        } catch (error) {
          handleApiError(error, "Erro ao fazer cadastro.");
          set({ user: null, token: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      },

      initializeAuth: async () => {
        const { token } = useAuthStore.getState();
        
        if (!token) return;

        set({ isLoading: true });
        try {
          const response = await axiosInstance.get("/users");
          const user = response.data;

          set({ user, isAuthenticated: true });
        } catch (error) {
          handleApiError(error, "Sessão expirada. Faça login novamente.");
          set({ user: null, token: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "authStorage",
      partialize: (state) => ({
        token: state.token,
      }),
    }
  )
);
