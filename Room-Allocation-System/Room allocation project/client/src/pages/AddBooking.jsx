import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBooking, fetchBookings, listenBookingUpdates } from "../redux/bookingSlice";
import { fetchRooms } from "../redux/roomSlice";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import socket from "../socket"; // ✅ Use the shared socket
import AdminHeader from "../components/Header";

export default function AddBooking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bookings } = useSelector((state) => state.booking);
  const { rooms } = useSelector((state) => state.room);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const [formData, setFormData] = useState({
    roomId: "",
    requestedTime: "",
    endTime: "",
    reason: "",
  });

  useEffect(() => {
    dispatch(fetchRooms());
    dispatch(fetchBookings());
    listenBookingUpdates(dispatch);

    return () => {
      socket.disconnect(); // ✅ Close socket cleanly on unmount
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuggestions([]);

    const start = new Date(formData.requestedTime);
    const end = new Date(formData.endTime);

    if (!formData.roomId || !formData.requestedTime || !formData.endTime || !formData.reason) {
      setError("⚠️ Please fill all fields.");
      return;
    }

    if (start >= end) {
      setError("⚠️ End time must be after start time.");
      return;
    }

    const conflict = bookings.find(
      (b) =>
        b.roomId?._id === formData.roomId &&
        b.status === "Approved" &&
        new Date(b.endTime) > start &&
        new Date(b.requestedTime) < end
    );

    if (conflict) {
      const selectedRoom = rooms.find((r) => r._id === formData.roomId);
      const similar = rooms.filter(
        (r) =>
          r._id !== selectedRoom._id &&
          r.type === selectedRoom.type &&
          r.capacity >= selectedRoom.capacity - 10 &&
          r.status === "Available"
      );

      setSuggestions(similar.slice(0, 3));
      setError("❌ This room is already booked at that time.");
      return;
    }

    try {
      await dispatch(createBooking(formData)).unwrap();
      navigate("/booking");
    } catch (err) {
      setError(" Successfully create booking.");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="mt-6 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
            📅 Submit a Booking Request
          </h2>

          {error && (
            <div className="bg-green-100 text-green-700 border border-green-400 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg shadow-lg space-y-5"
          >
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block font-semibold mb-1">Select Room</label>
                <select
                  id="roomId"
                  value={formData.roomId}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                >
                  <option value="">-- Select Room --</option>
                  {rooms.map((room) => (
                    <option key={room._id} value={room._id}>
                      {room.name} ({room.type})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Requested Time</label>
                <input
                  type="datetime-local"
                  id="requestedTime"
                  value={formData.requestedTime}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">End Time</label>
                <input
                  type="datetime-local"
                  id="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Reason</label>
                <input
                  id="reason"
                  type="text"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="e.g., Workshop or Lecture"
                  className="w-full border p-2 rounded"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Submit Booking
            </button>
          </form>

          {/* 💡 Suggestions */}
          {suggestions.length > 0 && (
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                💡 Available Alternatives
              </h4>
              <ul className="border border-gray-300 rounded divide-y">
                {suggestions.map((r) => (
                  <li key={r._id} className="p-3">
                    <strong>{r.name}</strong> — {r.type} — Capacity: {r.capacity}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ✅ Booking Table */}
          <h4 className="mt-10 text-xl font-bold text-center text-gray-700">
            📌 Your Booking History
          </h4>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full border text-center">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-3 py-2">Room</th>
                  <th className="px-3 py-2">Start</th>
                  <th className="px-3 py-2">End</th>
                  <th className="px-3 py-2">Reason</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((b) => (
                    <tr key={b._id} className="border-b hover:bg-gray-50">
                      <td className="px-3 py-2">{b.roomId?.name || "N/A"}</td>
                      <td className="px-3 py-2">{new Date(b.requestedTime).toLocaleString()}</td>
                      <td className="px-3 py-2">{new Date(b.endTime).toLocaleString()}</td>
                      <td className="px-3 py-2">{b.reason}</td>
                      <td className="px-3 py-2 font-semibold">
                        {b.status === "Approved" ? (
                          <span className="text-green-600 flex justify-center items-center gap-1">
                            <FaCheckCircle /> Approved
                          </span>
                        ) : b.status === "Rejected" ? (
                          <span className="text-red-600 flex justify-center items-center gap-1">
                            <FaTimesCircle /> Rejected
                          </span>
                        ) : (
                          <span className="text-yellow-600">⏳ Pending</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-4 text-gray-500">
                      No bookings yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
