// productStore.js
import { create } from 'zustand';
import axios from 'axios';
import {BASE_URL}  from './../ApiUrl';
const useProductStore = create((set) => ({
    products: [],
    loading: false,

    fetchProducts: async () => {
        set({ loading: true });
        try {
            const { data } = await axios.get(`${BASE_URL}/store/products/`);
            set({ products: data.results }); // Assuming the API response is paginated with a 'results' key
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            set({ loading: false });
        }
    }
}));

export default useProductStore;
