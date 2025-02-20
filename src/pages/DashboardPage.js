import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import ProductListing from '../components/FeatureProducts';
import Testimonials from '../components/Testimonials';
import PromotionalBanner from '../components/PromotionalBanner';
import VendorCard from '../components/VendorCard';
import BuyerSidebar from './BuyerSidebar';
import FeaturedAutoParts from '../components/FeaturedCategories';

const DashboardPage = () => {

    return (
        <>  <BuyerSidebar /> 
            <Navbar />
            <Banner />
            <FeaturedAutoParts />
            <ProductListing PageTtitle='Product Listing Page' />
            <PromotionalBanner />
            <Testimonials />
            <VendorCard />
            <Footer />
        </>
    );
};

export default DashboardPage;
