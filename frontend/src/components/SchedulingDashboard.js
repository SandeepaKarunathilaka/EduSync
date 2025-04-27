/* import React, { useState } from 'react'
import { PlusIcon, FilterIcon, CheckIcon, XIcon } from 'lucide-react'
import { AssignmentForm } from './AssignmentForm'
import { ScheduleTable } from './ScheduleTable'
import { mockLecturers, mockCourses, mockTimeSlots } from '../data/mockData'
export const SchedulingDashboard = () => {
  const [assignments, setAssignments] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingAssignment, setEditingAssignment] = useState(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [filterLecturer, setFilterLecturer] = useState('')
  const [filterCourse, setFilterCourse] = useState('')
  const handleCreateAssignment = (newAssignment) => {
    setAssignments([
      ...assignments,
      {
        ...newAssignment,
        id: Date.now().toString(),
      },
    ])
    setIsFormOpen(false)
  }
  const handleUpdateAssignment = (updatedAssignment) => {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === updatedAssignment.id ? updatedAssignment : assignment,
      ),
    )
    setEditingAssignment(null)
  }
  const handleDeleteAssignment = (id) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id))
    setDeleteConfirmId(null)
  }
  const filteredAssignments = assignments.filter((assignment) => {
    const matchesLecturer =
      !filterLecturer || assignment.lecturerId === filterLecturer
    const matchesCourse = !filterCourse || assignment.courseId === filterCourse
    return matchesLecturer && matchesCourse
  })
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Faculty Scheduling System
        </h1>
        <p className="text-gray-600 mt-2">
          Manage lecturer assignments to courses and time slots
        </p>
      </header>
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <div className="relative">
            <select
              className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterLecturer}
              onChange={(e) => setFilterLecturer(e.target.value)}
            >
              <option value="">All Lecturers</option>
              {mockLecturers.map((lecturer) => (
                <option key={lecturer.id} value={lecturer.id}>
                  {lecturer.name}
                </option>
              ))}
            </select>
            <FilterIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <div className="relative">
            <select
              className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
            >
              <option value="">All Courses</option>
              {mockCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
            <FilterIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          New Assignment
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <ScheduleTable
          assignments={filteredAssignments}
          onEdit={setEditingAssignment}
          onDeleteRequest={setDeleteConfirmId}
          lecturers={mockLecturers}
          courses={mockCourses}
          timeSlots={mockTimeSlots}
        />
      </div>
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Assignment</h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <AssignmentForm
              onSubmit={handleCreateAssignment}
              lecturers={mockLecturers}
              courses={mockCourses}
              timeSlots={mockTimeSlots}
            />
          </div>
        </div>
      )}
      {editingAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Assignment</h2>
              <button
                onClick={() => setEditingAssignment(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <AssignmentForm
              onSubmit={handleUpdateAssignment}
              initialValues={editingAssignment}
              lecturers={mockLecturers}
              courses={mockCourses}
              timeSlots={mockTimeSlots}
            />
          </div>
        </div>
      )}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to remove this assignment? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAssignment(deleteConfirmId)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
 *//*
import React, { useState } from 'react'
import { PlusIcon, FilterIcon, XIcon } from 'lucide-react'
import AssignmentForm from './AssignmentForm' // Ensure this is the correct import
import { ScheduleTable } from './ScheduleTable'
import { mockLecturers, mockCourses, mockTimeSlots } from '../data/mockData'

export const SchedulingDashboard = () => {
  const [assignments, setAssignments] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingAssignment, setEditingAssignment] = useState(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [filterLecturer, setFilterLecturer] = useState('')
  const [filterCourse, setFilterCourse] = useState('')

  const handleCreateAssignment = (newAssignment) => {
    setAssignments([...assignments, { ...newAssignment, id: Date.now().toString() }])
    setIsFormOpen(false)
  }

  const handleUpdateAssignment = (updatedAssignment) => {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === updatedAssignment.id ? updatedAssignment : assignment
      )
    )
    setEditingAssignment(null)
  }

  const handleDeleteAssignment = (id) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id))
    setDeleteConfirmId(null)
  }

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesLecturer = !filterLecturer || assignment.lecturerId === filterLecturer
    const matchesCourse = !filterCourse || assignment.courseId === filterCourse
    return matchesLecturer && matchesCourse
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Faculty Scheduling System</h1>
        <p className="text-gray-600 mt-2">Manage lecturer assignments to courses and time slots</p>
      </header>

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <div className="relative">
            <select
              className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterLecturer}
              onChange={(e) => setFilterLecturer(e.target.value)}
            >
              <option value="">All Lecturers</option>
              {mockLecturers.map((lecturer) => (
                <option key={lecturer.id} value={lecturer.id}>
                  {lecturer.name}
                </option>
              ))}
            </select>
            <FilterIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          <div className="relative">
            <select
              className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
            >
              <option value="">All Courses</option>
              {mockCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
            <FilterIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          New Assignment
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <ScheduleTable
          assignments={filteredAssignments}
          onEdit={setEditingAssignment}
          onDeleteRequest={setDeleteConfirmId}
          lecturers={mockLecturers}
          courses={mockCourses}
          timeSlots={mockTimeSlots}
        />
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Assignment</h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <AssignmentForm
              onSubmit={handleCreateAssignment}
              lecturers={mockLecturers}
              courses={mockCourses}
              timeSlots={mockTimeSlots}
            />
          </div>
        </div>
      )}

      {editingAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Assignment</h2>
              <button
                onClick={() => setEditingAssignment(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <AssignmentForm
              onSubmit={handleUpdateAssignment}
              initialValues={editingAssignment}
              lecturers={mockLecturers}
              courses={mockCourses}
              timeSlots={mockTimeSlots}
            />
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to remove this assignment? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAssignment(deleteConfirmId)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
*/
/* 
import React, { useState } from 'react';
import { PlusIcon, FilterIcon, XIcon } from 'lucide-react';
import AssignmentForm from './AssignmentForm';
import { ScheduleTable } from './ScheduleTable';
import { mockLecturers, mockCourses, mockTimeSlots, mockRooms } from '../data/mockData'; // Import mockRooms

export const SchedulingDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [filterLecturer, setFilterLecturer] = useState('');
  const [filterCourse, setFilterCourse] = useState('');

  const handleCreateAssignment = (newAssignment) => {
    setAssignments([...assignments, { ...newAssignment, id: Date.now().toString() }]);
    setIsFormOpen(false);
  };

  const handleUpdateAssignment = (updatedAssignment) => {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === updatedAssignment.id ? updatedAssignment : assignment
      )
    );
    setEditingAssignment(null);
  };

  const handleDeleteAssignment = (id) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id));
    setDeleteConfirmId(null);
  };

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesLecturer = !filterLecturer || assignment.lecturerId === filterLecturer;
    const matchesCourse = !filterCourse || assignment.courseId === filterCourse;
    return matchesLecturer && matchesCourse;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Faculty Scheduling System</h1>
        <p className="text-gray-600 mt-2">Manage lecturer assignments to courses and time slots</p>
      </header>

      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <div className="relative">
            <select
              className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterLecturer}
              onChange={(e) => setFilterLecturer(e.target.value)}
            >
              <option value="">All Lecturers</option>
              {mockLecturers.map((lecturer) => (
                <option key={lecturer.id} value={lecturer.id}>
                  {lecturer.name}
                </option>
              ))}
            </select>
            <FilterIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          <div className="relative">
            <select
              className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
            >
              <option value="">All Courses</option>
              {mockCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
            <FilterIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          New Assignment
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <ScheduleTable
          assignments={filteredAssignments}
          onEdit={setEditingAssignment}
          onDeleteRequest={setDeleteConfirmId}
          lecturers={mockLecturers}
          courses={mockCourses}
          timeSlots={mockTimeSlots}
          rooms={mockRooms} // Pass rooms data
        />
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Assignment</h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <AssignmentForm
              onSubmit={handleCreateAssignment}
              lecturers={mockLecturers}
              courses={mockCourses}
              timeSlots={mockTimeSlots}
              rooms={mockRooms} // Pass rooms data
            />
          </div>
        </div>
      )}

      {editingAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Assignment</h2>
              <button
                onClick={() => setEditingAssignment(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <AssignmentForm
              onSubmit={handleUpdateAssignment}
              initialValues={editingAssignment}
              lecturers={mockLecturers}
              courses={mockCourses}
              timeSlots={mockTimeSlots}
              rooms={mockRooms} // Pass rooms data
            />
          </div>
        </div>
      )}

      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to remove this assignment? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAssignment(deleteConfirmId)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};*/

// lectures link in scheduleDashboard.js

// SchedulingDashboard.js
/*
import React, { useState } from 'react'
import { PlusIcon, FilterIcon, CheckIcon, XIcon } from 'lucide-react'
import  AssignmentForm  from './AssignmentForm'
import { ScheduleTable } from './ScheduleTable'
import { mockLecturers, mockCourses, mockTimeSlots } from '../data/mockData'

export const SchedulingDashboard = () => {
  const [assignments, setAssignments] = useState([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingAssignment, setEditingAssignment] = useState(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [filterLecturer, setFilterLecturer] = useState('')
  const [filterCourse, setFilterCourse] = useState('')

  const handleCreateAssignment = (newAssignment) => {
    setAssignments([
      ...assignments,
      {
        ...newAssignment,
        id: Date.now().toString(),
      },
    ])
    setIsFormOpen(false)
  }

  const handleUpdateAssignment = (updatedAssignment) => {
    setAssignments(
      assignments.map((assignment) =>
        assignment.id === updatedAssignment.id ? updatedAssignment : assignment,
      ),
    )
    setEditingAssignment(null)
  }

  const handleDeleteAssignment = (id) => {
    setAssignments(assignments.filter((assignment) => assignment.id !== id))
    setDeleteConfirmId(null)
  }

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesLecturer =
      !filterLecturer || assignment.lecturerId === filterLecturer
    const matchesCourse = !filterCourse || assignment.courseId === filterCourse
    return matchesLecturer && matchesCourse
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Faculty Scheduling System
        </h1>
        <p className="text-gray-600 mt-2">
          Manage lecturer assignments to courses and time slots
        </p>
      </header>
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <div className="relative">
            <select
              className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterLecturer}
              onChange={(e) => setFilterLecturer(e.target.value)}
            >
              <option value="">All Lecturers</option>
              {mockLecturers.map((lecturer) => (
                <option key={lecturer.id} value={lecturer.id}>
                  {lecturer.name}
                </option>
              ))}
            </select>
            <FilterIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <div className="relative">
            <select
              className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
            >
              <option value="">All Courses</option>
              {mockCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
            <FilterIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          New Assignment
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <ScheduleTable
          assignments={filteredAssignments}
          onEdit={setEditingAssignment}
          onDeleteRequest={setDeleteConfirmId}
          lecturers={mockLecturers}
          courses={mockCourses}
          timeSlots={mockTimeSlots}
        />
      </div>
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Assignment</h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <AssignmentForm
              onSubmit={handleCreateAssignment}
              lecturers={mockLecturers}
              courses={mockCourses}
              timeSlots={mockTimeSlots}
            />
          </div>
        </div>
      )}
      {editingAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Assignment</h2>
              <button
                onClick={() => setEditingAssignment(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <AssignmentForm
              onSubmit={handleUpdateAssignment}
              initialValues={editingAssignment}
              lecturers={mockLecturers}
              courses={mockCourses}
              timeSlots={mockTimeSlots}
            />
          </div>
        </div>
      )}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to remove this assignment? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAssignment(deleteConfirmId)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}*/
/*
import React, { useState, useEffect } from 'react'; // Add useEffect
import { PlusIcon, FilterIcon, CheckIcon, XIcon } from 'lucide-react';
import AssignmentForm from './AssignmentForm';
import { ScheduleTable } from './ScheduleTable';
import { mockLecturers, mockCourses, mockTimeSlots } from '../data/mockData';

export const SchedulingDashboard = () => {
  // Load assignments from Local Storage on component mount
  const [assignments, setAssignments] = useState(() => {
    const savedAssignments = localStorage.getItem('assignments');
    return savedAssignments ? JSON.parse(savedAssignments) : [];
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [filterLecturer, setFilterLecturer] = useState('');
  const [filterCourse, setFilterCourse] = useState('');

  // Save assignments to Local Storage whenever they change
  useEffect(() => {
    localStorage.setItem('assignments', JSON.stringify(assignments));
  }, [assignments]);

  const handleCreateAssignment = (newAssignment) => {
    const updatedAssignments = [
      ...assignments,
      {
        ...newAssignment,
        id: Date.now().toString(),
      },
    ];
    setAssignments(updatedAssignments);
    setIsFormOpen(false);
  };

  const handleUpdateAssignment = (updatedAssignment) => {
    const updatedAssignments = assignments.map((assignment) =>
      assignment.id === updatedAssignment.id ? updatedAssignment : assignment,
    );
    setAssignments(updatedAssignments);
    setEditingAssignment(null);
  };

  const handleDeleteAssignment = (id) => {
    const updatedAssignments = assignments.filter((assignment) => assignment.id !== id);
    setAssignments(updatedAssignments);
    setDeleteConfirmId(null);
  };

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesLecturer =
      !filterLecturer || assignment.lecturerId === filterLecturer;
    const matchesCourse = !filterCourse || assignment.courseId === filterCourse;
    return matchesLecturer && matchesCourse;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Faculty Scheduling System
        </h1>
        <p className="text-gray-600 mt-2">
          Manage lecturer assignments to courses and time slots
        </p>
      </header>
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <div className="relative">
            <select
              className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterLecturer}
              onChange={(e) => setFilterLecturer(e.target.value)}
            >
              <option value="">All Lecturers</option>
              {mockLecturers.map((lecturer) => (
                <option key={lecturer.id} value={lecturer.id}>
                  {lecturer.name}
                </option>
              ))}
            </select>
            <FilterIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <div className="relative">
            <select
              className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
            >
              <option value="">All Courses</option>
              {mockCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
            <FilterIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          New Assignment
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <ScheduleTable
          assignments={filteredAssignments}
          onEdit={setEditingAssignment}
          onDeleteRequest={setDeleteConfirmId}
          lecturers={mockLecturers}
          courses={mockCourses}
          timeSlots={mockTimeSlots}
        />
      </div>
      {isFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Create New Assignment</h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <AssignmentForm
              onSubmit={handleCreateAssignment}
              lecturers={mockLecturers}
              courses={mockCourses}
              timeSlots={mockTimeSlots}
            />
          </div>
        </div>
      )}
      {editingAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Assignment</h2>
              <button
                onClick={() => setEditingAssignment(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <AssignmentForm
              onSubmit={handleUpdateAssignment}
              initialValues={editingAssignment}
              lecturers={mockLecturers}
              courses={mockCourses}
              timeSlots={mockTimeSlots}
            />
          </div>
        </div>
      )}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to remove this assignment? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteAssignment(deleteConfirmId)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
*/
import React, { useState, useEffect } from 'react';
import { PlusIcon, FilterIcon, XIcon, UsersIcon, BookOpenIcon } from 'lucide-react';
import axios from 'axios';
import AssignmentForm from './AssignmentForm';
import { ScheduleTable } from './ScheduleTable';

const API_URL = 'http://localhost:5000/api/schedules';
const LECTURERS_API = 'http://localhost:5000/api/lecturers';
const COURSES_API = 'http://localhost:5000/api/courses';

export const SchedulingDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [filterLecturer, setFilterLecturer] = useState('');
  const [filterCourse, setFilterCourse] = useState('');
  const [showAllLecturers, setShowAllLecturers] = useState(false);
  const [showAllCourses, setShowAllCourses] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schedulesRes, lecturersRes, coursesRes] = await Promise.all([
          axios.get(API_URL),
          axios.get(LECTURERS_API),
          axios.get(COURSES_API)
        ]);
        
        setAssignments(schedulesRes.data);
        setLecturers(lecturersRes.data);
        setCourses(coursesRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  // ... (keep all your existing handler functions)

  // Add these new functions:
  const refreshLecturers = async () => {
    try {
      const response = await axios.get(LECTURERS_API);
      setLecturers(response.data);
    } catch (err) {
      console.error('Error refreshing lecturers:', err);
    }
  };

  const refreshCourses = async () => {
    try {
      const response = await axios.get(COURSES_API);
      setCourses(response.data);
    } catch (err) {
      console.error('Error refreshing courses:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Faculty Scheduling System</h1>
        <p className="text-gray-600 mt-2">Manage lecturer assignments to courses and time slots</p>
      </header>

      {/* Add these new buttons above the filter section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => {
              setShowAllLecturers(true);
              refreshLecturers();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <UsersIcon className="h-4 w-4 mr-2" />
            All Lecturers
          </button>
          <button
            onClick={() => {
              setShowAllCourses(true);
              refreshCourses();
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <BookOpenIcon className="h-4 w-4 mr-2" />
            All Courses
          </button>
        </div>
        
        {/* Keep your existing filter and new assignment button */}
        <div className="flex space-x-4">
          <div className="relative">
            <select
              className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterLecturer}
              onChange={(e) => setFilterLecturer(e.target.value)}
            >
              <option value="">Filter by Lecturer</option>
              {lecturers.map((lecturer) => (
                <option key={lecturer._id} value={lecturer._id}>
                  {lecturer.name}
                </option>
              ))}
            </select>
            <FilterIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <div className="relative">
            <select
              className="bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
            >
              <option value="">Filter by Course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
            <FilterIcon className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          New Scheduling
        </button>
      </div>

      {/* ... (keep your existing ScheduleTable and other modals) */}

      {/* Add these new modals for All Lecturers and All Courses */}
      {showAllLecturers && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">All Lecturers</h2>
              <button onClick={() => setShowAllLecturers(false)} className="text-gray-500 hover:text-gray-700">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expertise</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lecturers.map((lecturer) => (
                  <tr key={lecturer._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lecturer.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lecturer.expertise}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{lecturer.availability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showAllCourses && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">All Courses</h2>
              <button onClick={() => setShowAllCourses(false)} className="text-gray-500 hover:text-gray-700">
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Credits</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{course.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};