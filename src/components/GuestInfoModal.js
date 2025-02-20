import React, { useState } from 'react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody,
    ModalFooter, Button, FormControl, FormLabel, Input, SimpleGrid, VStack, Box
} from '@chakra-ui/react';

const GuestInfoModal = ({ isOpen, onClose, handleGuestSubmit }) => {
    const [guestInfo, setGuestInfo] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        country: '',
        postal_code: ''
    });

    // Handle form submission when user clicks "Proceed to Checkout"
    const handleSubmit = () => {
        if (!guestInfo.name || !guestInfo.email || !guestInfo.address || !guestInfo.city || !guestInfo.postal_code) {
            alert('Please fill in all fields.');
            return;
        }
        handleGuestSubmit(guestInfo);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent borderRadius="12px" boxShadow="2xl" p={4} bg="white">
                <ModalHeader textAlign="center" fontSize="2xl" fontWeight="bold" color="blue.600">
                    Guest Checkout
                </ModalHeader>
                <ModalCloseButton />

                <ModalBody>
                    <VStack spacing={4}>
                        {/* Two-column Grid Layout */}
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
                            <FormControl isRequired>
                                <FormLabel fontWeight="bold" color="gray.600">Full Name</FormLabel>
                                <Input
                                    placeholder="Enter full name"
                                    value={guestInfo.name}
                                    onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
                                    variant="filled"
                                    bg="gray.100"
                                    _focus={{ bg: "white", borderColor: "blue.400" }}
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel fontWeight="bold" color="gray.600">Email</FormLabel>
                                <Input
                                    type="email"
                                    placeholder="Enter email"
                                    value={guestInfo.email}
                                    onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                                    variant="filled"
                                    bg="gray.100"
                                    _focus={{ bg: "white", borderColor: "blue.400" }}
                                />
                            </FormControl>
                        </SimpleGrid>

                        <FormControl isRequired>
                            <FormLabel fontWeight="bold" color="gray.600">Address</FormLabel>
                            <Input
                                placeholder="Enter your address"
                                value={guestInfo.address}
                                onChange={(e) => setGuestInfo({ ...guestInfo, address: e.target.value })}
                                variant="filled"
                                bg="gray.100"
                                _focus={{ bg: "white", borderColor: "blue.400" }}
                            />
                        </FormControl>

                        {/* Two-column Grid Layout */}
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="100%">
                            <FormControl isRequired>
                                <FormLabel fontWeight="bold" color="gray.600">City</FormLabel>
                                <Input
                                    placeholder="Enter city"
                                    value={guestInfo.city}
                                    onChange={(e) => setGuestInfo({ ...guestInfo, city: e.target.value })}
                                    variant="filled"
                                    bg="gray.100"
                                    _focus={{ bg: "white", borderColor: "blue.400" }}
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel fontWeight="bold" color="gray.600">Country</FormLabel>
                                <Input
                                    placeholder="Enter country"
                                    value={guestInfo.country}
                                    onChange={(e) => setGuestInfo({ ...guestInfo, country: e.target.value })}
                                    variant="filled"
                                    bg="gray.100"
                                    _focus={{ bg: "white", borderColor: "blue.400" }}
                                />
                            </FormControl>
                        </SimpleGrid>

                        <FormControl isRequired>
                            <FormLabel fontWeight="bold" color="gray.600">Postal Code</FormLabel>
                            <Input
                                placeholder="Enter postal code"
                                value={guestInfo.postal_code}
                                onChange={(e) => setGuestInfo({ ...guestInfo, postal_code: e.target.value })}
                                variant="filled"
                                bg="gray.100"
                                _focus={{ bg: "white", borderColor: "blue.400" }}
                            />
                        </FormControl>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button 
                        colorScheme="blue" 
                        w="full" 
                        py={6} 
                        fontSize="lg" 
                        onClick={handleSubmit}
                        borderRadius="8px"
                        boxShadow="md"
                        _hover={{ bg: "blue.700" }}
                    >
                        Proceed to Checkout
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default GuestInfoModal;
