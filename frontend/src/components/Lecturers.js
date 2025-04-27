


import React, { useState, useEffect } from 'react';
import { PlusIcon, XIcon, EditIcon, TrashIcon, BookOpenIcon } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/lecturers';

const Lecturers = () => {
  const [lecturers, setLecturers] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLecturer, setEditingLecturer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    expertise: '',
    availability: 'Full-time',
  });

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await axios.get(API_URL);
        setLecturers(response.data);
      } catch (err) {
        console.error('Error fetching lecturers:', err);
      }
    };
    fetchLecturers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingLecturer) {
        const response = await axios.put(`${API_URL}/${editingLecturer._id}`, formData);
        setLecturers(lecturers.map(l => l._id === response.data._id ? response.data : l));
      } else {
        const response = await axios.post(API_URL, formData);
        setLecturers([...lecturers, response.data]);
      }
      setIsFormOpen(false);
      setFormData({ name: '', expertise: '', availability: 'Full-time' });
      setEditingLecturer(null);
    } catch (err) {
      console.error('Error saving lecturer:', err);
    }
  };

  const handleEdit = (lecturer) => {
    setEditingLecturer(lecturer);
    setFormData({
      name: lecturer.name,
      expertise: lecturer.expertise,
      availability: lecturer.availability,
    });
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setLecturers(lecturers.filter(l => l._id !== id));
    } catch (err) {
      console.error('Error deleting lecturer:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Lecturers</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Lecturer
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <BookOpenIcon className="h-4 w-4 mr-2" />
            All Courses
          </button>
        </div>
      </div>

      {/* Lecturers Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expertise</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {lecturers.map((lecturer) => (
              <tr key={lecturer._id} className="hover:bg-blue-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <span className="font-medium text-sm">{lecturer.name.charAt(0)}</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{lecturer.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lecturer.expertise}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    lecturer.availability === 'Full-time' ? 'bg-blue-100 text-blue-800' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {lecturer.availability}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => handleEdit(lecturer)} className="text-blue-600 hover:text-blue-900 mr-3">
                    <EditIcon className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(lecturer._id)} className="text-red-600 hover:text-red-900">
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingLecturer ? 'Edit Lecturer' : 'Add New Lecturer'}
              </h2>
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingLecturer(null);
                  setFormData({ name: '', expertise: '', availability: 'Full-time' });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Expertise</label>
                <input
                  type="text"
                  required
                  value={formData.expertise}
                  onChange={(e) => setFormData({ ...formData, expertise: e.target.value })}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                <select
                  value={formData.availability}
                  onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  {editingLecturer ? 'Update Lecturer' : 'Add Lecturer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lecturers;
