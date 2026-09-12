import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext(null);

const DEFAULT_USER = {
  username: 'Trainer',
  avatar: '🧢',
  level: 1,
  xp: 0,
  currentXP: 0,
  nextLevelXP: 100,
  gold: 0,
  streak: 0,
  currentStreak: 0,
  companionMon: 'charmander',
  str: 0,
  int: 0,
  wis: 0,
  agi: 0,
  hp: 100,
  inventory: [],
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem('user');
    if (cached) {
      try {
        return { ...DEFAULT_USER, ...JSON.parse(cached) };
      } catch {}
    }
    return DEFAULT_USER;
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used inside a <UserProvider>');
  }
  return ctx;
}