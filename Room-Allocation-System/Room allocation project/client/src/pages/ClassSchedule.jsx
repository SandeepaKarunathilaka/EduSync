import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const HOURS = Array.from({ length: 10 }, (_, i) => i + 8); // 8 to 17

const getColorClass = (status) => {
  switch (status) {
    case "Occupied":
    case "Approved":
      return "bg-red-100 text-red-700 border-red-300";
    case "Pending":
    case "Reserved":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "Available":
    default:
      return "bg-green-100 text-green-700 border-green-300";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Occupied":
    case "Approved":
      return <FaTimesCircle className="inline mr-1" />;
    case "Pending":
    case "Reserved":
      return <FaClock className="inline mr-1" />;
    case "Available":
    default:
      return <FaCheckCircle className="inline mr-1" />;
  }
};

export default function ClassSchedule() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const [roomRes, bookingRes] = await Promise.all([
        axios.get("http://localhost:3000/api/rooms/getrooms"),
        axios.get("http://localhost:3000/api/bookings", { withCredentials: true }),
      ]);
      setRooms(roomRes.data);
      setBookings(bookingRes.data);
    };

    fetchData();

    const socket = io("http://localhost:3000");
    socket.on("newBookingRequest", () => {
      axios.get("http://localhost:3000/api/bookings", { withCredentials: true }).then(res => {
        setBookings(res.data);
      });
    });

    return () => socket.disconnect();
  }, []);

  const filteredRooms = useMemo(() => {
    return rooms.filter((room) =>
      room.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [rooms, filter]);

  const getStatus = (roomId, hour) => {
    for (let b of bookings) {
      if (!b.roomId || typeof b.roomId !== "object" || !b.roomId._id) continue;
      const start = new Date(b.requestedTime);
      const end = new Date(b.endTime);
      const sameDay = start.toDateString() === selectedDate.toDateString();
      if (b.roomId._id === roomId && sameDay && start.getHours() <= hour && end.getHours() > hour) {
        return b.status === "Approved" ? "Occupied" : b.status;
      }
    }
    return "Available";
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">📊 Class Schedule & Room Availability</h2>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
            dateFormat="yyyy-MM-dd"
          />
          <input
            type="text"
            placeholder="Search rooms..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full text-sm text-center border border-gray-200">
            <thead className="bg-blue-100 text-gray-700 uppercase tracking-wide">
              <tr>
                <th className="p-3 border">Room</th>
                {HOURS.map((h) => (
                  <th key={h} className="p-3 border">
                    {`${h.toString().padStart(2, "0")}:00 - ${(h + 1)
                      .toString()
                      .padStart(2, "0")}:00`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room) => (
                <tr key={room._id} className="hover:bg-gray-50 transition-colors">
                  <td className="border p-3 font-semibold text-gray-800">{room.name}</td>
                  {HOURS.map((h, idx) => {
                    const status = getStatus(room._id, h);
                    return (
                      <td
                        key={idx}
                        className={`border p-2 ${getColorClass(status)} rounded-md transition duration-200`}
                        title={`${room.name} at ${h}:00 → ${status}`}
                      >
                        {getStatusIcon(status)} {status[0]}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-2">
            <FaCheckCircle className="text-green-500" />
            <span className="text-gray-700">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-yellow-500" />
            <span className="text-gray-700">Pending / Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <FaTimesCircle className="text-red-500" />
            <span className="text-gray-700">Occupied</span>
          </div>
        </div>
      </div>
    </div>
  );
}
