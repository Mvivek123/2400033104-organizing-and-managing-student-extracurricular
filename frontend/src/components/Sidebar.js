import React from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="sidebar-backdrop" onClick={onClose}>
      <div className="sidebar-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="sidebar-header">
          <div>
            <p className="text-lg font-semibold">CampusConnect</p>
            <p className="text-sm text-slate-500">Quick navigation</p>
          </div>
          <button onClick={onClose} className="close-button" aria-label="Close navigation menu">×</button>
        </div>

        <nav className="sidebar-nav">
          <Link to="/" onClick={onClose}>Home</Link>
          <Link to="/clubs" onClick={onClose}>Clubs</Link>
          <Link to="/events" onClick={onClose}>Events</Link>
          <Link to="/notifications" onClick={onClose}>Notifications</Link>
          <Link to="/profile" onClick={onClose}>Profile</Link>
        </nav>
      </div>
    </div>
  );
}
