import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Clubs from './pages/Clubs';
import ClubDetails from './pages/ClubDetails';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import CreateEditEvent from './pages/CreateEditEvent';
import NotificationsPage from './pages/Notifications';
import Profile from './pages/Profile';

// components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import RoleProtectedRoute from './components/RoleProtectedRoute';

// context providers
import { AuthProvider } from './context/AuthContext';
import { ClubsProvider } from './context/ClubsContext';
import { EventsProvider } from './context/EventsContext';
import { NotificationsProvider } from './context/NotificationsContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ClubsProvider>
          <EventsProvider>
            <NotificationsProvider>
              <Navbar />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/clubs"
                  element={
                    <ProtectedRoute>
                      <Clubs />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/clubs/:id"
                  element={
                    <ProtectedRoute>
                      <ClubDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/events"
                  element={
                    <ProtectedRoute>
                      <Events />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/events/:id"
                  element={
                    <ProtectedRoute>
                      <EventDetails />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/events/create"
                  element={
                    <RoleProtectedRoute roles={[ 'admin' ]}>
                      <CreateEditEvent />
                    </RoleProtectedRoute>
                  }
                />
                <Route
                  path="/notifications"
                  element={
                    <ProtectedRoute>
                      <NotificationsPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </NotificationsProvider>
          </EventsProvider>
        </ClubsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
