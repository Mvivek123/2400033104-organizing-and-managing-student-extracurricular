import React, { createContext, useState, useContext, useEffect } from 'react';

const NotificationsContext = createContext();
const STORAGE_KEY = 'campusconnect_notifications';

export function NotificationsProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (stored && stored.length) return stored;
      // sample notice
      return [
        { id: Date.now(), text: 'Welcome to CampusConnect!', read: false },
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  }, [notifications]);

  const addNotification = note => {
    setNotifications(prev => [...prev, { ...note, id: Date.now(), read: false }]);
  };

  const markRead = id => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <NotificationsContext.Provider
      value={{ notifications, addNotification, markRead, markAllRead }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationsContext);
}
