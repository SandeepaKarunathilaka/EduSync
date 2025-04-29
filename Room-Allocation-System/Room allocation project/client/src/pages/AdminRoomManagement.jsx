import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms, createRoom, deleteRoom } from "../redux/roomSlice";
import { Button, Table } from "flowbite-react";

export default function AdminRoomManagement() {
  const dispatch = useDispatch();
  const { rooms, loading, error } = useSelector((state) => state.room);
  const [newRoom, setNewRoom] = useState({
    name: "",
    type: "Lecture Hall",
    capacity: 0,
    resources: [],
    status: "Available",
  });

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  const handleCreateRoom = () => {
    if (!newRoom.name || newRoom.capacity <= 0 || newRoom.resources.length === 0) {
      alert("Please fill in all required fields.");
      return;
    }
    dispatch(createRoom(newRoom))
      .then(() => {
        setNewRoom({
          name: "",
          type: "Lecture Hall",
          capacity: 0,
          resources: [],
          status: "Available",
        });
      })
      .catch((err) => {
        console.error("Error creating room:", err);
        alert("Failed to create room. Please try again.");
      });
  };

  const handleDeleteRoom = (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      dispatch(deleteRoom(roomId))
        .catch((err) => {
          console.error("Error deleting room:", err);
          alert("Failed to delete room. Please try again.");
        });
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-8">Room Management</h2>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Room Name"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-1/3"
          value={newRoom.name}
          onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Capacity"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full md:w-1/3"
          value={newRoom.capacity}
          onChange={(e) => setNewRoom({ ...newRoom, capacity: Number(e.target.value) })}
        />
        <button
          onClick={handleCreateRoom}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
        >
          Add Room
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading rooms...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <Table hoverable className="min-w-full">
            <Table.Head>
              <Table.HeadCell className="bg-gray-200">Name</Table.HeadCell>
              <Table.HeadCell className="bg-gray-200">Type</Table.HeadCell>
              <Table.HeadCell className="bg-gray-200">Capacity</Table.HeadCell>
              <Table.HeadCell className="bg-gray-200">Action</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {rooms.map((room) => (
                <Table.Row key={room._id} className="bg-white hover:bg-gray-100">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900">{room.name}</Table.Cell>
                  <Table.Cell>{room.type}</Table.Cell>
                  <Table.Cell>{room.capacity}</Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => handleDeleteRoom(room._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}
    </div>
  );
}
