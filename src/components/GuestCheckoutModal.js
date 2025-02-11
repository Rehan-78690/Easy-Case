import React from 'react';
import {
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter,
    FormControl, FormLabel, Input, Button, Grid, GridItem
} from '@chakra-ui/react';

const GuestCheckoutModal = ({ isModalOpen, onModalClose, guestInfo, setGuestInfo, handleGuestCheckout }) => {
    return (
        <Modal isOpen={isModalOpen} onClose={onModalClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Guest Checkout Information</ModalHeader>
                <ModalBody>
                    <Grid templateColumns="150px 1fr" gap={4} alignItems="center">
                        <GridItem><FormLabel>Full Name *</FormLabel></GridItem>
                        <GridItem>
                            <Input
                                value={guestInfo.name}
                                onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
                            />
                        </GridItem>

                        <GridItem><FormLabel>Email *</FormLabel></GridItem>
                        <GridItem>
                            <Input
                                type="email"
                                value={guestInfo.email}
                                onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                            />
                        </GridItem>

                        <GridItem><FormLabel>Address *</FormLabel></GridItem>
                        <GridItem>
                            <Input
                                value={guestInfo.address}
                                onChange={(e) => setGuestInfo({ ...guestInfo, address: e.target.value })}
                            />
                        </GridItem>

                        <GridItem><FormLabel>City *</FormLabel></GridItem>
                        <GridItem>
                            <Input
                                value={guestInfo.city}
                                onChange={(e) => setGuestInfo({ ...guestInfo, city: e.target.value })}
                            />
                        </GridItem>

                        <GridItem><FormLabel>Country *</FormLabel></GridItem>
                        <GridItem>
                            <Input
                                value={guestInfo.country}
                                onChange={(e) => setGuestInfo({ ...guestInfo, country: e.target.value })}
                            />
                        </GridItem>

                        <GridItem><FormLabel>Postal Code *</FormLabel></GridItem>
                        <GridItem>
                            <Input
                                value={guestInfo.postal_code}
                                onChange={(e) => setGuestInfo({ ...guestInfo, postal_code: e.target.value })}
                            />
                        </GridItem>
                    </Grid>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" onClick={handleGuestCheckout}>
                        Proceed to Checkout
                    </Button>
                    <Button variant="ghost" onClick={onModalClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default GuestCheckoutModal;
