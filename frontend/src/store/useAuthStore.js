//This file is use to create a Zustand store for managing authentication state in a React application.

import {create} from 'zustand';
import {axiosInstance} from '../lib/axios.js'; // Import the axios instance for API calls
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth : async () => {
        try {
            const res = await axiosInstance.get('/auth/check');

            set({authUser: res.data});
        } catch (error) {
            console.error('Error in checkAuth:', error);
            set({authUser: null});
        } finally {
            set({isCheckingAuth: false});
        }
    },

    signUp : async (data) => {
        set({isSigningUp: true});
        try {
            console.log('Signing up with data:', data);
            const res = await axiosInstance.post('/auth/signup', data);
            // console.log('Sign up response:', res.data);
            toast.success("Account created successfully");
            set({authUser: res.data});
        } catch (error) {
            console.error('Error in signUp:', error);
            toast.error(error.response?.data?.message || "Failed to sign up");
        } finally {
            set({isSigningUp: false});
        }
    },
    
    logout : async () => {
        try {
            await axiosInstance.post('/auth/logout');
            set({authUser: null});
            toast.success("Logged out successfully");
        } catch (error) {
            console.error('Error in logout:', error);
            toast.error(error.response?.data?.message || "Failed to log out");
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });
        try {
        const res = await axiosInstance.post("/auth/login", data);
        set({ authUser: res.data });
        toast.success("Logged in successfully");

        get().connectSocket();
        } catch (error) {
        toast.error(error.response.data.message);
        } finally {
        set({ isLoggingIn: false });
        }
  },
}));