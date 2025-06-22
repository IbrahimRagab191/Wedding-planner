import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import WeddingHallsPage from './pages/WeddingHallsPage';
import WeddingFoodsPage from './pages/WeddingFoodsPage';
import WeddingHallDetails from './pages/WeddingHallDetails';
import WeddingFoodsDetails from './pages/WeddingFoodsDetails';
import UserProfile from './pages/Profile/user';
import VendorProfile from './pages/Profile/vendor';
import ChatBot from './pages/ChatBot';
import Task from './pages/Task';
import GuestPage from './pages/Guest';
import "./App.css"

function App() {
    const loginState = useSelector((state) => state.login);
    return (
            
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/hallsPage" element={<WeddingHallsPage />} />
            <Route path="/foodsPage" element={<WeddingFoodsPage />} />
            <Route path="/halls/:id" element={<WeddingHallDetails />} />
            <Route path="/foods/:id" element={<WeddingFoodsDetails />} />
            <Route path="/UserProfile" element={<UserProfile />} />
            <Route path="/VendorProfile" element={<VendorProfile />} />
            <Route path="/ChatBot" element={<ChatBot />} />
            <Route path="/Task" element={<Task />} />
            <Route path="/GuestPage" element={<GuestPage />} />
        </Routes>
    );
    }

export default App;
