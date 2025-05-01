import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiArrowRight,
  HiDatabase,
  HiBookOpen,
  HiAcademicCap,
  HiClipboardList,
  HiCalendar,
  HiOfficeBuilding,
} from "react-icons/hi"; // ✅ use valid icons

import { Link, useLocation } from "react-router-dom";
import { signOut } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import UserHeader from "../components/HomeHeader";

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const path = useLocation().pathname;
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Replace HiBuildingOffice → HiOfficeBuilding
  const adminLinks = [
    { to: "/profile", label: "Profile", icon: HiUser },
    { to: "/", label: "Dashboard", icon: HiDatabase },
    { to: "/courses", label: "Course & Class Management", icon: HiBookOpen },
    { to: "/faculty", label: "Faculty & Scheduling", icon: HiAcademicCap },
    { to: "/enrollments", label: "Student Enrollment", icon: HiClipboardList },
    { to: "/dashboard", label: "Room & Resource Management", icon: HiOfficeBuilding },
  ];

  const studentLinks = [
    { to: "/profile", label: "Profile", icon: HiUser },
    { to: "/user-booking", label: "Request a Room", icon: HiClipboardList },
    { to: "/my-bookings", label: "My Bookings", icon: HiDatabase },
    { to: "/class-schedule", label: "Class Schedule", icon: HiCalendar },
  ];

  const roleLinks = currentUser?.isAdmin ? adminLinks : studentLinks;

  return (
    <div className="min-h-screen flex flex-col">
      <UserHeader />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar className="w-full md:w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white min-h-screen">
          <Sidebar.Items>
            <Sidebar.ItemGroup className="space-y-2">
              {roleLinks.map((link) => (
                <Link to={link.to} key={link.label}>
                  <Sidebar.Item
                    icon={link.icon}
                    active={path === link.to}
                    className="hover:bg-blue-600 transition-all duration-200"
                  >
                    {link.label}
                  </Sidebar.Item>
                </Link>
              ))}

              {/* Sign Out */}
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-white hover:bg-red-600 transition-all rounded-lg w-full mt-2"
              >
                <HiArrowRight className="text-xl" />
                Sign Out
              </button>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>

        {/* Main Body */}
        <main className="flex-1 p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {currentUser?.isAdmin ? (
              <h1 className="text-3xl font-bold text-blue-700 mb-4">Welcome Admin 👨‍💼</h1>
            ) : (
              <h1 className="text-3xl font-bold text-green-700 mb-4">Welcome Student 🎓</h1>
            )}

            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600">
                Please select an option from the sidebar to begin.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
