import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// localStorage keys and helpers
const STORAGE_KEY_USERS = 'campusconnect_users';
const STORAGE_KEY_CURRENT = 'campusconnect_currentUser';

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY_USERS)) || [];
  } catch {
    return [];
  }
}
function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY_CURRENT));
    } catch {
      return null;
    }
  }); // user: { name, role }
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_CURRENT, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_CURRENT);
    }
  }, [user]);

  const login = (username, password) => {
    const users = loadUsers();
    const found = users.find(
      u => u.username === username && u.password === password
    );
    if (found) {
      setUser({ name: found.username, role: found.role });
      navigate('/');
      return true;
    }
    return false;
  };

  const signup = (username, password, role = 'student') => {
    const users = loadUsers();
    if (users.find(u => u.username === username)) {
      return false; // user already exists
    }
    users.push({ username, password, role });
    saveUsers(users);
    setUser({ name: username, role });
    navigate('/');
    return true;
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}