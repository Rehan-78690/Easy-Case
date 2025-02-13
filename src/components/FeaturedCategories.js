import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Slider from "react-slick";
import { Box, Image, Text, Flex, Spinner } from "@chakra-ui/react";
import axios from "axios";

function FeaturedCategories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Category Images
    const categoryImages = {
        1: "/category-imgs/category1.jpg",
        2: "/category-imgs/category2.jpg",
        3: "/category-imgs/category3.jpg",
        4: "/category-imgs/category4.jpg",
        5: "/category-imgs/category5.jpg",
        6: "/category-imgs/category6.jpg",
        7: "/category-imgs/category7.jpg",
        8: "/category-imgs/category8.jpg",
        9: "/category-imgs/category9.jpg",
        10: "/category-imgs/category10.jpg",
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/store/collections/");
                setCategories(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load categories");
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: categories.length >= 7 ? 7 : categories.length,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            { breakpoint: 1280, settings: { slidesToShow: 6 } },
            { breakpoint: 1024, settings: { slidesToShow: 5 } },
            { breakpoint: 768, settings: { slidesToShow: 3 } },
            { breakpoint: 480, settings: { slidesToShow: 2 } },
            { breakpoint: 360, settings: { slidesToShow: 1 } },
        ],
    };

    if (loading) {
        return (
            <Flex justify="center" align="center" height="200px">
                <Spinner size="lg" />
            </Flex>
        );
    }

    if (error) {
        return (
            <Flex justify="center" align="center" height="200px">
                <Text color="red.500">{error}</Text>
            </Flex>
        );
    }

    const handleCategoryClick = (categoryId) => {
        navigate(`/products?category=${categoryId}`);
    };

    return (
        <Box py={{ base: 4, md: 8 }} px={{ base: 2, md: 4 }} textAlign="center">
            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold" color="#0A0E23" mb={4}>
                Featured Categories
            </Text>

            {categories.length === 0 ? (
                // 🔥 Display Beautiful "No Categories Available" Banner
                <Box textAlign="center" p={6}>
                    <Image
                        src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
                        alt="No categories available"
                        maxW="300px"
                        mx="auto"
                        borderRadius="md"
                        boxShadow="lg"
                    />
                    <Text fontSize="lg" color="gray.600" mt={3} fontWeight="bold">
                        No Categories Available
                    </Text>
                </Box>
            ) : (
                <Slider {...settings}>
                    {categories.map((category) => (
                        <Flex
                            key={category.id}
                            direction="column"
                            align="center"
                            justify="center"
                            mx={2}
                            cursor="pointer"
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            <Box
                                borderRadius="full"
                                overflow="hidden"
                                width={{ base: "80px", md: "100px", lg: "120px" }}
                                height={{ base: "80px", md: "100px", lg: "120px" }}
                                mb={2}
                                border="2px solid #F47D31"
                                boxShadow="lg"
                                transition="all 0.3s"
                                _hover={{ transform: "scale(1.1)", borderColor: "#FF914D" }}
                            >
                                <Image
                                    src={categoryImages[category.id] || "/category-imgs/defaultCategory.jpg"}
                                    alt={category.title}
                                    width="100%"
                                    height="100%"
                                    objectFit="cover"
                                />
                            </Box>
                            <Text fontSize={{ base: "xs", md: "sm", lg: "md" }} fontWeight="bold" color="#0A0E23">
                                {category.title}
                            </Text>
                        </Flex>
                    ))}
                </Slider>
            )}
        </Box>
    );
}

export default FeaturedCategories;
