import React, { useState } from 'react';
import { Grid, Typography, TextField, Tabs, Tab, Box } from '@mui/material';
import useFetchBooks from '../hooks/useFetchBooks';
import useDebounce from '../hooks/useDebounce';
import BookCard from './BookCard';
import Graphs from './Graphs';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
};

const BookList = () => {
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounce(filter, 300);
    const { books, loading, error } = useFetchBooks(debouncedFilter || '*');
    const [activeTab, setActiveTab] = useState(0);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    if (loading) return <Typography>Carregando...</Typography>;
    if (error) return <Typography>{error}</Typography>;

    return (
        <div>
            <Tabs value={activeTab} onChange={handleTabChange} indicatorColor="primary" textColor="primary">
                <Tab label="Lista de Livros" />
                <Tab label="Gráficos" />
            </Tabs>
            <TabPanel value={activeTab} index={0}>
                <TextField
                    label="Filtrar por título ou autor"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={filter}
                    onChange={handleFilterChange}
                />
                <Grid container spacing={2}>
                    {books.map((book) => (
                        <Grid item xs={12} sm={6} md={4} key={book.id}>
                            <BookCard book={book} />
                        </Grid>
                    ))}
                </Grid>
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
                <TextField
                    label="Filtrar por gênero"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={filter}
                    onChange={handleFilterChange}
                />
                <Graphs query={debouncedFilter} />
            </TabPanel>
        </div>
    );
};

export default BookList;