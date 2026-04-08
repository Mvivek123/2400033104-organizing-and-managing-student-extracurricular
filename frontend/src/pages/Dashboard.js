import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useClubs } from '../context/ClubsContext';
import { useEvents } from '../context/EventsContext';
import { useNotifications } from '../context/NotificationsContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const { clubs = [] } = useClubs();
  const { events = [] } = useEvents();
  const { notifications = [] } = useNotifications();
  const navigate = useNavigate();

  const username = user?.name || user?.username || user?.userName;

  // ✅ SAFE FILTERS
  const joinedClubs = (clubs || []).filter(
    c => (c.members || []).includes(username)
  );

  const upcomingEvents = (events || []).filter(
    e => (e.participants || []).includes(username)
  );

  const unreadNotifications = (notifications || []).filter(
    n => !n.read
  );

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-2">
        Welcome back, {user?.username || "User"}!
      </h1>

      <p className="text-gray-600 mb-6">
        Here's what's happening with your extracurricular activities
      </p>

      {/* stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

        <div className="bg-white rounded shadow p-4 flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Joined Clubs</p>
            <p className="text-2xl font-bold">{joinedClubs.length}</p>
          </div>
          <span className="text-indigo-500 text-3xl">👥</span>
        </div>

        <div className="bg-white rounded shadow p-4 flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Upcoming Events</p>
            <p className="text-2xl font-bold">{upcomingEvents.length}</p>
          </div>
          <span className="text-green-500 text-3xl">📅</span>
        </div>

        <div className="bg-white rounded shadow p-4 flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Notifications</p>
            <p className="text-2xl font-bold">{unreadNotifications.length}</p>
          </div>
          <span className="text-yellow-500 text-3xl">🔔</span>
        </div>

        <div className="bg-white rounded shadow p-4 flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Badges Earned</p>
            <p className="text-2xl font-bold">0</p>
          </div>
          <span className="text-purple-500 text-3xl">🏆</span>
        </div>

      </div>

      {/* actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">

        <div
          onClick={() => navigate('/clubs')}
          className="cursor-pointer bg-indigo-500 text-white p-6 rounded"
        >
          <h2 className="text-xl font-semibold">Explore Clubs</h2>
          <p className="text-sm">Discover new communities</p>
        </div>

        <div
          onClick={() => navigate('/events')}
          className="cursor-pointer bg-green-500 text-white p-6 rounded"
        >
          <h2 className="text-xl font-semibold">Create Event</h2>
          <p className="text-sm">Organize an activity</p>
        </div>

      </div>

      {/* lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Events */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>

          {upcomingEvents.length === 0 ? (
            <p className="text-gray-500">No events yet.</p>
          ) : (
            upcomingEvents.slice(0, 3).map(ev => (
              <div key={ev.id} className="bg-white p-4 mb-2 shadow rounded">
                <p className="font-semibold">{ev.title}</p>
                <p className="text-sm text-gray-600">
                  📅 {ev.date || "TBD"} • ⏰ {ev.time || "TBD"}
                </p>
                <p className="text-sm text-gray-600">
                  📍 {ev.venue || "TBD"}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Clubs */}
        <div>
          <h3 className="text-lg font-semibold mb-4">My Clubs</h3>

          {joinedClubs.length === 0 ? (
            <p className="text-gray-500">You haven't joined any clubs.</p>
          ) : (
            joinedClubs.slice(0, 3).map(c => (
              <div key={c.id} className="bg-white p-4 mb-2 shadow rounded">
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-gray-600">
                  {(c.members || []).length} members
                </p>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}