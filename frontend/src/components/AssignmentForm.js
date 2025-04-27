/* /*
import React, { useEffect, useState } from 'react'
import { CalendarIcon, BookOpenIcon, UserIcon, ClockIcon } from 'lucide-react'
export const AssignmentForm = ({
  onSubmit,
  initialValues = null,
  lecturers,
  courses,
  timeSlots,
}) => {
  const [formData, setFormData] = useState({
    lecturerId: '',
    courseId: '',
    timeSlotId: '',
    notes: '',
    ...initialValues,
  })
  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues)
    }
  }, [initialValues])
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Lecturer
        </label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            name="lecturerId"
            value={formData.lecturerId}
            onChange={handleChange}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a lecturer</option>
            {lecturers.map((lecturer) => (
              <option key={lecturer.id} value={lecturer.id}>
                {lecturer.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Course
        </label>
        <div className="relative">
          <BookOpenIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Time Slot
        </label>
        <div className="relative">
          <ClockIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            name="timeSlotId"
            value={formData.timeSlotId}
            onChange={handleChange}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a time slot</option>
            {timeSlots.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {slot.day} {slot.startTime} - {slot.endTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes (Optional)
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Add any additional information..."
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {initialValues ? 'Update Assignment' : 'Create Assignment'}
        </button>
      </div>
    </form>
  )
}
*/
 
/*
import React, { useEffect, useState } from 'react';
import { CalendarIcon, BookOpenIcon, UserIcon, ClockIcon } from 'lucide-react';

const AssignmentForm = ({ onSubmit, initialValues = {}, lecturers = [], courses = [], timeSlots = [] }) => {
  const [formData, setFormData] = useState({
    lecturerId: '',
    courseId: '',
    timeSlotId: '',
    notes: '',
    ...initialValues,
  });

  useEffect(() => {
    if (initialValues) {
      setFormData((prev) => ({ ...prev, ...initialValues }));
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Lecturer</label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            name="lecturerId"
            value={formData.lecturerId}
            onChange={handleChange}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a lecturer</option>
            {lecturers.map((lecturer) => (
              <option key={lecturer.id} value={lecturer.id}>{lecturer.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
        <div className="relative">
          <BookOpenIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
        <div className="relative">
          <ClockIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            name="timeSlotId"
            value={formData.timeSlotId}
            onChange={handleChange}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a time slot</option>
            {timeSlots.map((slot) => (
              <option key={slot.id} value={slot.id}>{slot.day} {slot.startTime} - {slot.endTime}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Add any additional information..."
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {initialValues ? 'Update Assignment' : 'Create Assignment'}
        </button>
      </div>
    </form>
  );
};

export default AssignmentForm;
 




 */
/*
import React, { useEffect, useState } from 'react';
import { CalendarIcon, BookOpenIcon, UserIcon, ClockIcon } from 'lucide-react';

const AssignmentForm = ({ onSubmit, initialValues = {}, lecturers = [], courses = [], timeSlots = [] }) => {
  const [formData, setFormData] = useState({
    lecturerId: '',
    courseId: '',
    timeSlotId: '',
    notes: '',
    ...initialValues,
  });

  useEffect(() => {
    if (initialValues) {
      setFormData((prev) => ({ ...prev, ...initialValues }));
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Lecturer</label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            name="lecturerId"
            value={formData.lecturerId}
            onChange={handleChange}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a lecturer</option>
            {lecturers.map((lecturer) => (
              <option key={lecturer.id} value={lecturer.id}>{lecturer.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
        <div className="relative">
          <BookOpenIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
        <div className="relative">
          <ClockIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            name="timeSlotId"
            value={formData.timeSlotId}
            onChange={handleChange}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a time slot</option>
            {timeSlots.map((slot) => (
              <option key={slot.id} value={slot.id}>{slot.day} {slot.startTime} - {slot.endTime}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Add any additional information..."
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {initialValues ? 'Update Assignment' : 'Create Assignment'}
        </button>
      </div>
    </form>
  );
};

export default AssignmentForm;

/*
import React, { useEffect, useState } from 'react'; 
import { CalendarIcon, BookOpenIcon, UserIcon, ClockIcon } from 'lucide-react';  

const AssignmentForm = ({ onSubmit, initialValues = {}, lecturers = [], courses = [], timeSlots = [] }) => {  
  const [formData, setFormData] = useState({
    lecturerId: '',
    courseId: '',
    timeSlotId: '',
    notes: '',
    ...initialValues,
  });

  // Effect to update formData when initialValues change
  useEffect(() => {
    if (initialValues) {
      setFormData((prev) => ({ ...prev, ...initialValues }));
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData); // Debugging the form data
    onSubmit(formData); // Calling the parent onSubmit function with formData
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Lecturer</label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            name="lecturerId"
            value={formData.lecturerId}
            onChange={handleChange}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a lecturer</option>
            {lecturers.map((lecturer) => (
              <option key={lecturer.id} value={lecturer.id}>{lecturer.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
        <div className="relative">
          <BookOpenIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
        <div className="relative">
          <ClockIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            name="timeSlotId"
            value={formData.timeSlotId}
            onChange={handleChange}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a time slot</option>
            {timeSlots.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {slot.day} {slot.startTime} - {slot.endTime}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Add any additional information..."
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {initialValues ? 'Update Assignment' : 'Create Assignment'}
        </button>
      </div>
    </form>
  );
};

export default AssignmentForm;


/*

import React, { useState, useEffect } from 'react';
import { UserIcon, BookOpenIcon, ClockIcon } from 'lucide-react';

const AssignmentForm = ({ onSubmit, initialValues = {}, lecturers = [], courses = [], timeSlots = [] }) => {
  const [formData, setFormData] = useState({
    lecturerId: '',
    courseId: '',
    timeSlotId: '',
    notes: '',
    ...initialValues,
  });

  useEffect(() => {
    if (initialValues) {
      setFormData((prev) => ({ ...prev, ...initialValues }));
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // This will update the parent component's state
    setFormData({
      lecturerId: '',
      courseId: '',
      timeSlotId: '',
      notes: '',
    }); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md shadow-md">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Lecturer</label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            name="lecturerId"
            value={formData.lecturerId}
            onChange={handleChange}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a lecturer</option>
            {lecturers.map((lecturer) => (
              <option key={lecturer.id} value={lecturer.id}>{lecturer.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
        <div className="relative">
          <BookOpenIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
        <div className="relative">
          <ClockIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            name="timeSlotId"
            value={formData.timeSlotId}
            onChange={handleChange}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a time slot</option>
            {timeSlots.map((slot) => (
              <option key={slot.id} value={slot.id}>{slot.day} {slot.startTime} - {slot.endTime}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Add any additional information..."
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {initialValues ? 'Update Assignment' : 'Create Assignment'}
        </button>
      </div>
    </form>
  );
};

export default AssignmentForm;

*//*
import React, { useState, useEffect } from 'react';
import { UserIcon, BookOpenIcon, ClockIcon, HomeIcon } from 'lucide-react';

const AssignmentForm = ({
  onSubmit,
  initialValues = {},
  lecturers = [],
  courses = [],
  timeSlots = [],
  rooms = [], // Add rooms prop
}) => {
  const [formData, setFormData] = useState({
    lecturerId: '',
    courseId: '',
    timeSlotId: '',
    roomId: '', // Add roomId to form state
    notes: '',
    ...initialValues,
  });

  useEffect(() => {
    if (initialValues) {
      setFormData((prev) => ({ ...prev, ...initialValues }));
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // This will update the parent component's state
    setFormData({
      lecturerId: '',
      courseId: '',
      timeSlotId: '',
      roomId: '', // Reset roomId
      notes: '',
    }); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md shadow-md">

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Lecturer</label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            name="lecturerId"
            value={formData.lecturerId}
            onChange={handleChange}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a lecturer</option>
            {lecturers.map((lecturer) => (
              <option key={lecturer.id} value={lecturer.id}>{lecturer.name}</option>
            ))}
          </select>
        </div>
      </div>

  
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
        <div className="relative">
          <BookOpenIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>
      </div>


      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Time Slot</label>
        <div className="relative">
          <ClockIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            name="timeSlotId"
            value={formData.timeSlotId}
            onChange={handleChange}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a time slot</option>
            {timeSlots.map((slot) => (
              <option key={slot.id} value={slot.id}>{slot.day} {slot.startTime} - {slot.endTime}</option>
            ))}
          </select>
        </div>
      </div>

    
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
        <div className="relative">
          <HomeIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            name="roomId"
            value={formData.roomId}
            onChange={handleChange}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a room</option>
            {rooms.map((room) => (
              <option key={room.id} value={room.id}>{room.name}</option>
            ))}
          </select>
        </div>
      </div>

     
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Add any additional information..."
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {initialValues ? 'Update Assignment' : 'Create Assignment'}
        </button>
      </div>
    </form>
  );
};

export default AssignmentForm;
*/
/*
import React, { useEffect, useState } from 'react'
import { CalendarIcon, BookOpenIcon, UserIcon, ClockIcon } from 'lucide-react'
export const AssignmentForm = ({
  onSubmit,
  initialValues = null,
  lecturers,
  courses,
  timeSlots,
}) => {
  const [formData, setFormData] = useState({
    lecturerId: '',
    courseId: '',
    timeSlotId: '',
    notes: '',
    ...initialValues,
  })
  useEffect(() => {
    if (initialValues) {
      setFormData(initialValues)
    }
  }, [initialValues])
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Lecturer
        </label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            name="lecturerId"
            value={formData.lecturerId}
            onChange={handleChange}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a lecturer</option>
            {lecturers.map((lecturer) => (
              <option key={lecturer.id} value={lecturer.id}>
                {lecturer.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Course
        </label>
        <div className="relative">
          <BookOpenIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Time Slot
        </label>
        <div className="relative">
          <ClockIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <select
            name="timeSlotId"
            value={formData.timeSlotId}
            onChange={handleChange}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a time slot</option>
            {timeSlots.map((slot) => (
              <option key={slot.id} value={slot.id}>
                {slot.day} {slot.startTime} - {slot.endTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes (Optional)
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Add any additional information..."
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {initialValues ? 'Update Assignment' : 'Create Assignment'}
        </button>
      </div>
    </form>
  )
}
*/
// AssignmentForm.js
/*
import React, { useState, useEffect } from 'react';

const AssignmentForm = ({
  onSubmit,
  initialValues = {},
  lecturers,
  courses,
  timeSlots,
}) => {
  const [lecturerId, setLecturerId] = useState(initialValues.lecturerId || '');
  const [courseId, setCourseId] = useState(initialValues.courseId || '');
  const [timeSlotId, setTimeSlotId] = useState(initialValues.timeSlotId || '');
  const [notes, setNotes] = useState(initialValues.notes || '');

  useEffect(() => {
    if (initialValues.id) {
      setLecturerId(initialValues.lecturerId);
      setCourseId(initialValues.courseId);
      setTimeSlotId(initialValues.timeSlotId);
      setNotes(initialValues.notes);
    }
  }, [initialValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAssignment = {
      id: initialValues.id || Date.now().toString(),
      lecturerId,
      courseId,
      timeSlotId,
      notes,
    };
    onSubmit(newAssignment);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Lecturer</label>
        <select
          value={lecturerId}
          onChange={(e) => setLecturerId(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Lecturer</option>
          {lecturers.map((lecturer) => (
            <option key={lecturer.id} value={lecturer.id}>
              {lecturer.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Course</label>
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Course</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Time Slot</label>
        <select
          value={timeSlotId}
          onChange={(e) => setTimeSlotId(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Time Slot</option>
          {timeSlots.map((slot) => (
            <option key={slot.id} value={slot.id}>
              {slot.day} {slot.startTime} - {slot.endTime}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows="3"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => onSubmit(null)}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Assignment
        </button>
      </div>
    </form>
  );
};

export default AssignmentForm; // Default export

*/
/*
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignmentForm = ({
  onSubmit,
  initialValues = {},
  lecturers,
  courses,
}) => {
  const [formData, setFormData] = useState({
    lecturer: initialValues.lecturer || '',
    course: initialValues.course || '',
    timeSlot: initialValues.timeSlot || {
      day: '',
      startTime: '',
      endTime: ''
    },
    notes: initialValues.notes || ''
  });

  useEffect(() => {
    if (initialValues._id) {
      setFormData({
        lecturer: initialValues.lecturer,
        course: initialValues.course,
        timeSlot: initialValues.timeSlot,
        notes: initialValues.notes
      });
    }
  }, [initialValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = initialValues._id 
        ? await axios.put(`/api/schedules/${initialValues._id}`, formData)
        : await axios.post('/api/schedules', formData);
      
      onSubmit(response.data);
    } catch (err) {
      console.error('Error saving schedule:', err);
    }
  };

  const handleTimeChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      timeSlot: { ...prev.timeSlot, [field]: value }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
    /*  {/* Lecturer selection */
     /* <div>
        <label className="block text-sm font-medium text-gray-700">Lecturer</label>
        <select
          value={formData.lecturer}
          onChange={(e) => setFormData({ ...formData, lecturer: e.target.value })}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="">Select Lecturer</option>
          {lecturers.map(lecturer => (
            <option key={lecturer._id} value={lecturer._id}>
              {lecturer.name} ({lecturer.expertise})
            </option>
          ))}
        </select>
      </div>

      {/* Course selection *//*
      <div>
        <label className="block text-sm font-medium text-gray-700">Course</label>
        <select
          value={formData.course}
          onChange={(e) => setFormData({ ...formData, course: e.target.value })}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="">Select Course</option>
          {courses.map(course => (
            <option key={course._id} value={course._id}>
              {course.name} ({course.code})
            </option>
          ))}
        </select>
      </div>

      {/* Time slot selection *//*
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Day</label>
          <select
            value={formData.timeSlot.day}
            onChange={(e) => handleTimeChange('day', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Select Day</option>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="time"
            value={formData.timeSlot.startTime}
            onChange={(e) => handleTimeChange('startTime', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Time</label>
          <input
            type="time"
            value={formData.timeSlot.endTime}
            onChange={(e) => handleTimeChange('endTime', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
      </div>

      {/* Notes field *//*
      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          rows="3"
        />
      </div>

      {/* Form buttons *//*
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => onSubmit(null)}
          className="px-4 py-2 border rounded-md text-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {initialValues._id ? 'Update' : 'Create'} Schedule
        </button>
      </div>
    </form>
  );
};

export default AssignmentForm;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignmentForm = ({
  onSubmit,
  initialValues = {},
  lecturers,
  courses,
}) => {
  const [formData, setFormData] = useState({
    lecturer: initialValues.lecturer || '',
    course: initialValues.course || '',
    timeSlot: initialValues.timeSlot || {
      day: '',
      startTime: '',
      endTime: ''
    },
    notes: initialValues.notes || ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialValues._id) {
      setFormData({
        lecturer: initialValues.lecturer,
        course: initialValues.course,
        timeSlot: initialValues.timeSlot,
        notes: initialValues.notes
      });
    }
  }, [initialValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate time
    if (formData.timeSlot.startTime >= formData.timeSlot.endTime) {
      alert('End time must be later than start time.');
      return;
    }

    setLoading(true);
    try {
      const response = initialValues._id
        ? await axios.put(`/api/schedules/${initialValues._id}`, formData)
        : await axios.post('/api/schedules', formData);

      onSubmit(response.data);

      // Clear form if creating new schedule
      if (!initialValues._id) {
        setFormData({
          lecturer: '',
          course: '',
          timeSlot: { day: '', startTime: '', endTime: '' },
          notes: ''
        });
      }
    } catch (err) {
      console.error('Error saving schedule:', err);
      alert('An error occurred while saving the schedule. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTimeChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      timeSlot: { ...prev.timeSlot, [field]: value }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Lecturer selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Lecturer</label>
        <select
          value={formData.lecturer}
          onChange={(e) => setFormData({ ...formData, lecturer: e.target.value })}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="">Select Lecturer</option>
          {lecturers.map(lecturer => (
            <option key={lecturer._id} value={lecturer._id}>
              {lecturer.name} ({lecturer.expertise})
            </option>
          ))}
        </select>
      </div>

      {/* Course selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Course</label>
        <select
          value={formData.course}
          onChange={(e) => setFormData({ ...formData, course: e.target.value })}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="">Select Course</option>
          {courses.map(course => (
            <option key={course._id} value={course._id}>
              {course.name} ({course.code})
            </option>
          ))}
        </select>
      </div>

      {/* Time slot selection */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Day</label>
          <select
            value={formData.timeSlot.day}
            onChange={(e) => handleTimeChange('day', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Select Day</option>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
              <option key={day} value={day}>{day}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="time"
            value={formData.timeSlot.startTime}
            onChange={(e) => handleTimeChange('startTime', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">End Time</label>
          <input
            type="time"
            value={formData.timeSlot.endTime}
            onChange={(e) => handleTimeChange('endTime', e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
      </div>

      {/* Notes field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
          rows="3"
        />
      </div>

      {/* Form buttons */}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => onSubmit(null)}
          className="px-4 py-2 border rounded-md text-gray-700"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 text-white rounded-md ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Saving...' : initialValues._id ? 'Update' : 'Create'} Schedule
        </button>
      </div>
    </form>
  );
};

export default AssignmentForm;




