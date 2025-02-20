import React, { useState } from "react";
import { Box, Text, VStack, IconButton, Flex, Icon } from "@chakra-ui/react";
import {FaBars,FaTimes,FaHome,FaProjectDiagram,FaUserAlt,FaUsers,FaChartLine,FaFileAlt,FaCog,FaBoxOpen,FaStar,FaSignOutAlt,
} from "react-icons/fa";
import { Button } from "@chakra-ui/react";
import {useNavigate} from 'react-router-dom';
import LogoutModal from'./../Modals/LogoutModal';
import useAuthStore from '../../stores/authStore';

const navitems = [
  { text: "Home", icon: FaHome, link: "home" },
  { text: "Earnings", icon: FaChartLine, link: "earnings" },
  { text: "Inventory", icon: FaBoxOpen, link: "manage-inventory" },
  // { text: "Service", icon: FaUserAlt, link: "services" },
  { text: "Orders", icon: FaUsers, link: "orders" },
  { text: "Analytics", icon: FaProjectDiagram, link: "analytics" },
  { text: "Reports", icon: FaFileAlt, link: "report" },
  { text: "Setting", icon: FaCog, link: "settings" },
  { text: "Reviews", icon: FaStar, link: "reviews" },
];

const SellerSidebar = ({ onselect, isOpen, setIsOpen }) => {
  const [activeItem, setActiveItem] = useState("home");
  // const [isOpen, setIsOpen] = useState(true);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const navigate = useNavigate();
  const {logout} = useAuthStore();

  
  const handleClick = (link) => {
    setActiveItem(link);
    onselect(link);
  };

  const handleLogout = () => {
    logout();
    navigate('/')
    setIsLogoutOpen(false);
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
      overflow="auto"
      maxH="100vh"
      css={{
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
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
        <Button colorScheme="red" onClick={() => setIsLogoutOpen(true)}>
          Logout
        </Button>
      </VStack>

      <LogoutModal 
        isOpen={isLogoutOpen} 
        onClose={() => setIsLogoutOpen(false)} 
        onLogout={handleLogout} 
      />
    </Box>
  );
};

export default SellerSidebar;
