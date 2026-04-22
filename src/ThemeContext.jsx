import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('tripout-theme-dark');
    if (saved !== null) {
      return JSON.parse(saved);
    }
    return false; // Default to light (bone white) mode
  });

  useEffect(() => {
    localStorage.setItem('tripout-theme-dark', JSON.stringify(isDark));
    
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      document.body.style.backgroundColor = '#1a1a1a';
    } else {
      root.classList.remove('dark');
      document.body.style.backgroundColor = '#f9f6ee';
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
