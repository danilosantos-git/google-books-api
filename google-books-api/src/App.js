import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import BookList from './components/BookList';
import ThemeToggleButton from './components/ThemeToggleButton';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ThemeToggleButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <BookList />
    </ThemeProvider>
  );
};

export default App;