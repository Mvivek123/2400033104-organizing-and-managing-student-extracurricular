import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationsContext';

export default function CreateEditEvent() {
  const { addEvent, updateEvent, events } = useEvents();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const editId = params.get('edit');
  const editing = Boolean(editId);

  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    venue: '',
    limit: '',
  });

  useEffect(() => {
    if (editing) {
      const ev = events.find(e => String(e.id) === editId);
      if (ev) setForm(ev);
    }
  }, [editing, editId, events]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const payload = { ...form, organizer: user.name, participants: [], id: editing ? form.id : Date.now() };
    if (editing) {
      updateEvent(payload);
      addNotification({ text: `Event "${payload.title}" updated` });
    } else {
      addEvent(payload);
      addNotification({ text: `Event "${payload.title}" created` });
    }
    navigate('/events');
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        {editing ? 'Edit Event' : 'Create Event'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1">Time</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1">Venue</label>
          <input
            name="venue"
            value={form.venue}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Participant limit</label>
          <input
            type="number"
            name="limit"
            value={form.limit}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          {editing ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
}
