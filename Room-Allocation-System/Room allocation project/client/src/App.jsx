import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./components/Profile";
import AdminHome from "./pages/AdminHome";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import axios from "axios";
import socket from "./socket";
import "antd/dist/reset.css";



import DashUsers from "./components/DashUsers";
import AdminRoomManagement from "./pages/AdminRoomManagement";
import RoomAllocation from "./pages/RoomAllocation";
import AddRoom from "./pages/AddRoom";
import EditRoom from "./pages/EditRoom";
import BookingManagement from "./pages/BookingManagement";
import UserBookingRequest from "./pages/UserBookingRequest"; 
import AddBooking from "./pages/AddBooking";
import AdminBookingManagement from "./pages/AdminBookingManagement";
import AcademicDashboard from "./pages/AcademicDashboard";
import AdminClassManagement from "./pages/AdminClassManagement";
import ClassSchedule from "./pages/ClassSchedule";
import HomeHeader from "./components/HomeHeader";

//sandeepa
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  axios.defaults.withCredentials = true;
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/academic-dashboard" element={<AcademicDashboard />} />
        <Route path="/user-booking" element={<UserBookingRequest />} />
        <Route path="/addbooking" element={<AddBooking/>}/>
        <Route path="/header" element={<Header />} />
        <Route path="/home-header" element={<HomeHeader />} />
        
        <Route path="/addroom" element={<AddRoom/>}/>
        <Route path="/schedules" element={<ClassSchedule />} />
        <Route path="/booking" element={<BookingManagement />} />

{/* sandeepa */}
        <Route element={<HomePage />} path="/homepage" />
        <Route element={<DashboardPage />} path="/course-dashboard" />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/rooms" element={<RoomAllocation />} /> {/* User Room Booking */}
           

        </Route>

        {/* Admin Routes */}
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path="/dashboard" element={<AdminHome />} />
          <Route path="/admin/rooms" element={<AdminRoomManagement />} />
          <Route path="/admin/booking" element={<AdminBookingManagement />} />
          
          <Route path="/getusers" element={<DashUsers />} />
          
          
          
          <Route path="/updateroom/:roomId" element={<EditRoom/>}/>
          
          <Route path="/class-management" element={<AdminClassManagement />} />
         
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
