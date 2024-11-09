import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, Card, CardContent, TextField } from '@mui/material';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('');
    const [debounceTimeout, setDebounceTimeout] = useState(null);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=*&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}&maxResults=40`);
            setBooks(response.data.items);
        } catch (err) {
            setError('Erro ao buscar livros');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleFilterChange = (event) => {
        const value = event.target.value;
        setFilter(value);

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const newTimeout = setTimeout(async () => {
            if (value) {
                try {
                    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${value}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}&maxResults=40`);
                    setBooks(response.data.items);
                } catch (err) {
                    setError('Erro ao buscar livros');
                }
            } else {
                fetchBooks();
            }
        }, 300);
        setDebounceTimeout(newTimeout);
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
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{book.volumeInfo.title}</Typography>
                                <Typography color="textSecondary">{book.volumeInfo.authors?.join(', ')}</Typography>
                                <Typography color="textSecondary">{book.volumeInfo.categories?.join(', ')}</Typography>
                                <Typography variant="body2">Média de Avaliação: {book.volumeInfo.averageRating || 'N/A'}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default BookList;