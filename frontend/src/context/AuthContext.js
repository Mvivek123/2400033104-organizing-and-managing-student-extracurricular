import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const normalizeUser = (rawUser) => {
    if (!rawUser || typeof rawUser !== 'object') return null;

    const name =
      (rawUser.name && String(rawUser.name).trim()) ||
      (rawUser.username && String(rawUser.username).trim()) ||
      (rawUser.userName && String(rawUser.userName).trim());

    if (!name) return null;

    return {
      name,
      username: name,
      role: String(rawUser.role || 'student').trim().toLowerCase(),
    };
  };

  // ✅ Load saved user from localStorage
  const [user, setUserState] = useState(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      return normalizeUser(storedUser);
    } catch {
      return null;
    }
  });

  // ✅ Keep storage in sync with auth state
  useEffect(() => {
    if (user && user.name) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // ✅ Exposed setUser normalizer
  const setUser = (nextUser) => {
    setUserState(normalizeUser(nextUser));
  };

  // ✅ Login
  const login = (name) => {
    const newUser = normalizeUser({ name: name || 'charan', role: 'student' });
    setUserState(newUser);
    if (newUser) localStorage.setItem('user', JSON.stringify(newUser));
  };

  // ✅ Logout
  const logout = () => {
    setUserState(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Hook
export function useAuth() {
  return useContext(AuthContext);
}