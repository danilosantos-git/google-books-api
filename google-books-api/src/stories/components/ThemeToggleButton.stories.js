import React, { useState } from 'react';
import ThemeToggleButton from '../../components/ThemeToggleButton';

export default {
    title: 'Components/ThemeToggleButton',
    component: ThemeToggleButton,
};

export const Default = () => {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => setDarkMode(!darkMode);

    return <ThemeToggleButton darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
};