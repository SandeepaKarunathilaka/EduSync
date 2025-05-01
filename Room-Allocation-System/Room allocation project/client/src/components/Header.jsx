import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import {
  FaArrowLeft,
  FaUser,
  FaCaretDown,
  FaSignOutAlt,
  FaBars,
  FaHome,
  FaCalendarAlt,
  FaBook,
  FaChartBar,
  FaClipboardList,
} from "react-icons/fa";

export default function Header() {
  const { pathname } = useLocation();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileRef = useRef(null);

  const adminNav = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Rooms", path: "/rooms", icon: <FaCalendarAlt /> },
    { name: "Bookings", path: "/booking", icon: <FaBook /> },
    { name: "Class Schedules", path: "/schedules", icon: <FaCalendarAlt /> },
    { name: "Reports", path: "/reports", icon: <FaChartBar /> },
  ];

  const userNav = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Request a Room", path: "/addbooking", icon: <FaClipboardList /> },
    { name: "My Bookings", path: "/booking", icon: <FaBook /> },
    { name: "Class Schedule", path: "/schedules", icon: <FaCalendarAlt /> },
  ];

  const navItems = currentUser?.isAdmin ? adminNav : userNav;

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", { method: "POST" });
      if (res.ok) {
        dispatch(signOut());
        navigate("/sign-in");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-md z-50 relative">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-300 hover:text-white transition-colors"
          >
            <FaArrowLeft className="text-lg" />
          </button>
          <button
            className="md:hidden text-white text-xl"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FaBars />
          </button>
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-2 font-medium transition-colors ${
                  pathname === item.path
                    ? "text-yellow-400 underline"
                    : "text-gray-200 hover:text-white"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div ref={profileRef} className="relative">
          <button
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="flex items-center gap-2 text-gray-200 hover:text-white"
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <FaUser />
            </div>
            <FaCaretDown className="text-sm" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-50 animate-fade-in">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsProfileOpen(false)}
              >
                View Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setIsProfileOpen(false)}
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  setIsProfileOpen(false);
                  handleSignOut();
                }}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 flex items-center gap-2"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="bg-gray-800 text-white px-4 pb-4 space-y-2 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block py-2 border-b border-gray-700 flex items-center gap-2 ${
                pathname === item.path ? "text-yellow-400" : "hover:text-white"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
