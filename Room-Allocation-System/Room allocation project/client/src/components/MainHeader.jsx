import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import LogoImage from "../images/pti.jpg";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const path = useLocation().pathname;
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOut());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="bg-blue-100 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={LogoImage} alt="Edu Sync" className="w-12 h-auto rounded-md mr-2" />
        </Link>

        {/* Hamburger button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Main Nav Links */}
        {/* <div className={`flex-col md:flex md:flex-row md:items-center md:space-x-8 ${menuOpen ? "flex" : "hidden"} absolute md:static top-16 left-0 w-full md:w-auto bg-blue-100 md:bg-transparent p-4 md:p-0 z-50`}>
          <Link to="/" className="text-gray-700 font-semibold hover:text-blue-600 py-2">Home</Link>
          <a href="https://pti-shop-360.onrender.com" className="text-gray-700 font-semibold hover:text-blue-600 py-2">Shop</a>
          <a href="#features" className="text-gray-700 font-semibold hover:text-blue-600 py-2">Features</a>
          <Link to="/create-feedback" className="text-gray-700 font-semibold hover:text-blue-600 py-2">Contact Us</Link>
          <a href="#about" className="text-gray-700 font-semibold hover:text-blue-600 py-2">About Us</a>
        </div> */}

        {/* Profile/Login Section */}
        <div className="flex items-center gap-4">
          {currentUser ? (
            <div className="relative">
              <button
                className="flex items-center focus:outline-none"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <img
                  src={currentUser.profilePicture || "https://via.placeholder.com/50"}
                  alt="User"
                  className="w-12 h-12 rounded-full object-cover"
                />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-50">
                  <div className="px-4 py-2 text-sm text-gray-700">
                    <div>@{currentUser.username}</div>
                    <div className="truncate">{currentUser.email}</div>
                  </div>
                  <hr />
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/sign-in"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}