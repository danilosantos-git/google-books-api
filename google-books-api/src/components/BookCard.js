import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const BookCard = ({ book }) => {
    return (
        <Card aria-labelledby={`book-title-${book.id}`} role="article">
            <CardContent>
                <Typography id={`book-title-${book.id}`} variant="h6">{book.volumeInfo.title}</Typography>
                <Typography color="textSecondary">{book.volumeInfo.authors?.join(', ')}</Typography>
                <Typography color="textSecondary">{book.volumeInfo.categories?.join(', ')}</Typography>
                <Typography variant="body2">Média de Avaliação: {book.volumeInfo.averageRating || 'N/A'}</Typography>
            </CardContent>
        </Card>
    );
};

export default BookCard;