import React from "react";
import { Box, Text, VStack, Avatar, HStack, Divider, Badge } from "@chakra-ui/react";
import { FaStar, FaRegStar } from "react-icons/fa";

// Dummy Data for Reviews
const reviews = [
    {
        id: 1,
        user: { name: "Ali Khan" },
        rating: 5,
        comment: "Excellent product! Highly recommend it.",
        date: "2024-02-10",
    },
    {
        id: 2,
        user: { name: "Sarah Ahmed" },
        rating: 4,
        comment: "Good quality, but delivery was slightly delayed.",
        date: "2024-02-08",
    },
    {
        id: 3,
        user: { name: "Usman Tariq" },
        rating: 3,
        comment: "The product is okay, but expected better packaging.",
        date: "2024-02-06",
    },
    {
        id: 4,
        user: { name: "Ayesha Raza" },
        rating: 5,
        comment: "Amazing experience! Will definitely buy again.",
        date: "2024-02-05",
    },
    {
        id: 5,
        user: { name: "Bilal Iqbal" },
        rating: 2,
        comment: "Not satisfied with the product quality.",
        date: "2024-02-03",
    },
];

const ReviewsPage = () => {
    return (
        <Box p={6} maxW="1200px" mx="auto">
            <Text fontSize="3xl" fontWeight="bold" mb={4} color="blue.600" textAlign="center">
                ⭐ Customer Reviews & Ratings
            </Text>

            <VStack spacing={5} align="stretch">
                {reviews.map((review) => (
                    <Box key={review.id} p={5} borderWidth="1px" borderRadius="lg" boxShadow="md" bg="white">
                        <HStack justify="space-between" mb={2}>
                            <HStack>
                                <Avatar size="md" name={review.user.name} />
                                <Text fontWeight="bold">{review.user.name}</Text>
                            </HStack>
                            <Badge colorScheme="green">{new Date(review.date).toLocaleDateString()}</Badge>
                        </HStack>

                        {/* Star Ratings */}
                        <HStack mb={3}>
                            {Array.from({ length: 5 }, (_, index) => (
                                index < review.rating ? 
                                    <FaStar key={index} color="gold" size="18px" /> : 
                                    <FaRegStar key={index} color="gray" size="18px" />
                            ))}
                        </HStack>

                        <Text color="gray.700" fontSize="md">{review.comment}</Text>
                        <Divider my={3} />
                    </Box>
                ))}
            </VStack>
        </Box>
    );
};

export default ReviewsPage;
