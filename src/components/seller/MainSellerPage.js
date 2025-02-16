import React, { useState } from "react";
import Sidebar from "./SellerSidebar";
import SellerDashboard from "./SellerDashboard";
import { Box, Flex } from "@chakra-ui/react";
import Earnings from "./Earnings";
import ManageInventory from "./ManageInventory";
import ProductListing from "../FeatureProducts";
import Ordersdetails from "./VendorOrders";
import VendorSales from "./VendorSales";
import ReviewCard from './../ReviewCard'
import VendorProductsPieChart from "./ProductPieChart";
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
        {selectedSection === "services" && <ProductListing />}
        {selectedSection === "orders" && <Ordersdetails/>}
        {selectedSection === "analytics" && <VendorSales />}
        {selectedSection === "reviews" && <ReviewCard/>}
        {selectedSection === "report" && <VendorProductsPieChart/>}
        {selectedSection === "settings" && <ReviewCard/>}
      </Box>
    </Flex>
  );
};

export default MainSellerPage;
