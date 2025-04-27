/*
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { Lecturers } from './components/Lecturers';
import { SchedulingDashboard } from './components/SchedulingDashboard';
import LecturerDashboard from './components/lecturer/LecturerDashboard';

export function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

function MainLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      
      {location.pathname !== '/lecturer-dashboard' && <Navigation />}
      
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/lecturers" element={<Lecturers />} />
        <Route path="/schedule" element={<SchedulingDashboard />} />
        <Route path="/lecturer-dashboard" element={<LecturerDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
*/
import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import Lecturers from './components/Lecturers'; // Default import (no curly braces)
import { SchedulingDashboard } from './components/SchedulingDashboard';
import LecturerDashboard from './components/lecturer/LecturerDashboard';

export function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

function MainLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {location.pathname !== '/lecturer-dashboard' && <Navigation />}

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/lecturers" element={<Lecturers />} />
        <Route path="/schedule" element={<SchedulingDashboard />} />
        <Route path="/lecturer-dashboard" element={<LecturerDashboard />} />
      </Routes>
    </div>
  );
}

export default App;