import React, { useState } from 'react';

import { Box, VStack, HStack, Image, Heading, FormControl, FormLabel, Input, Textarea, Button, useBreakpointValue } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BuyerSidebar from '../../pages/BuyerSidebar';
import Navbar from '../Navbar';
const SellerSignup = () => {
    const userId = localStorage.getItem("vendorId");
    const [sellerData, setSellerData] = useState({
        user: userId,
        name: '',
        email: '',
        phone: '',
        shop_name: '',
        shop_description: '',
        shop_address: '',
    });

    const toast = useToast();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSellerData({
            ...sellerData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send POST request to backend API
            await axios.post('http://127.0.0.1:8000/store/vendors/', sellerData);
            toast({
                title: `Dear ${sellerData.name},`,
                description: "Your information is sent to admin. You will receive an email confirmation, and after that, you can log in to your seller account.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            navigate('/');
        } catch (error) {
            console.error("Error during signup", error);

            // Check if the response contains data with the error message
            const errorMessage = error.response?.data?.error || "There was an error registering your seller account. Please try again.";

            // Show the error message in the toast
            toast({
                title: "Registration Failed",
                description: errorMessage, // Display the error message from the response
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }

    };

    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <>
          <BuyerSidebar /> 
          <Navbar />
          <Box maxW="800px" mx="auto"  p={8}  boxShadow="xl" borderRadius="lg" bg="white" mt={10} border="1px solid #E2E8F0">
            <VStack spacing={6} width="100%">
                {/* Logo */}
                <Image src="/logo.jpg" alt="Logo" width="200px" />

                {/* Heading */}
                <Heading as="h1" size="lg" textAlign="center" color="#0A0E27">
                    Seller Registration
                </Heading>

                {/* Form Fields */}
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <VStack spacing={4} width="100%">

                        {/* Name & Email */}
                        <HStack width="100%" spacing={4} flexWrap="wrap">
                            <FormControl flex="1" isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    value={sellerData.name}
                                    onChange={handleInputChange}
                                    fontSize="md"
                                    height="50px"
                                />
                            </FormControl>
                            <FormControl flex="1" isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    value={sellerData.email}
                                    onChange={handleInputChange}
                                    fontSize="md"
                                    height="50px"
                                />
                            </FormControl>
                        </HStack>

                        {/* Phone & Shop Name */}
                        <HStack width="100%" spacing={4} flexWrap="wrap">
                            <FormControl flex="1" isRequired>
                                <FormLabel>Phone</FormLabel>
                                <Input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter your phone number"
                                    value={sellerData.phone}
                                    onChange={handleInputChange}
                                    fontSize="md"
                                    height="50px"
                                />
                            </FormControl>
                            <FormControl flex="1" isRequired>
                                <FormLabel>Shop Name</FormLabel>
                                <Input
                                    type="text"
                                    name="shop_name"
                                    placeholder="Enter your shop name"
                                    value={sellerData.shop_name}
                                    onChange={handleInputChange}
                                    fontSize="md"
                                    height="50px"
                                />
                            </FormControl>
                        </HStack>

                        {/* Shop Description & Shop Address (Full Width) */}
                        <FormControl isRequired>
                            <FormLabel>Shop Description</FormLabel>
                            <Textarea
                                name="shop_description"
                                placeholder="Describe your shop"
                                value={sellerData.shop_description}
                                onChange={handleInputChange}
                                fontSize="md"
                                height="100px"
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Shop Address</FormLabel>
                            <Textarea
                                name="shop_address"
                                placeholder="Enter your shop address"
                                value={sellerData.shop_address}
                                onChange={handleInputChange}
                                fontSize="md"
                                height="100px"
                            />
                        </FormControl>

                        {/* Register Button */}
                        <Button
                            type="submit"
                            bgGradient="linear(to-r, #0A0E27, #1A202C)"
                            color="white"
                            width={isMobile ? "100%" : "50%"}
                            mx="auto"
                            mt={4}
                            display="block"
                            _hover={{ bgGradient: "linear(to-r, #1A202C, #0A0E27)" }}
                        >
                            Register
                        </Button>
                    </VStack>
                </form>
            </VStack>
        </Box>
        </>
    );
};

export default SellerSignup;
