import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const auth = useAuth();
  const username = auth.user?.name || auth.user?.username || auth.user?.userName;
  if (!username) {
    return <Navigate to="/login" replace />;
  }
  return children;
}