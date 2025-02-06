import React from 'react';
import { Box, Text, Button } from '@chakra-ui/react';

function PromotionalBanner() {
    return (
        <Box bg="#152238" p={8} mt={8} borderRadius="md" textAlign="center" color="white">
            <Text fontSize="2xl" fontWeight="bold" color={"#0A0E23"}>Limited Time Offer!</Text>
            <Text mt={4} mb={6}>Get 20% off on all Reapairs. Use code: SALE20</Text>
            <Button color={"white"} bgColor={"#F47D31"} colorScheme="whiteAlpha" variant="outline" size="lg">Shop Now</Button>
        </Box>
    );
}

export default PromotionalBanner;
