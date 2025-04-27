 import React from 'react';


import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, UsersIcon, CalendarIcon } from 'lucide-react';

export const Navigation = () => {
  const location = useLocation();

  // Remove TypeScript-style type annotation (: string)
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-blue-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-1">
            <h1 className="text-xl font-bold text-white">Admin  System</h1>
          </div>
          <div className="flex space-x-4">
            <Link
              to="/"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/') ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }`}
            >
              <HomeIcon className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
            <Link
              to="/lecturers"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/lecturers') ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700 hover:text-white'
              }`}
            >
              <UsersIcon className="h-4 w-4 mr-2" />
              Lecturers
            </Link>
            <Link
              to="/schedule"
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/schedule') ? 'bg-blue-700 text-white' : 'text-blue-200 hover:bg-blue-800 hover:text-white'
              }`}
            >
              <CalendarIcon className="h-4 w-4 mr-2" />
              Schedule
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
 