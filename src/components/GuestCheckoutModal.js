import React from 'react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter,
    FormControl, FormLabel, Input, Button, SimpleGrid, Box, VStack, Divider
} from '@chakra-ui/react';

const GuestCheckoutModal = ({ isModalOpen, onModalClose, guestInfo, setGuestInfo, handleGuestCheckout }) => {
    return (
        <Modal isOpen={isModalOpen} onClose={onModalClose} size="lg">
            <ModalOverlay />
            <ModalContent borderRadius="12px" boxShadow="xl" bg="white">
                <ModalHeader 
                    fontSize="2xl" 
                    fontWeight="bold" 
                    textAlign="center" 
                    color="blue.600"
                >
                    Guest Checkout
                </ModalHeader>
                
                <Divider />

                <ModalBody>
                    <VStack spacing={4}>
                        <SimpleGrid columns={2} spacing={4} w="100%">
                            <FormControl>
                                <FormLabel fontWeight="bold" color="gray.600">Full Name *</FormLabel>
                                <Input
                                    placeholder="Enter full name"
                                    value={guestInfo.name}
                                    onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
                                    variant="filled"
                                    bg="gray.100"
                                    _focus={{ bg: "white", borderColor: "blue.400" }}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight="bold" color="gray.600">Email *</FormLabel>
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

                        <FormControl>
                            <FormLabel fontWeight="bold" color="gray.600">Address *</FormLabel>
                            <Input
                                placeholder="Enter your address"
                                value={guestInfo.address}
                                onChange={(e) => setGuestInfo({ ...guestInfo, address: e.target.value })}
                                variant="filled"
                                bg="gray.100"
                                _focus={{ bg: "white", borderColor: "blue.400" }}
                            />
                        </FormControl>

                        <SimpleGrid columns={2} spacing={4} w="100%">
                            <FormControl>
                                <FormLabel fontWeight="bold" color="gray.600">City *</FormLabel>
                                <Input
                                    placeholder="Enter city"
                                    value={guestInfo.city}
                                    onChange={(e) => setGuestInfo({ ...guestInfo, city: e.target.value })}
                                    variant="filled"
                                    bg="gray.100"
                                    _focus={{ bg: "white", borderColor: "blue.400" }}
                                />
                            </FormControl>

                            <FormControl>
                                <FormLabel fontWeight="bold" color="gray.600">Country *</FormLabel>
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

                        <FormControl>
                            <FormLabel fontWeight="bold" color="gray.600">Postal Code *</FormLabel>
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

                <ModalFooter justifyContent="space-between">
                    <Button colorScheme="blue" w="full" py={6} fontSize="lg" onClick={handleGuestCheckout}>
                        Proceed to Checkout
                    </Button>
                    <Button variant="outline" colorScheme="gray" w="full" py={6} fontSize="lg" onClick={onModalClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default GuestCheckoutModal;
