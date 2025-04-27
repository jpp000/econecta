import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/handleApiError";
import { LoginData } from "@/schemas/loginSchema";
import { SignupData } from "@/schemas/signupSchema";
import { io } from "socket.io-client";

type User = {
  id: string;
  username: string;
  email: string;
};

type AuthState = {
  user: User | null;
  users: User[] | null;
  socket: any | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  initializeAuth: () => Promise<void>;
  listUsers: () => Promise<void>;
  connectSocket: () => void;
  disconnectSocket: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      users: null,
      socket: null,
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
          get().connectSocket();
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
          get().connectSocket();
        } catch (error) {
          handleApiError(error, "Erro ao fazer cadastro.");
          set({ user: null, token: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        get().disconnectSocket();
      },

      listUsers: async () => {
        set({ isLoading: true });

        try {
          const response = await axiosInstance.get("/users");
          const users = response.data;

          set({ users });
        } catch (error) {
          handleApiError(error, "Erro ao listar usuários.");
        } finally {
          set({ isLoading: false });
        }
      },

      initializeAuth: async () => {
        const { token } = useAuthStore.getState();

        if (!token) return;

        set({ isLoading: true });
        try {
          const response = await axiosInstance.get("/users/me");
          const user = response.data;

          set({ user, isAuthenticated: true });
          get().connectSocket();
        } catch (error) {
          handleApiError(error, "Sessão expirada. Faça login novamente.");
          set({ user: null, token: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },

      connectSocket: (token?: string) => {
        const effectiveToken = token ?? get().token;
        if (!effectiveToken) return;
      
        const socket = io('ws://localhost:4000', {
          auth: { token: effectiveToken },
          autoConnect: false,
          reconnection: true,
        });
      
        socket.on('connect', () => {
          console.log('Conectado com socket ID:', socket.id);
        });
      
        socket.on('disconnect', (reason) => {
          console.log('Desconectado:', reason);
        });
      
        socket.connect();
        set({ socket });
      },
      
    
      disconnectSocket: () => {
        const { socket } = get();
    
        if (socket?.connected) {
          socket.disconnect();
          set({ socket: null }); 
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
