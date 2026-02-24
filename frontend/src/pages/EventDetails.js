import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationsContext';

export default function EventDetails() {
  const { id } = useParams();
  const { events, toggleRegistration, removeEvent } = useEvents();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const ev = events.find(e => String(e.id) === id);
  if (!ev) return <p className="p-6">Event not found</p>;

  const isOrganizer = ev.organizer === user?.name;
  const isRegistered = ev.participants.includes(user?.name);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">{ev.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        {ev.date} {ev.time} @ {ev.venue}
      </p>
      <p className="mb-4">{ev.description}</p>
      <p className="mb-4">Organizer: {ev.organizer}</p>
      <p className="mb-4">Participants: {ev.participants.length}/{ev.limit || '∞'}</p>
      {user && (
        <button
          onClick={() => {
            toggleRegistration(ev.id, user.name);
            addNotification({
              text: isRegistered
                ? `You unregistered from ${ev.title}`
                : `You registered for ${ev.title}`,
            });
          }}
          className={`px-4 py-2 rounded text-white ${
            isRegistered ? 'bg-red-500' : 'bg-green-500'
          }`}
        >
          {isRegistered ? 'Cancel registration' : 'Register'}
        </button>
      )}
      {isOrganizer && (
        <div className="mt-4 space-x-2">
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded"
            onClick={() => navigate(`/events/create?edit=${ev.id}`)}
          >
            Edit
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded"
            onClick={() => {
              if (window.confirm('Delete this event?')) {
                removeEvent(ev.id);
                navigate('/events');
              }
            }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
