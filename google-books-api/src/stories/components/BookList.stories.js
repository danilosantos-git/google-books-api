import React from 'react';
import BookList from '../../components/BookList';
import { MemoryRouter } from 'react-router-dom';

export default {
    title: 'Components/BookList',
    component: BookList,
};

export const Default = () => (
    <MemoryRouter>
        <BookList />
    </MemoryRouter>
);