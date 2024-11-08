import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, Card, CardContent } from '@mui/material';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async (startIndex = 0) => {
            try {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=*&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}&maxResults=30&startIndex=${startIndex}`);
                setBooks(response.data.items);
            } catch (err) {
                setError('Erro ao buscar livros');
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    if (loading) return <Typography>Carregando...</Typography>;
    if (error) return <Typography>{error}</Typography>;

    return (
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
    );
};

export default BookList;