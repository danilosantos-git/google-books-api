import React from 'react';
import { IconButton, styled } from '@mui/material';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    top: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: '50%',
    backgroundColor: 'transparent',
    zIndex: 1000,
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
}));

const ThemeToggleButton = ({ darkMode, toggleDarkMode }) => {
    return (
        <StyledIconButton onClick={toggleDarkMode}>
            {darkMode ? <WbSunnyIcon /> : <NightsStayIcon />}
        </StyledIconButton>
    );
};

export default ThemeToggleButton;