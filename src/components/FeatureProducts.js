import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Box, Grid, Image, Text, Button, Flex, Icon, Spinner, Center, Heading 
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { useCart } from '../hooks/useCart';
import { useProducts } from '../hooks/useProducts';
import useCartStore from '../stores/cartStore';
import { toast } from 'react-toastify';
import axios from 'axios';
import LikeProduct from './LikeProduct';

import ErrorImage from './../assets/images/ImageError.jpg'

function ProductListing({ vendorId }) {
    const { data: products, isLoading, error } = useProducts();
    const { addToCartMutation } = useCart();
    const navigate = useNavigate();
    const cartItems = useCartStore((state) => state.cartItems);
    const [vendorProducts, setVendorProducts] = React.useState([]);
    const [loadingVendorProducts, setLoadingVendorProducts] = React.useState(true);

    React.useEffect(() => {
        const fetchVendorProducts = async () => {
            if (vendorId) {
                try {
                    const { data } = await axios.get(`http://127.0.0.1:8000/store/vendors/${vendorId}/products/`);
                    setVendorProducts(data || []);
                } catch (error) {
                    console.log('Failed to load vendor products.');
                } finally {
                    setLoadingVendorProducts(false);
                }
            } else {
                setLoadingVendorProducts(false);
            }
        };
        fetchVendorProducts();
    }, [vendorId]);

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

    const handleCardClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    if (isLoading || loadingVendorProducts) {
        return (
            <Center height="100vh">
                <Spinner size="xl" />
            </Center>
        );
    }

    if (error) {
        return (
            <Center height="100vh">
                <Text color="red.500">Failed to load products. Please try again later.</Text>
            </Center>
        );
    }

    const productList = vendorId ? vendorProducts : products?.results;

    return (
        <Box>
            {/* Top Header */}
            <Box bgGradient="linear(to-r, #132063, #0A0E23)" py={4} px={6} textAlign="center" color="white">
                <Heading size="lg">Product Listing Page</Heading>
            </Box>

            {/* No Products Available Banner */}
            {(!productList || productList.length === 0) && (
                <Box textAlign="center" py={10}>
                    <Image src="/no-products.png" alt="No products available" mx="auto" maxW="300px" />
                    <Text fontSize="xl" fontWeight="bold" mt={4}>No Products Available</Text>
                    <Text color="gray.500">Check back later or explore other categories.</Text>
                </Box>
            )}

            {/* Product List */}
            <Box p={4} mt={6}>
                <Text fontSize="2xl" mb={4} fontWeight="bold">
                    {vendorId ? 'Vendor Products' : 'Featured Products'}
                </Text>
                <Grid 
                    templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} 
                    gap={6}
                >
                    {productList?.map((product) => (
                        <Box
                            key={product.id}
                            p={4}
                            border="1px solid #e2e8f0"
                            borderRadius="md"
                            onClick={() => handleCardClick(product.id)}
                            _hover={{ boxShadow: "lg", transform: "translateY(-5px)" }}
                            transition="transform 0.3s ease"
                        >
                            {/* Product Image */}
                            <Box height="200px" width="100%" overflow="hidden" mb={4} borderRadius="md" bg="gray.100">
                                <Box position="relative">
                                    <Box position="absolute" right={2} top={2}>
                                        <LikeProduct productId={product.id} />
                                    </Box>
                                </Box>
                                {product.images && product.images.length > 0 ? (
                                    <Image
                                        src={product.images[0].image}
                                        alt={product.title}
                                        width="100%"
                                        height="100%"
                                        objectFit="cover"
                                        transition="transform 0.3s"
                                        _hover={{ transform: "scale(1.05)" }}
                                    />
                                ) : (
                                    <Center height="100%">
                                         <Image
                                        src={ErrorImage}
                                        alt={product.title}
                                        width="100%"
                                        height="100%"
                                        objectFit="cover"
                                        transition="transform 0.3s"
                                        _hover={{ transform: "scale(1.05)" }}
                                    />
                                    </Center>
                                )}
                            </Box>

                            {/* Product Details */}
                            <Text fontWeight="bold" mb={1} noOfLines={1}>{product.title}</Text>
                            <Text fontSize="sm" color="gray.600" mb={2} noOfLines={3}>{product.description || ''}</Text>

                            {/* Product Rating */}
                            <Flex mb={4}>
                                {[...Array(5)].map((_, i) => (
                                    <Icon
                                        key={i}
                                        as={FaStar}
                                        color={i < product.average_rating ? "orange.400" : "gray.300"}
                                        boxSize={4}
                                    />
                                ))}
                            </Flex>

                            {/* Product Price */}
                            <Text fontWeight="bold" fontSize="lg" mb={4}>
                                {product.unit_price ? `Rs ${product.unit_price.toFixed(2)}` : 'N/A'}
                            </Text>

                            {/* Add to Cart Button */}
                            <Button
                                bgGradient="linear(to-b, #132063, #0A0E23)"
                                color="white"
                                _hover={{ bgGradient: "linear(to-b, orange.200, orange.600)", boxShadow: "md" }}
                                size="sm"
                                width="full"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddToCart(product);
                                }}
                            >
                                Add to Cart
                            </Button>
                        </Box>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}

export default ProductListing;
