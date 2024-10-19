import React from 'react';
import ToggleTheme from './ToggleTheme';

export const themes = {
 light: {
    background: '#f7f7f2',
    header: '#d0e1f9',
    title: '#3c4a57',
    content: '#2e2e2e',
    label: '#7f9eb2',
 },
 dark: {
   background: '#2c2c2c',
   header: '#34495e',
   title: '#effaea',
   content: '#b0b0b0',
   label: '#7f8c8d',
 },
};

export const ThemeContext = React.createContext({
    currentTheme: themes.light,
    toggleTheme: () => {},
});