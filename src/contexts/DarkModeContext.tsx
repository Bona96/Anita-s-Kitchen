import React, { createContext, useCallback, useEffect, useMemo, useState, useContext } from 'react';

type Theme = 'light' | 'dark';

type DarkModeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
};

export const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem('theme') as Theme | null;
      if (stored === 'dark' || stored === 'light') return stored;
    } catch {}
    // default to light
    return 'light';
  });

    const setTheme = useCallback((t: Theme) => {
      setThemeState(t);
      try {
        localStorage.setItem('theme', t);
      } catch {}
    }, []);
   
    // Ensure toggling the theme also updates localStorage by using setTheme
    const toggleTheme = useCallback(() => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }, [theme, setTheme]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme, setTheme }), [theme, toggleTheme, setTheme]);

  return <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>;
};

export default DarkModeProvider;

export function useDarkMode() {
  const ctx = useContext(DarkModeContext);
  if (!ctx) throw new Error('useDarkMode must be used within DarkModeProvider');
  return ctx;
}
