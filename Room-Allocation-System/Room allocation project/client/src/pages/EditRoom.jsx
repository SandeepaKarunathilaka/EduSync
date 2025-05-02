import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateRoom } from "../redux/roomSlice";
import AdminHeader from "../components/Header";

const resourceOptions = [
  "Projector", "Whiteboard", "Microphone", "Sound System", "WiFi",
  "Air Conditioning", "Smart Board", "Computers", "Lab Equipment"
];

export default function EditRoom() {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { rooms } = useSelector((state) => state.room);

  const roomToEdit = rooms.find((room) => room._id === roomId);

  const [formData, setFormData] = useState({
    name: "",
    type: "Lecture Hall",
    capacity: "",
    resources: [],
    status: "Available",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (roomToEdit) {
      setFormData({
        name: roomToEdit.name,
        type: roomToEdit.type,
        capacity: roomToEdit.capacity,
        resources: roomToEdit.resources || [],
        status: roomToEdit.status,
      });
    }
  }, [roomToEdit]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleResourceChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setFormData((prev) => ({ ...prev, resources: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const updatedRoomData = {
        id: roomId,
        ...formData,
        capacity: Number(formData.capacity),
      };

      await dispatch(updateRoom(updatedRoomData)).unwrap();
      setSuccess("Room updated successfully ✅");

      setTimeout(() => {
        navigate("/rooms");
      }, 1500);
    } catch (err) {
      console.error("Error updating room:", err);
      setError("Failed to update room. Please ensure you're logged in and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="container mx-auto mt-10 px-4">
        <div className="max-w-2xl mx-auto shadow-md p-8 bg-white rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6">✏️ Edit Room Allocation</h2>

          {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
          {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Room Name */}
            <div>
              <label className="block font-semibold mb-1">Room Name</label>
              <input
                type="text"
                id="name"
                className="w-full p-2 border rounded"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Type */}
            <div>
              <label className="block font-semibold mb-1">Type</label>
              <select
                id="type"
                className="w-full p-2 border rounded"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="Lecture Hall">Lecture Hall</option>
                <option value="Lab">Lab</option>
                <option value="Auditorium">Auditorium</option>
              </select>
            </div>

            {/* Capacity */}
            <div>
              <label className="block font-semibold mb-1">Capacity</label>
              <select
                id="capacity"
                className="w-full p-2 border rounded"
                value={formData.capacity}
                onChange={handleChange}
              >
                <option value="50">Less than 50</option>
                <option value="100">Less than 100</option>
                <option value="500">Less than 500</option>
                <option value="1000">More than 500</option>
              </select>
            </div>

            {/* Resources */}
            <div>
              <label className="block font-semibold mb-1">Resources (Select Multiple)</label>
              <select
                id="resources"
                className="w-full p-2 border rounded"
                multiple
                value={formData.resources}
                onChange={handleResourceChange}
              >
                {resourceOptions.map((res) => (
                  <option key={res} value={res}>{res}</option>
                ))}
              </select>
              <small className="text-gray-500">Hold Ctrl/Cmd to select multiple resources.</small>
            </div>

            {/* Status */}
            {/* <div>
              <label className="block font-semibold mb-1">Status</label>
              <select
                id="status"
                className="w-full p-2 border rounded"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Available">Available</option>
                <option value="Occupied">Occupied</option>
              </select>
            </div> */}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
