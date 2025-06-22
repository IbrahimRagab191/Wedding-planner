import React from "react";
import VendorInfo from "../../../components/VendorProfile/VendorInfo";
import VendorReservations from "../../../components/VendorProfile/VendorReservations";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";

const VendorProfile = () => {
    return (
        <>
            <Header customClass="header-light" />
            <div className="container">
                <VendorInfo />
                <VendorReservations />
            </div>
            <Footer />
        </>
    );
};

export default VendorProfile;