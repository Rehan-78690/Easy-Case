import React, { useEffect } from 'react';
import {
    Box,
    Text,
    Flex,
    Button,
    Avatar,
    CircularProgress,
    CircularProgressLabel,
    VStack,
    HStack,
    Icon,
    Grid,
    GridItem,
    Image,
} from '@chakra-ui/react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useVendorStore from '../stores/vendorStore';

const VendorCard = () => {
    const fetchVendors = useVendorStore((state) => state.fetchVendors);
    const vendors = useVendorStore((state) => state.vendors);
    const loading = useVendorStore((state) => state.loading);
    const error = useVendorStore((state) => state.error);
    const navigate = useNavigate();

    useEffect(() => {
        fetchVendors();
    }, [fetchVendors]);

    if (loading) return <Text fontSize="2xl" fontWeight="bold" textAlign="center" mt={8}>Loading...</Text>;
    if (error) return <Text fontSize="xl" color="red.400" textAlign="center" mt={8}>Error: {error}</Text>;

    return (
        <Box>
            {/* Page Header */}
            <Text fontSize="3xl" fontWeight="bold" textAlign="center" mt={6} mb={6} color="#F47D31">
                🔥 Top Rated Sellers 🔥
            </Text>

            {/* No Vendors Available */}
            {vendors.length === 0 ? (
                <Flex direction="column" align="center" justify="center" mt={10}>
                    <Image
                        src="https://cdn-icons-png.flaticon.com/512/4076/4076406.png"
                        alt="No Vendors Available"
                        boxSize={{ base: "200px", md: "300px" }}
                    />
                    <Text fontSize="xl" color="gray.500" mt={4}>No vendors available at the moment.</Text>
                    <Button
                        mt={4}
                        bg="orange.400"
                        color="white"
                        _hover={{ bg: "orange.500" }}
                        size="lg"
                        onClick={() => navigate("/")}
                    >
                        Explore Products
                    </Button>
                </Flex>
            ) : (
                <Grid
                    templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" }}
                    gap={6}
                    px={6}
                >
                    {vendors.map((vendor) => (
                        <GridItem key={vendor.id}>
                            <Box
                                p={6}
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                boxShadow="lg"
                                bgGradient="linear(to-b, #132063, #0A0E23)"
                                color="white"
                                textAlign="center"
                                _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
                                transition="all 0.3s ease"
                            >
                                {/* Circular Rating Badge */}
                                <Flex justifyContent="flex-end">
                                    <CircularProgress value={vendor.average_rating * 20} color="orange.400" size="50px" thickness="6px">
                                        <CircularProgressLabel fontSize="md" color="orange.400">
                                            {vendor.average_rating}
                                        </CircularProgressLabel>
                                    </CircularProgress>
                                </Flex>

                                {/* Avatar and Company Name */}
                                <VStack spacing={3} align="center" mt={-4}>
                                    <Avatar
                                        size="2xl"
                                        name={vendor.name || 'companyName'}
                                        src={vendor.images || "https://via.placeholder.com/150"}
                                        borderColor="orange.400"
                                        borderWidth={3}
                                    />
                                    <Text fontSize="xl" fontWeight="bold" color="orange.200">
                                        {vendor.name || 'Company Name'}
                                    </Text>
                                </VStack>

                                {/* Rating and Stars */}
                                <Box mt={4}>
                                    <Text fontSize="md" fontWeight="bold" color="orange.300">
                                        🌟 TOP-RATED 🌟
                                    </Text>
                                    <HStack justify="center" mt={2}>
                                        {[...Array(5)].map((_, i) => (
                                            <Icon
                                                key={i}
                                                as={FaStar}
                                                color={i < vendor.average_rating ? "orange.400" : "gray.500"}
                                                boxSize={4}
                                            />
                                        ))}
                                    </HStack>
                                </Box>

                                {/* Description */}
                                <Text fontSize="sm" color="gray.300" mt={3}>
                                    {vendor.shop_description || "No description available."}
                                </Text>

                                {/* Vendor Info */}
                                <HStack justify="center" mt={2}>
                                    <HStack>
                                        <Text fontSize="xs" color="gray.400">🚚 Delivery:</Text>
                                        <Text fontSize="xs">On Time</Text>
                                    </HStack>
                                    <HStack>
                                        <Text fontSize="xs" color="gray.400">⚡ Response:</Text>
                                        <Text fontSize="xs">Quick</Text>
                                    </HStack>
                                </HStack>

                                {/* Visit Button */}
                                <Flex justify="center" mt={5}>
                                    <Button
                                        colorScheme="orange"
                                        bg="orange.400"
                                        color="white"
                                        borderRadius="full"
                                        onClick={() => navigate(`/vendors/${vendor.id}/products`)}
                                        _hover={{ bg: "orange.500", transform: "scale(1.1)" }}
                                        transition="all 0.3s ease"
                                        px={6}
                                    >
                                        🔥 Visit Vendor
                                    </Button>
                                </Flex>

                                {/* Bottom Right Design Element */}
                                <Box position="absolute" bottom={3} right={3}>
                                    <Box width="40px" height="2px" bg="orange.400" mb="2px" />
                                    <Box width="30px" height="2px" bg="orange.200" />
                                </Box>
                            </Box>
                        </GridItem>
                    ))}
                </Grid>
            )}
        </Box>
    );
};

export default VendorCard;
