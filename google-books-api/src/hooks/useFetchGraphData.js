import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchGraphData = (query) => {
    const [data, setData] = useState({ ratingsByGenre: [], ratingsOverTime: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGraphData = async () => {
            try {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}&maxResults=40`);
                const books = response.data.items;

                const ratingsByGenre = processRatingsByGenre(books);
                const ratingsOverTime = processRatingsOverTime(books);

                setData({ ratingsByGenre, ratingsOverTime });
            } catch (err) {
                console.error(err);
                setError('Erro ao buscar dados para os gráficos');
            } finally {
                setLoading(false);
            }
        };

        fetchGraphData();
    }, [query]);

    const processRatingsByGenre = (books) => {
        const genreRatings = {};
        books.forEach(book => {
            const genre = book.volumeInfo.categories ? book.volumeInfo.categories[0] : 'Outros';
            const rating = book.volumeInfo.averageRating || 0;
            genreRatings[genre] = (genreRatings[genre] || 0) + rating;
        });
        return Object.entries(genreRatings)
            .filter(([name, value]) => value > 0)
            .map(([name, value]) => ({ name, value }));
    };

    const processRatingsOverTime = (books) => {
        const ratingsOverTime = {};

        books.forEach(book => {
            const publishedDate = book.volumeInfo.publishedDate;
            const year = new Date(publishedDate).getFullYear();
            const rating = book.volumeInfo.averageRating || 0;

            if (!isNaN(rating)) {
                ratingsOverTime[year] = (ratingsOverTime[year] || 0) + rating;
            }
        });

        const sortedEntries = Object.entries(ratingsOverTime).sort((a, b) => a[0] - b[0]);

        return sortedEntries
            .filter(([name, rating]) => !isNaN(rating) && rating > 0)
            .map(([name, rating]) => ({ name, rating }));
    };

    return { data, loading, error };
};

export default useFetchGraphData;