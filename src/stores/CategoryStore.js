import { create } from 'zustand';
import axios from 'axios';
import {BASE_URL}  from './../ApiUrl';
const useCategoryStore = create((set) => ({
    categories: [],
    loading: false,
    error: null,

    // Action to fetch categories from backend
    fetchCategories: async () => {
        set({ loading: true, error: null });
        try {
            const response = await axios.get(`${BASE_URL}/store/collections/`);
            set({ categories: response.data, loading: false });
        } catch (error) {
            set({ error: 'Failed to fetch categories', loading: false });
        }
    }
}));

export default useCategoryStore;
