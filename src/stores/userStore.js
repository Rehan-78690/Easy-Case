// store/userStore.js
import { create } from 'zustand';
import api from '../services/authInterceptor';
import {BASE_URL}  from './../ApiUrl';
const useUserStore = create((set) => ({
    user: null,
    loading: false,
    error: null,

    fetchUser: async (token) => {
        set({ loading: true });
        try {
            const response = await api.get(`${BASE_URL}/auth/users/me/`, {
               
            });
            set({ user: response.data, loading: false });
        } catch (error) {
            console.error('Error fetching user data:', error);
            set({ error: error.message, loading: false });
        }
    },

    updateUser: async (token, updatedUserData) => {
        try {
            await api.patch(`${BASE_URL}/auth/users/me/`, updatedUserData, {
               
            });
            set({ user: updatedUserData });
            return true;
        } catch (error) {
            set({ error: error.message });
            return false;
        }
    },
}));

export default useUserStore;
