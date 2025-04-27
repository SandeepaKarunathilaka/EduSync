/*import React, { useState } from 'react'
import { DownloadIcon, FilterIcon } from 'lucide-react'
import jsPDF from 'jspdf'
const TimetableView = () => {
  const [filter, setFilter] = useState('all')
  // Mock schedule data
  const scheduleData = [
    {
      id: 1,
      course: 'Introduction to Programming',
      day: 'Monday',
      startTime: '09:00',
      endTime: '11:00',
      room: 'CS-101',
      type: 'Lecture',
    },
    {
      id: 2,
      course: 'Data Structures',
      day: 'Monday',
      startTime: '13:00',
      endTime: '15:00',
      room: 'CS-102',
      type: 'Lecture',
    },
    {
      id: 3,
      course: 'Database Systems',
      day: 'Tuesday',
      startTime: '10:00',
      endTime: '12:00',
      room: 'CS-201',
      type: 'Lecture',
    },
    {
      id: 4,
      course: 'Introduction to Programming',
      day: 'Wednesday',
      startTime: '14:00',
      endTime: '16:00',
      room: 'Lab-A',
      type: 'Lab',
    },
    {
      id: 5,
      course: 'Software Engineering',
      day: 'Thursday',
      startTime: '09:00',
      endTime: '12:00',
      room: 'CS-301',
      type: 'Lecture',
    },
    {
      id: 6,
      course: 'Data Structures',
      day: 'Friday',
      startTime: '11:00',
      endTime: '13:00',
      room: 'Lab-B',
      type: 'Lab',
    },
  ]
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const filteredSchedule =
    filter === 'all'
      ? scheduleData
      : scheduleData.filter((item) => item.day === filter)
  const downloadPDF = () => {
    const doc = new jsPDF()
    // Add title
    doc.setFontSize(18)
    doc.text('Lecturer Timetable Schedule', 14, 22)
    // Add lecturer info
    doc.setFontSize(12)
    doc.text('Dr. Jane Smith - Computer Science Department', 14, 32)
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 38)
    // Add schedule items
    let yPos = 50
    // Headers
    doc.setFont(undefined, 'bold')
    doc.text('Course', 14, yPos)
    doc.text('Day', 80, yPos)
    doc.text('Time', 110, yPos)
    doc.text('Room', 150, yPos)
    doc.text('Type', 180, yPos)
    doc.setFont(undefined, 'normal')
    yPos += 10
    // Content
    filteredSchedule.forEach((item) => {
      if (yPos > 270) {
        // Add new page if near bottom
        doc.addPage()
        yPos = 20
      }
      doc.text(item.course, 14, yPos)
      doc.text(item.day, 80, yPos)
      doc.text(`${item.startTime}-${item.endTime}`, 110, yPos)
      doc.text(item.room, 150, yPos)
      doc.text(item.type, 180, yPos)
      yPos += 10
    })
    doc.save('lecturer-timetable.pdf')
  }
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Timetable</h2>
          <p className="text-gray-600">View your weekly teaching schedule</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-md pl-10 pr-4 py-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Days</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-gray-500">
              <FilterIcon size={16} />
            </div>
          </div>
          <button
            onClick={downloadPDF}
            className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            <DownloadIcon size={18} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchedule.length > 0 ? (
                filteredSchedule.map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {schedule.course}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {schedule.day}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {schedule.startTime} - {schedule.endTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {schedule.room}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${schedule.type === 'Lecture' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
                      >
                        {schedule.type}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No schedule found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default TimetableView*/
/*
import React, { useState } from 'react';
import { DownloadIcon, FilterIcon } from 'lucide-react';
import jsPDF from 'jspdf';

const TimetableView = ({ assignments, lecturerId }) => {
  const [filter, setFilter] = useState('all');

  // Filter assignments by lecturerId
  const lecturerSchedule = assignments.filter(
    (assignment) => assignment.lecturerId === lecturerId
  );

  // Mock days for filtering
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Filter schedule by day
  const filteredSchedule =
    filter === 'all'
      ? lecturerSchedule
      : lecturerSchedule.filter((item) => item.day === filter);

  // Helper function to get course name
  const getCourseName = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.name : 'Unknown';
  };

  // Helper function to get room name
  const getRoomName = (roomId) => {
    const room = rooms.find((r) => r.id === roomId);
    return room ? room.name : 'Unknown';
  };

  // Download PDF functionality
  const downloadPDF = () => {
    const doc = new jsPDF();
    // Add title
    doc.setFontSize(18);
    doc.text('Lecturer Timetable Schedule', 14, 22);
    // Add lecturer info
    doc.setFontSize(12);
    doc.text(`Lecturer ID: ${lecturerId}`, 14, 32);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 38);
    // Add schedule items
    let yPos = 50;
    // Headers
    doc.setFont(undefined, 'bold');
    doc.text('Course', 14, yPos);
    doc.text('Day', 80, yPos);
    doc.text('Time', 110, yPos);
    doc.text('Room', 150, yPos);
    doc.text('Type', 180, yPos);
    doc.setFont(undefined, 'normal');
    yPos += 10;
    // Content
    filteredSchedule.forEach((item) => {
      if (yPos > 270) {
        // Add new page if near bottom
        doc.addPage();
        yPos = 20;
      }
      doc.text(getCourseName(item.courseId), 14, yPos);
      doc.text(item.day, 80, yPos);
      doc.text(`${item.startTime}-${item.endTime}`, 110, yPos);
      doc.text(getRoomName(item.roomId), 150, yPos);
      doc.text(item.type, 180, yPos);
      yPos += 10;
    });
    doc.save('lecturer-timetable.pdf');
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Timetable</h2>
          <p className="text-gray-600">View your weekly teaching schedule</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-md pl-10 pr-4 py-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Days</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-gray-500">
              <FilterIcon size={16} />
            </div>
          </div>
          <button
            onClick={downloadPDF}
            className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            <DownloadIcon size={18} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchedule.length > 0 ? (
                filteredSchedule.map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {getCourseName(schedule.courseId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {schedule.day}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {schedule.startTime} - {schedule.endTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getRoomName(schedule.roomId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${schedule.type === 'Lecture' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
                      >
                        {schedule.type}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No schedule found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimetableView;*/
/*
import React, { useState } from 'react';
import { DownloadIcon, FilterIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import { mockCourses, mockRooms } from '../../data/mockData'; // Ensure this path is correct

const TimetableView = ({ assignments = [], lecturerId }) => { // Default assignments to []
  const [filter, setFilter] = useState('all');

  // Filter assignments by lecturerId
  const lecturerSchedule = assignments.filter(
    (assignment) => assignment.lecturerId === lecturerId
  );

  // Mock days for filtering
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Filter schedule by day
  const filteredSchedule =
    filter === 'all'
      ? lecturerSchedule
      : lecturerSchedule.filter((item) => item.day === filter);

  // Helper function to get course name
  const getCourseName = (courseId) => {
    const course = mockCourses.find((c) => c.id === courseId);
    return course ? course.name : 'Unknown';
  };

  // Helper function to get room name
  const getRoomName = (roomId) => {
    const room = mockRooms.find((r) => r.id === roomId);
    return room ? room.name : 'Unknown';
  };

  // Download PDF functionality
  const downloadPDF = () => {
    const doc = new jsPDF();
    // Add title
    doc.setFontSize(18);
    doc.text('Lecturer Timetable Schedule', 14, 22);
    // Add lecturer info
    doc.setFontSize(12);
    doc.text(`Lecturer ID: ${lecturerId}`, 14, 32);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 38);
    // Add schedule items
    let yPos = 50;
    // Headers
    doc.setFont(undefined, 'bold');
    doc.text('Course', 14, yPos);
    doc.text('Day', 80, yPos);
    doc.text('Time', 110, yPos);
    doc.text('Room', 150, yPos);
    doc.text('Type', 180, yPos);
    doc.setFont(undefined, 'normal');
    yPos += 10;
    // Content
    filteredSchedule.forEach((item) => {
      if (yPos > 270) {
        // Add new page if near bottom
        doc.addPage();
        yPos = 20;
      }
      doc.text(getCourseName(item.courseId), 14, yPos);
      doc.text(item.day, 80, yPos);
      doc.text(`${item.startTime}-${item.endTime}`, 110, yPos);
      doc.text(getRoomName(item.roomId), 150, yPos);
      doc.text(item.type, 180, yPos);
      yPos += 10;
    });
    doc.save('lecturer-timetable.pdf');
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Timetable</h2>
          <p className="text-gray-600">View your weekly teaching schedule</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-md pl-10 pr-4 py-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Days</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-gray-500">
              <FilterIcon size={16} />
            </div>
          </div>
          <button
            onClick={downloadPDF}
            className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            <DownloadIcon size={18} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchedule.length > 0 ? (
                filteredSchedule.map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {getCourseName(schedule.courseId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {schedule.day}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {schedule.startTime} - {schedule.endTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getRoomName(schedule.roomId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${schedule.type === 'Lecture' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
                      >
                        {schedule.type}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No schedule found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimetableView;*/


/*
import React, { useState } from 'react';
import { DownloadIcon, FilterIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import { mockCourses, mockRooms, mockTimeSlots, mockLecturers } from '../../data/mockData'; // Import mock data

const TimetableView = ({ assignments = [], lecturerId }) => {
  const [filter, setFilter] = useState('all');

  // Filter assignments by lecturerId
  const lecturerSchedule = assignments.filter(
    (assignment) => assignment.lecturerId === lecturerId
  );

  // Mock days for filtering
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Filter schedule by day
  const filteredSchedule =
    filter === 'all'
      ? lecturerSchedule
      : lecturerSchedule.filter((item) => item.day === filter);

  // Helper function to get course name
  const getCourseName = (courseId) => {
    const course = mockCourses.find((c) => c.id === courseId);
    return course ? course.name : 'Unknown';
  };

  // Helper function to get room name
  const getRoomName = (roomId) => {
    const room = mockRooms.find((r) => r.id === roomId);
    return room ? room.name : 'Unknown';
  };

  // Helper function to get lecturer name
  const getLecturerName = (lecturerId) => {
    const lecturer = mockLecturers.find((l) => l.id === lecturerId);
    return lecturer ? lecturer.name : 'Unknown';
  };

  // Download PDF functionality
  const downloadPDF = () => {
    const doc = new jsPDF();
    // Add title
    doc.setFontSize(18);
    doc.text('Lecturer Timetable Schedule', 14, 22);
    // Add lecturer info
    doc.setFontSize(12);
    doc.text(`Lecturer: ${getLecturerName(lecturerId)}`, 14, 32);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 38);
    // Add schedule items
    let yPos = 50;
    // Headers
    doc.setFont(undefined, 'bold');
    doc.text('Course', 14, yPos);
    doc.text('Day', 80, yPos);
    doc.text('Time', 110, yPos);
    doc.text('Room', 150, yPos);
    doc.text('Type', 180, yPos);
    doc.setFont(undefined, 'normal');
    yPos += 10;
    // Content
    filteredSchedule.forEach((item) => {
      if (yPos > 270) {
        // Add new page if near bottom
        doc.addPage();
        yPos = 20;
      }
      doc.text(getCourseName(item.courseId), 14, yPos);
      doc.text(item.day, 80, yPos);
      doc.text(`${item.startTime}-${item.endTime}`, 110, yPos);
      doc.text(getRoomName(item.roomId), 150, yPos);
      doc.text(item.type, 180, yPos);
      yPos += 10;
    });
    doc.save('lecturer-timetable.pdf');
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Timetable</h2>
          <p className="text-gray-600">View your weekly teaching schedule</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-md pl-10 pr-4 py-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Days</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-gray-500">
              <FilterIcon size={16} />
            </div>
          </div>
          <button
            onClick={downloadPDF}
            className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            <DownloadIcon size={18} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchedule.length > 0 ? (
                filteredSchedule.map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {getCourseName(schedule.courseId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {schedule.day}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {schedule.startTime} - {schedule.endTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getRoomName(schedule.roomId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${schedule.type === 'Lecture' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
                      >
                        {schedule.type}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No schedule found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimetableView;*/
/*
import React, { useState } from 'react';
import { DownloadIcon, FilterIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import { mockCourses, mockRooms } from '../../data/mockData'; // Import mock data

const TimetableView = ({ assignments = [], lecturerId }) => {
  const [filter, setFilter] = useState('all');

  // Filter assignments by lecturerId
  const lecturerSchedule = assignments.filter(
    (assignment) => assignment.lecturerId === lecturerId
  );

  // Mock days for filtering
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Filter schedule by day
  const filteredSchedule =
    filter === 'all'
      ? lecturerSchedule
      : lecturerSchedule.filter((item) => item.day === filter);

  // Helper function to get course name
  const getCourseName = (courseId) => {
    const course = mockCourses.find((c) => c.id === courseId);
    return course ? course.name : 'Unknown';
  };

  // Helper function to get room name
  const getRoomName = (roomId) => {
    const room = mockRooms.find((r) => r.id === roomId);
    return room ? room.name : 'Unknown';
  };

  // Download PDF functionality
  const downloadPDF = () => {
    const doc = new jsPDF();
    // Add title
    doc.setFontSize(18);
    doc.text('Lecturer Timetable Schedule', 14, 22);
    // Add lecturer info
    doc.setFontSize(12);
    doc.text(`Lecturer ID: ${lecturerId}`, 14, 32);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 38);
    // Add schedule items
    let yPos = 50;
    // Headers
    doc.setFont(undefined, 'bold');
    doc.text('Course', 14, yPos);
    doc.text('Day', 80, yPos);
    doc.text('Time', 110, yPos);
    doc.text('Room', 150, yPos);
    doc.text('Type', 180, yPos);
    doc.setFont(undefined, 'normal');
    yPos += 10;
    // Content
    filteredSchedule.forEach((item) => {
      if (yPos > 270) {
        // Add new page if near bottom
        doc.addPage();
        yPos = 20;
      }
      doc.text(getCourseName(item.courseId), 14, yPos);
      doc.text(item.day, 80, yPos);
      doc.text(`${item.startTime}-${item.endTime}`, 110, yPos);
      doc.text(getRoomName(item.roomId), 150, yPos);
      doc.text(item.type, 180, yPos);
      yPos += 10;
    });
    doc.save('lecturer-timetable.pdf');
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Timetable</h2>
          <p className="text-gray-600">View your weekly teaching schedule</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-md pl-10 pr-4 py-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Days</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-gray-500">
              <FilterIcon size={16} />
            </div>
          </div>
          <button
            onClick={downloadPDF}
            className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            <DownloadIcon size={18} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchedule.length > 0 ? (
                filteredSchedule.map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {getCourseName(schedule.courseId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {schedule.day}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {schedule.startTime} - {schedule.endTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getRoomName(schedule.roomId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${schedule.type === 'Lecture' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
                      >
                        {schedule.type}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No schedule found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimetableView;
*//*
import React, { useState } from 'react';
import { DownloadIcon, FilterIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import { mockCourses, mockRooms } from '../../data/mockData';

const TimetableView = ({ assignments = [], lecturerId }) => {
  const [filter, setFilter] = useState('all');

  // Filter assignments by lecturerId
  const lecturerSchedule = assignments.filter(
    (assignment) => assignment.lecturerId === lecturerId
  );

  // Mock days for filtering
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Filter schedule by day
  const filteredSchedule =
    filter === 'all'
      ? lecturerSchedule
      : lecturerSchedule.filter((item) => item.day === filter);

  // Helper function to get course name
  const getCourseName = (courseId) => {
    const course = mockCourses.find((c) => c.id === courseId);
    return course ? course.name : 'Unknown';
  };

  // Helper function to get room name
  const getRoomName = (roomId) => {
    const room = mockRooms.find((r) => r.id === roomId);
    return room ? room.name : 'Unknown';
  };

  // Download PDF functionality
  const downloadPDF = () => {
    const doc = new jsPDF();
    // Add title
    doc.setFontSize(18);
    doc.text('Lecturer Timetable Schedule', 14, 22);
    // Add lecturer info
    doc.setFontSize(12);
    doc.text(`Lecturer ID: ${lecturerId}`, 14, 32);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 38);
    // Add schedule items
    let yPos = 50;
    // Headers
    doc.setFont(undefined, 'bold');
    doc.text('Course', 14, yPos);
    doc.text('Day', 80, yPos);
    doc.text('Time', 110, yPos);
    doc.text('Room', 150, yPos);
    doc.text('Type', 180, yPos);
    doc.setFont(undefined, 'normal');
    yPos += 10;
    // Content
    filteredSchedule.forEach((item) => {
      if (yPos > 270) {
        // Add new page if near bottom
        doc.addPage();
        yPos = 20;
      }
      doc.text(getCourseName(item.courseId), 14, yPos);
      doc.text(item.day, 80, yPos);
      doc.text(`${item.startTime}-${item.endTime}`, 110, yPos);
      doc.text(getRoomName(item.roomId), 150, yPos);
      doc.text(item.type, 180, yPos);
      yPos += 10;
    });
    doc.save('lecturer-timetable.pdf');
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Timetable</h2>
          <p className="text-gray-600">View your weekly teaching schedule</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-md pl-10 pr-4 py-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Days</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-gray-500">
              <FilterIcon size={16} />
            </div>
          </div>
          <button
            onClick={downloadPDF}
            className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            <DownloadIcon size={18} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchedule.length > 0 ? (
                filteredSchedule.map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {getCourseName(schedule.courseId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {schedule.day}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {schedule.startTime} - {schedule.endTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getRoomName(schedule.roomId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${schedule.type === 'Lecture' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
                      >
                        {schedule.type}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No schedule found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimetableView;*/
import React, { useState } from 'react';
import { DownloadIcon, FilterIcon } from 'lucide-react';
import jsPDF from 'jspdf';
import { mockCourses, mockRooms } from '../../data/mockData';

const TimetableView = ({ assignments = [], lecturerId }) => {
  const [dayFilter, setDayFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Filter assignments by lecturerId
  const lecturerSchedule = assignments.filter(
    (assignment) => assignment.lecturerId === lecturerId
  );

  // Mock days for filtering
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Mock courses for filtering
  const courses = mockCourses.map((course) => ({
    id: course.id,
    name: course.name,
  }));

  // Mock types for filtering
  const types = ['Lecture', 'Lab', 'Tutorial'];

  // Filter schedule by day, course, and type
  const filteredSchedule = lecturerSchedule.filter((item) => {
    const matchesDay = dayFilter === 'all' || item.day === dayFilter;
    const matchesCourse = courseFilter === 'all' || item.courseId === courseFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesDay && matchesCourse && matchesType;
  });

  // Helper function to get course name
  const getCourseName = (courseId) => {
    const course = mockCourses.find((c) => c.id === courseId);
    return course ? course.name : 'Unknown';
  };

  // Helper function to get room name
  const getRoomName = (roomId) => {
    const room = mockRooms.find((r) => r.id === roomId);
    return room ? room.name : 'Unknown';
  };

  // Download PDF functionality
  const downloadPDF = () => {
    const doc = new jsPDF();
    // Add title
    doc.setFontSize(18);
    doc.text('Lecturer Timetable Schedule', 14, 22);
    // Add lecturer info
    doc.setFontSize(12);
    doc.text(`Lecturer ID: ${lecturerId}`, 14, 32);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 38);
    // Add schedule items
    let yPos = 50;
    // Headers
    doc.setFont(undefined, 'bold');
    doc.text('Course', 14, yPos);
    doc.text('Day', 80, yPos);
    doc.text('Time', 110, yPos);
    doc.text('Room', 150, yPos);
    doc.text('Type', 180, yPos);
    doc.setFont(undefined, 'normal');
    yPos += 10;
    // Content
    filteredSchedule.forEach((item) => {
      if (yPos > 270) {
        // Add new page if near bottom
        doc.addPage();
        yPos = 20;
      }
      doc.text(getCourseName(item.courseId), 14, yPos);
      doc.text(item.day, 80, yPos);
      doc.text(`${item.startTime}-${item.endTime}`, 110, yPos);
      doc.text(getRoomName(item.roomId), 150, yPos);
      doc.text(item.type, 180, yPos);
      yPos += 10;
    });
    doc.save('lecturer-timetable.pdf');
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Timetable</h2>
          <p className="text-gray-600">View your weekly teaching schedule</p>
        </div>
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-md pl-10 pr-4 py-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={dayFilter}
              onChange={(e) => setDayFilter(e.target.value)}
            >
              <option value="all">All Days</option>
              {days.map((day) => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-gray-500">
              <FilterIcon size={16} />
            </div>
          </div>
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-md pl-10 pr-4 py-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
            >
              <option value="all">All Courses</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-gray-500">
              <FilterIcon size={16} />
            </div>
          </div>
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-md pl-10 pr-4 py-2 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3 text-gray-500">
              <FilterIcon size={16} />
            </div>
          </div>
          <button
            onClick={downloadPDF}
            className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            <DownloadIcon size={18} />
            <span>Download PDF</span>
          </button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Day
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-blue-800 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchedule.length > 0 ? (
                filteredSchedule.map((schedule) => (
                  <tr key={schedule.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {getCourseName(schedule.courseId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {schedule.day}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {schedule.startTime} - {schedule.endTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {getRoomName(schedule.roomId)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${schedule.type === 'Lecture' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}
                      >
                        {schedule.type}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    No schedule found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TimetableView;