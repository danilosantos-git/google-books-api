import React from 'react';
import BookCard from '../../components/BookCard';

export default {
    title: 'Components/BookCard',
    component: BookCard,
};

const book = {
    volumeInfo: {
        title: 'Exemplo de Livro',
        authors: ['Autor Exemplo'],
        categories: ['Ficção'],
        averageRating: 4.5,
    },
};

export const Default = () => <BookCard book={book} />;