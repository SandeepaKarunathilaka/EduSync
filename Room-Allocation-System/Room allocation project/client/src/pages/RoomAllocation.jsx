import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { fetchRooms, deleteRoom } from "../redux/roomSlice";
import { FaArrowLeft, FaUser, FaCaretDown, FaSignOutAlt } from "react-icons/fa";

export default function RoomAllocation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { rooms, loading, error } = useSelector((state) => state.room);

  // Define the state for profile dropdown visibility
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Added state for profile dropdown
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Added state for feedback message

  useEffect(() => {
    dispatch(fetchRooms()).catch((err) => console.error("Error fetching rooms:", err));
  }, [dispatch]);

  const handleDelete = async (roomId, roomName) => {
    if (window.confirm(`Are you sure you want to delete "${roomName}"?`)) {
      try {
        await dispatch(deleteRoom(roomId)).unwrap();
        setFeedbackMessage(`✅ Room "${roomName}" deleted successfully.`); // Set success message
      } catch (error) {
        console.error("Error deleting room:", error);
        setFeedbackMessage("❌ Failed to delete room. You must be logged in as an admin."); // Set error message
      }
    }
  };

  // Navigation Links
  const navItems = [
    { name: "Admin Home", path: "/dashboard" },
    { name: "Room Management", path: "/rooms" },
    { name: "Bookings", path: "/bookings" },
    { name: "Class Schedules", path: "/schedules" },
    { name: "Reports & Analytics", path: "/reports" },
  ];

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors duration-200 group relative"
            >
              <FaArrowLeft className="text-lg" />
              <span className="font-medium">Back</span>
            </button>
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors duration-200 group relative"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)} // Toggle the dropdown visibility
                className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors duration-200"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                  <FaUser />
                </div>
                <FaCaretDown className="text-sm" />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg py-2 z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    View Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    Settings
                  </Link>
                  <Link
                    to="/sign-in"
                    className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 text-red-600"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    <FaSignOutAlt /> Logout
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Room Allocation</h1>

        {/* Add Room Button */}
        <div className="flex justify-center mb-6">
          <Link to="/addroom">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded shadow">
              + Add New Allocations
            </button>
          </Link>
        </div>

        {/* Feedback Message */}
        {feedbackMessage && (
          <p className={`text-center font-semibold mb-4 ${feedbackMessage.includes("❌") ? "text-red-500" : "text-green-500"}`}>
            {feedbackMessage}
          </p>
        )}

        {/* Loading & Error Messages */}
        {loading && (
          <p className="text-blue-500 font-semibold text-center mb-4">
            Loading rooms...
          </p>
        )}
        {error && (
          <p className="text-red-500 font-semibold text-center mb-4">
            Error fetching rooms: {error}
          </p>
        )}

        {/* Room Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-center">Room Name</th>
                <th className="py-3 px-6 text-center">Type</th>
                <th className="py-3 px-6 text-center">Capacity</th>
                <th className="py-3 px-6 text-center">Resources</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id} className="border-b text-center">
                  <td className="py-4">{room.name}</td>
                  <td className="py-4">{room.type}</td>
                  <td className="py-4">{room.capacity}</td>
                  <td className="py-4">{room.resources.join(", ")}</td>
                  <td
                    className={`py-4 font-bold ${
                      room.status === "Available" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {room.status}
                  </td>
                  <td className="py-4 flex justify-center gap-3">
                    <Link to={`/updateroom/${room._id}`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
                      onClick={() => handleDelete(room._id, room.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
