import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import useCartStore from '../stores/cartStore';
import {
    Box, Text, Select, Button, Flex, NumberInput, NumberInputField, NumberInputStepper, 
    NumberIncrementStepper, NumberDecrementStepper, VStack, HStack, Badge, Divider, useToast
} from '@chakra-ui/react';
import GuestInfoModal from '../components/GuestInfoModal';

const ProductInfo = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isGuestCheckout, setIsGuestCheckout] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const { addToCartMutation } = useCart();
    const cartItems = useCartStore((state) => state.cartItems);

    // Handle Buy Now click
    const handleBuyNowClick = async () => {
        setLoading(true);
        const accessToken = localStorage.getItem('accessToken');
        
        if (!accessToken) {
            setIsGuestCheckout(true);
            setLoading(false);
            return;
        }

        navigate(`/checkout`, { state: { productId: product.id, quantity } });
    };

    // Handle Guest Checkout Submission
    const handleGuestSubmit = async (guestInfo) => {
        localStorage.setItem('guestInfo', JSON.stringify(guestInfo));
        navigate(`/checkout`, { state: { productId: product.id, quantity, guestInfo } });
    };

    const handleAddToCart = (product) => {
        const existingItem = cartItems.find(item => item.product.id === product.id);

        if (existingItem) {
            toast.info(`"${product.title}" is already in the cart!`);
        } else {
            addToCartMutation.mutate({ productId: product.id }, {
                onSuccess: () => {
                    toast.success(`"${product.title}" has been added to your cart!`);
                },
                onError: () => {
                    toast.error('Failed to add item to cart. Please try again.');
                }
            });
        }
    };

    return (
        <Box 
            p={{ base: 4, md: 6 }} 
            borderRadius="12px" 
            boxShadow="lg" 
            bg="white" 
            w="100%"
        >
            {/* Product Title & Pricing */}
            <VStack align="start" spacing={3}>
                <Text fontSize={{ base: "lg", md: "2xl" }} fontWeight="bold" color="blue.700">
                    {product.title}
                </Text>
                <HStack>
                    <Text fontSize="xl" fontWeight="bold" color="green.500">
                        Rs {product.price_with_tax.toFixed(2)}
                    </Text>
                    {product.discount && (
                        <Badge bg="red.500" color="white" px={2} py={1} borderRadius="5px">
                            {product.discount}% OFF
                        </Badge>
                    )}
                </HStack>
                <Text fontSize="md" color="gray.600">{product.description}</Text>
            </VStack>

            <Divider my={4} />

            {/* Quantity Selector */}
            <Flex align="center" mb={4}>
                <Text fontWeight="bold" mr={2}>Quantity:</Text>
                <NumberInput 
                    min={1} 
                    max={product.stock || 100} 
                    defaultValue={1} 
                    value={quantity} 
                    onChange={(value) => setQuantity(parseInt(value))}
                    size="md"
                    w="120px"
                >
                    <NumberInputField />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Flex>

            {/* Action Buttons */}
            <Flex direction={{ base: "column", md: "row" }} gap={4}>
                <Button 
                    colorScheme="orange" 
                    size="lg" 
                    w="full"
                    _hover={{ bg: "orange.600" }}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                    }}
                >
                    Add to Cart
                </Button>
                <Button 
                    colorScheme="blue" 
                    size="lg" 
                    w="full"
                    isLoading={loading} 
                    _hover={{ bg: "blue.600" }}
                    onClick={handleBuyNowClick}
                >
                    Buy Now
                </Button>
            </Flex>

            {/* Guest Checkout Modal */}
            {isGuestCheckout && (
                <GuestInfoModal
                    isOpen={isGuestCheckout}
                    onClose={() => setIsGuestCheckout(false)}
                    handleGuestSubmit={handleGuestSubmit}
                />
            )}
        </Box>
    );
};

export default ProductInfo;
