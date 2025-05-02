import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaHome, FaBook, FaCalendarAlt, FaChartBar, FaDoorOpen, FaBars, FaTimes, FaUser } from "react-icons/fa";
import LogoImage from "../images/pti.jpg";

export default function Sidebar({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);

  // Toggle Sidebar Collapse
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  // Sidebar Menu Items
  const menuItems = [
    { name: "Profile", icon: <FaUser />, path: "/profile" },
    { name: "Dashboard", icon: <FaHome />, path: "/room-dashboard" },
    { name: "Room Management", icon: <FaBook />, path: "/rooms" },
    { name: "Booking Management", icon: <FaCalendarAlt />, path: "/booking" },
    { name: "Class Schedules", icon: <FaCalendarAlt />, path: "/class-management" },
    { name: "Reports & Analytics", icon: <FaChartBar />, path: "/reports" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-gray-100 flex flex-col justify-between p-4 shadow-[2px_0_5px_rgba(0,0,0,0.2)] transition-all duration-300 ease-in-out z-50 overflow-y-auto ${
          expanded ? "w-64" : "w-20"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center text-white no-underline mb-4">
          <img
            src={LogoImage}
            alt="PTI Logo"
            className={`h-12 rounded-md transition-all duration-300 ${
              expanded ? "w-12 mr-3" : "w-12"
            }`}
          />
          {expanded && <span className="text-xl font-bold">PTI</span>}
        </Link>

        {/* Toggle Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleSidebar}
            className="bg-transparent border-none text-gray-100 text-xl cursor-pointer hover:bg-gray-700 p-2 rounded-full transition-colors duration-200"
          >
            {expanded ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Sidebar Menu */}
        <nav className="flex-1">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 p-3 my-1 rounded-md cursor-pointer transition-colors duration-300 group ${
                location.pathname === item.path
                  ? "bg-teal-600 text-white"
                  : "hover:bg-gray-700 text-gray-100"
              }`}
            >
              {/* Icon */}
              <span className="text-xl">{item.icon}</span>

              {/* Menu Item Name */}
              {expanded && <span className="text-base font-medium">{item.name}</span>}

              {/* Tooltip for Collapsed State */}
              {!expanded && (
                <div className="absolute left-20 bg-gray-600 text-white text-sm rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.name}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Logout at Bottom */}
        <div
          onClick={() => navigate("/sign-in")}
          className="flex items-center gap-3 p-3 my-1 rounded-md cursor-pointer bg-red-600 hover:bg-red-700 transition-colors duration-200"
        >
          <FaDoorOpen className="text-xl" />
          {expanded && <span className="text-base font-medium">Logout</span>}
        </div>
      </div>

      {/* Content Section (Shifts Right) */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out p-5 bg-gray-100 w-full ${
          expanded ? "md:ml-64 ml-20" : "ml-20"
        }`}
      >
        {children}
      </div>
    </div>
  );
}