import React from 'react';
import { Box, Flex, Heading, Text, Input, Button, Image } from '@chakra-ui/react';

const NewsletterSignup = () => {
    return (
        <Box
            bgGradient="linear(to-r, rgba(10,14,35,0.9), rgba(19,32,99,0.9))"
            color="white"
            py={{ base: 10, md: 16 }}
            px={6}
            mt={12}
            textAlign="center"
            borderRadius="lg"
            position="relative"
            overflow="hidden"
        >
            {/* Background Image */}
            <Image
                src="https://source.unsplash.com/1600x900/?newsletter,technology"
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                objectFit="cover"
                opacity={0.2}
                zIndex={-1}
            />

            <Heading
                as="h3"
                size="xl"
                fontWeight="bold"
                mb={3}
                bgGradient="linear(to-r, #F47D31, #e36625)"
                bgClip="text"
            >
                Join Our Exclusive Newsletter
            </Heading>

            <Text fontSize="lg" maxW="600px" mx="auto" mb={6} color="gray.300">
                Subscribe now and get the latest updates on new arrivals, special offers, and trends!
            </Text>

            {/* Newsletter Signup Form */}
            <Flex
                as="form"
                direction={{ base: 'column', md: 'row' }}
                alignItems="center"
                justifyContent="center"
                gap={4}
                maxW="600px"
                mx="auto"
                backdropFilter="blur(10px)"
                p={4}
                borderRadius="lg"
            >
                <Input
                    placeholder="Enter your email address"
                    type="email"
                    size="lg"
                    borderRadius="full"
                    border="none"
                    focusBorderColor="orange.400"
                    bg="rgba(255,255,255,0.1)"
                    _placeholder={{ color: "gray.400" }}
                    _focus={{ bg: "rgba(255,255,255,0.2)" }}
                    transition="all 0.3s ease"
                    px={5}
                    color="white"
                />
                <Button
                    size="lg"
                    bgGradient="linear(to-r, #F47D31, #e36625)"
                    color="white"
                    borderRadius="full"
                    px={6}
                    _hover={{ bgGradient: "linear(to-r, #e36625, #e2451a)", boxShadow: "lg" }}
                    transition="all 0.3s ease"
                >
                    Subscribe
                </Button>
            </Flex>
        </Box>
    );
};

export default NewsletterSignup;
