import React, { useState } from 'react';
import { Grid, Typography, TextField } from '@mui/material';
import useFetchBooks from '../hooks/useFetchBooks';
import useDebounce from '../hooks/useDebounce';
import BookCard from './BookCard';

const BookList = () => {
    const [filter, setFilter] = useState('');
    const debouncedFilter = useDebounce(filter, 300);
    const { books, loading, error } = useFetchBooks(debouncedFilter || '*');

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    if (loading) return <Typography>Carregando...</Typography>;
    if (error) return <Typography>{error}</Typography>;

    return (
        <div>
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
        </div>
    );
};

export default BookList;