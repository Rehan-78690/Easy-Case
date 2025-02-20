import React, { useState } from "react";
import { 
    Box, Text, VStack, HStack, Badge, Icon, Divider, Button, Flex 
} from "@chakra-ui/react";
import { FaBell, FaInfoCircle, FaCheckCircle, FaExclamationTriangle, FaTrash } from "react-icons/fa";

// Dummy Data for Notifications
const initialNotifications = [
    {
        id: 1,
        type: "success",
        message: "✅ Your order #12345 has been shipped successfully!",
        date: "2024-02-18",
    },
    {
        id: 2,
        type: "info",
        message: "ℹ️ A new feature update is available for your account.",
        date: "2024-02-17",
    },
    {
        id: 3,
        type: "warning",
        message: "⚠️ Your subscription will expire in 3 days. Renew now!",
        date: "2024-02-16",
    },
    {
        id: 4,
        type: "error",
        message: "❌ Payment for order #12340 failed. Please try again.",
        date: "2024-02-15",
    },
    {
        id: 5,
        type: "info",
        message: "📢 Check out our latest blog post on new tech trends!",
        date: "2024-02-14",
    },
];

// Function to get the correct icon & color based on notification type
const getNotificationStyle = (type) => {
    switch (type) {
        case "success":
            return { icon: FaCheckCircle, color: "green.500" };
        case "info":
            return { icon: FaInfoCircle, color: "blue.500" };
        case "warning":
            return { icon: FaExclamationTriangle, color: "orange.500" };
        case "error":
            return { icon: FaBell, color: "red.500" };
        default:
            return { icon: FaInfoCircle, color: "gray.500" };
    }
};

const NotificationsPage = () => {
    const [notifications, setNotifications] = useState(initialNotifications);

    // Function to clear all notifications
    const clearNotifications = () => {
        setNotifications([]);
    };

    return (
        <Box p={6} maxW="800px" mx="auto" bg="gray.50" minH="100vh" borderRadius="lg">
            {/* Header with Clear Button */}
            <Flex justify="space-between" align="center" mb={6}>
                <Text fontSize="3xl" fontWeight="bold" color="blue.600">
                    🔔 Notifications & Updates
                </Text>
                {notifications.length > 0 && (
                    <Button 
                        colorScheme="red" 
                        leftIcon={<FaTrash />} 
                        onClick={clearNotifications} 
                        size="sm"
                    >
                        Clear All
                    </Button>
                )}
            </Flex>

            {/* Notifications List */}
            <VStack spacing={4} align="stretch">
                {notifications.length === 0 ? (
                    <Box textAlign="center" py={10}>
                        <Icon as={FaBell} boxSize={12} color="gray.400" />
                        <Text fontSize="lg" color="gray.500">No new notifications</Text>
                    </Box>
                ) : (
                    notifications.map((notification) => {
                        const { icon, color } = getNotificationStyle(notification.type);

                        return (
                            <Box 
                                key={notification.id} 
                                p={4} 
                                borderWidth="1px" 
                                borderRadius="lg" 
                                boxShadow="md" 
                                bg="white"
                                _hover={{ boxShadow: "lg", transform: "scale(1.02)", transition: "0.2s" }}
                            >
                                <HStack justify="space-between" mb={2}>
                                    <HStack>
                                        <Icon as={icon} color={color} boxSize={6} />
                                        <Text fontWeight="bold">{notification.message}</Text>
                                    </HStack>
                                    <Badge colorScheme="gray" fontSize="0.8em">{new Date(notification.date).toLocaleDateString()}</Badge>
                                </HStack>
                                <Divider />
                            </Box>
                        );
                    })
                )}
            </VStack>
        </Box>
    );
};

export default NotificationsPage;
