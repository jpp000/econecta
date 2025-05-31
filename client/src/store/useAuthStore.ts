import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "@/lib/axiosInstance";
import { handleApiError } from "@/lib/handleApiError";
import type { LoginData } from "@/schemas/loginSchema";
import type { SignupData } from "@/schemas/signupSchema";
import { io, type Socket } from "socket.io-client";
import { env } from "@/constants/env";
import { User } from "@/interfaces/user.interface";

interface AuthState {
  user: User | null;
  users: User[] | null;
  socket: Socket | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  socketConnected: boolean;

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
      socketConnected: false,

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

          setTimeout(() => {
            get().connectSocket();
          }, 500);
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

          setTimeout(() => {
            get().connectSocket();
          }, 500);
        } catch (error) {
          handleApiError(error, "Erro ao fazer cadastro.");
          set({ user: null, token: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        get().disconnectSocket();
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          socketConnected: false,
        });
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
        const { token } = get();

        if (!token) return;

        set({ isLoading: true });
        try {
          const response = await axiosInstance.get("/users/me");
          const user = response.data;

          set({ user, isAuthenticated: true });

          console.log("User data:", user);

          setTimeout(() => {
            get().connectSocket();
          }, 500);
        } catch (error) {
          handleApiError(error, "Sessão expirada. Faça login novamente.");
          set({ user: null, token: null, isAuthenticated: false });
        } finally {
          set({ isLoading: false });
        }
      },

      connectSocket: () => {
        const { token, socket: existingSocket } = get();

        if (existingSocket?.connected) {
          set({ socketConnected: true });
          return;
        }

        if (existingSocket) {
          existingSocket.disconnect();
        }

        if (!token) return;

        try {
          const socket = io(env.socketUrl, {
            auth: { token },
            autoConnect: true,
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
          });

          socket.on("connect", () => {
            console.log("Connected with socket ID:", socket.id);
            set({ socketConnected: true });
          });

          socket.on("disconnect", (reason) => {
            console.log("Disconnected:", reason);
            set({ socketConnected: false });

            if (
              reason === "io server disconnect" ||
              reason === "transport close"
            ) {
              socket.connect();
            }
          });

          socket.on("connect_error", (error) => {
            console.error("Connection error:", error);
            set({ socketConnected: false });
          });

          set({ socket });
        } catch (error) {
          console.error("Error connecting to socket:", error);
          set({ socketConnected: false });
        }
      },

      disconnectSocket: () => {
        const { socket } = get();

        if (socket) {
          socket.disconnect();
          set({ socket: null, socketConnected: false });
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
