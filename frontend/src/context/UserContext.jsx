import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

const DEFAULT_USER = {
  username: 'Ash Ketchum',
  avatar: '🧢',
  level: 1,
  xp: 45,
  gold: 150,
  streak: 5,
  companionMon: 'charmander',
  str: 15,
  int: 20,
  wis: 12,
  agi: 14,
  hp: 100,
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(DEFAULT_USER);
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