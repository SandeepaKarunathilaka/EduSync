import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/user/userSlice";
import LogoImage from "../images/pti.jpg"; // Logo
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";


export default function HomeHeader() {
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
    <nav className="bg-[#071445] shadow-md p-4 flex items-center justify-between">
      {/* Logo + Title */}
      <div className="flex items-center gap-3">
        <img src={LogoImage} alt="Logo" className="w-10 h-10 rounded-full" />
        <Link to={currentUser?.isAdmin ? "/dashboard" : "/"} className="text-white text-xl font-bold">
          {currentUser?.isAdmin ? "Admin Home" : "Home"}
        </Link>
      </div>

      {/* Center Links */}
      <ul className="hidden md:flex gap-8 text-white font-semibold text-lg">
        <li>
          <Link to="/about" className={`hover:text-gray-300 ${path === "/about" ? "underline" : ""}`}>
            About
          </Link>
        </li>
        <li>
          <Link to="/contact" className={`hover:text-gray-300 ${path === "/contact" ? "underline" : ""}`}>
            Contact
          </Link>
        </li>
      </ul>

      {/* User Menu */}
      <div className="relative">
        {currentUser ? (
          <div className="group inline-block">
            <button className="flex items-center space-x-2 focus:outline-none">
              <img
                src={currentUser.profilePicture || "https://via.placeholder.com/50"}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
              />
            </button>

            {/* Dropdown */}
            <div className="absolute right-0 mt-2 hidden group-hover:block bg-white rounded-lg shadow-md py-2 w-48 text-center z-50">
              <div className="px-4 py-2 text-gray-700 font-semibold flex items-center justify-center gap-2">
                <FaUserCircle /> @{currentUser.username}
              </div>
              <div className="px-4 py-1 text-gray-500 text-sm">{currentUser.email}</div>
              <hr className="my-2" />
              <button
                onClick={handleSignOut}
                className="w-full text-red-600 hover:bg-red-100 py-2 flex items-center justify-center gap-2"
              >
                <FaSignOutAlt /> Sign Out
              </button>
            </div>
          </div>
        ) : (
          <Link to="/sign-in" className="text-white font-semibold border px-4 py-2 rounded-md hover:bg-white hover:text-[#071445] transition">
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

