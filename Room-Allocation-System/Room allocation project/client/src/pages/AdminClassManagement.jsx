import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

export default function AdminClassManagement() {
  const [rooms, setRooms] = useState([]);
  const [newClass, setNewClass] = useState({ room: "", time: "", status: "Pending" });

  useEffect(() => {
    socket.on("classScheduleUpdate", (data) => {
      setRooms(data);
    });

    return () => {
      socket.off("classScheduleUpdate");
    };
  }, []);

  const handleInputChange = (e) => {
    setNewClass({ ...newClass, [e.target.name]: e.target.value });
  };

  const addClass = () => {
    if (newClass.room && newClass.time) {
      socket.emit("addClass", newClass);
      setNewClass({ room: "", time: "", status: "Pending" });
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Manage Class Schedule</h2>

      {/* Form Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-8 bg-white shadow p-6 rounded-lg">
        <input
          type="text"
          name="room"
          value={newClass.room}
          onChange={handleInputChange}
          placeholder="Room Name"
          className="w-full md:w-1/3 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="time"
          name="time"
          value={newClass.time}
          onChange={handleInputChange}
          className="w-full md:w-1/3 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          name="status"
          value={newClass.status}
          onChange={handleInputChange}
          className="w-full md:w-1/4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Reserved">Reserved</option>
        </select>
        <button
          onClick={addClass}
          className="bg-blue-600 text-white px-5 py-3 rounded hover:bg-blue-700 transition-all"
        >
          Add Class
        </button>
      </div>

      {/* Class List */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-2xl font-semibold mb-4">Scheduled Classes</h3>
        {rooms.length > 0 ? (
          <ul className="space-y-4">
            {rooms.map((room, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-4 border rounded bg-gray-50 hover:bg-gray-100"
              >
                <span className="font-medium">{room.name}</span>
                <span className="text-gray-600">{room.time}</span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    room.status === "Approved"
                      ? "bg-green-100 text-green-700"
                      : room.status === "Reserved"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {room.status}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">No classes scheduled yet.</p>
        )}
      </div>
    </div>
  );
}
