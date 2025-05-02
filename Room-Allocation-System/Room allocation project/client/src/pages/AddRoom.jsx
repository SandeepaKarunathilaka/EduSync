import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createRoom } from "../redux/roomSlice";
import AdminMainHeader from "../components/Header";

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
    <div>
      <AdminMainHeader />

    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-8 tracking-tight">
          Add Room Allocation
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm text-red-700 text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 space-y-6"
        >
          {/* Room Name */}
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700"
            >
              Room Name
            </label>
            <input
              type="text"
              id="name"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-900 placeholder-gray-400"
              placeholder="Enter room name"
            />
          </div>

          {/* Type */}
          <div className="space-y-2">
            <label
              htmlFor="type"
              className="block text-sm font-semibold text-gray-700"
            >
              Type
            </label>
            <select
              id="type"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-900"
            >
              <option value="Lecture Hall">Lecture Hall</option>
              <option value="Lab">Lab</option>
              <option value="Auditorium">Auditorium</option>
            </select>
          </div>

          {/* Capacity */}
          <div className="space-y-2">
            <label
              htmlFor="capacity"
              className="block text-sm font-semibold text-gray-700"
            >
              Capacity
            </label>
            <select
              id="capacity"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-900"
            >
              <option value="50">Less than 50</option>
              <option value="100">Less than 100</option>
              <option value="500">Less than 500</option>
              <option value=">500">More than 500</option>
            </select>
          </div>

          {/* Resources */}
          <div className="space-y-2">
            <label
              htmlFor="resources"
              className="block text-sm font-semibold text-gray-700"
            >
              Resources (Select Multiple)
            </label>
            <select
              id="resources"
              multiple
              onChange={handleResourceChange}
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-900"
            >
              <option value="Projector">Projector</option>
              <option value="A/C">A/C</option>
              <option value="Microphone">Mic</option>
              <option value="Whiteboard">Whiteboard</option>
              <option value="Smart Board">Smart Board</option>
              <option value="Computers">Computers</option>
              <option value="WiFi">WiFi</option>
              <option value="Lab Equipment">Lab Equipment</option>
              <option value="Library Access">Library Access</option>
              <option value="Video Conferencing">Video Conferencing</option>
              <option value="Recording System">Recording System</option>
            </select>
            <small className="block text-gray-500 text-xs mt-1">
              Hold CTRL (Windows) or CMD (Mac) to select multiple options.
            </small>
          </div>

          {/* Status */}
          {/* <div className="space-y-2">
            <label
              htmlFor="status"
              className="block text-sm font-semibold text-gray-700"
            >
              Status
            </label>
            <select
              id="status"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-gray-50 text-gray-900"
            >
              <option value="Available">Available</option>
              <option value="Occupied">Under Maintain</option>
            </select>
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}