import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useClubs } from '../context/ClubsContext';
import { useEvents } from '../context/EventsContext';
import { useNotifications } from '../context/NotificationsContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const { clubs } = useClubs();
  const { events } = useEvents();
  const { notifications } = useNotifications();
  const navigate = useNavigate();

  const joinedClubs = clubs.filter(c => c.members.includes(user?.name));
  const upcomingEvents = events.filter(e =>
    e.participants.includes(user?.name)
  );
  const unreadNotifications = notifications.filter(n => !n.read);

  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold mb-2">
        Welcome back, {user?.name}!
      </h1>
      <p className="text-gray-600 mb-6">Here's what's happening with your extracurricular activities</p>

      {/* stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Joined Clubs</p>
            <p className="text-2xl font-bold">{joinedClubs.length}</p>
          </div>
          <span className="text-indigo-500 text-3xl">👥</span>
        </div>
        <div className="bg-white rounded shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Upcoming Events</p>
            <p className="text-2xl font-bold">{upcomingEvents.length}</p>
          </div>
          <span className="text-green-500 text-3xl">📅</span>
        </div>
        <div className="bg-white rounded shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Notifications</p>
            <p className="text-2xl font-bold">{unreadNotifications.length}</p>
          </div>
          <span className="text-yellow-500 text-3xl">🔔</span>
        </div>
        <div className="bg-white rounded shadow p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Badges Earned</p>
            <p className="text-2xl font-bold">0</p>
          </div>
          <span className="text-purple-500 text-3xl">🏆</span>
        </div>
      </div>

      {/* action cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div
          onClick={() => navigate('/clubs')}
          className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-lg flex items-center justify-between"
        >
          <div>
            <h2 className="text-xl font-semibold">Explore Clubs</h2>
            <p className="text-sm">Discover new communities</p>
          </div>
          <span className="text-4xl">＋</span>
        </div>
        <div
          onClick={() => navigate('/events')}
          className="cursor-pointer bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-lg flex items-center justify-between"
        >
          <div>
            <h2 className="text-xl font-semibold">Create Event</h2>
            <p className="text-sm">Organize an activity</p>
          </div>
          <span className="text-4xl">📅</span>
        </div>
      </div>

      {/* upcoming events + my clubs lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Upcoming Events</h3>
          <ul className="space-y-4">
            {upcomingEvents.slice(0,3).map(ev => (
              <li key={ev.id} className="bg-white rounded shadow p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{ev.title}</p>
                  <p className="text-sm text-gray-600">{ev.date} · {ev.time}</p>
                  <p className="text-sm text-gray-500">{ev.organizer}</p>
                </div>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded">{ev.participants.length} registered</span>
              </li>
            ))}
            {upcomingEvents.length === 0 && <p className="text-gray-500">No events yet.</p>}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">My Clubs</h3>
          <ul className="space-y-4">
            {joinedClubs.slice(0,3).map(c => (
              <li key={c.id} className="bg-white rounded shadow p-4 flex justify-between items-center">
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-sm text-gray-600">{c.members.length} members</p>
                </div>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded capitalize">{c.category}</span>
              </li>
            ))}
            {joinedClubs.length === 0 && <p className="text-gray-500">You haven't joined any clubs.</p>}
          </ul>
        </div>
      </div>
    </div>
  );
}
