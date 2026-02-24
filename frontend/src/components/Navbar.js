import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';

export default function Navbar() {
  const auth = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            CampusConnect
          </Link>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>
        </div>
        <div className="hidden md:flex items-center space-x-4">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <Link to="/clubs" className="hover:underline">
          Clubs
        </Link>
        <Link to="/events" className="hover:underline">
          Events
        </Link>
        <Link to="/notifications" className="hover:underline">
          Notifications
        </Link>
        <Link to="/profile" className="hover:underline">
          Profile
        </Link>
        {auth.user && auth.user.role === 'admin' && (
          <Link to="/events/create" className="bg-white text-indigo-600 px-3 py-1 rounded">
            Create Event
          </Link>
        )}
        {auth.user ? (
          <button onClick={auth.logout} className="hover:underline">
            Logout
          </button>
        ) : (
          <Link to="/login" className="hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
    <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}