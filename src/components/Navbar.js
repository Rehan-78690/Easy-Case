import React, { useState, useRef,useEffect } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../hooks/useCheckout';
import CartDrawer from './CartDrawer';
import GuestCheckoutModal from './GuestCheckoutModal';
import useCartStore from '../stores/cartStore';
import SearchBar from './SearchBar';
import ProfilePopover from './ProfilePopover';
import BuyerSidebar from '../pages/BuyerSidebar';
import { Box, Badge, Flex, IconButton, Image, Button, Text, Avatar, Menu, MenuButton, MenuList, MenuItem, useDisclosure, useToast } from '@chakra-ui/react';
function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
    const cartItems = useCartStore((state) => state.cartItems);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const storedUsername = localStorage.getItem('username');
        if (accessToken && storedUsername) {
            setUser(storedUsername);
        }
    }, []);

    const handleProfileClick = () => {
        if (user) {
            navigate('/profile');
        } else {
            navigate('/auth');
        }
    };

    const handleBecomeSeller = () => {
        navigate('/sellersignup'); 
    };

    const [guestInfo, setGuestInfo] = useState({
        name: '',
        email: '',
        address: '',
        city: '',
        country: '',
        postal_code: '',
    });

    const toast = useToast();
    const navigate = useNavigate();
    const profileButtonRef = useRef();
    const [isProfilePopoverOpen, setIsProfilePopoverOpen] = useState(false);

    const { mutate: initiateCheckoutMutation, isLoading: checkoutLoading } = useCheckout();

    const handleGuestCheckout = () => {
        if (!guestInfo.name || !guestInfo.email || !guestInfo.address || !guestInfo.city || !guestInfo.postal_code) {
            toast({
                title: 'Missing Information',
                description: 'Please fill in all the required fields.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }
       // initiateCheckoutMutation({ cartId: localStorage.getItem('cartId'), guestInfo });
        onModalClose();
    };

    const initiateCheckout = () => {
        const cartId = localStorage.getItem('cartId');
        const accessToken = localStorage.getItem('accessToken');

        if (accessToken) {
           // initiateCheckoutMutation({ cartId, guestInfo: {} });
        } else {
            onModalOpen();
        }
    };

    // Navigate to home on logo click
    const handleLogoClick = () => {
        navigate('/');
    };
    return (
        <Box boxShadow='md' as="nav" bg="#FFFFFF" p={4} borderBottom="4px" borderColor="#0A0E27" mb={0}>
            <Flex align="center" justify="space-between" maxW="1200px" mx="auto" flexWrap="wrap">
                <BuyerSidebar />
                {/* Logo */}
                <Box display="flex" alignItems="center" mb={{ base: 2, md: 0 }} onClick={handleLogoClick} ml={'50px'}>
                    <Image src="/logo.jpg" alt="Logo" height="40px" />
                </Box>

                {/* SearchBar Component */}
                <Box flex="1" mx="4">
                    <SearchBar /> {/* Adding SearchBar between the logo and cart icon */}
                </Box>

                {/* Cart & Profile Icons */}
                <Flex align="center">
                    {/* "Become a Seller" Button for Authenticated Users */}
                    {user && (
                        <Button ml={4} colorScheme="orange" size="sm" onClick={handleBecomeSeller}>
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
                    {/* Profile Popover */}
                    {isProfilePopoverOpen && (
                        <ProfilePopover
                            isOpen={isProfilePopoverOpen}
                            onClose={() => setIsProfilePopoverOpen(false)}
                            profileButtonRef={profileButtonRef}
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
                            position="relative"
                        />
                        {cartItems.length > 0 && (
                            <Badge
                                position="absolute"
                                top="0"
                                right="0"
                                bg="#F47D31"
                                color="white"
                                borderRadius="full"
                                fontSize="0.675em"
                            >
                                {cartItems.length}
                            </Badge>
                        )}
                    </Flex>
                </Flex>
            </Flex>

            {/* Cart Drawer */}
            <CartDrawer
                isOpen={isOpen}
                onClose={onClose}
                cartItems={cartItems}
                initiateCheckout={initiateCheckout}
                loading={checkoutLoading}
            />

            {/* Guest Checkout Modal */}
            <GuestCheckoutModal
                isModalOpen={isModalOpen}
                onModalClose={onModalClose}
                guestInfo={guestInfo}
                setGuestInfo={setGuestInfo}
                handleGuestCheckout={handleGuestCheckout}
            />
        </Box>
    );
}

export default Navbar;
