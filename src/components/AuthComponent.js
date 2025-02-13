import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Text,
  Heading,
  VStack,
  Input,
  FormControl,
  FormLabel,
  Divider,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import useUserStore from "../stores/userStore";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const AuthComponent = ({ onLoginSubmit, onSignupSubmit }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(true);
  const [loginData, setLoginData] = useState({ identifier: "", password: "" });
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const { user, fetchUser } = useUserStore();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      fetchUser(token);
    }
    setLoading(false);
  }, [fetchUser]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (user) {
    return (
      <Box p={8} textAlign="center">
        <Heading size="lg">Welcome, {user.name}!</Heading>
      </Box>
    );
  }

  return (
    <Flex
      h="100vh"
      align="center"
      justify="center"
      w="100%"
      position="relative"
      bgGradient="linear(to-r, #667eea, #764ba2)"
      overflow="hidden"
    >
      {/* Background with Glassmorphism Effect */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bgImage="url('https://source.unsplash.com/1600x900/?technology,abstract')"
        bgSize="cover"
        bgPosition="center"
        opacity="0.2"
        zIndex="-1"
      />

      {/* Back Button */}
      <IconButton
        icon={<ArrowBackIcon />}
        position="absolute"
        top="20px"
        left="20px"
        color="white"
        fontSize="24px"
        variant="ghost"
        onClick={() => navigate("/")}
        _hover={{ bg: "rgba(255, 255, 255, 0.2)" }}
      />

      {/* Card Container */}
      <Flex
        direction="column"
        w={{ base: "90%", sm: "80%", md: "60%", lg: "40%" }}
        bg="rgba(255, 255, 255, 0.15)"
        backdropFilter="blur(10px)"
        borderRadius="lg"
        boxShadow="xl"
        p={8}
        align="center"
      >
        <Heading
          size="lg"
          color="white"
          textAlign="center"
          mb={6}
          fontWeight="bold"
        >
          {isLogin ? "Welcome Back" : "Create an Account"}
        </Heading>

        {/* Google Sign-In Button */}
        <Button
          leftIcon={<FcGoogle />}
          w="full"
          onClick={() => toast({
            title: "Google Sign-In",
            description: "Google Sign-In functionality will be integrated here.",
            status: "info",
            duration: 3000,
            isClosable: true,
          })}
          bg="white"
          color="gray.700"
          _hover={{ bg: "gray.100" }}
          mb={4}
        >
          Sign in with Google
        </Button>

        <Divider />

        {/* Authentication Form */}
        <VStack spacing={4} width="100%" mt={4}>
          {!isLogin && (
            <FormControl>
              <FormLabel color="white">Full Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your name"
                value={signupData.name}
                onChange={(e) =>
                  setSignupData({ ...signupData, name: e.target.value })
                }
                bg="rgba(255,255,255,0.2)"
                border="none"
                color="white"
                _placeholder={{ color: "gray.300" }}
              />
            </FormControl>
          )}

          <FormControl>
            <FormLabel color="white">{isLogin ? "Email or Phone" : "Email"}</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              value={isLogin ? loginData.identifier : signupData.email}
              onChange={(e) =>
                isLogin
                  ? setLoginData({ ...loginData, identifier: e.target.value })
                  : setSignupData({ ...signupData, email: e.target.value })
              }
              bg="rgba(255,255,255,0.2)"
              border="none"
              color="white"
              _placeholder={{ color: "gray.300" }}
            />
          </FormControl>

          {!isLogin && (
            <FormControl>
              <FormLabel color="white">Phone Number</FormLabel>
              <PhoneInput
                country={"us"}
                value={signupData.phone}
                onChange={(phone) => setSignupData({ ...signupData, phone })}
                inputStyle={{
                  width: "100%",
                  background: "rgba(255,255,255,0.2)",
                  color: "white",
                  border: "none",
                }}
                dropdownStyle={{
                  background: "rgba(255,255,255,0.2)",
                }}
              />
            </FormControl>
          )}

          <FormControl>
            <FormLabel color="white">Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter password"
              value={isLogin ? loginData.password : signupData.password}
              onChange={(e) =>
                isLogin
                  ? setLoginData({ ...loginData, password: e.target.value })
                  : setSignupData({ ...signupData, password: e.target.value })
              }
              bg="rgba(255,255,255,0.2)"
              border="none"
              color="white"
              _placeholder={{ color: "gray.300" }}
            />
          </FormControl>

          <Button
            w="full"
            mt={4}
            colorScheme="blue"
            onClick={() => (isLogin ? onLoginSubmit(loginData) : onSignupSubmit(signupData))}
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </VStack>

        <Text mt={4} fontSize="sm" color="white">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <Button
            variant="link"
            colorScheme="white"
            ml={1}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </Button>
        </Text>
      </Flex>
    </Flex>
  );
};

export default AuthComponent;
