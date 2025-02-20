import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ToastContainer } from 'react-toastify';  
import { Box } from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css'; 
import './App.css';

// Pages and Components
import DashboardPage from './pages/DashboardPage';
import ProductPage from './pages/ProductDetailpage';
import CheckoutPage from './components/CheckoutPage';
import OrderConfirmation from './components/OrderConfirmation';
import GuestOrderView from './components/GuestOrderView';
import ImageUpload from './components/Image';
import { initializeCart } from './services/cartService'; 
import useCartStore from './stores/cartStore'; 
import GuestInfoModal from './components/GuestInfoModal';
import OrderHistory from './components/OrderHistory';
import OrderDetail from './components/OrderDetail';
import GuestOrderTracking from './components/GuestOrderTracking';
import VendorProductsPage from './components/VendorProductsPage';
import Profile from './components/Profile';
import ForYouProducts from './components/ForYouProducts';
import NotificationPage from './components/NotificationPage';
// Seller Dashboard Components
import VendorOrders from './components/seller/VendorOrders';
import MainSellerPage from './components/seller/MainSellerPage';
import AuthComponent from './components/AuthComponent';
import ProductSearchPage from './pages/ProductSearchPage';
import VendorListingPage from './pages/VendorListingPage';
import VendorSales from './components/seller/VendorSales'
import ProfilePopover from './components/ProfilePopover';
import SellerSignup from './components/seller/SellerSignup';
import VerifyOtpPage from './components/VerifyOtpPage';


const stripePromise = loadStripe('pk_test_51PsV1D03pR92vHPUx85GxUuipVPCfKAjxsboQbvefxLLoZFQUC0Ec6xD0P99uWJth7pW2SHuGQCCzT7sq2sA9azK00Au7Rxijd');

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  const setCart = useCartStore((state) => state.setCart);

  // Initialize cart when app loads
  useEffect(() => {
    const initializeAppCart = async () => {
      try {
        const { cartId, cartItems } = await initializeCart();
        setCart(cartId, cartItems);
      } catch (error) {
        console.error('Error initializing cart:', error);
      }
    };

    initializeAppCart();
  }, [setCart]);

  return (
    <QueryClientProvider client={queryClient}>
      <Elements stripe={stripePromise}>
      <Box
          minH="100vh"
          position="relative"
          bg="white"
          sx={{
            // backgroundImage: "url('/background.jpg')",
            backgroundColor:"white",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            position: "relative",
            '&::after': {
              content: '""',
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              bottom: "0",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              zIndex: "-1",
            },
          }}
        >
        
        <BrowserRouter>
          <Routes>
            <Route path='/notifications' element={<NotificationPage/>}/>
            <Route path="/verify-otp/:email" element={<VerifyOtpPage/>}/>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/foryou" element={<ForYouProducts/>}/>
            <Route path="/sellersignup" element={<SellerSignup />} />
            <Route path="/profilepop" element={<ProfilePopover />} />
            <Route path="/auth" element={<AuthComponent />} />
            <Route path="/products" element={<ProductSearchPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/checkout/:orderId" element={<CheckoutPage />} />
            <Route path="/checkout/" element={<CheckoutPage />} />
            <Route path="/guest-info/" element={<GuestInfoModal />} />
            <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
            <Route path="/guest-order-confirmation/:orderId" element={<GuestOrderView />} />
            <Route path="/image" element={<ImageUpload />} />

            {/* Order Routes */}
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/order-detail/:orderId" element={<OrderDetail />} />
            <Route path="/guest-order-tracking" element={<GuestOrderTracking />} />

            {/* Vendor Product Listing */}
            <Route path="/vendors/:vendorId/products" element={<VendorProductsPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/vendor-orders" element={<VendorOrders/>} />
            <Route path="/vendors" element={<VendorListingPage/>} />
            <Route path="/vendorsales" element={<VendorSales />} />
            <Route path="/MainSellerPage" element={<MainSellerPage />} />
           
          </Routes>
        </BrowserRouter>
        </Box>
      </Elements>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
    </QueryClientProvider>
  );
}

export default App;
