import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 z-40" onClick={onClose}>
      <div
        className="bg-white w-64 h-full p-4"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="font-bold mb-4">Menu</h2>
        <nav className="flex flex-col space-y-2">
          <Link to="/">Home</Link>
          <Link to="/clubs">Clubs</Link>
          <Link to="/events">Events</Link>
          <Link to="/notifications">Notifications</Link>
          <Link to="/profile">Profile</Link>
        </nav>
      </div>
    </div>
  );
}
