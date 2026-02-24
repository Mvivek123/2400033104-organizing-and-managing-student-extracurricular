import React, { createContext, useState, useContext, useEffect } from 'react';

const EventsContext = createContext();
const STORAGE_KEY = 'campusconnect_events';

export function EventsProvider({ children }) {
  const [events, setEvents] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (stored && stored.length) return stored;
      // sample events
      return [
        {
          id: 1,
          title: 'Back to School Fair',
          description: 'Meet clubs and student organizations.',
          date: '2026-09-01',
          time: '10:00',
          venue: 'Main Quad',
          organizer: 'Admin',
          limit: 100,
          participants: [],
        },
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  // event: { id, title, description, date, time, venue, organizer, limit, participants: [] }
  const addEvent = ev => {
    setEvents(prev => [...prev, ev]);
  };

  const updateEvent = updated => {
    setEvents(prev => prev.map(e => (e.id === updated.id ? updated : e)));
  };

  const removeEvent = id => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const toggleRegistration = (eventId, username) => {
    setEvents(prev =>
      prev.map(e => {
        if (e.id !== eventId) return e;
        const isRegistered = e.participants.includes(username);
        const participants = isRegistered
          ? e.participants.filter(u => u !== username)
          : [...e.participants, username];
        return { ...e, participants };
      })
    );
  };

  return (
    <EventsContext.Provider
      value={{ events, addEvent, updateEvent, removeEvent, toggleRegistration }}
    >
      {children}
    </EventsContext.Provider>
  );
}

export function useEvents() {
  return useContext(EventsContext);
}
