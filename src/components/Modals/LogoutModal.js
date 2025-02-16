import React from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Text, Icon, Flex } from "@chakra-ui/react";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="12px" boxShadow="xl" p={4}>
        <ModalHeader textAlign="center" fontSize="lg" fontWeight="bold" color="red.500">
          <Flex align="center" justify="center" gap={2}>
            <Icon as={FaSignOutAlt} boxSize={6} />
            Logout Confirmation
          </Flex>
        </ModalHeader>

        <ModalBody textAlign="center">
          <Text fontSize="md" color="gray.600">
            Are you sure you want to log out? You will need to log in again to access your account.
          </Text>
        </ModalBody>

        <ModalFooter justifyContent="center" gap={4}>
          <Button colorScheme="gray" variant="outline" onClick={onClose} _hover={{ bg: "gray.200" }}>
            Cancel
          </Button>
          <Button colorScheme="red" onClick={onLogout} _hover={{ bg: "red.600" }}>
            Logout
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LogoutModal;
