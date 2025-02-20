import React, { useEffect, useState } from 'react';
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    Spinner,
    Textarea,
    useToast,
    Center,
    Image,
    IconButton,
    SimpleGrid,
    Text,
    VStack,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../stores/userStore';

const Profile = () => {
    const [editMode, setEditMode] = useState(false);
    const { user, loading, error, fetchUser, updateUser } = useUserStore();
    const [userData, setUserData] = useState({});
    const toast = useToast();
    const navigate = useNavigate();

    const token = localStorage.getItem('access_token');

    useEffect(() => {
        if (!user) {
            fetchUser(token);
        } else {
            setUserData(user);
        }
    }, [user, fetchUser, token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleSaveChanges = async () => {
        const success = await updateUser(token, userData);
        if (success) {
            setEditMode(false);
            toast({
                title: 'Profile updated.',
                description: 'Your profile information has been successfully updated.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Update failed.',
                description: 'There was an error updating your profile. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    if (loading) {
        return (
            <Center height="100vh">
                <Spinner size="xl" color="#0A0E27" />
            </Center>
        );
    }

    if (error) {
        return (
            <Center height="100vh">
                <Text color="red.500" fontSize="xl">
                    Error fetching profile data. Please try again.
                </Text>
            </Center>
        );
    }

    return (
        <Box
            maxW={{ base: '90%', md: '700px' }}
            mx="auto"
            p="6"
            boxShadow="2xl"
            borderRadius="lg"
            bg="white"
            position="relative"
            mt="6"
        >
            {/* Back Button */}
            <IconButton
                icon={<ArrowBackIcon />}
                position="absolute"
                top="20px"
                left="20px"
                color="#0A0E27"
                onClick={() => navigate('/')}
                aria-label="Go back to Dashboard"
                borderColor="#0A0E27"
                variant="outline"
                _hover={{ bg: '#0A0E27', color: 'white' }}
            />

            {/* Profile Image */}
            <Center>
                <Image
                    src={userData.profile_picture || 'https://via.placeholder.com/100'}
                    alt="Profile"
                    borderRadius="full"
                    boxSize="100px"
                    mb="4"
                    border="3px solid #0A0E27"
                />
            </Center>

            <Heading as="h2" size="lg" textAlign="center" mb="6" color="#0A0E27">
                User Profile
            </Heading>

            {/* Form Fields in a Grid Format */}
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                <FormControl>
                    <FormLabel color="#0A0E27">First Name</FormLabel>
                    <Input
                        type="text"
                        name="first_name"
                        value={userData.first_name || ''}
                        onChange={handleInputChange}
                        isReadOnly={!editMode}
                        borderColor="#0A0E27"
                        _focus={{ borderColor: '#F47D31', boxShadow: '0 0 8px #F47D31' }}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel color="#0A0E27">Last Name</FormLabel>
                    <Input
                        type="text"
                        name="last_name"
                        value={userData.last_name || ''}
                        onChange={handleInputChange}
                        isReadOnly={!editMode}
                        borderColor="#0A0E27"
                        _focus={{ borderColor: '#F47D31', boxShadow: '0 0 8px #F47D31' }}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel color="#0A0E27">Email</FormLabel>
                    <Input type="email" value={userData.email || ''} isReadOnly borderColor="#0A0E27" />
                </FormControl>
                <FormControl>
                    <FormLabel color="#0A0E27">Phone Number</FormLabel>
                    <Input
                        type="text"
                        name="phone_number"
                        value={userData.phone_number || ''}
                        onChange={handleInputChange}
                        isReadOnly={!editMode}
                        borderColor="#0A0E27"
                        _focus={{ borderColor: '#F47D31', boxShadow: '0 0 8px #F47D31' }}
                    />
                </FormControl>
            </SimpleGrid>

            {/* Address Section */}
            <FormControl mt="4">
                <FormLabel color="#0A0E27">Address</FormLabel>
                <Textarea
                    name="address"
                    value={userData.address || ''}
                    onChange={handleInputChange}
                    isReadOnly={!editMode}
                    borderColor="#0A0E27"
                    _focus={{ borderColor: '#F47D31', boxShadow: '0 0 8px #F47D31' }}
                />
            </FormControl>

            {/* Buttons Section */}
            <VStack mt="6" spacing={4}>
                {editMode ? (
                    <>
                        <Button
                            w="full"
                            bgGradient="linear(to-r, #303064, #0A0E27)"
                            color="white"
                            _hover={{ bgGradient: 'linear(to-r, #F47D31, #D63E3E)' }}
                            onClick={handleSaveChanges}
                        >
                            Save Changes
                        </Button>
                        <Button w="full" colorScheme="red" variant="outline" onClick={() => setEditMode(false)}>
                            Cancel
                        </Button>
                    </>
                ) : (
                    <Button
                        w="full"
                        bgGradient="linear(to-r, #303064, #0A0E27)"
                        color="white"
                        _hover={{ bgGradient: 'linear(to-r, #F47D31, #D63E3E)' }}
                        onClick={() => setEditMode(true)}
                    >
                        Edit Profile
                    </Button>
                )}
            </VStack>
        </Box>
    );
};

export default Profile;
