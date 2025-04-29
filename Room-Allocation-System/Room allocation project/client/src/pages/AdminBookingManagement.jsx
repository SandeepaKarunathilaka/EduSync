import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings, updateBookingStatus } from "../redux/bookingSlice";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import AdminHeader from "../components/Header";

export default function AdminBookingManagement() {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(fetchBookings());

    const socket = io("http://localhost:3000");
    socket.on("newBookingRequest", (data) => {
      toast.info(`📅 New booking request for ${data.booking.roomId?.name}`);
      dispatch(fetchBookings());
    });

    return () => socket.disconnect();
  }, [dispatch]);

  const handleBookingStatusChange = (bookingId, status) => {
    dispatch(updateBookingStatus({ bookingId, status }))
      .unwrap()
      .then(() => {
        toast.success(`Booking ${status}`);
        dispatch(fetchBookings());
      })
      .catch(() => {
        toast.error("Failed to update booking status");
      });
  };

  return (
    <>
      <AdminHeader />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">\ud83d\udccb Booking Requests</h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
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
                    <td className="py-3 px-5">{booking.roomId?.name}</td>
                    <td className="py-3 px-5">{new Date(booking.requestedTime).toLocaleString()}</td>
                    <td className="py-3 px-5">{new Date(booking.endTime).toLocaleString()}</td>
                    <td className="py-3 px-5">{booking.reason}</td>
                    <td className="py-3 px-5">
                      <span
                        className={
                          booking.status === "Approved"
                            ? "text-green-600 font-semibold"
                            : booking.status === "Rejected"
                            ? "text-red-600 font-semibold"
                            : "text-yellow-600 font-semibold"
                        }
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-5 flex gap-2">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        onClick={() => handleBookingStatusChange(booking._id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        onClick={() => handleBookingStatusChange(booking._id, "Rejected")}
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
