// vendorStore.js
import { create } from 'zustand';
import axios from 'axios';
import {BASE_URL}  from './../ApiUrl';
const useVendorStore = create((set) => ({
    vendors: [],
    loading: false,
    error: null,

    fetchVendors: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await axios.get(`${BASE_URL}/store/vendors/`);
            set({ vendors: data }); // Assuming the API response is paginated with a 'results' key
        } catch (error) {
            console.error('Error fetching vendors:', error);
            set({ error: 'Failed to fetch vendors' });
        } finally {
            set({ loading: false });
        }
    }
}));

export default useVendorStore;
