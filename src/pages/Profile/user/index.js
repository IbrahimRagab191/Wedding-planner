import React from "react";
import UserInfo from "../../../components/UserProfileSection/UserInfo";
import ActionButtons from "../../../components/UserProfileSection/ActionButtons";
import ReservationsTable from "../../../components/UserProfileSection/ReservationsTable";
import "../../../components/UserProfileSection/UserInfo/UserInfo.css"; 
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import "./user.css";

const UserProfile = () => {
    return (
        <div className="page-layout">
            <Header customClass="header-light" />
            <div className="user-profile">
                <div className="container">
                    <UserInfo />
                    <ActionButtons />
                    <ReservationsTable />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserProfile;
