import { create } from 'zustand';
import axios from 'axios';
import {BASE_URL}  from './../ApiUrl';
const useSearchStore = create((set) => ({
    query: '',
    results: [],
    loading: false,
    error: null,

    setQuery: (query) => set({ query }),

    fetchSearchResults: async (query) => {
        set({ loading: true, error: null });
        try {
            const { data } = await axios.get(`${BASE_URL}/store/products/?search=${query}`);
            set({ results: data.results, loading: false });
        } catch (error) {
            set({ error: 'Search failed', loading: false });
        }
    },
}));

export default useSearchStore;
