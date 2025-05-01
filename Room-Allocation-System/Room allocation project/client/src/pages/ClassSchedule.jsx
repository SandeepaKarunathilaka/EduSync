import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaSun,
  FaMoon,
  FaDownload,
  FaCalendarAlt,
  FaSearch,
} from "react-icons/fa";
import AdminMainHeader from "../components/Header";
import { jsPDF } from "jspdf";

const HOURS = Array.from({ length: 10 }, (_, i) => i + 8); // 8 to 17

const getColorClass = (status) => {
  switch (status) {
    case "Occupied":
    case "Approved":
      return "bg-red-100 text-red-800 border-red-200";
    case "Pending":
    case "Reserved":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Available":
    default:
      return "bg-green-100 text-green-800 border-green-200";
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case "Occupied":
    case "Approved":
      return <FaTimesCircle className="inline mr-1 text-red-500" />;
    case "Pending":
    case "Reserved":
      return <FaClock className="inline mr-1 text-yellow-500" />;
    case "Available":
    default:
      return <FaCheckCircle className="inline mr-1 text-green-500" />;
  }
};

export default function ClassSchedule() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filter, setFilter] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const [roomRes, bookingRes] = await Promise.all([
        axios.get("http://localhost:3000/api/rooms/getrooms"),
        axios.get("http://localhost:3000/api/bookings", {
          withCredentials: true,
        }),
      ]);
      setRooms(roomRes.data);
      setBookings(bookingRes.data);
    };

    fetchData();

    const socket = io("http://localhost:3000");
    socket.on("newBookingRequest", () => {
      axios
        .get("http://localhost:3000/api/bookings", {
          withCredentials: true,
        })
        .then((res) => {
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
      if (
        b.roomId._id === roomId &&
        sameDay &&
        start.getHours() <= hour &&
        end.getHours() > hour
      ) {
        return b.status === "Approved" ? "Occupied" : b.status;
      }
    }
    return "Available";
  };

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text("Class Schedule & Room Availability Report", 14, 22);

    doc.setFontSize(12);
    const formattedDate = selectedDate.toLocaleDateString();
    doc.text(`Date: ${formattedDate}`, 14, 32);

    const headers = ["Room", ...HOURS.map((h) => `${h.toString().padStart(2, "0")}:00`)];
    const columnWidths = [40, ...Array(HOURS.length).fill(15)];
    let rowHeight = 40;

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    headers.forEach((header, index) => {
      const xPosition = 14 + headers.slice(0, index).reduce((sum, _, i) => sum + columnWidths[i], 0);
      doc.text(header, xPosition, rowHeight);
    });

    doc.setLineWidth(0.5);
    doc.line(14, rowHeight + 2, 196, rowHeight + 2);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    filteredRooms.forEach((room) => {
      rowHeight += 8;
      const rowData = [
        `${room.name} (${room.type}, ${room.capacity} seats)`,
        ...HOURS.map((h) => getStatus(room._id, h)),
      ];

      rowData.forEach((cell, cellIndex) => {
        const xPosition = 14 + headers.slice(0, cellIndex).reduce((sum, _, i) => sum + columnWidths[i], 0);
        doc.text(cell, xPosition, rowHeight);
      });

      doc.setLineWidth(0.2);
      doc.line(14, rowHeight + 2, 196, rowHeight + 2);
    });

    doc.save(`Class_Schedule_${formattedDate}.pdf`);
  };

  return (
    <>
      <AdminMainHeader />
      <div
        className={`min-h-screen transition-all duration-500 font-sans ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
        }`}
      >
        <div className="max-w-7xl mx-auto p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <h2 className="text-4xl font-extrabold flex items-center gap-3">
              <span className="text-teal-500">📊</span>
              <span className={`${darkMode ? "text-white" : "text-gray-800"}`}>
                Class Schedule & Room Availability
              </span>
            </h2>
            <div className="flex items-center gap-3">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all duration-300 ${
                  darkMode
                    ? "bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:from-indigo-700 hover:to-indigo-600"
                    : "bg-gradient-to-r from-indigo-500 to-indigo-400 text-white hover:from-indigo-600 hover:to-indigo-500"
                }`}
                onClick={handleDownloadReport}
              >
                <FaDownload /> Download Report
              </button>
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-md transition-all duration-300 ${
                  darkMode
                    ? "bg-gradient-to-r from-gray-700 to-gray-600 text-gray-100 hover:from-gray-800 hover:to-gray-700"
                    : "bg-gradient-to-r from-gray-200 to-gray-100 text-gray-800 hover:from-gray-300 hover:to-gray-200"
                }`}
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <FaSun /> : <FaMoon />}
                {darkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                className={`w-full px-4 py-3 rounded-lg shadow-sm border ${
                  darkMode
                    ? "bg-gray-800 text-gray-100 border-gray-600 focus:ring-teal-500"
                    : "bg-white text-gray-800 border-gray-300 focus:ring-teal-400"
                } focus:outline-none focus:ring-2 transition-all duration-300`}
                dateFormat="yyyy-MM-dd"
              />
              <FaCalendarAlt
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </div>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search rooms..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className={`w-full px-4 py-3 rounded-lg shadow-sm border ${
                  darkMode
                    ? "bg-gray-800 text-gray-100 border-gray-600 focus:ring-teal-500"
                    : "bg-white text-gray-800 border-gray-300 focus:ring-teal-400"
                } focus:outline-none focus:ring-2 transition-all duration-300`}
              />
              <FaSearch
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                  darkMode ? "text-gray-400" : "text-gray-500"
                }`}
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl shadow-lg">
            <table
              className={`min-w-full text-sm text-center border ${
                darkMode
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <thead
                className={`sticky top-0 ${
                  darkMode
                    ? "bg-gray-700 text-gray-100"
                    : "bg-teal-50 text-teal-800"
                } uppercase tracking-wider`}
              >
                <tr>
                  <th className="p-4 border-b">Room</th>
                  {HOURS.map((h) => (
                    <th key={h} className="p-4 border-b">
                      {`${h.toString().padStart(2, "0")}:00`}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredRooms.map((room, index) => (
                  <tr
                    key={room._id}
                    className={`transition-all duration-300 ${
                      index % 2 === 0
                        ? darkMode
                          ? "bg-gray-800"
                          : "bg-white"
                        : darkMode
                        ? "bg-gray-750"
                        : "bg-gray-50"
                    } hover:bg-opacity-80 hover:shadow-md ${
                      darkMode ? "hover:bg-gray-700" : "hover:bg-teal-50"
                    }`}
                  >
                    <td className="border-b p-4 font-semibold">
                      <div className="text-lg">{room.name}</div>
                      <div
                        className={`text-xs ${
                          darkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                      >
                        {room.type} • {room.capacity} seats
                      </div>
                    </td>
                    {HOURS.map((h, idx) => {
                      const status = getStatus(room._id, h);
                      return (
                        <td
                          key={idx}
                          className={`border-b p-3 ${getColorClass(
                            status
                          )} rounded-lg transition-all duration-200 text-xs font-medium`}
                          title={`${room.name} | ${h}:00 - ${h + 1}:00 | ${status}`}
                        >
                          {getStatusIcon(status)} {status}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Legend */}
          <div
            className={`mt-10 p-4 rounded-lg shadow-md ${
              darkMode
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-200"
            } border flex flex-wrap gap-6 text-sm`}
          >
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500 text-lg" />
              <span className="font-medium">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-yellow-500 text-lg" />
              <span className="font-medium">Pending / Reserved</span>
            </div>
            <div className="flex items-center gap-2">
              <FaTimesCircle className="text-red-500 text-lg" />
              <span className="font-medium">Occupied</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}