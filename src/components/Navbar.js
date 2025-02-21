import React, { useState, useEffect, useRef } from 'react';
import { FaShoppingCart, FaUser, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../hooks/useCheckout';
import CartDrawer from './CartDrawer';
import GuestCheckoutModal from './GuestCheckoutModal';
import useCartStore from '../stores/cartStore';
import SearchBar from './SearchBar';
import ProfilePopover from './ProfilePopover';
import BuyerSidebar from '../pages/BuyerSidebar';
import {
    Box,
    Badge,
    Flex,
    IconButton,
    Image,
    Button,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useDisclosure,
    useToast,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    VStack
} from '@chakra-ui/react';

function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
    const { isOpen: isDrawerOpen, onOpen: openDrawer, onClose: closeDrawer } = useDisclosure();
    const cartItems = useCartStore((state) => state.cartItems);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const toast = useToast();
    const profileButtonRef = useRef();
    const [isProfilePopoverOpen, setIsProfilePopoverOpen] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const storedUsername = localStorage.getItem('username');
        if (accessToken && storedUsername) {
            setUser(storedUsername);
        }
    }, []);

    const handleProfileClick = () => {
        user ? navigate('/profile') : navigate('/auth');
    };

    const handleBecomeSeller = () => {
        navigate('/sellersignup');
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    return (
        <Box as="nav" bg="#FFFFFF" p={3} borderBottom="4px solid #0A0E27" shadow="md">
            <Flex align="center" justify="space-between" maxW="1200px" mx="auto" flexWrap="wrap">
                {/* Sidebar Toggle for Mobile */}
                <IconButton 
                    icon={<FaBars />} 
                    aria-label="Open Menu"
                    onClick={openDrawer}
                    display={{ base: "block", md: "none" }}
                />

                {/* Logo */}
                <Box display="flex" alignItems="center" onClick={handleLogoClick} cursor="pointer">
                    <Image src="/logo.jpg" alt="Logo" height="40px" />
                </Box>

                {/* Search Bar */}
                <Box flex="1" mx="4" display={{ base: "none", md: "block" }}>
                    <SearchBar />
                </Box>

                {/* Cart & Profile Icons */}
                <Flex align="center">
                    {user && (
                        <Button 
                            ml={4} 
                            colorScheme="orange" 
                            size="sm" 
                            onClick={handleBecomeSeller}
                        >
                            Become a Seller
                        </Button>
                    )}

                    {/* Profile Section */}
                    {user ? (
                        <Menu>
                            <MenuButton as={Button} variant="ghost" p={0} borderRadius="full">
                                <Avatar size="sm" name={user} bg="#0A0E27" color="white" />
                            </MenuButton>
                            <MenuList>
                                <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
                                <MenuItem onClick={() => navigate('/orders')}>My Orders</MenuItem>
                                <MenuItem onClick={() => {
                                    localStorage.removeItem('accessToken');
                                    localStorage.removeItem('username');
                                    setUser(null);
                                    navigate('/auth');
                                }}>Logout</MenuItem>
                            </MenuList>
                        </Menu>
                    ) : (
                        <IconButton
                            icon={<FaUser />}
                            aria-label="Profile"
                            variant="ghost"
                            size="lg"
                            color="#0A0E27"
                            onClick={handleProfileClick}
                            ml={4}
                        />
                    )}

                    {/* Cart Icon */}
                    <Flex align="center" position="relative">
                        <IconButton
                            icon={<FaShoppingCart />}
                            aria-label="Shopping Cart"
                            variant="ghost"
                            size="lg"
                            color="#0A0E27"
                            onClick={onOpen}
                        />
                        {cartItems.length > 0 && (
                            <Badge
                                position="absolute"
                                top="-3px"
                                right="-3px"
                                bg="red.500"
                                color="white"
                                borderRadius="full"
                                fontSize="0.8em"
                                px={2}
                            >
                                {cartItems.length}
                            </Badge>
                        )}
                    </Flex>
                </Flex>
            </Flex>

            {/* Mobile Sidebar Drawer */}
            <Drawer placement="left" onClose={closeDrawer} isOpen={isDrawerOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <VStack spacing={4} mt={10} align="stretch">
                        <Button onClick={() => navigate('/profile')}>Profile</Button>
                        <Button onClick={() => navigate('/orders')}>My Orders</Button>
                        <Button colorScheme="red" onClick={() => {
                            localStorage.removeItem('accessToken');
                            localStorage.removeItem('username');
                            setUser(null);
                            navigate('/auth');
                        }}>Logout</Button>
                    </VStack>
                </DrawerContent>
            </Drawer>

            {/* Cart Drawer */}
            <CartDrawer
                isOpen={isOpen}
                onClose={onClose}
                cartItems={cartItems}
            />

            {/* Guest Checkout Modal */}
            <GuestCheckoutModal
                isModalOpen={isModalOpen}
                onModalClose={onModalClose}
            />
        </Box>
    );
}

export default Navbar;
