import React, { useState } from "react";
import { Box, Text, VStack, IconButton, Flex } from "@chakra-ui/react";
import { FaBars, FaTimes, FaHome, FaProjectDiagram, FaUserAlt, FaUsers, FaChartLine, FaFileAlt, FaCog, FaBoxOpen, FaStar, FaSignOutAlt } from "react-icons/fa";

const navitems = [
  { text: "Home", icon: FaHome, link: "home" },
  { text: "Earnings", icon: FaChartLine, link: "earnings" },
  { text: "Service", icon: FaUserAlt, link: "services" },
  { text: "Orders", icon: FaUsers, link: "orders" },
  { text: "Analytics", icon: FaProjectDiagram, link: "analytics" },
  { text: "Reports", icon: FaFileAlt, link: "report" },
  { text: "Setting", icon: FaCog, link: "settings" },
  { text: "Inventory", icon: FaBoxOpen, link: "manage-inventory" },
  { text: "Reviews", icon: FaStar, link: "reviews" },
  { text: "Logout", icon: FaSignOutAlt, link: "logout" },
];

const SellerSidebar = ({  onselect, isOpen, setIsOpen }) => {
  const [activeItem, setActiveItem] = useState("home");
  // const [isOpen, setIsOpen] = useState(true);

  const handleClick = (link) => {
    setActiveItem(link);
    onselect(link);
  };

  return (
    <Box
      as="nav"
      w={isOpen ? ["full", "250px"] : ["70px", "70px"]}
      bg="#0A0E23"
      p="4"
      boxShadow="lg"
      h="100vh"
      transition="width 0.3s ease"
      position="fixed"
      zIndex="1000"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      {/* Toggle Button */}
      <Flex justifyContent={isOpen ? "flex-end" : "center"}>
        <IconButton
          aria-label="Toggle Sidebar"
          icon={isOpen ? <FaTimes /> : <FaBars />}
          onClick={() => setIsOpen(!isOpen)}
          color="white"
          bg="transparent"
          fontSize="24px"
          _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
        />
      </Flex>

      {/* Sidebar Title */}
      {isOpen && (
        <Text
          fontSize="xl"
          fontStyle="italic"
          fontWeight="bold"
          mb="6"
          textAlign="center"
          color="#F47D31"
        >
          Easy Case Seller
        </Text>
      )}

      {/* Sidebar Menu */}
      <VStack align="stretch" spacing="2">
        {navitems.map((item, index) => (
          <Flex
            key={index}
            as="button"
            onClick={() => handleClick(item.link)}
            align="center"
            gap="4"
            p="3"
            borderRadius="8px"
            transition="all 0.3s ease"
            bg={activeItem === item.link ? "#F47D31" : "transparent"}
            color={activeItem === item.link ? "white" : "#A0AEC0"}
            _hover={{ bg: "#F47D31", color: "white" }}
          >
            <Box as={item.icon} fontSize="20px" />
            {isOpen && <Text fontSize="md">{item.text}</Text>}
          </Flex>
        ))}
      </VStack>
    </Box>
  );
};

export default SellerSidebar;
