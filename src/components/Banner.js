import React from 'react';
import Slider from 'react-slick';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { motion } from 'framer-motion';

function Banner() {
    const MotionBox = motion(Box);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
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
        <Box mt="0" pt="0"> {/* Removed margin and padding to align perfectly with the navbar */}
            <Slider {...settings}>
                {slides.map((slide, index) => (
                    <Box key={index}>
                        <Box
                            as="section"
                            bgImage={`url(${slide.image})`}
                            bgSize="cover"
                            bgPosition="center"
                            height={{ base: "300px", md: "500px" }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            flexDirection="column"
                            position="relative"
                            color="white"
                        >
                            <MotionBox
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                bg="rgba(0, 0, 0, 0.5)"
                                p={4}
                                textAlign="center"
                                borderRadius="md"
                            >
                                <Heading as="h1" size="2xl" mb={4}>
                                    {slide.heading}
                                </Heading>
                                <Text fontSize="lg" mb={6}>
                                    {slide.text}
                                </Text>
                                <Button
                                    size="lg"
                                    colorScheme="black"
                                    bg="#0A0E27"
                                    _hover={{ bg: "#e36625" }}
                                    borderRadius="full"
                                >
                                    {slide.button}
                                </Button>
                            </MotionBox>
                        </Box>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}

export default Banner;
