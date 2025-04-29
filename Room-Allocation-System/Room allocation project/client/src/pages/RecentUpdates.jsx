import { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Replace with backend URL

export default function RecentUpdates() {
  const [recentUpdates, setRecentUpdates] = useState({
    recentUsers: [],
    recentRooms: [],
  });

  useEffect(() => {
    socket.on("recentUpdates", (data) => {
      setRecentUpdates(data);
    });

    return () => {
      socket.off("recentUpdates");
    };
  }, []);

  return (
    <div className="p-5">
      <h3 className="text-xl font-bold mb-4">Recent Activity</h3>

      {/* Recent Users */}
      <div className="mt-5 p-4 bg-gray-100 rounded-md">
        <h4 className="text-lg font-semibold mb-2">Recent Users</h4>
        <ul className="divide-y divide-gray-300">
          {recentUpdates.recentUsers.map((user, index) => (
            <li key={index} className="py-2">
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Rooms */}
      <div className="mt-5 p-4 bg-gray-100 rounded-md">
        <h4 className="text-lg font-semibold mb-2">Recent Rooms</h4>
        <ul className="divide-y divide-gray-300">
          {recentUpdates.recentRooms.map((room, index) => (
            <li key={index} className="py-2">
              {room.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
