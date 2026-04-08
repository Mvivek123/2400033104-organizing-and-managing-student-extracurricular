import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEvents } from '../context/EventsContext';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationsContext';

const parseTime = timeStr => {
  if (!timeStr) return { timeHour: '12', timeMinute: '00', timePeriod: 'AM' };
  const ampmMatch = timeStr.match(/^(\d{1,2}):(\d{2})\s*([AaPp][Mm])$/);
  if (ampmMatch) {
    return {
      timeHour: String(parseInt(ampmMatch[1], 10)),
      timeMinute: ampmMatch[2],
      timePeriod: ampmMatch[3].toUpperCase(),
    };
  }
  const match24 = timeStr.match(/^(\d{2}):(\d{2})$/);
  if (match24) {
    const hour24 = parseInt(match24[1], 10);
    const period = hour24 >= 12 ? 'PM' : 'AM';
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
    return {
      timeHour: String(hour12),
      timeMinute: match24[2],
      timePeriod: period,
    };
  }
  return { timeHour: '12', timeMinute: '00', timePeriod: 'AM' };
};

const formatTime = (hour, minute, period) => {
  if (!hour) return '';
  const normalizedMinute = String(minute || '00').padStart(2, '0');
  return `${String(parseInt(hour, 10))}:${normalizedMinute} ${period}`;
};

export default function CreateEditEvent() {
  const { addEvent, updateEvent, events } = useEvents();
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const editId = params.get('edit');
  const editing = Boolean(editId);

  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    title: '',
    description: '',
    date: today,
    timeHour: '12',
    timeMinute: '00',
    timePeriod: 'AM',
    venue: 'Main Campus Hall',
    limit: '',
  });

  useEffect(() => {
    if (editing) {
      const ev = events.find(e => String(e.id) === editId);
      if (ev) {
        const parsedTime = parseTime(ev.time || '');
        setForm({
          ...ev,
          ...parsedTime,
        });
      }
    }
  }, [editing, editId, events]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { timeHour, timeMinute, timePeriod, ...rest } = form;
    const payload = {
      ...rest,
      time: formatTime(timeHour, timeMinute, timePeriod),
      organizer: user?.name || user?.username || 'Guest',
      participants: [],
      id: editing ? form.id : Date.now(),
      date: form.date || today,
      venue: form.venue || 'Main Campus Hall',
    };

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
            <div className="flex gap-2">
              <select
                name="timeHour"
                value={form.timeHour}
                onChange={handleChange}
                required
                className="w-1/3 border px-3 py-2 rounded"
              >
                {Array.from({ length: 12 }, (_, index) => {
                  const hour = index + 1;
                  return (
                    <option key={hour} value={String(hour)}>
                      {String(hour).padStart(2, '0')}
                    </option>
                  );
                })}
              </select>
              <select
                name="timeMinute"
                value={form.timeMinute}
                onChange={handleChange}
                required
                className="w-1/3 border px-3 py-2 rounded"
              >
                {['00', '15', '30', '45'].map(minute => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
              <select
                name="timePeriod"
                value={form.timePeriod}
                onChange={handleChange}
                required
                className="w-1/3 border px-3 py-2 rounded"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
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
