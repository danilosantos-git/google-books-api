import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchBooks = (query) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}&maxResults=40`);
                setBooks(response.data.items);
            } catch (err) {
                setError('Erro ao buscar livros');
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [query]);

    return { books, loading, error };
};

export default useFetchBooks;