import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';

export default function Navbar() {
  const auth = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: 'Home', to: '/' },
    { label: 'Clubs', to: '/clubs' },
    { label: 'Events', to: '/events' },
    { label: 'Notifications', to: '/notifications' },
    { label: 'Profile', to: '/profile' }
  ];

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
          <Link to="/" className="flex items-center gap-3">
            <div className="brand-mark">CC</div>
            <div>
              <p className="brand-title">CampusConnect</p>
              <p className="brand-subtitle">Campus community made simple</p>
            </div>
          </Link>

          <button
            className="menu-toggle md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            ☰
          </button>

          <nav className="hidden md:flex items-center gap-3">
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            {auth.user && auth.user.role === 'admin' && (
              <Link to="/events/create" className="nav-action-button">
                Create Event
              </Link>
            )}
            {auth.user ? (
              <button onClick={auth.logout} className="nav-link nav-button">
                Logout
              </button>
            ) : (
              <Link to="/login" className="nav-link nav-button nav-button-secondary">
                Login
              </Link>
            )}
          </nav>
        </div>
      </header>
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}