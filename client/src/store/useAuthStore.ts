import { axiosInstance } from '@/lib/axiosInstance';
import { handleApiError } from '@/lib/handleApiError';
import { LoginData } from '@/schemas/loginSchema';
import { SignupData } from '@/schemas/signupSchema';
import { create } from 'zustand';

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
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    isLoading: false,

    checkAuth: async () => {
        set({ isLoading: true });
        try {
            console.log("Checking authentication...");

            const response = await axiosInstance.get("/users");

            console.log("Response from checkAuth:", response);

            const { user } = response.data;

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
}));
