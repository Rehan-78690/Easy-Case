import React, { useEffect, useState } from 'react';
import {
    Box,
    Heading,
    Spinner,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Select,
    IconButton,
    Text,
    Flex,
    Button,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    List,
    ListItem,
    useToast,
    Center,
    VStack,
} from '@chakra-ui/react';
import { CheckIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import useVendorOrderStore from '../../stores/vendorOrderStore';
import { jsPDF } from 'jspdf';

const Ordersdetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { orders, loading, fetchVendorOrders, updateOrderStatus } = useVendorOrderStore();
    const [selectedStatus, setSelectedStatus] = useState({});
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const toast = useToast();
    const token = localStorage.getItem('access_token');
    const selectedMonth = location.state?.month;

    useEffect(() => {
        const fetchOrders = async () => {
            await fetchVendorOrders(token);
            const initialStatuses = {};
            orders.forEach(order => {
                initialStatuses[order.id] = order.payment_status;
            });
            setSelectedStatus(initialStatuses);
        };

        fetchOrders();
    }, [fetchVendorOrders, token]);

    useEffect(() => {
        if (selectedMonth !== undefined) {
            const filtered = orders.filter(order => {
                const orderMonth = new Date(order.placed_at).getMonth();
                return orderMonth === selectedMonth;
            });
            setFilteredOrders(filtered);
        } else {
            setFilteredOrders(orders);
        }
    }, [orders, selectedMonth]);

    const handleStatusChange = (orderId, value) => {
        setSelectedStatus((prevStatus) => ({ ...prevStatus, [orderId]: value }));
    };

    const handleUpdateStatus = async (orderId, e) => {
        e.stopPropagation();
        const status = selectedStatus[orderId];
        if (!status) {
            toast({
                title: 'Error',
                description: 'Please select a status before updating',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
            return;
        }

        await updateOrderStatus(orderId, status, token);
        toast({
            title: 'Success',
            description: 'Order status updated successfully',
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Pending':
                return 'yellow.500';
            case 'Complete':
                return 'green.500';
            case 'Failed':
                return 'red.500';
            default:
                return 'gray.500';
        }
    };

    const generatePDFReceipt = (order) => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text('Order Receipt', 20, 20);
        doc.setFontSize(12);
        doc.text(`Order ID: ${order.id}`, 20, 40);
        doc.text(`Customer: ${order.customer}`, 20, 50);
        doc.text(`Placed At: ${new Date(order.placed_at).toLocaleString()}`, 20, 60);
        doc.text(`Total Items: ${order.items.length}`, 20, 70);
        doc.text(`Total Amount: Rs ${order.total?.toFixed(2)}`, 20, 80);

        doc.text('Items:', 20, 100);
        order.items.forEach((item, index) => {
            const yPos = 110 + index * 10;
            doc.text(`- ${item.product.title} (Qty: ${item.quantity}, Unit Price: Rs ${item.unit_price})`, 20, yPos);
        });

        doc.save(`Order_${order.id}_Receipt.pdf`);
    };

    if (loading) {
        return (
            <Center height="100vh">
                <Spinner size="xl" color="blue.500" />
            </Center>
        );
    }

    return (
        <Box width="100%" mx="auto" p="6" bg="gray.100" color="black" minHeight="100vh">
            <Flex justifyContent="space-between" mb="6">
                <IconButton
                    aria-label="Back"
                    icon={<ArrowBackIcon />}
                    colorScheme="blue"
                    onClick={() => navigate('/MainSellerPage')}
                />
                <Heading as="h2" size="lg" textAlign="center" color="blue.600">
                    Vendor Orders {selectedMonth !== undefined ? `(Month: ${selectedMonth + 1})` : ''}
                </Heading>
                <Box />
            </Flex>

            {filteredOrders.length === 0 ? (
                <Center height="50vh">
                    <VStack spacing="4">
                        <Text fontSize="xl" color="gray.600">
                            🚀 No orders found! Stay tuned for new orders.
                        </Text>
                        <Button colorScheme="blue" onClick={() => navigate('/MainSellerPage')}>
                            Back to Dashboard
                        </Button>
                    </VStack>
                </Center>
            ) : (
                <Table variant="simple" size="md" colorScheme="blue">
                    <Thead>
                        <Tr>
                            <Th>Order ID</Th>
                            <Th>Customer</Th>
                            <Th>Placed At</Th>
                            <Th>Items</Th>
                            <Th>Status</Th>
                            <Th>Update</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredOrders.map((order) => (
                            <Tr key={order.id}>
                                <Td>{order.id}</Td>
                                <Td>{order.customer}</Td>
                                <Td>{new Date(order.placed_at).toLocaleString()}</Td>
                                <Td>
                                    <Popover>
                                        <PopoverTrigger>
                                            <Button colorScheme="blue" size="sm" onClick={() => setSelectedOrder(order)}>
                                                {order.items.length} Items
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverCloseButton />
                                            <PopoverHeader fontWeight="bold">Order Details</PopoverHeader>
                                            <PopoverBody>
                                                <List spacing={2}>
                                                    {order.items.map((item, index) => (
                                                        <ListItem key={index}>
                                                            <Text><strong>Product:</strong> {item.product.title}</Text>
                                                            <Text><strong>Quantity:</strong> {item.quantity}</Text>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                                <Button mt="4" colorScheme="blue" onClick={() => generatePDFReceipt(order)}>
                                                    Download Receipt
                                                </Button>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Popover>
                                </Td>
                                <Td>
                                    <Text color={getStatusColor(order.payment_status)}>{order.payment_status}</Text>
                                </Td>
                                <Td>
                                    <Select size="sm" bg="white" color="black" onChange={(e) => handleStatusChange(order.id, e.target.value)}>
                                        <option value="Pending">Pending</option>
                                        <option value="Complete">Complete</option>
                                        <option value="Failed">Failed</option>
                                    </Select>
                                    <IconButton icon={<CheckIcon />} colorScheme="blue" onClick={(e) => handleUpdateStatus(order.id, e)} ml="2" />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            )}
        </Box>
    );
};

export default Ordersdetails;
