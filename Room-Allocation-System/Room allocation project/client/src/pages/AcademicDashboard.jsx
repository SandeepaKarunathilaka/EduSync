import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../redux/roomSlice";
import { fetchBookings } from "../redux/bookingSlice";
import { FaDoorOpen, FaClock, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, XAxis, YAxis, CartesianGrid, Bar } from "recharts";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.room);
  const { bookings } = useSelector((state) => state.booking);

  const [today] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    dispatch(fetchRooms());
    dispatch(fetchBookings());
  }, [dispatch]);

  const totalRooms = rooms.length;
  const bookedRooms = rooms.filter((r) => r.status === "Occupied").length;
  const availableRooms = rooms.filter((r) => r.status === "Available").length;
  const pendingApprovals = bookings.filter((b) => b.status === "Pending").length;
  const todayBookings = bookings.filter((b) => b.requestedTime.startsWith(today));

  const roomUsageData = [
    { name: "Booked Rooms", value: bookedRooms, color: "#FF6384" },
    { name: "Available Rooms", value: availableRooms, color: "#36A2EB" },
  ];

  const resourceCount = {};
  rooms.forEach((room) => {
    room.resources?.forEach((res) => {
      resourceCount[res] = (resourceCount[res] || 0) + 1;
    });
  });

  const topResources = Object.entries(resourceCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, usage]) => ({ name, usage }));

  return (
    <div className="p-4">
      <h2 className="font-bold text-2xl mb-4">📊 Admin Dashboard</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <StatCard title="Total Rooms" value={totalRooms} icon={<FaDoorOpen />} bg="bg-blue-600" />
        <StatCard title="Occupied Rooms" value={bookedRooms} icon={<FaClock />} bg="bg-red-600" />
        <StatCard title="Available Rooms" value={availableRooms} icon={<FaCheckCircle />} bg="bg-green-600" />
        <StatCard title="Pending Bookings" value={pendingApprovals} icon={<FaCalendarAlt />} bg="bg-yellow-600" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-white shadow-lg rounded-lg p-3">
          <h5 className="font-semibold text-lg mb-3">Room Usage</h5>
          <PieChart width={300} height={250}>
            <Pie data={roomUsageData} cx={150} cy={120} innerRadius={50} outerRadius={80} dataKey="value">
              {roomUsageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-3">
          <h5 className="font-semibold text-lg mb-3">Top Used Resources</h5>
          <BarChart width={300} height={250} data={topResources}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="usage" fill="#8884d8" />
          </BarChart>
        </div>
      </div>

      {/* Today's Bookings */}
      <div className="mb-4">
        <h5 className="font-semibold text-lg">📆 Today's Bookings</h5>
        {todayBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Room</th>
                  <th className="border px-4 py-2 text-left">User</th>
                  <th className="border px-4 py-2 text-left">Time</th>
                </tr>
              </thead>
              <tbody>
                {todayBookings.map((b, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{b.roomId?.name}</td>
                    <td className="border px-4 py-2">{b.user?.name || "N/A"}</td>
                    <td className="border px-4 py-2">{new Date(b.requestedTime).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No bookings today.</p>
        )}
      </div>

      {/* Live Requests */}
      <div className="mb-4">
        <h5 className="font-semibold text-lg">🔥 Live Booking Requests</h5>
        {pendingApprovals > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2 text-left">Room</th>
                  <th className="border px-4 py-2 text-left">User</th>
                  <th className="border px-4 py-2 text-left">Time</th>
                  <th className="border px-4 py-2 text-left">Status</th>
                  <th className="border px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.filter(b => b.status === "Pending").map((b, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border px-4 py-2">{b.roomId?.name}</td>
                    <td className="border px-4 py-2">{b.user?.name || "N/A"}</td>
                    <td className="border px-4 py-2">{new Date(b.requestedTime).toLocaleString()}</td>
                    <td>
                      <span className="inline-block bg-yellow-600 text-white text-xs px-2 py-1 rounded">Pending</span>
                    </td>
                    <td className="border px-4 py-2">
                      <button className="bg-green-600 text-white px-2 py-1 rounded text-sm mr-2 hover:bg-green-700">Approve</button>
                      <button className="bg-red-600 text-white px-2 py-1 rounded text-sm hover:bg-red-700">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No pending requests.</p>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, bg }) {
  return (
    <div className={`${bg} text-white p-3 rounded-lg shadow-md flex items-center justify-between`}>
      <div className="text-4xl">{icon}</div>
      <div className="text-right">
        <h6 className="text-base">{title}</h6>
        <h4 className="font-bold text-xl">{value}</h4>
      </div>
    </div>
  );
}