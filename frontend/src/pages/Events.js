import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';
import { useAuth } from '../context/AuthContext';

export default function Events() {
  const { events, toggleRegistration } = useEvents();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState('upcoming'); // upcoming or past

  const today = new Date().toISOString().split('T')[0];
  const upcoming = events.filter(e => e.date >= today);
  const past = events.filter(e => e.date < today);

  const list = tab === 'upcoming' ? upcoming : past;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Events</h1>
        {user?.role === 'admin' && (
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded"
            onClick={() => navigate('/events/create')}
          >
            Create Event
          </button>
        )}
      </div>
      {/* tab selector */}
      <div className="flex space-x-2 mb-6">
        <button
          className={`px-4 py-2 rounded-full ${
            tab === 'upcoming' ? 'bg-gray-200' : 'bg-white'
          }`}
          onClick={() => setTab('upcoming')}
        >
          Upcoming Events <span className="ml-1 bg-indigo-500 text-white rounded-full px-2 text-xs">{upcoming.length}</span>
        </button>
        <button
          className={`px-4 py-2 rounded-full ${
            tab === 'past' ? 'bg-gray-200' : 'bg-white'
          }`}
          onClick={() => setTab('past')}
        >
          Past Events <span className="ml-1 bg-indigo-500 text-white rounded-full px-2 text-xs">{past.length}</span>
        </button>
      </div>
      {/* event cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map(ev => {
          const registered = ev.participants.includes(user?.name);
          return (
            <div
              key={ev.id}
              className="bg-white rounded-lg shadow overflow-hidden flex flex-col"
            >
              <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-4">
                <h2 className="text-lg font-semibold">{ev.title}</h2>
                <p className="text-sm text-gray-600">{ev.organizer}</p>
              </div>
              <div className="p-4 flex-1">
                <p className="text-sm mb-2">
                  {ev.description && ev.description.length > 100
                    ? ev.description.slice(0, 100) + '...'
                    : ev.description}
                </p>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>📅 {ev.date}</div>
                  <div>⏰ {ev.time}</div>
                  {ev.venue && <div>📍 {ev.venue}</div>}
                  <div>👥 {ev.participants.length} registered</div>
                </div>
              </div>
              <div className="p-4">
                {registered && tab === 'upcoming' ? (
                  <button
                    className="w-full border border-red-500 text-red-500 py-2 rounded"
                    onClick={() => toggleRegistration(ev.id, user.name)}
                  >
                    Cancel Registration
                  </button>
                ) : (
                  <button
                    className="w-full bg-black text-white py-2 rounded"
                    onClick={() => toggleRegistration(ev.id, user.name)}
                  >
                    {registered ? 'Registered' : 'Register Now'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {list.length === 0 && (
          <p className="text-gray-500 col-span-full">No events found.</p>
        )}
      </div>
    </div>
  );
}
