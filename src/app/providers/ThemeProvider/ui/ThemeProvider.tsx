import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from '../lib/ThemeContext';

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: ReactNode;
}

const fallbackTheme= localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme

const ThemeProvider = (props: ThemeProviderProps) => {
  const { initialTheme, children } = props;
  // const { theme: defaultTheme } = useJsonSettings();
const defaultTheme = "app_dark_theme";
  const [isThemeInited, setThemeInited] = useState(false);

  const [theme, setTheme] = useState<Theme>(initialTheme || fallbackTheme || Theme.LIGHT);
  useEffect(() => {
    if (!isThemeInited && defaultTheme) {
      // @ts-ignore
      setTheme(defaultTheme);
      setThemeInited(true);
    }
  }, [defaultTheme, isThemeInited]);

  useEffect(() => {
    document.body.className= theme;
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme)
  }, [theme]);
  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return <ThemeContext.Provider value={defaultProps}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
