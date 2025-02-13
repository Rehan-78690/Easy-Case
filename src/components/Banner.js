import React from "react";
import Slider from "react-slick";
import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);

const Banner = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 1200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4500,
        fade: true,
        arrows: false,
    };

    const slides = [
        {
            image: "/banner-imgs/banner1.jpg",
            heading: "Revamp Your Ride!",
            text: "Get up to 50% off on top-quality auto parts. Upgrade your car today!",
            button: "Shop Now",
        },
        {
            image: "/banner-imgs/banner2.jpg",
            heading: "Expert Repair Services",
            text: "From minor fixes to major repairs, trust our specialists to get your car running like new.",
            button: "Book a Service",
        },
        {
            image: "/banner-imgs/banner3.jpg",
            heading: "New & Used Parts Available",
            text: "Find high-quality new and pre-owned auto parts at unbeatable prices.",
            button: "Browse Inventory",
        },
    ];

    return (
        <Box position="relative" w="100%" overflow="hidden">
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <Box key={index} position="relative">
                        {/* Background Image */}
                        <Box
                            as="section"
                            bgImage={`url(${slide.image})`}
                            bgSize="cover"
                            bgPosition="center"
                            height={{ base: "500px", md: "600px", lg: "750px" }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="column"
                            position="relative"
                            textAlign="center"
                        >
                            {/* Gradient Overlay */}
                            <Box
                                position="absolute"
                                top="0"
                                left="0"
                                w="100%"
                                h="100%"
                                bgGradient="linear(to-b, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.2))"
                            />

                            {/* Animated Text Content */}
                            <MotionBox
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                zIndex="1"
                                textAlign="center"
                                p={{ base: 4, md: 8 }}
                                maxW="80%"
                            >
                                <MotionHeading
                                    as="h1"
                                    size={{ base: "xl", md: "3xl", lg: "4xl" }}
                                    color="white"
                                    mb={3}
                                    fontWeight="bold"
                                    transition={{ duration: 1.2, delay: 0.2 }}
                                >
                                    {slide.heading}
                                </MotionHeading>

                                <MotionText
                                    fontSize={{ base: "md", md: "lg", lg: "xl" }}
                                    color="gray.300"
                                    mb={6}
                                    transition={{ duration: 1.2, delay: 0.4 }}
                                >
                                    {slide.text}
                                </MotionText>

                                <MotionButton
                                    size="lg"
                                    px={8}
                                    py={6}
                                    fontSize="lg"
                                    fontWeight="bold"
                                    colorScheme="orange"
                                    bg="orange.500"
                                    _hover={{ bg: "orange.600", transform: "scale(1.05)" }}
                                    transition="all 0.3s ease"
                                    borderRadius="full"
                                >
                                    {slide.button}
                                </MotionButton>
                            </MotionBox>
                        </Box>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
};

export default Banner;
