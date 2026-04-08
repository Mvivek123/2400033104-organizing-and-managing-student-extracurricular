import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';
import { useAuth } from '../context/AuthContext';

export default function Events() {
  const { events = [], toggleRegistration } = useEvents();
  const { user } = useAuth();
  const navigate = useNavigate();

  const username = user?.name || user?.username || user?.userName;
  const [tab, setTab] = useState('upcoming');

  const today = new Date().toISOString().split('T')[0];

  const upcoming = events.filter(e => !e.date || e.date >= today);
  const past = events.filter(e => e.date && e.date < today);

  const list = tab === 'upcoming' ? upcoming : past;

  return (
    <div className="p-6">
      
      {/* HEADER */}
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

      {/* TABS */}
      <div className="flex space-x-2 mb-6">
        <button
          className={`px-4 py-2 rounded-full ${
            tab === 'upcoming' ? 'bg-gray-200' : 'bg-white'
          }`}
          onClick={() => setTab('upcoming')}
        >
          Upcoming Events 
          <span className="ml-1 bg-indigo-500 text-white px-2 text-xs rounded-full">
            {upcoming.length}
          </span>
        </button>

        <button
          className={`px-4 py-2 rounded-full ${
            tab === 'past' ? 'bg-gray-200' : 'bg-white'
          }`}
          onClick={() => setTab('past')}
        >
          Past Events 
          <span className="ml-1 bg-indigo-500 text-white px-2 text-xs rounded-full">
            {past.length}
          </span>
        </button>
      </div>

      {/* EVENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {list.map(ev => {

          // ✅ SAFE PARTICIPANTS
          const participants = ev.participants || [];
          const registered = participants.includes(username);

          return (
            <div
              key={ev.id}
              className="bg-white rounded-lg shadow flex flex-col"
            >

              {/* HEADER */}
              <div className="bg-indigo-100 p-4">
                <h2 className="text-lg font-semibold">{ev.title}</h2>
                <p className="text-sm text-gray-600">
                  {ev.organizer || "Campus"}
                </p>
              </div>

              {/* BODY */}
              <div className="p-4 flex-1">
                <p className="text-sm mb-2">
                  {ev.description || "No description"}
                </p>

                <div className="text-sm text-gray-600 space-y-1">
                  <div>📅 {ev.date || 'TBD'}</div>
                  <div>⏰ {ev.time || 'TBD'}</div>
                  <div>📍 {ev.venue || 'TBD'}</div>
                  <div>👥 {participants.length} registered</div>
                </div>
              </div>

              {/* BUTTON */}
              <div className="p-4">
                <button
                  className={`w-full py-2 rounded ${
                    registered
                      ? 'border border-red-500 text-red-500'
                      : 'bg-black text-white'
                  }`}
                  onClick={() =>
                    toggleRegistration?.(ev.id, username)
                  }
                >
                  {registered ? 'Cancel Registration' : 'Register Now'}
                </button>
              </div>

            </div>
          );
        })}

        {/* EMPTY */}
        {list.length === 0 && (
          <p className="text-gray-500 col-span-full">
            No events found.
          </p>
        )}

      </div>
    </div>
  );
}