import React, { createContext, useState, useEffect, useContext } from 'react';
import API from "../services/api";

const EventsContext = createContext();

export function EventsProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch events function
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await API.get("/events"); // calls /api/auth/events

      console.log("✅ Events:", res.data);

      setEvents(res.data);
      setError("");
    } catch (err) {
      console.log("❌ Events Error:", err);

      if (err.response) {
        setError("Failed to load events");
      } else {
        setError("Server not reachable ❌");
      }
    } finally {
      setLoading(false);
    }
  };

  const addEvent = (newEvent) => {
    setEvents(prev => [...prev, newEvent]);
  };

  const updateEvent = (updatedEvent) => {
    setEvents(prev => prev.map(ev => (ev.id === updatedEvent.id ? updatedEvent : ev)));
  };

  const toggleRegistration = (eventId, username) => {
    if (!username) return;

    setEvents(prev =>
      prev.map(ev => {
        if (ev.id !== eventId) return ev;

        const participants = ev.participants || [];
        const isRegistered = participants.includes(username);
        return {
          ...ev,
          participants: isRegistered
            ? participants.filter(u => u !== username)
            : [...participants, username],
        };
      })
    );
  };

  const removeEvent = (eventId) => {
    setEvents(prev => prev.filter(ev => ev.id !== eventId));
  };

  // ✅ Load on page load
  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventsContext.Provider value={{ events, loading, error, fetchEvents, addEvent, updateEvent, toggleRegistration, removeEvent }}>
      {children}
    </EventsContext.Provider>
  );
}

// ✅ Custom hook
export function useEvents() {
  return useContext(EventsContext);
}

export default EventsContext;