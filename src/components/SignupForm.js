import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
    Box, Center, Button, Image, FormControl, Input, InputGroup, InputRightElement, Heading, FormErrorMessage, useColorModeValue
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const SignupForm = ({ onSubmit }) => {
    const bgColor = useColorModeValue('white', 'gray.700');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [serverError, setServerError] = useState(null);

    const handleClickPassword = () => setShowPassword(!showPassword);
    const handleClickConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <Formik
            initialValues={{ username: '', email: '', password: '', confirmPassword: '' }}
            validate={values => {
                const errors = {};
                if (!values.username) errors.username = 'Username is required';
                if (!values.email) errors.email = 'Email is required';
                if (!values.password) errors.password = 'Password is required';
                if (values.password.length < 6) errors.password = 'Password must be at least 6 characters';
                if (values.password !== values.confirmPassword) errors.confirmPassword = 'Passwords must match';
                return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
                setServerError(null);
                try {
                    await onSubmit(values);
                } catch (error) {
                    setServerError(error.message || 'Something went wrong');
                }
                setSubmitting(false);
            }}
        >
            {({ isSubmitting, errors, touched }) => (
                <Form>
                    <Box
                        p={8}
                        maxWidth="400px"
                        borderRadius={8}
                        bg={bgColor}
                        m="auto"
                        mt={10}
                    >
                        <Center mb={6}>
                            <Box display="flex" alignItems="center">
                                <Image src="/logo.jpg" alt="Logo" height="70px" />
                            </Box>
                        </Center>
                        <Heading as="h2" textAlign="center" mb={6} color="#0A0E27">
                            Sign Up
                        </Heading>

                        {/* Username */}
                        <FormControl isInvalid={errors.username && touched.username} mb={4}>
                            <Field
                                as={Input}
                                name="username"
                                placeholder="Enter Username"
                                variant="flushed"
                                focusBorderColor="#0A0E27"
                            />
                            <FormErrorMessage>
                                <ErrorMessage name="username" />
                            </FormErrorMessage>
                        </FormControl>

                        {/* Email */}
                        <FormControl isInvalid={errors.email && touched.email} mb={4}>
                            <Field
                                as={Input}
                                name="email"
                                type="email"
                                placeholder="Enter Email"
                                variant="flushed"
                                focusBorderColor="#0A0E27"
                            />
                            <FormErrorMessage>
                                <ErrorMessage name="email" />
                            </FormErrorMessage>
                        </FormControl>

                        {/* Password */}
                        <FormControl isInvalid={errors.password && touched.password} mb={4}>
                            <InputGroup>
                                <Field
                                    as={Input}
                                    pr="4.5rem"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter Password"
                                    variant="flushed"
                                    focusBorderColor="#0A0E27"
                                />
                                <InputRightElement width="4rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClickPassword}>
                                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>
                                <ErrorMessage name="password" />
                            </FormErrorMessage>
                        </FormControl>

                        {/* Confirm Password */}
                        <FormControl isInvalid={errors.confirmPassword && touched.confirmPassword} mb={4}>
                            <InputGroup>
                                <Field
                                    as={Input}
                                    pr="4.5rem"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirm Password"
                                    variant="flushed"
                                    focusBorderColor="#0A0E27"
                                />
                                <InputRightElement width="4rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClickConfirmPassword}>
                                        {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormErrorMessage>
                                <ErrorMessage name="confirmPassword" />
                            </FormErrorMessage>
                        </FormControl>

                        {/* Server Error */}
                        {serverError && <Box color="red.500" textAlign="center" mt={2}>{serverError}</Box>}

                        {/* Submit Button */}
                        <Center>
                            <Button
                                mt={6}
                                bgGradient="linear(to-b, #303064, #0A0E27)"
                                color="white"
                                _hover={{ bgGradient: "linear(to-b, #112C50, #0A0E27)" }}
                                isLoading={isSubmitting}
                                loadingText="Submitting"
                                type="submit"
                                width="50%"
                                borderRadius="md"
                                variant="solid"
                            >
                                Sign Up
                            </Button>
                        </Center>
                    </Box>
                </Form>
            )}
        </Formik>
    );
};

export default SignupForm;
