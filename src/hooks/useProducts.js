import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {BASE_URL} from './../ApiUrl';
// Function to fetch products from backend API
const fetchProducts = async () => {
    const { data } = await axios.get(`${BASE_URL}/store/products`);
    return data;  // Assume the API returns a list of products
};

// Custom hook to use products
export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],  // Cache key
        queryFn: fetchProducts,  // Fetching function
        staleTime: 1000 * 60 * 5,  // Cache for 5 minutes
    });
};
