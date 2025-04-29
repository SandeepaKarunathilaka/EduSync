// BookingManagement.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../redux/roomSlice";
import { fetchBookings } from "../redux/bookingSlice";
import AdminHeader from "../components/Header";
import DashboardComp from "../components/DashboardComp";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";

export default function BookingManagement() {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.room);
  const { bookings } = useSelector((state) => state.booking);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [roomStatus, setRoomStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ capacity: "", resources: [] });
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

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
  }, [rooms, bookings, selectedDate, selectedTime, roomStatus, search, filters]);

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

  const handleStatusClick = (status) => setRoomStatus(status);

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
        roomStatus === "All"
          ? true
          : roomStatus === "Available"
          ? isAvailable
          : !isAvailable;

      return matchesSearch && matchesCapacity && matchesResources && statusMatch;
    });

    setFilteredRooms(results);

    // Suggest similar rooms if no result
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

  return (
    <>
      <AdminHeader />
      <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 p-4 bg-white border-r shadow-sm">
          <DashboardComp />
        </div>

        {/* Main */}
        <div className="w-full md:w-3/4 p-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold">📋 Booking Management</h1>
            <div className="flex gap-2">
              <Link to="/addbooking">
                <button className="bg-green-600 text-white px-4 py-2 rounded">+ Add Booking</button>
              </Link>
              <Link to="/admin/booking">
                <button className="bg-blue-600 text-white px-4 py-2 rounded">Manage Bookings</button>
              </Link>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block font-semibold mb-2">📅 Pick a Date</label>
              <Calendar value={selectedDate} onChange={handleDateChange} />
            </div>

            <div className="col-span-2 space-y-4">
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍 Search by room name"
              />

              <input
                type="time"
                className="w-full border p-2 rounded"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              />

              <select
                className="w-full border p-2 rounded"
                value={filters.capacity}
                onChange={handleCapacityChange}
              >
                <option value="">Filter by Capacity</option>
                <option value="<50">Less than 50</option>
                <option value="<100">Less than 100</option>
                <option value="<500">Less than 500</option>
                <option value="500+">More than 500</option>
              </select>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
                  <label key={res} className="text-sm">
                    <input
                      type="checkbox"
                      value={res}
                      onChange={handleFilterChange}
                      checked={filters.resources.includes(res)}
                      className="mr-2"
                    />
                    {res}
                  </label>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusClick("Available")}
                  className={`border px-4 py-1 rounded ${
                    roomStatus === "Available" ? "bg-green-200" : ""
                  }`}
                >
                  ✅ Available
                </button>
                <button
                  onClick={() => handleStatusClick("Occupied")}
                  className={`border px-4 py-1 rounded ${
                    roomStatus === "Occupied" ? "bg-red-200" : ""
                  }`}
                >
                  ⛔ Occupied
                </button>
                <button
                  onClick={() => handleStatusClick("All")}
                  className={`border px-4 py-1 rounded ${
                    roomStatus === "All" ? "bg-gray-200" : ""
                  }`}
                >
                  🔄 All
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-8 bg-white shadow rounded-lg">
            <table className="min-w-full text-sm text-center">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3">Room</th>
                  <th>Type</th>
                  <th>Capacity</th>
                  <th>Resources</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredRooms.length > 0 ? (
                  filteredRooms.map((room) => {
                    const hasBooking = bookings.some(
                      (b) =>
                        b.roomId?._id === room._id &&
                        b.status === "Approved" &&
                        new Date(b.endTime) > selectedDate &&
                        new Date(b.requestedTime) < selectedDate
                    );
                    return (
                      <tr key={room._id} className="border-b">
                        <td className="p-3">{room.name}</td>
                        <td>{room.type}</td>
                        <td>{room.capacity}</td>
                        <td>{room.resources.join(", ")}</td>
                        <td className={hasBooking ? "text-red-600" : "text-green-600"}>
                          {hasBooking ? "Occupied" : "Available"}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="p-5 text-gray-500">
                      No rooms match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {suggestions.length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-lg mb-2">🔎 Suggested Rooms</h3>
              <ul className="space-y-2">
                {suggestions.map((room) => (
                  <li
                    key={room._id}
                    className="border p-3 rounded bg-gray-50 shadow-sm"
                  >
                    {room.name} - {room.type} ({room.capacity} seats)
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
