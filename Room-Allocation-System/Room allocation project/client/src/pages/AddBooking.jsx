import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createBooking, fetchBookings } from "../redux/bookingSlice";
import { fetchRooms } from "../redux/roomSlice";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import AdminHeader from "../components/Header";

export default function AddBooking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { bookings, loading, error: bookingError } = useSelector((state) => state.booking);
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
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuggestions([]);

    if (new Date(formData.endTime) <= new Date(formData.requestedTime)) {
      setError("End time must be after the requested start time.");
      return;
    }

    try {
      await dispatch(createBooking(formData)).unwrap();
      dispatch(fetchBookings());
      navigate("/booking");
    } catch (err) {
      if (err?.suggestions?.length) {
        setSuggestions(err.suggestions);
        setError("Room already booked during that time. Please pick another slot or choose a similar room.");
      } else {
        setError(err || "Booking failed. Please try again.");
      }
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="mt-4 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="mb-4 text-center text-blue-600 text-2xl font-bold">📅 Add a Booking Request</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
          )}
          {bookingError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{bookingError}</div>
          )}

          <form onSubmit={handleSubmit} className="p-4 border rounded bg-gray-50 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block font-bold mb-1">Select Room</label>
                <select
                  id="roomId"
                  value={formData.roomId}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Choose a Room --</option>
                  {rooms.map((room) => (
                    <option key={room._id} value={room._id}>
                      {room.name} - {room.type}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-bold mb-1">Requested Time</label>
                <input
                  type="datetime-local"
                  id="requestedTime"
                  value={formData.requestedTime}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block font-bold mb-1">End Time</label>
                <input
                  type="datetime-local"
                  id="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-bold mb-1">Status</label>
                <input
                  type="text"
                  value="Pending"
                  disabled
                  readOnly
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100"
                />
              </div>
            </div>

            <div className="mb-3">
              <label className="block font-bold mb-1">Reason</label>
              <textarea
                id="reason"
                rows={3}
                value={formData.reason}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Submit Booking Request
            </button>
          </form>

          {/* ✅ Suggestion for similar rooms */}
          {suggestions.length > 0 && (
            <div className="mt-4">
              <h5 className="text-gray-600 text-lg">💡 Suggested Available Rooms:</h5>
              <ul className="border border-gray-300 rounded divide-y divide-gray-300">
                {suggestions.map((room) => (
                  <li key={room._id} className="p-3">
                    <strong>{room.name}</strong> — {room.type} — Capacity: {room.capacity}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* ✅ Booking Table */}
          <h4 className="mt-5 mb-3 text-gray-600 text-center text-xl">📌 Your Bookings</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="border px-4 py-2 text-center">Room</th>
                  <th className="border px-4 py-2 text-center">Requested</th>
                  <th className="border px-4 py-2 text-center">End</th>
                  <th className="border px-4 py-2 text-center">Reason</th>
                  <th className="border px-4 py-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.length > 0 ? (
                  bookings.map((b) => (
                    <tr key={b._id} className="hover:bg-gray-50">
                      <td className="border px-4 py-2 text-center">{b.roomId?.name || "N/A"}</td>
                      <td className="border px-4 py-2 text-center">{new Date(b.requestedTime).toLocaleString()}</td>
                      <td className="border px-4 py-2 text-center">{new Date(b.endTime).toLocaleString()}</td>
                      <td className="border px-4 py-2 text-center">{b.reason}</td>
                      <td className="border px-4 py-2 text-center">
                        {b.status === "Approved" ? (
                          <span className="text-green-600 font-bold flex items-center justify-center">
                            <FaCheckCircle className="mr-1" /> Approved
                          </span>
                        ) : b.status === "Rejected" ? (
                          <span className="text-red-600 font-bold flex items-center justify-center">
                            <FaTimesCircle className="mr-1" /> Rejected
                          </span>
                        ) : (
                          <span className="text-yellow-600 font-bold">⏳ Pending</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="border px-4 py-2 text-center text-gray-500">
                      No bookings found.
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