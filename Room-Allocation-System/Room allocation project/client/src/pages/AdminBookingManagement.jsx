// Filename: src/pages/AdminBookingManagement.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings, updateBookingStatus } from "../redux/bookingSlice";
import { fetchRooms } from "../redux/roomSlice";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import AdminHeader from "../components/Header";
import socket from "../socket";

export default function AdminBookingManagement() {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(fetchBookings());
    dispatch(fetchRooms());

    // const socket = io("http://localhost:3000");

    // socket.on("newBookingRequest", (data) => {
    //   toast.info(`📅 New booking request for ${data.booking?.roomId?.name || "Unknown Room"}`);
    //   dispatch(fetchBookings());
    // });

    const socket = io("http://localhost:3000");
    socket.on("newBookingRequest", (data) => {
      toast.info('📅 New booking request for ${data.booking.roomId?.name}');
      dispatch(fetchBookings());
    });

    socket.on("bookingStatusChanged", ({ bookingId, status }) => {
      dispatch(fetchBookings());
    });

    return () => socket.disconnect();
  }, [dispatch]);

  const handleBookingStatusChange = async (bookingId, status) => {
    try {
      await dispatch(updateBookingStatus({ bookingId, status })).unwrap();
      toast.success(`Booking ${status}`);
      dispatch(fetchBookings());
    } catch (err) {
      toast.error("❌ Failed to update booking status.");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">📋 Booking Requests</h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : bookings.length === 0 ? (
          <p className="text-center">No bookings found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-5 text-left font-semibold">Room</th>
                  <th className="py-3 px-5 text-left font-semibold">Requested Time</th>
                  <th className="py-3 px-5 text-left font-semibold">End Time</th>
                  <th className="py-3 px-5 text-left font-semibold">Reason</th>
                  <th className="py-3 px-5 text-left font-semibold">Status</th>
                  <th className="py-3 px-5 text-left font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-5">{booking.roomId?.name || "N/A"}</td>
                    <td className="py-3 px-5">
                      {new Date(booking.requestedTime).toLocaleString()}
                    </td>
                    <td className="py-3 px-5">
                      {new Date(booking.endTime).toLocaleString()}
                    </td>
                    <td className="py-3 px-5">{booking.reason}</td>
                    <td className="py-3 px-5">
                      <span
                        className={`font-semibold ${
                          booking.status === "Approved"
                            ? "text-green-600"
                            : booking.status === "Rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-5 flex gap-2">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
                        onClick={() => handleBookingStatusChange(booking._id, "Approved")}
                        disabled={booking.status === "Approved"}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
                        onClick={() => handleBookingStatusChange(booking._id, "Rejected")}
                        disabled={booking.status === "Rejected"}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
