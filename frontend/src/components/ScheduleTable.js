/*import React from 'react'
import { EditIcon, TrashIcon, AlertCircleIcon } from 'lucide-react'
export const ScheduleTable = ({
  assignments,
  onEdit,
  onDeleteRequest,
  lecturers,
  courses,
  timeSlots,
}) => {
  const getLecturerName = (id) => {
    const lecturer = lecturers.find((l) => l.id === id)
    return lecturer ? lecturer.name : 'Unknown'
  }
  const getCourseName = (id) => {
    const course = courses.find((c) => c.id === id)
    return course ? course.name : 'Unknown'
  }
  const getTimeSlot = (id) => {
    const slot = timeSlots.find((t) => t.id === id)
    return slot ? `${slot.day} ${slot.startTime} - ${slot.endTime}` : 'Unknown'
  }
  return (
    <div className="overflow-x-auto">
      {assignments.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                Lecturer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                Course
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                Time Slot
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                Notes
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assignments.map((assignment) => (
              <tr
                key={assignment.id}
                className="hover:bg-blue-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                      <span className="font-medium text-sm">
                        {getLecturerName(assignment.lecturerId).charAt(0)}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {getLecturerName(assignment.lecturerId)}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getCourseName(assignment.courseId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getTimeSlot(assignment.timeSlotId)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {assignment.notes || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(assignment)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 mr-4"
                    title="Edit Assignment"
                  >
                    <EditIcon className="h-4 w-4" />
                    <span className="ml-2">Edit</span>
                  </button>
                  <button
                    onClick={() => onDeleteRequest(assignment.id)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    title="Delete Assignment"
                  >
                    <TrashIcon className="h-4 w-4" />
                    <span className="ml-2">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <AlertCircleIcon className="h-12 w-12 mb-4 text-blue-400" />
          <h3 className="text-lg font-medium mb-1">No assignments found</h3>
          <p className="text-sm">Create a new assignment to get started.</p>
        </div>
      )}
    </div>
  )
}
*//*
import React from 'react';
import { EditIcon, TrashIcon, AlertCircleIcon } from 'lucide-react';

export const ScheduleTable = ({
  assignments,
  onEdit,
  onDeleteRequest,
  lecturers,
  courses,
  timeSlots,
  rooms, // Add rooms prop
}) => {
  // Helper function to get lecturer name
  const getLecturerName = (id) => {
    const lecturer = lecturers.find((l) => l.id === id);
    return lecturer ? lecturer.name : 'Unknown';
  };

  // Helper function to get course name
  const getCourseName = (id) => {
    const course = courses.find((c) => c.id === id);
    return course ? course.name : 'Unknown';
  };

  // Helper function to get time slot
  const getTimeSlot = (id) => {
    const slot = timeSlots.find((t) => t.id === id);
    return slot ? `${slot.day} ${slot.startTime} - ${slot.endTime}` : 'Unknown';
  };

  // Helper function to get room name
  const getRoomName = (id) => {
    const room = rooms.find((r) => r.id === id);
    return room ? room.name : 'Unknown';
  };

  return (
    <div className="overflow-x-auto">
      {assignments.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                Lecturer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                Course
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                Time Slot
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                Room
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                Notes
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assignments.map((assignment) => (
              <tr
                key={assignment.id}
                className="hover:bg-blue-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                      <span className="font-medium text-sm">
                        {getLecturerName(assignment.lecturerId).charAt(0)}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {getLecturerName(assignment.lecturerId)}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getCourseName(assignment.courseId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getTimeSlot(assignment.timeSlotId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getRoomName(assignment.roomId)} {/* Display room name */
             /*   </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {assignment.notes || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(assignment)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 mr-4"
                    title="Edit Assignment"
                  >
                    <EditIcon className="h-4 w-4" />
                    <span className="ml-2">Edit</span>
                  </button>
                  <button
                    onClick={() => onDeleteRequest(assignment.id)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                    title="Delete Assignment"
                  >
                    <TrashIcon className="h-4 w-4" />
                    <span className="ml-2">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <AlertCircleIcon className="h-12 w-12 mb-4 text-blue-400" />
          <h3 className="text-lg font-medium mb-1">No assignments found</h3>
          <p className="text-sm">Create a new assignment to get started.</p>
        </div>
      )}
    </div>
  );
};*/
/*
import React from 'react'
import { EditIcon, TrashIcon, AlertCircleIcon } from 'lucide-react'
export const ScheduleTable = ({
  assignments,
  onEdit,
  onDeleteRequest,
  lecturers,
  courses,
  timeSlots,
}) => {
  const getLecturerName = (id) => {
    const lecturer = lecturers.find((l) => l.id === id)
    return lecturer ? lecturer.name : 'Unknown'
  }
  const getCourseName = (id) => {
    const course = courses.find((c) => c.id === id)
    return course ? course.name : 'Unknown'
  }
  const getTimeSlot = (id) => {
    const slot = timeSlots.find((t) => t.id === id)
    return slot ? `${slot.day} ${slot.startTime} - ${slot.endTime}` : 'Unknown'
  }
  return (
    <div className="overflow-x-auto">
      {assignments.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                Lecturer
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                Course
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                Time Slot
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                Notes
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-blue-600 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assignments.map((assignment) => (
              <tr
                key={assignment.id}
                className="hover:bg-blue-50 transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                      <span className="font-medium text-sm">
                        {getLecturerName(assignment.lecturerId).charAt(0)}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {getLecturerName(assignment.lecturerId)}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getCourseName(assignment.courseId)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getTimeSlot(assignment.timeSlotId)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {assignment.notes || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(assignment)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 mr-4"
                    title="Edit Assignment"
                  >
                    <EditIcon className="h-4 w-4" />
                    <span className="ml-2">Edit</span>
                  </button>
                  <button
                    onClick={() => onDeleteRequest(assignment.id)}
                    className="inline-flex items-center text-red-600 hover:text-blue-800"
                    title="Delete Assignment"
                  >
                    <TrashIcon className="h-4 w-4" />
                    <span className="ml-2">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <AlertCircleIcon className="h-12 w-12 mb-4 text-blue-400" />
          <h3 className="text-lg font-medium mb-1">No assignments found</h3>
          <p className="text-sm">Create a new assignment to get started.</p>
        </div>
      )}
    </div>
  )
}
*/
import React from 'react';
import { EditIcon, TrashIcon, AlertCircleIcon } from 'lucide-react';

export const ScheduleTable = ({
  assignments,
  onEdit,
  onDeleteRequest,
  lecturers,
  courses,
}) => {
  const getLecturerName = (lecturerId) => {
    const lecturer = lecturers.find((l) => l._id === lecturerId);
    return lecturer ? lecturer.name : 'Unknown';
  };

  const getCourseName = (courseId) => {
    const course = courses.find((c) => c._id === courseId);
    return course ? course.name : 'Unknown';
  };

  const getTimeSlot = (timeSlot) => {
    return timeSlot ? `${timeSlot.day} ${timeSlot.startTime} - ${timeSlot.endTime}` : 'Unknown';
  };

  return (
    <div className="overflow-x-auto">
      {assignments.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Lecturer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Course</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Time Slot</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-blue-600 uppercase tracking-wider">Notes</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-blue-600 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assignments.map((assignment) => (
              <tr key={assignment._id} className="hover:bg-blue-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                      <span className="font-medium text-sm">
                        {getLecturerName(assignment.lecturer)?.charAt(0)}
                      </span>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      {getLecturerName(assignment.lecturer)}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getCourseName(assignment.course)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getTimeSlot(assignment.timeSlot)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {assignment.notes || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(assignment)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 mr-4"
                  >
                    <EditIcon className="h-4 w-4" />
                    <span className="ml-2">Edit</span>
                  </button>
                  <button
                    onClick={() => onDeleteRequest(assignment._id)}
                    className="inline-flex items-center text-red-600 hover:text-red-800"
                  >
                    <TrashIcon className="h-4 w-4" />
                    <span className="ml-2">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <AlertCircleIcon className="h-12 w-12 mb-4 text-blue-400" />
          <h3 className="text-lg font-medium mb-1">No assignments found</h3>
          <p className="text-sm">Create a new assignment to get started.</p>
        </div>
      )}
    </div>
  );
};