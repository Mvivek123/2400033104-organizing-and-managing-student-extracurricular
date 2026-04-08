import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RoleProtectedRoute({ children, roles }) {
  const auth = useAuth();
  const username = auth.user?.name || auth.user?.username || auth.user?.userName;
  if (!username) {
    return <Navigate to="/login" replace />;
  }
  if (roles && !roles.includes(auth.user.role)) {
    return <Navigate to="/" replace />; // unauthorized
  }
  return children;
}