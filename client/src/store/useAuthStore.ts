import { axiosInstance } from '@/lib/axiosInstance';
import { handleApiError } from '@/lib/handleApiError';
import { LoginData } from '@/schemas/loginSchema';
import { SignupData } from '@/schemas/signupSchema';
import { io } from 'socket.io-client';
import { create } from 'zustand';
import { useChatStore } from './useChatStore';
import { SOCKET_EVENTS } from '@/constants/events';

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

    checkAuth: () => Promise<void>;
    login: (data: LoginData) => Promise<void>;
    signup: (data: SignupData) => Promise<void>;
    logout: () => void;
    connectSocket: () => void;
    disconnectSocket: () => void;
    socket: any | null;
    onlineUsers: string[] | null;
};

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    isLoading: false,
    socket: null,
    onlineUsers: null,

    checkAuth: async () => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.get("/users");

            const user = response.data;

            set({
                user,
                isAuthenticated: true,
            });
        } catch (error: any) {
            handleApiError(error, "Please log in again.");
            localStorage.removeItem("token");
            set({
                user: null,
                token: null,
                isAuthenticated: false,
            });
        } finally {
            set({ isLoading: false, });
        }
    },

    login: async (data: LoginData) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.post("/auth/login", data);
            const { user, token } = response.data;

            localStorage.setItem("token", token);

            get().connectSocket();

            set({
                user,
                token,
                isAuthenticated: true,
            });
        } catch (error: any) {
            handleApiError(error, "Login failed.");
            localStorage.removeItem("token");
            set({ user: null, token: null, isAuthenticated: false, });
        } finally {
            set({ isLoading: false });
        }
    },

    signup: async (data: SignupData) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.post("/auth/signup", data);
            const { user, token } = response.data;

            localStorage.setItem("token", token);

            set({
                user,
                token,
                isAuthenticated: true,

            });
        } catch (error: any) {
            handleApiError(error, "Signup failed.");
            localStorage.removeItem("token");
            set({ user: null, token: null, isAuthenticated: false, });
        } finally {
            set({ isLoading: false });
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        set({
            user: null,
            token: null,
            isAuthenticated: false,

        });
    },

    connectSocket: () => {
        const { user, token } = get();
    
        if (!user || get().socket?.connected || !token) return;
    
        const socket = io("http://localhost:4000", {
          auth: {
            token,
          },
        });
    
        socket.connect();
    
        set({ socket });

    
        const { setSocket }: any  = useChatStore();

        setSocket(socket);

        socket.on(SOCKET_EVENTS.ONLINE_USERS, (usersIds) => {
          set({ onlineUsers: usersIds });
        });
      },
    
      disconnectSocket: () => {
        const { socket } = get();
    
        if (socket?.connected) {
          socket.disconnect();
          set({ socket: null });
        }
      },
}));
