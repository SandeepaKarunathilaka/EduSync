import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Change this to your backend URL

export default function ClassSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    socket.on("classScheduleUpdate", (data) => {
      setSchedule(data);
    });

    return () => {
      socket.off("classScheduleUpdate");
    };
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(new Date(e.target.value));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Class Schedules</h2>

      {/* Date Picker */}
      <div className="mb-6">
        <input
          type="date"
          value={selectedDate.toISOString().split("T")[0]}
          onChange={handleDateChange}
          className="border border-gray-300 p-2 rounded-md"
        />
      </div>

      {/* Schedule Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full text-center border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Room</th>
              {[...Array(8)].map((_, index) => (
                <th key={index} className="p-2 border">
                  {8 + index} AM
                </th>
              ))}
              {[...Array(6)].map((_, index) => (
                <th key={index + 8} className="p-2 border">
                  {12 + index} PM
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedule.map((room, index) => (
              <tr key={index} className="bg-white even:bg-gray-100">
                <td className="border p-2 font-semibold">{room.name}</td>
                {room.timeslots.map((slot, idx) => (
                  <td
                    key={idx}
                    className={`border p-2 ${getColorClass(slot.status)}`}
                  >
                    {slot.status}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Function to assign Tailwind background classes based on status
const getColorClass = (status) => {
  switch (status) {
    case "Approved":
      return "bg-green-500 text-white";
    case "Pending":
      return "bg-yellow-400 text-white";
    case "Reserved":
      return "bg-blue-500 text-white";
    case "Not Reserved":
      return "bg-red-500 text-white";
    case "Maintenance":
      return "bg-gray-500 text-white";
    default:
      return "bg-white text-gray-800";
  }
};
