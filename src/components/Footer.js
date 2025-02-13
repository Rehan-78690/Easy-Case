import React from 'react';
import { Box, Text, Flex, Link, Divider, Icon } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

function Footer() {
    return (
        <Box
            bgGradient="linear(to-r, #0A0E23, #141A3B)"
            color="white"
            py={10}
            px={6}
            mt={10}
        >
            {/* Main Footer Section */}
            <Flex
                direction={{ base: 'column', md: 'row' }}
                justify="space-between"
                wrap="wrap"
                textAlign={{ base: 'center', md: 'left' }}
                maxW="1200px"
                mx="auto"
            >
                {/* Quick Links Section */}
                <Box mb={{ base: 6, md: 0 }}>
                    <Text fontSize="xl" mb={4} fontWeight="bold" color="orange.400">
                        Quick Links
                    </Text>
                    <Link href="/contact" display="block" mb={2} _hover={{ color: 'orange.300' }}>
                        Contact Us
                    </Link>
                    <Link href="/faq" display="block" mb={2} _hover={{ color: 'orange.300' }}>
                        FAQ
                    </Link>
                    <Link href="/returns" display="block" _hover={{ color: 'orange.300' }}>
                        Return Policy
                    </Link>
                </Box>

                {/* Social Media Section */}
                <Box mb={{ base: 6, md: 0 }}>
                    <Text fontSize="xl" mb={4} fontWeight="bold" color="orange.400">
                        Connect with Us
                    </Text>
                    <Flex justify={{ base: 'center', md: 'flex-start' }}>
                        <Link href="https://facebook.com" isExternal mx={2}>
                            <Icon as={FaFacebook} boxSize={6} _hover={{ color: 'blue.400', transform: 'scale(1.2)' }} transition="0.3s" />
                        </Link>
                        <Link href="https://twitter.com" isExternal mx={2}>
                            <Icon as={FaTwitter} boxSize={6} _hover={{ color: 'blue.300', transform: 'scale(1.2)' }} transition="0.3s" />
                        </Link>
                        <Link href="https://instagram.com" isExternal mx={2}>
                            <Icon as={FaInstagram} boxSize={6} _hover={{ color: 'pink.400', transform: 'scale(1.2)' }} transition="0.3s" />
                        </Link>
                    </Flex>
                </Box>

                {/* Contact Information Section */}
                <Box>
                    <Text fontSize="xl" mb={4} fontWeight="bold" color="orange.400">
                        Contact Information
                    </Text>
                    <Text>📞 (123) 456-7890</Text>
                    <Text>📧 support@easycase.com</Text>
                    <Text>🕒 Mon-Fri: 9am - 6pm</Text>
                </Box>
            </Flex>

            {/* Divider */}
            <Divider my={6} borderColor="gray.600" />

            {/* Bottom Copyright Section */}
            <Text textAlign="center" fontSize="sm" color="gray.400">
                © {new Date().getFullYear()} EasyCase. All rights reserved.
            </Text>
        </Box>
    );
}

export default Footer;
