import { axiosInstance } from '@/lib/axiosInstance';
import { LoginData } from '@/schemas/loginSchema';
import { SignupData } from '@/schemas/signupSchema';
import toast from 'react-hot-toast';
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

    login: (data: LoginData) => Promise<void>;
    signup: (data: SignupData) => Promise<void>;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: !!localStorage.getItem('token'),
    isLoading: false,

    login: async (data: LoginData) => {
        set({ isLoading: true });
        try {
            const response = await axiosInstance.post('/auth/login', {
                username: data.username,
                email: data.email,
                password: data.password
            });

            const { user, token } = response.data;

            localStorage.setItem('token', token);

            set({
                user,
                token,
                isAuthenticated: true,
                isLoading: false
            });
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';

            toast.error(errorMessage);

            set({ isLoading: false, user: null, token: null, isAuthenticated: false });
            localStorage.removeItem('token');
        }
    },

    signup: async (data: SignupData) => {
        set({ isLoading: true });

        try {
            const response = await axiosInstance.post('/auth/signup', {
                username: data.username,
                email: data.email,
                password: data.password
            });

            const { user, token } = response.data;

            localStorage.setItem('token', token);

            set({
                user,
                token,
                isAuthenticated: true,
                isLoading: false
            });
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Signup failed. Please try again.';

            toast.error(errorMessage);

            set({ isLoading: false, user: null, token: null, isAuthenticated: false });
            localStorage.removeItem('token');
        }
    },

    logout: () => {
        localStorage.removeItem('token');

        set({
            user: null,
            token: null,
            isAuthenticated: false
        });
    },
}));
