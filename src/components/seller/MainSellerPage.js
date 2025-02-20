import React, { useState } from "react";
import Sidebar from "./SellerSidebar";
import SellerDashboard from "./SellerDashboard";
import { Box, Flex } from "@chakra-ui/react";
import Earnings from "./Earnings";
import ManageInventory from "./ManageInventory";
import Profile from './../Profile'
import Ordersdetails from "./VendorOrders";
import VendorSales from "./VendorSales";
import ReviewsPage from './ReviewsPage'
import VendorReportPage from './ReportPage';
const MainSellerPage = () => {
  const [selectedSection, setSelectedSection] = useState("home");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSelect = (section) => {
    setSelectedSection(section);
  };

  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
    
      const handleLogout = () => {
        console.log("User logged out");
        setIsLogoutOpen(false);
      };

  return (
    <Flex height="100vh" overflow="hidden">
      {/* Sidebar */}
      <Sidebar onselect={handleSelect} isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <Box
        flex="1"
        p="4"
        transition="margin-left 0.3s ease"
        ml={isSidebarOpen ? ["full", "250px"] : ["full", "70px"]}
        overflowY="auto"
        width="100%"
      >
        {selectedSection === "home" && <SellerDashboard />}
        {selectedSection === "earnings" && <Earnings />}
        {selectedSection === "manage-inventory" && <ManageInventory />}
        {selectedSection === "orders" && <Ordersdetails/>}
        {selectedSection === "analytics" && <VendorSales />}
        {selectedSection === "reviews" && <ReviewsPage/>}
        {selectedSection === "report" && <VendorReportPage/>}
        {selectedSection === "settings" && <Profile/>}
      </Box>
    </Flex>
  );
};

export default MainSellerPage;
