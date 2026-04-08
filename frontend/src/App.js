import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
              <div className="min-h-screen bg-slate-50 text-slate-900">
                <Navbar />
                <main className="app-main">
                  <div className="main-container">
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
                          <RoleProtectedRoute roles={['admin']}>
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
                  </div>
                </main>
                <footer className="app-footer">
                  <div className="main-container flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                    <p>CampusConnect © 2026. Designed for campus teams, events, and calm workflows.</p>
                    <div className="footer-links flex flex-wrap gap-4 text-slate-500 text-sm">
                      <span>Build a better student experience</span>
                      <span>Clear navigation • Responsive UI • Accessible forms</span>
                    </div>
                  </div>
                </footer>
              </div>
            </NotificationsProvider>
          </EventsProvider>
        </ClubsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
