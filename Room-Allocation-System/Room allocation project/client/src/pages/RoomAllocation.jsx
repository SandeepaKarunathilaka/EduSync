import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchRooms, deleteRoom } from "../redux/roomSlice";
import { FaArrowLeft, FaUser, FaCaretDown, FaSignOutAlt, FaDownload } from "react-icons/fa"; // Added FaDownload for the button
import AdminMainHeader from "../components/Header";
import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation

export default function RoomAllocation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { rooms, loading, error } = useSelector((state) => state.room);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    dispatch(fetchRooms()).catch((err) => console.error("Error fetching rooms:", err));
  }, [dispatch]);

  const handleDelete = async (roomId, roomName) => {
    if (window.confirm(`Are you sure you want to delete "${roomName}"?`)) {
      try {
        await dispatch(deleteRoom(roomId)).unwrap();
        setFeedbackMessage(`✅ Room "${roomName}" deleted successfully.`);
      } catch (error) {
        console.error("Error deleting room:", error);
        setFeedbackMessage("❌ Failed to delete room. You must be logged in as an admin.");
      }
    }
  };

  const handleDownloadReport = () => {
    const doc = new jsPDF();
    
    // Set the title
    doc.setFontSize(18);
    doc.text("Room Allocation Report", 14, 22);

    // Set the date
    doc.setFontSize(12);
    const today = new Date().toLocaleDateString();
    doc.text(`Generated on: ${today}`, 14, 32);

    // Define table headers
    const headers = ["Room Name", "Type", "Capacity", "Resources", "Status"];
    const columnWidths = [40, 30, 20, 60, 30]; // Widths for each column
    let rowHeight = 40; // Starting Y position after the title

    // Add table headers
    doc.setFontSize(12);
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
    doc.setFontSize(10);
    rooms.forEach((room, index) => {
      rowHeight += 8; // Increment Y position for each row
      const rowData = [
        room.name,
        room.type,
        room.capacity.toString(),
        room.resources.join(", "),
        room.status,
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
    doc.save("Room_Allocation_Report.pdf");
  };

  return (
    <>
      <AdminMainHeader />
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Room Allocation</h1>

        {/* Buttons: Add Room and Download Report */}
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mb-6 gap-4">
          <Link to="/addroom">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded shadow">
              + Add New Allocations
            </button>
          </Link>
          <button
            onClick={handleDownloadReport}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded shadow flex items-center gap-2"
          >
            <FaDownload /> Download Report
          </button>
        </div>

        {/* Feedback Message */}
        {feedbackMessage && (
          <p className={`text-center font-semibold mb-4 ${feedbackMessage.includes("❌") ? "text-red-500" : "text-green-500"}`}>
            {feedbackMessage}
          </p>
        )}

        {/* Loading & Error Messages */}
        {loading && (
          <p className="text-blue-500 font-semibold text-center mb-4">
            Loading rooms...
          </p>
        )}
        {error && (
          <p className="text-red-500 font-semibold text-center mb-4">
            Error fetching rooms: {error}
          </p>
        )}

        {/* Room Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-center">Room Name</th>
                <th className="py-3 px-6 text-center">Type</th>
                <th className="py-3 px-6 text-center">Capacity</th>
                <th className="py-3 px-6 text-center">Resources</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room._id} className="border-b text-center">
                  <td className="py-4">{room.name}</td>
                  <td className="py-4">{room.type}</td>
                  <td className="py-4">{room.capacity}</td>
                  <td className="py-4">{room.resources.join(", ")}</td>
                  <td
                    className={`py-4 font-bold ${
                      room.status === "Available" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {room.status}
                  </td>
                  <td className="py-4 flex justify-center gap-3">
                    <Link to={`/updateroom/${room._id}`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow">
                        Edit
                      </button>
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
                      onClick={() => handleDelete(room._id, room.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}