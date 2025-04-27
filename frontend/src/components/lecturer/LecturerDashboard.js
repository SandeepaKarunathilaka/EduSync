/* import React, { useState } from 'react'
import {
  CalendarIcon,
  ClockIcon,
  FileTextIcon,
  MessageSquareIcon,
  UserIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
} from 'lucide-react'
import TimetableView from '../components/lecturer/TimetableView'
import RequestForm from '../components/lecturer/RequestForm'
import AvailabilityForm from '../components/lecturer/AvailabilityForm'
const LecturerDashboard = () => {
  const [activeTab, setActiveTab] = useState('timetable')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  // Mock lecturer data
  const lecturer = {
    name: 'Dr. Jane Smith',
    department: 'Computer Science',
    id: 'LEC-2023-001',
  }
  const renderContent = () => {
    switch (activeTab) {
      case 'timetable':
        return <TimetableView />
      case 'availability':
        return <AvailabilityForm />
      case 'requests':
        return <RequestForm />
      default:
        return <TimetableView />
    }
  }
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header *//*
      <header className="bg-blue-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button
              className="md:hidden text-white"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
            <h1 className="text-xl font-bold">Lecturer Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="font-medium">{lecturer.name}</p>
              <p className="text-sm text-blue-100">{lecturer.department}</p>
            </div>
            <div className="bg-blue-800 rounded-full p-2">
              <UserIcon size={20} />
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
    
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b">
                <p className="font-bold">{lecturer.name}</p>
                <p className="text-sm text-gray-600">{lecturer.id}</p>
              </div>
              <nav className="p-4">
                <SidebarContent
                  activeTab={activeTab}
                  setActiveTab={(tab) => {
                    setActiveTab(tab)
                    setSidebarOpen(false)
                  }}
                />
              </nav>
            </div>
          </div>
        )}
       
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200 p-4">
          <div className="mb-6 pb-4 border-b">
            <p className="font-bold">{lecturer.name}</p>
            <p className="text-sm text-gray-600">{lecturer.id}</p>
          </div>
          <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab} />
        </aside>
        
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  )
}
const SidebarContent = ({ activeTab, setActiveTab }) => {
  const navItems = [
    {
      id: 'timetable',
      label: 'My Timetable',
      icon: <CalendarIcon size={18} />,
    },
    {
      id: 'availability',
      label: 'Update Availability',
      icon: <ClockIcon size={18} />,
    },
    {
      id: 'requests',
      label: 'Submit Request',
      icon: <MessageSquareIcon size={18} />,
    },
  ]
  return (
    <>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left transition-colors ${activeTab === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <span
                  className={
                    activeTab === item.id ? 'text-blue-700' : 'text-gray-500'
                  }
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-6 border-t mt-6">
        <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left text-gray-700 hover:bg-gray-100">
          <span className="text-gray-500">
            <LogOutIcon size={18} />
          </span>
          <span>Logout</span>
        </button>
      </div>
    </>
  )
}
export default LecturerDashboard
 */
/*
import React, { useState } from 'react'
import {
  CalendarIcon,
  ClockIcon,
  MessageSquareIcon,
  UserIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
} from 'lucide-react'
import TimetableView from './TimetableView'
import RequestForm from './RequestForm'
import AvailabilityForm from './AvailabilityForm'

const LecturerDashboard = () => {
  const [activeTab, setActiveTab] = useState('timetable')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Mock lecturer data
  const lecturer = {
    name: 'Dr. Jane Smith',
    department: 'Computer Science',
    id: 'LEC-2023-001',
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'timetable':
        return <TimetableView />
      case 'availability':
        return <AvailabilityForm />
      case 'requests':
        return <RequestForm />
      default:
        return <TimetableView />
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      <header className="bg-blue-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button
              className="md:hidden text-white"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
            <h1 className="text-xl font-bold">Lecturer Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="font-medium">{lecturer.name}</p>
              <p className="text-sm text-blue-100">{lecturer.department}</p>
            </div>
            <div className="bg-blue-800 rounded-full p-2">
              <UserIcon size={20} />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
       
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b">
                <p className="font-bold">{lecturer.name}</p>
                <p className="text-sm text-gray-600">{lecturer.id}</p>
              </div>
              <nav className="p-4">
                <SidebarContent
                  activeTab={activeTab}
                  setActiveTab={(tab) => {
                    setActiveTab(tab)
                    setSidebarOpen(false)
                  }}
                />
              </nav>
            </div>
          </div>
        )}

        
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200 p-4">
          <div className="mb-6 pb-4 border-b">
            <p className="font-bold">{lecturer.name}</p>
            <p className="text-sm text-gray-600">{lecturer.id}</p>
          </div>
          <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab} />
        </aside>

        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  )
}

const SidebarContent = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'timetable', label: 'My Timetable', icon: <CalendarIcon size={18} /> },
    { id: 'availability', label: 'Update Availability', icon: <ClockIcon size={18} /> },
    { id: 'requests', label: 'Submit Request', icon: <MessageSquareIcon size={18} /> },
  ]

  return (
    <>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left transition-colors ${
                  activeTab === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className={activeTab === item.id ? 'text-blue-700' : 'text-gray-500'}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-6 border-t">
        <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left text-gray-700 hover:bg-gray-100">
          <span className="text-gray-500">
            <LogOutIcon size={18} />
          </span>
          <span>Logout</span>
        </button>
      </div>
    </>
  )
}

export default LecturerDashboard*/




/*correct
import React, { useState } from 'react';
import {
  CalendarIcon,
  ClockIcon,
  MessageSquareIcon,
  UserIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
} from 'lucide-react';
import TimetableView from './TimetableView';
import RequestForm from './RequestForm';
import AvailabilityForm from './AvailabilityForm';
import { mockAssignments } from '../../data/mockData'; // Import mock assignments

const LecturerDashboard = () => {
  const [activeTab, setActiveTab] = useState('timetable');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock lecturer data
  const lecturer = {
    name: 'Dr. Jane Smith',
    department: 'Computer Science',
    id: 'LEC-2023-001',
  };

  // Mock assignments data (replace with real data or fetch from an API)
  const assignments = mockAssignments;

  const renderContent = () => {
    switch (activeTab) {
      case 'timetable':
        return <TimetableView assignments={assignments} lecturerId={lecturer.id} />;
      case 'availability':
        return <AvailabilityForm />;
      case 'requests':
        return <RequestForm />;
      default:
        return <TimetableView assignments={assignments} lecturerId={lecturer.id} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
     
      <header className="bg-blue-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button
              className="md:hidden text-white"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
            <h1 className="text-xl font-bold">Lecturer Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="font-medium">{lecturer.name}</p>
              <p className="text-sm text-blue-100">{lecturer.department}</p>
            </div>
            <div className="bg-blue-800 rounded-full p-2">
              <UserIcon size={20} />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
       
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b">
                <p className="font-bold">{lecturer.name}</p>
                <p className="text-sm text-gray-600">{lecturer.id}</p>
              </div>
              <nav className="p-4">
                <SidebarContent
                  activeTab={activeTab}
                  setActiveTab={(tab) => {
                    setActiveTab(tab);
                    setSidebarOpen(false);
                  }}
                />
              </nav>
            </div>
          </div>
        )}

       
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200 p-4">
          <div className="mb-6 pb-4 border-b">
            <p className="font-bold">{lecturer.name}</p>
            <p className="text-sm text-gray-600">{lecturer.id}</p>
          </div>
          <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab} />
        </aside>

        
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

const SidebarContent = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'timetable', label: 'My Timetable', icon: <CalendarIcon size={18} /> },
    { id: 'availability', label: 'Update Availability', icon: <ClockIcon size={18} /> },
    { id: 'requests', label: 'Submit Request', icon: <MessageSquareIcon size={18} /> },
  ];

  return (
    <>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left transition-colors ${
                  activeTab === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className={activeTab === item.id ? 'text-blue-700' : 'text-gray-500'}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-6 border-t">
        <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left text-gray-700 hover:bg-gray-100">
          <span className="text-gray-500">
            <LogOutIcon size={18} />
          </span>
          <span>Logout</span>
        </button>
      </div>
    </>
  );
};

export default LecturerDashboard;

*/
/*
import React, { useState } from 'react';
import {
  CalendarIcon,
  ClockIcon,
  MessageSquareIcon,
  UserIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
  DownloadIcon,
  FilterIcon,
} from 'lucide-react';
import { mockAssignments, mockCourses, mockRooms, mockLecturers } from '../../data/mockData'; // Import mock data

const LecturerDashboard = () => {
  const [activeTab, setActiveTab] = useState('timetable');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock lecturer data (replace with dynamic data if needed)
  const lecturer = {
    id: '1', // Dr. Emma Johnson
    name: 'Dr. Emma Johnson',
    department: 'Computer Science',
  };

  // Filter assignments by lecturerId
  const lecturerAssignments = mockAssignments.filter(
    (assignment) => assignment.lecturerId === lecturer.id
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'timetable':
        return (
          <TimetableView
            assignments={lecturerAssignments}
            lecturerId={lecturer.id}
          />
        );
      case 'availability':
        return <AvailabilityForm />;
      case 'requests':
        return <RequestForm />;
      default:
        return (
          <TimetableView
            assignments={lecturerAssignments}
            lecturerId={lecturer.id}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      <header className="bg-blue-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button
              className="md:hidden text-white"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
            <h1 className="text-xl font-bold">Lecturer Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="font-medium">{lecturer.name}</p>
              <p className="text-sm text-blue-100">{lecturer.department}</p>
            </div>
            <div className="bg-blue-800 rounded-full p-2">
              <UserIcon size={20} />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
 
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b">
                <p className="font-bold">{lecturer.name}</p>
                <p className="text-sm text-gray-600">{lecturer.id}</p>
              </div>
              <nav className="p-4">
                <SidebarContent
                  activeTab={activeTab}
                  setActiveTab={(tab) => {
                    setActiveTab(tab);
                    setSidebarOpen(false);
                  }}
                />
              </nav>
            </div>
          </div>
        )}

       
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200 p-4">
          <div className="mb-6 pb-4 border-b">
            <p className="font-bold">{lecturer.name}</p>
            <p className="text-sm text-gray-600">{lecturer.id}</p>
          </div>
          <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab} />
        </aside>

        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

const SidebarContent = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'timetable', label: 'My Timetable', icon: <CalendarIcon size={18} /> },
    { id: 'availability', label: 'Update Availability', icon: <ClockIcon size={18} /> },
    { id: 'requests', label: 'Submit Request', icon: <MessageSquareIcon size={18} /> },
  ];

  return (
    <>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left transition-colors ${
                  activeTab === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className={activeTab === item.id ? 'text-blue-700' : 'text-gray-500'}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-6 border-t">
        <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left text-gray-700 hover:bg-gray-100">
          <span className="text-gray-500">
            <LogOutIcon size={18} />
          </span>
          <span>Logout</span>
        </button>
      </div>
    </>
  );
};

export default LecturerDashboard;
*/

import React, { useState } from 'react';
import {
  CalendarIcon,
  ClockIcon,
  MessageSquareIcon,
  UserIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
} from 'lucide-react';
import TimetableView from './TimetableView'; // Import TimetableView
import AvailabilityForm from './AvailabilityForm'; // Import AvailabilityForm
import RequestForm from './RequestForm'; // Import RequestForm
import { mockAssignments, mockLecturers } from '../../data/mockData'; // Import mock data

const LecturerDashboard = () => {
  const [activeTab, setActiveTab] = useState('timetable');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Mock lecturer data
  const lecturer = {
    id: '1', // Dr. Emma Johnson
    name: 'Dr. Emma Johnson',
    department: 'Computer Science',
  };

  // Filter assignments by lecturerId
  const lecturerAssignments = mockAssignments.filter(
    (assignment) => assignment.lecturerId === lecturer.id
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'timetable':
        return (
          <TimetableView
            assignments={lecturerAssignments}
            lecturerId={lecturer.id}
          />
        );
      case 'availability':
        return <AvailabilityForm />;
      case 'requests':
        return <RequestForm />;
      default:
        return (
          <TimetableView
            assignments={lecturerAssignments}
            lecturerId={lecturer.id}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button
              className="md:hidden text-white"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
            <h1 className="text-xl font-bold">Lecturer Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="font-medium">{lecturer.name}</p>
              <p className="text-sm text-blue-100">{lecturer.department}</p>
            </div>
            <div className="bg-blue-800 rounded-full p-2">
              <UserIcon size={20} />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b">
                <p className="font-bold">{lecturer.name}</p>
                <p className="text-sm text-gray-600">{lecturer.id}</p>
              </div>
              <nav className="p-4">
                <SidebarContent
                  activeTab={activeTab}
                  setActiveTab={(tab) => {
                    setActiveTab(tab);
                    setSidebarOpen(false);
                  }}
                />
              </nav>
            </div>
          </div>
        )}

        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 bg-white border-r border-gray-200 p-4">
          <div className="mb-6 pb-4 border-b">
            <p className="font-bold">{lecturer.name}</p>
            <p className="text-sm text-gray-600">{lecturer.id}</p>
          </div>
          <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{renderContent()}</main>
      </div>
    </div>
  );
};

const SidebarContent = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'timetable', label: 'My Timetable', icon: <CalendarIcon size={18} /> },
    { id: 'availability', label: 'Update Availability', icon: <ClockIcon size={18} /> },
    { id: 'requests', label: 'Submit Request', icon: <MessageSquareIcon size={18} /> },
  ];

  return (
    <>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left transition-colors ${
                  activeTab === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className={activeTab === item.id ? 'text-blue-700' : 'text-gray-500'}>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-6 border-t">
        <button className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-left text-gray-700 hover:bg-gray-100">
          <span className="text-gray-500">
            <LogOutIcon size={18} />
          </span>
          <span>Logout</span>
        </button>
      </div>
    </>
  );
};

export default LecturerDashboard;





