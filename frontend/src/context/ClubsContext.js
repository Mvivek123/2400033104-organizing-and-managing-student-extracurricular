import React, { createContext, useState, useContext, useEffect } from 'react';

const ClubsContext = createContext();
const STORAGE_KEY = 'campusconnect_clubs';

export function ClubsProvider({ children }) {
  const [clubs, setClubs] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (stored && stored.length) return stored;
      // initial sample data
      return [
        {
          id: 1,
          name: 'Robotics Club',
          description: 'Building robots and competing in challenges.',
          category: 'academic',
          members: [],
          admins: [],
        },
        {
          id: 2,
          name: 'Jazz Band',
          description: 'Weekly rehearsals and performances.',
          category: 'arts',
          members: [],
          admins: [],
        },
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(clubs));
  }, [clubs]);

  // example club structure:
  // { id, name, description, category, members: [], admins: [] }

  const addClub = club => {
    setClubs(prev => [...prev, club]);
  };

  const updateClub = updated => {
    setClubs(prev => prev.map(c => (c.id === updated.id ? updated : c)));
  };

  const removeClub = id => {
    setClubs(prev => prev.filter(c => c.id !== id));
  };

  const toggleMembership = (clubId, username) => {
    setClubs(prev =>
      prev.map(c => {
        if (c.id !== clubId) return c;
        const isMember = c.members.includes(username);
        const members = isMember
          ? c.members.filter(u => u !== username)
          : [...c.members, username];
        return { ...c, members };
      })
    );
  };

  return (
    <ClubsContext.Provider
      value={{ clubs, addClub, updateClub, removeClub, toggleMembership }}
    >
      {children}
    </ClubsContext.Provider>
  );
}

export function useClubs() {
  return useContext(ClubsContext);
}
