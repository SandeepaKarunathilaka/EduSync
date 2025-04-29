import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminHeader from "../components/Header";
import { Link, useNavigate } from 'react-router-dom';
import { fetchRooms, deleteRoom } from "../redux/roomSlice";

export default function RoomAllocation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { rooms, loading, error } = useSelector((state) => state.room);

  useEffect(() => {
    dispatch(fetchRooms()).catch((err) => console.error("Error fetching rooms:", err));
  }, [dispatch]);

  const handleDelete = async (roomId, roomName) => {
    if (window.confirm(`Are you sure you want to delete "${roomName}"?`)) {
      try {
        await dispatch(deleteRoom(roomId)).unwrap();
        alert(`✅ Room "${roomName}" deleted successfully.`);
      } catch (error) {
        console.error("Error deleting room:", error);
        alert("❌ Failed to delete room. You must be logged in as an admin.");
      }
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Room Allocation</h1>

        {/* Add Room Button */}
        <div className="flex justify-center mb-6">
          <Link to="/addroom">
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded shadow">
              + Add New Allocations
            </button>
          </Link>
        </div>

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
