import React from 'react';
import { Box, Text, Button, VStack, useBreakpointValue } from '@chakra-ui/react';

function PromotionalBanner() {
    const textSize = useBreakpointValue({ base: "xl", md: "2xl", lg: "3xl" });
    const buttonSize = useBreakpointValue({ base: "md", md: "lg" });

    return (
        <Box 
            bgGradient="linear(to-r, #FF7E5F, #FEB47B)" 
            p={{ base: 6, md: 10 }} 
            mt={8} 
            borderRadius="md" 
            textAlign="center" 
            color="white" 
            boxShadow="lg"
            transition="all 0.3s ease"
            _hover={{ transform: "scale(1.02)", boxShadow: "xl" }}
        >
            <VStack spacing={4}>
                <Text 
                    fontSize={textSize} 
                    fontWeight="bold" 
                    letterSpacing="wide"
                    textTransform="uppercase"
                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.3)"
                >
                    Limited Time Offer!
                </Text>

                <Text fontSize="lg" opacity={0.9}>
                    🎉 Get <b>20% OFF</b> on all Repairs. Use code: <b>SALE20</b> 🎉
                </Text>

                <Button 
                    size={buttonSize} 
                    color="white" 
                    bgGradient="linear(to-b, #F47D31, #D9480F)" 
                    _hover={{ bgGradient: "linear(to-b, #D9480F, #A83208)", transform: "scale(1.1)" }}
                    transition="all 0.3s ease"
                    fontWeight="bold"
                    letterSpacing="wide"
                    px={8}
                    py={6}
                >
                    🚀 Shop Now
                </Button>
            </VStack>
        </Box>
    );
}

export default PromotionalBanner;
