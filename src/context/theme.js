import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';
import { GlobalColors } from '../constants/Colors';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = (theme) => {
    setTheme(theme);
  };

  const colors = theme === 'dark' ? GlobalColors.dark : GlobalColors.light;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors,setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
