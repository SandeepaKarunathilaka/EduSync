import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookings, updateBookingStatus } from "../redux/bookingSlice";
import { fetchRooms } from "../redux/roomSlice";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import AdminHeader from "../components/Header";
import socket from "../socket";
import { FaDownload } from "react-icons/fa"; // Added for the Download Report button
import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation

export default function AdminBookingManagement() {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.booking);

  useEffect(() => {
    dispatch(fetchBookings());
    dispatch(fetchRooms());

    const socket = io("http://localhost:3000");
    socket.on("newBookingRequest", (data) => {
      toast.info(`📅 New booking request for ${data.booking.roomId?.name}`);
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

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    
    // Set the title
    doc.setFontSize(18);
    doc.text("Booking Requests Report", 14, 22);

    // Set the generation date
    doc.setFontSize(12);
    const today = new Date().toLocaleDateString();
    doc.text(`Generated on: ${today}`, 14, 32);

    // Define table headers
    const headers = ["Room", "Requested Time", "End Time", "Reason", "Status", "Action"];
    const columnWidths = [30, 40, 40, 40, 20, 20]; // Widths for each column
    let rowHeight = 40; // Starting Y position after the title and date

    // Add table headers
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    headers.forEach((header, index) => {
      const xPosition = 14 + headers.slice(0, index).reduce((sum, _, i) => sum + columnWidths[i], 0);
      doc.text(header, xPosition, rowHeight);
    });

    // Add a line under the headers
    doc.setLineWidth(0.5);
    doc.line(14, rowHeight + 2, 196, rowHeight + 2);

    // Add table rows
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    bookings.forEach((booking) => {
      rowHeight += 8; // Increment Y position for each row
      const rowData = [
        booking.roomId?.name || "N/A",
        new Date(booking.requestedTime).toLocaleString(),
        new Date(booking.endTime).toLocaleString(),
        booking.reason,
        booking.status,
        "", // Placeholder for Action column (not practical to include buttons in PDF)
      ];

      rowData.forEach((cell, cellIndex) => {
        const xPosition = 14 + headers.slice(0, cellIndex).reduce((sum, _, i) => sum + columnWidths[i], 0);
        doc.text(cell, xPosition, rowHeight);
      });

      // Add a line under each row
      doc.setLineWidth(0.2);
      doc.line(14, rowHeight + 2, 196, rowHeight + 2);
    });

    // Save the PDF
    doc.save(`Booking_Requests_${today}.pdf`);
  };

  return (
    <>
      <AdminHeader />
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-center">📋 Booking Requests</h2>
          <button
            onClick={handleDownloadReport}
            className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-200 shadow-md flex items-center gap-2"
          >
            <FaDownload /> Download Report
          </button>
        </div>

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