/* import React from 'react'
import { Link } from 'react-router-dom'
import { UsersIcon, CalendarIcon, BookOpenIcon } from 'lucide-react'
import { mockLecturers, mockCourses } from '../data/mockData'
export const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/lecturers"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <UsersIcon className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-800">
              {mockLecturers.length}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Lecturers</h2>
          <p className="text-gray-600 mt-2">
            Manage faculty members and their details
          </p>
        </Link>
        <Link
          to="/schedule"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <CalendarIcon className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-800">Schedule</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            Class Schedule
          </h2>
          <p className="text-gray-600 mt-2">
            Manage course assignments and schedules
          </p>
        </Link>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <BookOpenIcon className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-800">
              {mockCourses.length}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Courses</h2>
          <p className="text-gray-600 mt-2">
            Total available courses in the system
          </p>
        </div>
      </div>
    </div>
  )
}

 *//*
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UsersIcon, CalendarIcon, BookOpenIcon } from 'lucide-react'
import { mockLecturers, mockCourses } from '../data/mockData'

export const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/lecturerDashboard'); // Navigate to Lecturer Dashboard on logout
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/lecturers"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <UsersIcon className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-800">
              {mockLecturers.length}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Lecturers</h2>
          <p className="text-gray-600 mt-2">
            Manage faculty members and their details
          </p>
        </Link>
        <Link
          to="/schedule"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <CalendarIcon className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-800">Schedule</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            Class Schedule
          </h2>
          <p className="text-gray-600 mt-2">
            Manage course assignments and schedules
          </p>
        </Link>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <BookOpenIcon className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-800">
              {mockCourses.length}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Courses</h2>
          <p className="text-gray-600 mt-2">
            Total available courses in the system
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={handleLogout}
          className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition-colors"
        >
          Log Out
        </button>
      </div>
    </div>
  )
}
*/
/*
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { UsersIcon, CalendarIcon, BookOpenIcon } from 'lucide-react';
import { mockLecturers, mockCourses } from '../data/mockData';

export const Dashboard = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Logout handler
  const handleLogout = () => {
    // Perform logout actions (e.g., clear session/token)
    console.log('Logging out...');
    
    // Navigate to the login page or home page
    navigate('/login'); // Replace '/login' with your desired logout route
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Logout Button *//*
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Logout
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/lecturers"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <UsersIcon className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-800">
              {mockLecturers.length}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Lecturers</h2>
          <p className="text-gray-600 mt-2">
            Manage faculty members and their details
          </p>
        </Link>
        <Link
          to="/schedule"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <CalendarIcon className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-800">Schedule</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            Class Schedule
          </h2>
          <p className="text-gray-600 mt-2">
            Manage course assignments and schedules
          </p>
        </Link>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <BookOpenIcon className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-800">
              {mockCourses.length}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Courses</h2>
          <p className="text-gray-600 mt-2">
            Total available courses in the system
          </p>
        </div>
      </div>
    </div>
  );
};*/


/* correct version
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { UsersIcon, CalendarIcon, BookOpenIcon } from 'lucide-react';
import { mockLecturers, mockCourses } from '../data/mockData';

export const Dashboard = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Navigate to LecturerDashboard
  const handleLogout = () => {
    navigate('/lecturer-dashboard'); // Navigate to LecturerDashboard
  };

  return (
    <div className="container mx-auto px-4 py-8">
     
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Go to Lecturer Dashboard
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/lecturers"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <UsersIcon className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-800">
              {mockLecturers.length}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Lecturers</h2>
          <p className="text-gray-600 mt-2">
            Manage faculty members and their details
          </p>
        </Link>
        <Link
          to="/schedule"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <CalendarIcon className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-800">Schedule</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            Class Schedule
          </h2>
          <p className="text-gray-600 mt-2">
            Manage course assignments and schedules
          </p>
        </Link>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <BookOpenIcon className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-800">
              {mockCourses.length}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Courses</h2>
          <p className="text-gray-600 mt-2">
            Total available courses in the system
          </p>
        </div>
      </div>
    </div>
  );
};

*/

// update the Availability
/*
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UsersIcon, CalendarIcon, BookOpenIcon } from 'lucide-react';
import { mockLecturers, mockCourses } from '../data/mockData';

export const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/lecturer-dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Go to Lecturer Dashboard
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/lecturers"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <UsersIcon className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-800">
              {mockLecturers.length}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Lecturers</h2>
          <p className="text-gray-600 mt-2">
            Manage faculty members and their details
          </p>
        </Link>
        <Link
          to="/schedule"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <CalendarIcon className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-800">Schedule</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            Class Schedule
          </h2>
          <p className="text-gray-600 mt-2">
            Manage course assignments and schedules
          </p>
        </Link>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <BookOpenIcon className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-800">
              {mockCourses.length}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Courses</h2>
          <p className="text-gray-600 mt-2">
            Total available courses in the system
          </p>
        </div>
      </div>

     
      {/* New Section for Lecturer Availability Forms *//*
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Lecturer Availability Forms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockLecturers.map((lecturer) => (
            <Link
              key={lecturer.id}
              to={`/lecturer-availability/${lecturer.id}`}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-800">{lecturer.name}</h3>
              <p className="text-gray-600">View Availability</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};*/

// mockdata last
/*
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UsersIcon, CalendarIcon, BookOpenIcon } from 'lucide-react';
import { mockLecturers, mockCourses } from '../data/mockData';

export const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/lecturer-dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Go to Lecturer Dashboard
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link
          to="/lecturers"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <UsersIcon className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-800">
              {mockLecturers.length}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Lecturers</h2>
          <p className="text-gray-600 mt-2">
            Manage faculty members and their details
          </p>
        </Link>
        <Link
          to="/schedule"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <CalendarIcon className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-800">Schedule</span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            Class Schedule
          </h2>
          <p className="text-gray-600 mt-2">
            Manage course assignments and schedules
          </p>
        </Link>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <BookOpenIcon className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold text-gray-800">
              {mockCourses.length}
            </span>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Courses</h2>
          <p className="text-gray-600 mt-2">
            Total available courses in the system
          </p>
        </div>
      </div>

     /* {/* New Section for Lecturer Availability Forms *//*
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Lecturer Availability Forms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockLecturers.map((lecturer) => (
            <div
              key={lecturer.id}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-800">{lecturer.name}</h3>
              <p className="text-gray-600 mb-4">Manage faculty members and their details</p>

        
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-md font-semibold text-gray-700 mb-2">Availability</h4>
                <div className="space-y-2">
               
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monday</span>
                    <span className="text-gray-800">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tuesday</span>
                    <span className="text-gray-800">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wednesday</span>
                    <span className="text-gray-800">Unavailable</span>
                  </div>
               
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};*/
/*
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UsersIcon, CalendarIcon, BookOpenIcon } from 'lucide-react';
import axios from 'axios';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [lecturers, setLecturers] = useState([]);
  const [courses, setCourses] = useState([]); // If you have a course API

  // Fetch lecturers from the backend
  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/lecturers'); // Adjust API endpoint
        setLecturers(response.data);
      } catch (error) {
        console.error('Error fetching lecturers:', error);
      }
    };

    // Fetch courses (if you have this data)
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses'); // Adjust API endpoint
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchLecturers();
    fetchCourses();
  }, []);

  const handleLogout = () => {
    navigate('/lecturer-dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Logout
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      /*  {/* Lecturers */
       /* <Link
          to="/lecturers"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <UsersIcon className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-800">{lecturers.length}</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800">Lecturers</h2>
          <p className="text-gray-600 mt-2">Manage faculty members and their details</p>
        </Link>

        {/* Schedule */
       /* <Link
          to="/schedule"
          className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <CalendarIcon className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-800">Schedule</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800">Class Schedule</h2>
          <p className="text-gray-600 mt-2">Manage course assignments and schedules</p>
        </Link>

        {/* Courses *//*
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <BookOpenIcon className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-gray-800">{courses.length}</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800">Courses</h2>
          <p className="text-gray-600 mt-2">Total available courses in the system</p>
        </div>
      </div>

      {/* Lecturer Availability *//*
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Lecturer Availability</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lecturers.map((lecturer) => (
            <div
              key={lecturer._id}
              className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-gray-800">{lecturer.name}</h3>
              <p className="text-gray-600 mb-4">Email: {lecturer.email}</p>


          










              {/* Availability Section *//*
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-md font-semibold text-gray-700 mb-2">Availability</h4>
                <div className="space-y-2">
                  {lecturer.availability && lecturer.availability.length > 0 ? (
                    lecturer.availability.map((slot, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-600">{slot.day}</span>
                        <span className="text-gray-800">{slot.startTime} - {slot.endTime}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No availability set</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
*/
/*
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UsersIcon, CalendarIcon, BookOpenIcon, CheckCircleIcon, EditIcon } from 'lucide-react';
import axios from 'axios';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [lecturers, setLecturers] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/lecturers');
        setLecturers(response.data);
      } catch (error) {
        console.error('Error fetching lecturers:', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchLecturers();
    fetchCourses();
  }, []);

  const handleLogout = () => {
    navigate('/lecturer-dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Logout
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/lecturers" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <UsersIcon className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-800">{lecturers.length}</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800">Lecturers</h2>
          <p className="text-gray-600 mt-2">Manage faculty members and their details</p>
        </Link>

        <Link to="/schedule" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <CalendarIcon className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-800">Schedule</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800">Class Schedule</h2>
          <p className="text-gray-600 mt-2">Manage course assignments and schedules</p>
        </Link>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <BookOpenIcon className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-gray-800">{courses.length}</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800">Courses</h2>
          <p className="text-gray-600 mt-2">Total available courses in the system</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Link to="/lecturer-availability" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <CheckCircleIcon className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-800">{lecturers.length}</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800">Lecturer Availability</h2>
          <p className="text-gray-600 mt-2">View and manage lecturer availability</p>
        </Link>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Lecturer Availability</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lecturers.map((lecturer) => (
            <div key={lecturer._id} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-gray-800 flex justify-between">
                {lecturer.name}
                <Link to={`/edit-availability/${lecturer._id}`}>
                  <EditIcon className="h-5 w-5 text-blue-500 hover:text-blue-700" />
                </Link>
              </h3>
              <p className="text-gray-600 mb-4">Email: {lecturer.email}</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-md font-semibold text-gray-700 mb-2">Availability</h4>
                <div className="space-y-2">
                  {lecturer.availability && lecturer.availability.length > 0 ? (
                    lecturer.availability.map((slot, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-600">{slot.day}</span>
                        <span className="text-gray-800">{slot.startTime} - {slot.endTime}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No availability set</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
*/
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UsersIcon, CalendarIcon, BookOpenIcon, CheckCircleIcon, EditIcon, ClipboardListIcon } from 'lucide-react';
import axios from 'axios';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [lecturers, setLecturers] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchLecturers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/lecturers');
        setLecturers(response.data);
      } catch (error) {
        console.error('Error fetching lecturers:', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchLecturers();
    fetchCourses();
  }, []);

  const handleLogout = () => {
    navigate('/lecturer-dashboard');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Logout
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/lecturers" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <UsersIcon className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-800">{lecturers.length}</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800">Lecturers</h2>
          <p className="text-gray-600 mt-2">Manage faculty members and their details</p>
        </Link>

        <Link to="/schedule" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <CalendarIcon className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-800">Schedule</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800">Class Schedule</h2>
          <p className="text-gray-600 mt-2">Manage course assignments and schedules</p>
        </Link>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <BookOpenIcon className="h-8 w-8 text-red-600" />
            <span className="text-2xl font-bold text-gray-800">{courses.length}</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800">Courses</h2>
          <p className="text-gray-600 mt-2">Total available courses in the system</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Link to="/lecturer-availability" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <CheckCircleIcon className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-800">{lecturers.length}</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800">Lecturer Availability</h2>
          <p className="text-gray-600 mt-2">View and manage lecturer availability</p>
        </Link>

        <Link to="/lecture-requests" className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <ClipboardListIcon className="h-8 w-8 text-red-500" />
            <span className="text-2xl font-bold text-gray-800">Requests</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800">Lecture Requests</h2>
          <p className="text-gray-600 mt-2">Manage lecture requests from students</p>
        </Link>
      </div>
    </div>
  );
};
