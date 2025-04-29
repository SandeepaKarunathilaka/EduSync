import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../redux/roomSlice";
import { fetchBookings } from "../redux/bookingSlice";
import { Link, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import socket from "../socket";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaClock, FaArrowLeft, FaHome, FaUser, FaBook, FaCalendarAlt, FaChartBar, FaSignOutAlt, FaCaretDown } from "react-icons/fa";

export default function BookingManagement() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rooms, status: roomStatus } = useSelector((state) => state.room);
  const { bookings } = useSelector((state) => state.booking);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [roomStatusFilter, setRoomStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ capacity: "", resources: [] });
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchRooms());
    dispatch(fetchBookings());
    const socket = io("http://localhost:3000");
    socket.on("newBookingRequest", () => {
      dispatch(fetchBookings());
    });
    return () => socket.disconnect();
  }, [dispatch]);

  useEffect(() => {
    filterRooms();
  }, [rooms, bookings, selectedDate, selectedTime, roomStatusFilter, search, filters]);

  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      resources: checked
        ? [...prev.resources, value]
        : prev.resources.filter((r) => r !== value),
    }));
  };

  const handleCapacityChange = (e) => {
    setFilters((prev) => ({ ...prev, capacity: e.target.value }));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleStatusClick = (status) => setRoomStatusFilter(status);

  const resetFilters = () => {
    setFilters({ capacity: "", resources: [] });
    setSearch("");
    setSelectedTime("");
    setRoomStatusFilter("All");
  };

  const filterRooms = () => {
    const start = new Date(selectedDate);
    const end = new Date(selectedDate);
    if (selectedTime) {
      const [hr, min] = selectedTime.split(":");
      start.setHours(+hr, +min, 0);
      end.setHours(+hr + 1, +min, 0);
    } else {
      start.setHours(0, 0, 0, 0);
      end.setHours(23, 59, 59, 999);
    }

    const results = rooms.filter((room) => {
      const matchesSearch = room.name.toLowerCase().includes(search.toLowerCase());
      const matchesCapacity =
        !filters.capacity ||
        (filters.capacity === "<50" && room.capacity < 50) ||
        (filters.capacity === "<100" && room.capacity < 100) ||
        (filters.capacity === "<500" && room.capacity < 500) ||
        (filters.capacity === "500+" && room.capacity >= 500);
      const matchesResources = filters.resources.every((r) => room.resources.includes(r));

      const hasBooking = bookings.some(
        (b) =>
          b.roomId?._id === room._id &&
          b.status === "Approved" &&
          new Date(b.endTime) > start &&
          new Date(b.requestedTime) < end
      );

      const isAvailable = !hasBooking;
      const statusMatch =
        roomStatusFilter === "All"
          ? true
          : roomStatusFilter === "Available"
          ? isAvailable
          : !isAvailable;

      return matchesSearch && matchesCapacity && matchesResources && statusMatch;
    });

    setFilteredRooms(results);

    if (results.length === 0 && rooms.length > 0) {
      const similar = rooms
        .filter((room) =>
          filters.resources.every((res) => room.resources.includes(res))
        )
        .slice(0, 3);
      setSuggestions(similar);
    } else {
      setSuggestions([]);
    }
  };

  // Navigation Links
  const navItems = [
    { name: "Admin Home", path: "/dashboard", icon: <FaHome /> },
    { name: "Room Management", path: "/rooms", icon: <FaBook /> },
    { name: "Class Schedules", path: "/class-management", icon: <FaCalendarAlt /> },
    { name: "Reports & Analytics", path: "/reports", icon: <FaChartBar /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 font-sans flex flex-col">
      {/* Navigation Bar */}
      <nav className="bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors duration-200 group relative"
            >
              <FaArrowLeft className="text-lg" />
              <span className="font-medium">Back</span>
              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Go Back
              </span>
            </button>
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="flex items-center gap-2 text-gray-200 hover:text-white transition-colors duration-200 group relative"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
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

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <span>📋</span> Booking Management
            </h1>
            <div className="flex gap-3">
              <Link to="/addbooking">
                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md flex items-center gap-2">
                  <span>+</span> Add Booking
                </button>
              </Link>
              <Link to="/admin/booking">
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md">
                  Manage Bookings
                </button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Calendar */}
            <div>
              <label className="block font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <span>📅</span> Pick a Date
              </label>
              <div className="bg-white p-4 rounded-xl shadow-lg">
                <Calendar
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="border-none w-full text-gray-700 font-medium"
                  tileClassName={({ date, view }) =>
                    view === "month" &&
                    date.getDate() === selectedDate.getDate() &&
                    date.getMonth() === selectedDate.getMonth() &&
                    date.getFullYear() === selectedDate.getFullYear()
                      ? "bg-blue-500 text-white rounded-full"
                      : "hover:bg-blue-50 hover:text-blue-700 rounded-full transition-colors duration-200"
                  }
                  navigationLabel={({ date }) => (
                    <span className="text-lg font-semibold text-gray-800">
                      {date.toLocaleString("default", { month: "long", year: "numeric" })}
                    </span>
                  )}
                />
              </div>
            </div>

            {/* Filters */}
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 shadow-sm transition-all duration-200"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by room name"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  🔍
                </span>
              </div>

              <input
                type="time"
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 shadow-sm transition-all duration-200"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />

              <div className="flex items-center gap-2">
                <select
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 shadow-sm transition-all duration-200"
                  value={filters.capacity}
                  onChange={handleCapacityChange}
                >
                  <option value="">Filter by Capacity</option>
                  <option value="<50">Less than 50</option>
                  <option value="<100">Less than 100</option>
                  <option value="<500">Less than 500</option>
                  <option value="500+">More than 500</option>
                </select>
                <button
                  onClick={resetFilters}
                  className="bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 p-3 rounded-lg hover:from-gray-300 hover:to-gray-400 transition-all duration-200 shadow-sm"
                >
                  <FaClock />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  "Projector",
                  "A/C",
                  "Microphone",
                  "Whiteboard",
                  "Smart Board",
                  "Computers",
                  "WiFi",
                  "Lab Equipment",
                ].map((res) => (
                  <label key={res} className="flex items-center text-sm text-gray-700">
                    <input
                      type="checkbox"
                      value={res}
                      onChange={handleFilterChange}
                      checked={filters.resources.includes(res)}
                      className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    {res}
                  </label>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusClick("Available")}
                  className={`flex-1 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm ${
                    roomStatusFilter === "Available"
                      ? "bg-gradient-to-r from-green-400 to-green-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  ✅ Available
                </button>
                <button
                  onClick={() => handleStatusClick("Occupied")}
                  className={`flex-1 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm ${
                    roomStatusFilter === "Occupied"
                      ? "bg-gradient-to-r from-red-400 to-red-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  ⛔ Occupied
                </button>
                <button
                  onClick={() => handleStatusClick("All")}
                  className={`flex-1 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm ${
                    roomStatusFilter === "All"
                      ? "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  🔄 All
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-8 bg-white shadow-lg rounded-xl">
            <table className="min-w-full text-sm text-center text-gray-700">
              <thead className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
                <tr>
                  <th className="p-4">Room</th>
                  <th>Type</th>
                  <th>Capacity</th>
                  <th>Resources</th>
                  <th>Status (Time-based)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {roomStatus === "loading" ? (
                  <tr>
                    <td colSpan="6" className="p-5 text-gray-500">
                      <div className="flex justify-center items-center">
                        <svg
                          className="animate-spin h-5 w-5 text-blue-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span className="ml-2">Loading rooms...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredRooms.length > 0 ? (
                  filteredRooms.map((room, index) => {
                    const hasBooking = bookings.some(
                      (b) =>
                        b.roomId?._id === room._id &&
                        b.status === "Approved" &&
                        new Date(b.endTime) > new Date(selectedDate) &&
                        new Date(b.requestedTime) < new Date(selectedDate)
                    );
                    return (
                      <tr
                        key={room._id}
                        className={`border-b transition-colors duration-200 ${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } hover:bg-blue-50`}
                      >
                        <td className="p-4">{room.name}</td>
                        <td>{room.type}</td>
                        <td>{room.capacity}</td>
                        <td>{room.resources.join(", ")}</td>
                        <td
                          className={
                            hasBooking ? "text-red-600 font-medium" : "text-green-600 font-medium"
                          }
                        >
                          {hasBooking ? "Occupied" : "Available"}
                        </td>
                        <td>
                          <button className="text-blue-600 hover:underline transition-colors duration-200">
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="p-5 text-gray-500">
                      No rooms match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {suggestions.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg text-gray-700 mb-3 flex items-center gap-2">
                <span>🔎</span> Suggested Rooms
              </h3>
              <div className="grid gap-4">
                {suggestions.map((room) => (
                  <div
                    key={room._id}
                    className="border p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-gray-800">{room.name}</h4>
                        <p className="text-sm text-gray-600">
                          {room.type} ({room.capacity} seats)
                        </p>
                      </div>
                      <button className="text-blue-600 hover:underline transition-colors duration-200">
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}