import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import UserHeader from "../components/HomeHeader";
import Sidebar from "../components/Sidebar";
import { FaBell } from "react-icons/fa";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.isAdmin) {
      const socket = io("http://localhost:3000");
      socket.on("newBookingRequest", (booking) => {
        setNotifications((prev) => [
          ...prev,
          `New booking request for ${booking.roomId?.name || "a room"} at ${new Date(booking.requestedTime).toLocaleString()}`,
        ]);
      });
      return () => socket.disconnect();
    }
  }, [currentUser]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
      navigate("/sign-in");
    } catch (error) {
      console.error(error);
    }
  };

  const adminLinks = [
    { to: "/profile", label: "Profile", icon: { name: "HiUser" } },
    { to: "/", label: "Dashboard", icon: { name: "HiDatabase" } },
    { to: "/course-dashboard", label: "Course & Class Management", icon: { name: "HiBookOpen" } },
    { to: "/faculty", label: "Faculty & Scheduling", icon: { name: "HiAcademicCap" } },
    { to: "/record", label: "Student Enrollment", icon: { name: "HiClipboardList" } },
    { to: "/room-dashboard", label: "Room & Resource Management", icon: { name: "HiOfficeBuilding" } },
  ];

  const studentLinks = [
    { to: "/profile", label: "Profile", icon: { name: "HiUser" } },
    { to: "/addbooking", label: "My Bookings", icon: { name: "HiClipboardList" } },
    { to: "/booking", label: "Request a Room", icon: { name: "HiDatabase" } },
    { to: "/schedules", label: "Class Schedule", icon: { name: "HiCalendar" } },
  ];

  const roleLinks = currentUser?.isAdmin ? adminLinks : studentLinks;

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-gray-50 to-gray-100">
      <Sidebar
  roleLinks={roleLinks}
  onSignOut={handleSignOut}
  onToggle={setSidebarExpanded}
  expanded={sidebarExpanded}
/>


      <div className={`flex-1 transition-all duration-300 ${sidebarExpanded ? "ml-64" : "ml-20"}`}>
        <UserHeader />

        <main className="p-6 sm:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {currentUser?.isAdmin && notifications.length > 0 && (
              <div className="bg-teal-100 border-l-4 border-teal-500 text-teal-800 p-4 rounded shadow flex items-start gap-3 animate-pulse">
                <FaBell className="text-2xl mt-1" />
                <div>
                  {notifications.slice(-1).map((notif, i) => (
                    <p key={i} className="text-sm font-medium leading-relaxed">{notif}</p>
                  ))}
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-teal-600 border-solid"></div>
              </div>
            ) : (
              <div className="bg-white shadow-xl rounded-xl p-8 transition duration-500 ease-in-out hover:shadow-2xl">
                <h1 className={`text-3xl font-extrabold mb-2 flex items-center gap-2 ${
                  currentUser?.isAdmin ? "text-blue-700" : "text-green-700"
                }`}>
                  {currentUser?.isAdmin ? "Welcome Admin" : "Welcome Student"}
                  <span>{currentUser?.isAdmin ? "\u{1F468}\u200D\u{1F4BC}" : "\u{1F393}"}</span>
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Please select an option from the sidebar to begin your session.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
