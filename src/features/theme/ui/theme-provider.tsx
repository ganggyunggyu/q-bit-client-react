import React from 'react';
import { useThemeStore, ThemeMode } from '../model/theme.store';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { mode, setResolvedTheme } = useThemeStore();

  React.useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (theme: 'light' | 'dark') => {
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      root.setAttribute('data-theme', theme);
      setResolvedTheme(theme);
    };

    if (mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
        applyTheme(e.matches ? 'dark' : 'light');
      };

      handleChange(mediaQuery);
      mediaQuery.addEventListener('change', handleChange);

      return () => mediaQuery.removeEventListener('change', handleChange);
    } else {
      applyTheme(mode);
    }
  }, [mode, setResolvedTheme]);

  return <>{children}</>;
};
