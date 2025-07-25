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
            const res = await axiosInstance.post('/auth/signup', data);
            toast.success("Account created successfully");
            set({authUser: res.data});
        } catch (error) {
            console.error('Error in signUp:', error);
            toast.error("Failed to create account");
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
            toast.error("Failed to log out");
        }
    }
}));