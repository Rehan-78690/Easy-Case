import React, { useState } from "react";
import { verifyOtp } from "../services/VerifyOtp";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Input, Text, Flex, Heading } from "@chakra-ui/react";

const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { email } = useParams();
  const navigate = useNavigate();

  // Handle OTP input
  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length <= 6) setOtp(value); // Allow max 6 digits
  };

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setMessage("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await verifyOtp(otp, email);
      setMessage(response.message || "✅ OTP Verified Successfully!");
      navigate("/");
    } catch (error) {
      setMessage(error.error || "❌ Invalid OTP. Please try again.");
    }

    setLoading(false);
  };

  return (
    <Flex
      justify="center"
      align="center"
      minH="100vh"
      bgGradient="linear(to-r, blue.400, purple.600)"
    >
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <Box
          bg="white"
          p={8}
          rounded="2xl"
          shadow="2xl"
          w={{ base: "90%", md: "400px" }}
          textAlign="center"
        >
          {/* Lock Icon */}
          <Flex justify="center" mb={3}>
            <FaLock color="blue" size="2.5rem" />
          </Flex>

          {/* Title */}
          <Heading as="h2" size="lg" fontWeight="extrabold" color="gray.800" mb={2}>
            Verify OTP
          </Heading>
          <Text color="gray.600" fontSize="md" mb={4}>
            Enter the 6-digit code sent to <b>{email}</b>
          </Text>

          {/* OTP Input */}
          <Input
            type="text"
            maxLength="6"
            value={otp}
            onChange={handleOtpChange}
            textAlign="center"
            fontSize="xl"
            fontWeight="bold"
            tracking="wide"
            border="2px solid"
            borderColor="gray.300"
            focusBorderColor="blue.500"
            _hover={{ borderColor: "blue.400" }}
            mb={3}
          />

          {/* Error Message */}
          {message && (
            <Text fontSize="md" fontWeight="semibold" color={message.includes("✅") ? "green.600" : "red.500"} mt={3}>
              {message}
            </Text>
          )}

          {/* Verify Button */}
          <Button
            onClick={handleVerify}
            isLoading={loading}
            loadingText="Verifying..."
            spinner={<AiOutlineLoading3Quarters className="animate-spin" size="1.5rem" />}
            w="full"
            mt={5}
            p={3}
            colorScheme="blue"
            fontWeight="bold"
            disabled={loading}
          >
            Verify OTP
          </Button>
        </Box>
      </motion.div>
    </Flex>
  );
};

export default VerifyOtpPage;
