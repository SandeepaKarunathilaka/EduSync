import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createRoom } from "../redux/roomSlice"; // ✅ Correct import

export default function AddRoom() {
  const [formData, setFormData] = useState({
    name: "",
    type: "Lecture Hall",
    capacity: "50",
    resources: [],
    status: "Available",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleResourceChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, resources: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newRoom = { ...formData, resources: formData.resources };
      console.log(newRoom);

      await dispatch(createRoom(newRoom)).unwrap();
      navigate("/rooms");
    } catch (err) {
      setError("Failed to create room. Please try again.");
      console.error("Error creating room:", err);
    }
  };

  return (
    <div className="container mx-auto px-4 mt-8">
      <h2 className="text-center font-bold text-2xl mb-6">Add Room Allocation</h2>
      {error && <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="bg-white shadow-md p-8 rounded-lg">
        <div className="mb-4">
          <label className="block font-semibold mb-2">Room Name</label>
          <input
            type="text"
            id="name"
            required
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Type</label>
          <select
            id="type"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Lecture Hall">Lecture Hall</option>
            <option value="Lab">Lab</option>
            <option value="Auditorium">Auditorium</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Capacity</label>
          <select
            id="capacity"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="50">Less than 50</option>
            <option value="100">Less than 100</option>
            <option value="500">Less than 500</option>
            <option value=">500">More than 500</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Resources (Select Multiple)</label>
          <select
            id="resources"
            multiple
            onChange={handleResourceChange}
            className="w-full h-48 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Projector">Projector</option>
            <option value="A/C">A/C</option>
            <option value="Microphone">Microphone</option>
            <option value="Whiteboard">Whiteboard</option>
            <option value="Smart Board">Smart Board</option>
            <option value="Computers">Computers</option>
            <option value="WiFi">WiFi</option>
            <option value="Lab Equipment">Lab Equipment</option>
            <option value="Library Access">Library Access</option>
            <option value="Video Conferencing">Video Conferencing</option>
            <option value="Recording System">Recording System</option>
          </select>
          <small className="text-gray-500 block mt-2">Hold CTRL (Windows) or CMD (Mac) to select multiple options.</small>
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-2">Status</label>
          <select
            id="status"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
