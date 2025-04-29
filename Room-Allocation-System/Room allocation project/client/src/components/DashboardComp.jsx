import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FaHome, FaBook, FaCalendarAlt, FaChartBar, FaDoorOpen, FaBars, FaUser } from "react-icons/fa";
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
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Room Management", icon: <FaBook />, path: "/rooms" },
    { name: "Booking Management", icon: <FaCalendarAlt />, path: "/booking" },
    { name: "Class Schedules", icon: <FaCalendarAlt />, path: "/class-management" },
    { name: "Reports & Analytics", icon: <FaChartBar />, path: "/reports" },
    { name: "Logout", icon: <FaDoorOpen />, path: "/sign-in" },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-sidebar-bg text-sidebar-text transition-all duration-300 ease-in-out flex flex-col justify-between p-2.5 shadow-[2px_0_5px_rgba(0,0,0,0.2)] overflow-y-auto ${
          expanded ? "w-[250px]" : "w-20"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center text-white no-underline">
          <img
            src={LogoImage}
            alt="PTI Logo"
            className="w-[45px] h-auto mr-2.5 rounded-[5px]"
          />
        </Link>

        {/* Toggle Button */}
        <div className="text-right p-2.5">
          <button
            onClick={toggleSidebar}
            className="bg-none border-none text-sidebar-text text-xl cursor-pointer"
          >
            <FaBars />
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="flex-1">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2.5 p-3 my-1.5 cursor-pointer rounded-[5px] transition-colors duration-300 ${
                location.pathname === item.path ? "bg-active-item" : "bg-transparent"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {expanded && <span className="text-base">{item.name}</span>}
            </div>
          ))}
        </div>

        {/* Logout at Bottom */}
        <div
          onClick={() => navigate("/sign-in")}
          className="p-3 bg-logout-bg text-center cursor-pointer rounded-[5px] mb-2.5 flex items-center justify-center"
        >
          <FaDoorOpen className="text-xl mr-2.5" />
          {expanded && "Logout"}
        </div>
      </div>

      {/* Content Section (Shifts Right) */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out p-5 overflow-x-hidden w-full ${
          expanded ? "ml-[250px]" : "ml-20"
        }`}
      >
        {children}
      </div>
    </div>
  );
}