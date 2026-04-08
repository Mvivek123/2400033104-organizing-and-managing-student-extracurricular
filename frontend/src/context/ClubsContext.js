import React, { createContext, useState, useContext, useEffect } from 'react';

const ClubsContext = createContext();
const STORAGE_KEY = 'campusconnect_clubs';

const getClubImage = (category) => {
  const images = {
    sports: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=200&fit=crop',
    tech: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=200&fit=crop',
    arts: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=200&fit=crop',
    cultural: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=200&fit=crop',
    academic: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop',
    general: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop',
  };
  return images[category] || images.general;
};

export function ClubsProvider({ children }) {
  const [clubs, setClubs] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(stored) ? stored : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    fetch('http://localhost:50507/api/clubs')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setClubs(data.map(club => ({
            id: club.id,
            name: club.name,
            description: club.description || '',
            category: club.category || 'general',
            members: Array.isArray(club.members) ? club.members : [],
            admins: Array.isArray(club.admins) ? club.admins : [],
            image: getClubImage(club.category || 'general'),
          })));
        } else {
          console.log('Unexpected clubs response:', data);
        }
      })
      .catch(err => {
        console.log('Failed to fetch clubs:', err);
      });
  }, []);

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
