import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Segments from './module/dashboard/components/segments';
import Login from './module/auth/screens';
import AdminApp from './AdminApp.tsx'; // Assuming this is your Admin app component

// Fake authentication function
const isAuthenticated = () => {
  // Replace with actual authentication logic
  return !!localStorage.getItem('authToken');
};

// Protected Route Component
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

// Main Router Component
const AppRouter = () => (
  <Routes>
    {/* Unprotected Routes */}
    <Route path="/login" element={<Login />} />

    {/* Protected Routes */}
    <Route path="/" element={<ProtectedRoute element={<AdminApp />} />} />
    <Route path="/segments" element={<ProtectedRoute element={<Segments />} />} />

    {/* Catch-all Route */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRouter;
