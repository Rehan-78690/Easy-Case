import React from "react";
import {
    Box, Text, VStack, HStack, Badge, Table, Thead, Tbody, Tr, Th, Td, Icon, Stat, StatLabel, StatNumber, Divider, useBreakpointValue
} from "@chakra-ui/react";
import { FaDollarSign, FaShoppingCart, FaBoxOpen, FaClock } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register Chart.js Components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Dummy Data for Vendor Stats
const vendorStats = [
    { id: 1, title: "Total Sales", value: "$15,230", icon: FaDollarSign, color: "green.500" },
    { id: 2, title: "Total Orders", value: "320", icon: FaShoppingCart, color: "blue.500" },
    { id: 3, title: "Products Sold", value: "1,245", icon: FaBoxOpen, color: "purple.500" },
    { id: 4, title: "Pending Orders", value: "12", icon: FaClock, color: "orange.500" },
];

// Dummy Sales Data for Chart
const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
        {
            label: "Monthly Sales ($)",
            data: [3200, 2800, 4000, 4500, 5200, 6100],
            backgroundColor: "rgba(54, 162, 235, 0.7)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
            borderRadius: 5,
        },
    ],
};

// Dummy Transactions
const transactions = [
    { id: 1, product: "Laptop", amount: "$1200", date: "2024-02-18", status: "Completed" },
    { id: 2, product: "Smartphone", amount: "$850", date: "2024-02-17", status: "Pending" },
    { id: 3, product: "Headphones", amount: "$150", date: "2024-02-16", status: "Completed" },
    { id: 4, product: "Smartwatch", amount: "$300", date: "2024-02-15", status: "Failed" },
];

// Function to Get Status Color
const getStatusColor = (status) => {
    switch (status) {
        case "Completed": return "green";
        case "Pending": return "orange";
        case "Failed": return "red";
        default: return "gray";
    }
};

const VendorReportPage = () => {
    // Responsive layout adjustments
    const isMobile = useBreakpointValue({ base: true, md: false });

    return (
        <Box p={6} maxW="1200px" mx="auto" bg="gray.50" minH="100vh" borderRadius="lg">
            
            {/* Page Header */}
            <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" mb={6} textAlign="center" color="blue.600">
                📊 Vendor Sales Report
            </Text>

            {/* Stats Overview */}
            <HStack spacing={6} mb={8} justify="center" flexWrap="wrap">
                {vendorStats.map(stat => (
                    <Box key={stat.id} p={4} borderWidth="1px" borderRadius="lg" boxShadow="md" bg="white"
                        w={{ base: "100%", sm: "48%", md: "220px" }} textAlign="center" _hover={{ boxShadow: "xl", transform: "scale(1.05)", transition: "0.3s ease-in-out" }}
                    >
                        <Icon as={stat.icon} color={stat.color} boxSize={8} mb={2} />
                        <Stat>
                            <StatLabel fontSize="sm">{stat.title}</StatLabel>
                            <StatNumber fontSize="lg">{stat.value}</StatNumber>
                        </Stat>
                    </Box>
                ))}
            </HStack>

            {/* Sales Chart */}
            <Box p={5} borderWidth="1px" borderRadius="lg" boxShadow="md" bg="white" mb={8}>
                <Text fontSize="lg" fontWeight="bold" mb={4}>📈 Sales Trend</Text>
                <Box w="100%" overflowX="auto">
                    <Bar 
                        data={salesData} 
                        options={{ 
                            responsive: true, 
                            maintainAspectRatio: false, 
                            scales: { y: { beginAtZero: true } }, 
                        }} 
                        height={isMobile ? 250 : 400} 
                    />
                </Box>
            </Box>

            {/* Recent Transactions */}
            <Box p={5} borderWidth="1px" borderRadius="lg" boxShadow="md" bg="white">
                <Text fontSize="lg" fontWeight="bold" mb={4}>💰 Recent Transactions</Text>
                <Box overflowX="auto">
                    <Table variant="simple" size={{ base: "sm", md: "md" }}>
                        <Thead bg="blue.100">
                            <Tr>
                                <Th>Product</Th>
                                <Th>Amount</Th>
                                <Th>Date</Th>
                                <Th>Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {transactions.map((txn) => (
                                <Tr key={txn.id} _hover={{ bg: "gray.100" }}>
                                    <Td>{txn.product}</Td>
                                    <Td fontWeight="bold">{txn.amount}</Td>
                                    <Td>{new Date(txn.date).toLocaleDateString()}</Td>
                                    <Td>
                                        <Badge colorScheme={getStatusColor(txn.status)}>{txn.status}</Badge>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </Box>
    );
};

export default VendorReportPage;
