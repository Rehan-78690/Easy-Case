import React, { useEffect,useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  VStack,
  HStack,
  Image,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useBreakpointValue,
  useToast,
  Text,
  Divider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BuyerSidebar from "../../pages/BuyerSidebar";
import Navbar from "../Navbar";
import useAuthStore from "../../stores/authStore";

const SellerSignup = () => {
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  // ✅ Validation Schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10,15}$/, "Phone must be 10-15 digits")
      .required("Phone number is required"),
    shop_name: Yup.string().required("Shop name is required"),
    shop_description: Yup.string().required("Shop description is required"),
    shop_address: Yup.string().required("Shop address is required"),
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          console.error("No access token found.");
          setIsLoading(false);
          return;
        }

        const { data } = await axios.get("http://127.0.0.1:8000/auth/users/me/", {
          headers: { Authorization: `JWT ${token}` },
        });
        
        // Verify backend response structure
        console.log("User data from backend:", data); 
        
        setUser({
          user: data.id,
          username: data.username,
          email: data.email,
          phone: data.phone || "", // Verify if phone exists in response
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };
console.log("user",user)
    fetchUserProfile();
  }, []);

  // ✅ Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const sellerData = { ...values};
      await axios.post("http://127.0.0.1:8000/store/vendors/", sellerData);
      toast({
        title: `Welcome ${values.name}!`,
        description:
          "Your request has been sent to the admin. You'll receive a confirmation email soon.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      resetForm();
      navigate("/MainSellerPage");
    } catch (error) {
      console.error("Signup error", error);
      toast({
        title: "Registration Failed",
        description:
          "There was an issue registering your seller account. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      <BuyerSidebar />
      <Navbar />

      <Box
        maxW="700px"
        mx="auto"
        p={8}
        borderRadius="lg"
        bg="white"
        mt={12}
        boxShadow="lg"
        border="1px solid #E2E8F0"
        transition="all 0.3s ease-in-out"
        _hover={{ boxShadow: "xl" }}
      >
        <VStack spacing={6} width="100%">
          {/* Logo */}
          <Image src="/logo.jpg" alt="Logo" width="140px" borderRadius="full" />

          {/* Heading */}
          <Heading
            as="h1"
            size="lg"
            textAlign="center"
            color="#0A0E27"
            fontWeight="bold"
          >
            Become a Seller 🚀
          </Heading>

          <Text fontSize="md" color="gray.600" textAlign="center">
            Register now and start selling your products online.
          </Text>

          <Divider />

          {/* Form */}
          <Formik
            enableReinitialize
            initialValues={{
              user: user?.user ?? "",
              name: user?.username ?? "",  
              email: user?.email ?? "",  
              phone: user?.phone ?? "",                
              shop_name: "",
              shop_description: "",
              shop_address: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form style={{ width: "100%" }}>
                <VStack spacing={5} width="100%">

                  {/* Name & Email */}
                  <HStack width="100%" spacing={4} flexWrap="wrap">
                    <FormControl flex="1" isInvalid={errors.name && touched.name}>
                      <FormLabel fontSize="sm">Full Name</FormLabel>
                      <Field
                        as={Input}
                        name="name"
                        placeholder="Enter your name"
                        height="45px"
                        borderColor="gray.300"
                        _focus={{ borderColor: "blue.500", boxShadow: "md" }}
                      />
                    </FormControl>
                    <FormControl flex="1" isInvalid={errors.email && touched.email}>
                      <FormLabel fontSize="sm">Email Address</FormLabel>
                      <Field
                        as={Input}
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        height="45px"
                        borderColor="gray.300"
                        _focus={{ borderColor: "blue.500", boxShadow: "md" }}
                      />
                    </FormControl>
                  </HStack>

                  {/* Phone & Shop Name */}
                  <HStack width="100%" spacing={4} flexWrap="wrap">
                    <FormControl flex="1" isInvalid={errors.phone && touched.phone}>
                      <FormLabel fontSize="sm">Phone Number</FormLabel>
                      <Field
                        as={Input}
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        height="45px"
                        borderColor="gray.300"
                        _focus={{ borderColor: "blue.500", boxShadow: "md" }}
                      />
                    </FormControl>
                    <FormControl flex="1" isInvalid={errors.shop_name && touched.shop_name}>
                      <FormLabel fontSize="sm">Shop Name</FormLabel>
                      <Field
                        as={Input}
                        name="shop_name"
                        placeholder="Enter your shop name"
                        height="45px"
                        borderColor="gray.300"
                        _focus={{ borderColor: "blue.500", boxShadow: "md" }}
                      />
                    </FormControl>
                  </HStack>

                  {/* Shop Description */}
                  <FormControl isInvalid={errors.shop_description && touched.shop_description}>
                    <FormLabel fontSize="sm">Shop Description</FormLabel>
                    <Field
                      as={Textarea}
                      name="shop_description"
                      placeholder="Describe your shop"
                      height="100px"
                      borderColor="gray.300"
                      _focus={{ borderColor: "blue.500", boxShadow: "md" }}
                    />
                  </FormControl>

                  {/* Shop Address */}
                  <FormControl isInvalid={errors.shop_address && touched.shop_address}>
                    <FormLabel fontSize="sm">Shop Address</FormLabel>
                    <Field
                      as={Textarea}
                      name="shop_address"
                      placeholder="Enter your shop address"
                      height="100px"
                      borderColor="gray.300"
                      _focus={{ borderColor: "blue.500", boxShadow: "md" }}
                    />
                  </FormControl>

                  {/* Register Button */}
                  <Button
                    type="submit"
                    bgGradient="linear(to-r, blue.500, blue.700)"
                    color="white"
                    width={isMobile ? "100%" : "50%"}
                    mx="auto"
                    mt={4}
                    display="block"
                    isLoading={isSubmitting}
                    _hover={{ bgGradient: "linear(to-r, blue.700, blue.900)" }}
                    boxShadow="md"
                  >
                    Register Now
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>
        </VStack>
      </Box>
    </>
  );
};

export default SellerSignup;
