import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../redux/roomSlice";
import { Outlet } from "react-router-dom";
import AdminHeader from "../components/Header";
import Sidebar from "../components/DashSidebar"; // assuming your sidebar (DashboardComp) is Sidebar now
import AcademicDashboard from "./AcademicDashboard"; // main dashboard content

export default function AdminHome() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overflow-hidden">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40">
        <AdminHeader />
      </header>

      <div className="flex flex-1 pt-20">
        
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-30">
          <Sidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-20 md:ml-64 p-6 transition-all duration-300 ease-in-out">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Title */}
            {currentUser?.isAdmin && (
              <h1 className="text-3xl font-bold text-blue-700 mb-8">
                Welcome Admin
              </h1>
            )}

            {/* Academic Dashboard */}
            <AcademicDashboard />

            {/* If you use nested routes: */}
            {/* <Outlet /> */}
          </div>
        </main>
      </div>
    </div>
  );
}
