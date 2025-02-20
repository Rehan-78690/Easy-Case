import React, { useEffect, useState } from 'react';
import {
  Select,
  Box,
  Text,
  Spinner,
  List,
  ListItem,
  VStack,
  HStack,
  Badge,
  Flex,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Icon,
} from '@chakra-ui/react';
import { FaArrowLeft, FaBoxOpen } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import useVendorOrderStore from '../../stores/vendorOrderStore';

const VendorSales = () => {
  const { orders = [], loading, error, fetchVendorOrders } = useVendorOrderStore();
  const [totalSales, setTotalSales] = useState(0);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const navigate = useNavigate();
  const location = useLocation();
  const dayFilter = location.state?.day; // Get the day filter from route state

  // Calculate total sales
  const calculateSales = (orders) => {
    let total = 0;
    orders.forEach((order) => {
      total += order.total || 0;
    });
    setTotalSales(total);
  };

  // Filter orders by month, day, and year
  const filterOrders = (orders, month, day, year) => {
    return orders.filter((order) => {
      const orderDate = new Date(order.placed_at);
      const isSameMonth = orderDate.getMonth() === month;
      const isSameYear = orderDate.getFullYear() === year;
      const isSameDay = day !== null ? orderDate.getDate() === day : true;
      return isSameMonth && isSameYear && isSameDay;
    });
  };

  useEffect(() => {
    if (orders.length === 0) {
      fetchVendorOrders(); // Fetch orders if not already fetched
    } else {
      const filtered = filterOrders(orders, selectedMonth, selectedDay, selectedYear);
      setFilteredOrders(filtered);
      calculateSales(filtered);
    }
  }, [orders, fetchVendorOrders, selectedMonth, selectedDay, selectedYear]);

  if (loading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner color="#F47D31" size="xl" />
      </Flex>
    );
  }

  return (
    <Box
      p={6}
      bg="gray.100"
      color="gray.800"
      borderRadius="lg"
      boxShadow="lg"
      maxW={{ base: '100%', md: '700px' }}
      mx="auto"
      mt={8}
    >
      {/* Back Button */}
      <Button
        leftIcon={<FaArrowLeft />}
        colorScheme="blue"
        variant="solid"
        mb={4}
        onClick={() => navigate('/MainSellerPage')}
      >
        Back
      </Button>

      {error && (
        <Alert status="error" mb={4} borderRadius="md">
          <AlertIcon />
          <AlertTitle>Error:</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <VStack spacing={6} align="stretch">
        <Box textAlign="center">
          <Text fontSize="2xl" fontWeight="bold" mb={2} color="#333">
            Total Sales
          </Text>
          <Text fontSize="4xl" fontWeight="bold" color="blue.600">
            Rs {totalSales.toFixed(2)}
          </Text>
        </Box>

        {/* Filters */}
        <HStack spacing={4} justifyContent="center" mb={4}>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value, 10))}
            bg="white"
            borderColor="blue.400"
            _focus={{ borderColor: 'blue.600' }}
          >
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(
              (month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              )
            )}
          </Select>

          <Select
            value={selectedDay || ''}
            onChange={(e) => setSelectedDay(e.target.value ? parseInt(e.target.value, 10) : null)}
            bg="white"
            borderColor="blue.400"
            _focus={{ borderColor: 'blue.600' }}
          >
            <option value="">All Days</option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </Select>

          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value, 10))}
            bg="white"
            borderColor="blue.400"
            _focus={{ borderColor: 'blue.600' }}
          >
            {[2023, 2024, 2025].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </Select>
        </HStack>

        {/* Sales List */}
        <Box mt={6} bg="white" p={5} borderRadius="lg" boxShadow="md">
          <Text fontSize="xl" fontWeight="bold" color="blue.700" mb={4}>
            Sales List
          </Text>

          {filteredOrders.length === 0 ? (
            <Flex
              direction="column"
              align="center"
              justify="center"
              p={8}
              color="gray.500"
            >
              <Icon as={FaBoxOpen} boxSize={12} color="gray.400" />
              <Text fontSize="lg" mt={2}>
                No sales available at the moment.
              </Text>
            </Flex>
          ) : (
            <List spacing={4}>
              {filteredOrders.map((order) => (
                <ListItem
                  key={order.id}
                  p={4}
                  bg="white"
                  borderRadius="md"
                  boxShadow="sm"
                  _hover={{ bg: 'blue.50', transform: 'scale(1.02)', transition: '0.2s' }}
                  border="1px solid"
                  borderColor="blue.300"
                >
                  <VStack align="start" spacing={1}>
                    <HStack justify="space-between" w="full">
                      <Text fontWeight="bold" color="blue.800">
                        Order ID: {order.id}
                      </Text>
                      <Badge colorScheme="green" variant="solid">
                        {order.status || 'Completed'}
                      </Badge>
                    </HStack>
                    <Text fontSize="sm" color="gray.600">
                      Date: {new Date(order.placed_at).toLocaleString()}
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" color="blue.800">
                      Rs {order.total?.toFixed(2) || '0.00'}
                    </Text>
                  </VStack>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default VendorSales;
