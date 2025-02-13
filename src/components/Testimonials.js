import React from 'react';
import { Box, Text, Flex, Avatar, Heading, Icon, SimpleGrid } from '@chakra-ui/react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

function Testimonials() {
    const testimonials = [
        { name: "John Doe", review: "Amazing product quality!", rating: 5, image: "/category-imgs/category1.jpeg" },
        { name: "Jane Smith", review: "Great customer service.", rating: 4.5, image: "/category-imgs/category1.jpeg" },
        { name: "Michael Lee", review: "Fast delivery and good support!", rating: 4, image: "/category-imgs/category1.jpeg" },
        { name: "Sarah Johnson", review: "Loved the experience!", rating: 5, image: "/category-imgs/category1.jpeg" },
        { name: "Emma Wilson", review: "High quality and reliable!", rating: 4.5, image: "/category-imgs/category1.jpeg" },
        { name: "James Brown", review: "Customer service was top-notch!", rating: 5, image: "/category-imgs/category1.jpeg" },
        { name: "Alice Williams", review: "Great value for money!", rating: 4, image: "/category-imgs/category1.jpeg" },
        { name: "David Miller", review: "Highly recommended!", rating: 5, image: "/category-imgs/category1.jpeg" },
    ];

    // Function to generate star ratings
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        return (
            <Flex>
                {[...Array(fullStars)].map((_, i) => (
                    <Icon key={i} as={FaStar} color="yellow.400" />
                ))}
                {halfStar && <Icon as={FaStarHalfAlt} color="yellow.400" />}
                {[...Array(emptyStars)].map((_, i) => (
                    <Icon key={i} as={FaRegStar} color="gray.400" />
                ))}
            </Flex>
        );
    };

    return (
        <Box bg="#0A0E23" py={12} px={6} textAlign="center">
            {/* Header Section */}
            <Heading
                as="h2"
                fontSize="3xl"
                fontWeight="bold"
                bgGradient="linear(to-r, #F47D31, #e36625)"
                bgClip="text"
                mb={8}
            >
                What Our Customers Say
            </Heading>

            {/* Testimonials Grid */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                {testimonials.map((testimonial, index) => (
                    <Box
                        key={index}
                        p={6}
                        bg="black"
                        color="white"
                        borderRadius="lg"
                        boxShadow="lg"
                        transition="all 0.3s"
                        _hover={{
                            transform: "scale(1.05)",
                            boxShadow: "0 0 15px rgba(255, 166, 0, 0.7)",
                        }}
                    >
                        <Flex align="center" mb={4}>
                            <Avatar src={testimonial.image} size="lg" mr={4} />
                            <Box textAlign="left">
                                <Text fontWeight="bold" fontSize="lg">{testimonial.name}</Text>
                                {renderStars(testimonial.rating)}
                            </Box>
                        </Flex>
                        <Text fontSize="md" color="gray.300">"{testimonial.review}"</Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
}

export default Testimonials;
