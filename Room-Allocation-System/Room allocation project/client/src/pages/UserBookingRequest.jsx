import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../redux/roomSlice";
import { createBooking, fetchBookings } from "../redux/bookingSlice";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";


export default function UserBookingRequest() {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state.room);
  const { bookings } = useSelector((state) => state.booking);

  const [formData, setFormData] = useState({
    roomId: "",
    requestedTime: "",
    endTime: "",
    reason: "",
  });

  useEffect(() => {
    dispatch(fetchRooms());
    dispatch(fetchBookings());

    const socket = io("http://localhost:3000");
    socket.on("bookingStatusUpdate", (data) => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser?._id === data.userId) {
        toast.info(`📢 Your booking for ${data.roomName} was ${data.status}`);
        dispatch(fetchBookings());
      }
    });

    return () => socket.disconnect();
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createBooking(formData)).unwrap();
      toast.success("✅ Booking request submitted!");
      setFormData({ roomId: "", requestedTime: "", endTime: "", reason: "" });
      dispatch(fetchBookings());
    } catch (err) {
      toast.error("❌ Booking failed. Try again.");
    }
  };

  return (
    <div className="container mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">
        📅 Submit a Booking Request
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded-lg shadow-md mb-10"
      >
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-semibold mb-2">Select Room</label>
            <select
              name="roomId"
              value={formData.roomId}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
            >
              <option value="">-- Select a Room --</option>
              {rooms.map((room) => (
                <option key={room._id} value={room._id}>
                  {room.name} - {room.type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">Reason</label>
            <input
              type="text"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Meeting, Class, Event..."
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-semibold mb-2">Requested Start</label>
            <input
              type="datetime-local"
              name="requestedTime"
              value={formData.requestedTime}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">End Time</label>
            <input
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold"
        >
          Submit Booking Request
        </button>
      </form>

      <h4 className="text-2xl text-gray-700 font-semibold mb-4 text-center">
        📌 My Booking History
      </h4>

      <div className="overflow-x-auto">
        <table className="w-full table-auto shadow-md text-center bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3">Room</th>
              <th className="p-3">Requested</th>
              <th className="p-3">End</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((b) => (
                <tr key={b._id} className="border-b">
                  <td className="p-3">{b.roomId?.name || "N/A"}</td>
                  <td className="p-3">{new Date(b.requestedTime).toLocaleString()}</td>
                  <td className="p-3">{new Date(b.endTime).toLocaleString()}</td>
                  <td className="p-3">{b.reason}</td>
                  <td className="p-3">
                    {b.status === "Approved" ? (
                      <span className="text-green-600 font-bold flex justify-center items-center gap-1">
                        <FaCheckCircle /> Approved
                      </span>
                    ) : b.status === "Rejected" ? (
                      <span className="text-red-600 font-bold flex justify-center items-center gap-1">
                        <FaTimesCircle /> Rejected
                      </span>
                    ) : (
                      <span className="text-yellow-500 font-bold flex justify-center items-center gap-1">
                        <FaClock /> Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-gray-400 py-5">
                  No bookings submitted.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
