import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
  VStack,
  Text,
  Icon,
  Spinner,
  Alert,
  AlertIcon,
  Center,
  Heading,
} from "@chakra-ui/react";
import {
  FaCarBattery,
  FaCogs,
  FaOilCan,
  FaCarSide,
  FaLightbulb,
  FaCarCrash,
  FaTools,
  FaGasPump,
  FaTachometerAlt,
  FaBolt,
} from "react-icons/fa";
import axios from "axios";

// Icon mapping for auto parts categories
const iconMap = {
  "Car Battery": FaCarBattery,
  "Engine Parts": FaCogs,
  "Oil & Lubricants": FaOilCan,
  "Body Parts": FaCarSide,
  "Headlights": FaLightbulb,
  "Brakes & Suspension": FaCarCrash,
  "Tools & Accessories": FaTools,
  "Fuel System": FaGasPump,
  "Speedometer": FaTachometerAlt,
  "Electrical Components": FaBolt,
  Default: FaCogs, // Default icon for unknown categories
};

const FeaturedAutoParts = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/store/collections/")
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch categories. Please try again.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Center height="80vh">
        <Spinner size="xl" color="blue.500" thickness="5px" speed="0.65s" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center height="80vh">
        <Alert status="error" borderRadius="md" boxShadow="lg">
          <AlertIcon />
          {error}
        </Alert>
      </Center>
    );
  }

  return (
    <Box>
      {/* Header Section */}
      <Box
        bgGradient="linear(to-r, blue.500, blue.700)"
        py={10}
        textAlign="center"
        color="white"
      >
        <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold">
          🚗 Featured Auto Parts Categories
        </Heading>
        <Text fontSize="md" opacity={0.9}>
          Explore high-quality auto parts for your vehicles.
        </Text>
      </Box>

      {/* Categories Section */}
      <Box maxW="1200px" mx="auto" mt={10} p={6}>
        <SimpleGrid columns={{ base: 2, sm: 3, md: 4, lg: 5 }} spacing={6}>
          {categories.map((category, index) => {
            const IconComponent = iconMap[category.title] || iconMap.Default;
            return (
              <VStack
                key={index}
                p={4}
                borderRadius="full"
                boxShadow="md"
                _hover={{
                  transform: "scale(1.1)",
                  transition: "0.3s",
                  bg: "blue.100",
                }}
                bg="gray.100"
                w="120px"
                h="120px"
                justify="center"
                align="center"
              >
                <Icon as={IconComponent} boxSize={10} color="blue.500" />
                <Text fontWeight="bold" fontSize="sm" textAlign="center">
                  {category.title}
                </Text>
              </VStack>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default FeaturedAutoParts;
