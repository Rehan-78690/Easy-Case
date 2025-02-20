import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
    Box, Grid, GridItem, Spinner, Text, VStack, Heading, Divider, Container, Image 
} from '@chakra-ui/react';
import useStore from '../stores/store';
import ProductInfo from '../components/ProductInfo';
import ProductReviews from '../components/ProductReviews';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ProductListing from '../components/FeatureProducts';
import SimilarProducts from '../components/SimilarProducts';
import DEFAULT_IMAGE from  '../assets/images/ImageError.jpg'


const ProductPage = () => {
    const { id } = useParams(); // Get the product ID from the route
    const { initializeCart } = useStore();  // Initialize cart using Zustand
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch product details when the component mounts or when the product ID changes
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/store/products/${id}/`);
                setProduct(response.data);
            } catch (error) {
                setError('Failed to fetch product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, initializeCart]);

    if (loading) {
        return (
            <Box h="100vh" display="flex" alignItems="center" justifyContent="center">
                <Spinner size="xl" thickness="4px" color="blue.500" />
            </Box>
        );
    }

    if (error) {
        return (
            <Box h="100vh" display="flex" alignItems="center" justifyContent="center">
                <Text fontSize="lg" color="red.500">{error}</Text>
            </Box>
        );
    }

    // Get the first image if available; otherwise, use the default image
    const productImage =  DEFAULT_IMAGE;
    // product.images && product.images.length > 0 ? product.images[0] :
    return (
        <>
            <Navbar />

            {/* Product Details Section */}
            <Container maxW="1200px" py={10}>
                <Grid 
                    templateColumns={{ base: "1fr", md: "1fr 1fr" }} 
                    gap={10} 
                    p={5} 
                    bg="white" 
                    boxShadow="lg" 
                    borderRadius="10px"
                >
                    <GridItem>
                        <Image 
                            src={productImage} 
                            alt={product.name} 
                            borderRadius="10px" 
                            boxShadow="md"
                            objectFit="cover"
                            w="100%"
                            h={{ base: "250px", md: "400px" }} 
                        />
                    </GridItem>
                    <GridItem>
                        <ProductInfo product={product} /> {/* Pass product info */}
                    </GridItem>
                </Grid>
            </Container>

            {/* Reviews Section */}
            <Box bg="gray.50" py={10}>
                <Container maxW="1200px">
                    <Heading textAlign="center" mb={4} color="blue.600">Customer Reviews</Heading>
                    <Divider mb={6} />
                    <ProductReviews reviews={product.reviews} id={product.id} />
                </Container>
            </Box>

            {/* Featured Products */}
            <Box bg="gray.50" py={10}>
                <Container maxW="100%">
                    <ProductListing  PageTtitle='More Products' />
                </Container>
            </Box>

            <Footer />
        </>
    );
};

export default ProductPage;
