import React, { useState } from 'react';
import { Icon } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';
import api from '../services/authInterceptor';

function LikeProduct({ productId }) {
    const [liked, setLiked] = useState(false);

    const handleLikeToggle = async () => {
        try {
            const response = await api.post(`http://127.0.0.1:8000/like-product/${productId}/`);
            if (response.data.status === 'liked') {
                setLiked(true);
                toast.success('Product added to wishlist!');
            } else if (response.data.status === 'unliked') {
                setLiked(false);
                toast.info('Product removed from wishlist.');
            }
        } catch (error) {
            // Check for authentication error (401 or custom error from backend)
            if (error.response && error.response.status === 401) {
                toast.error('Kindly Login to add product to wishlist.');
            } else {
                toast.error('Failed to update wishlist. Please try again.');
            }
        }
    };

    return (
        <Icon
            as={FaHeart}
            color={liked ? 'red.500' : 'gray.300'}
            boxSize={6}
            cursor="pointer"
            onClick={(e) => {
                e.stopPropagation(); // Prevent triggering product card click
                handleLikeToggle();
            }}
        />
    );
}

export default LikeProduct;
