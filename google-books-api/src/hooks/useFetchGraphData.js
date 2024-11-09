import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchGraphData = (query) => {
    const [data, setData] = useState({ ratingsByGenre: [], ratingsOverTime: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGraphData = async () => {
            if (!query) {
                setError('Consulta vazia. Por favor, insira um termo de pesquisa.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.REACT_APP_GOOGLE_BOOKS_API_KEY}&maxResults=40`);
                const books = response.data.items;

                const ratingsByGenre = processRatingsByGenre(books);
                const ratingsOverTime = processRatingsOverTime(books);

                setData({ ratingsByGenre, ratingsOverTime });
            } catch (err) {
                console.error(err); // Log do erro
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
            const year = new Date(publishedDate).getFullYear(); // Obter apenas o ano
            const rating = book.volumeInfo.averageRating || 0;

            // Verifica se o rating é um número válido
            if (!isNaN(rating)) {
                ratingsOverTime[year] = (ratingsOverTime[year] || 0) + rating;
            }
        });

        // Ordenar os dados por ano
        const sortedEntries = Object.entries(ratingsOverTime).sort((a, b) => a[0] - b[0]);

        // Filtrar entradas com rating NaN ou 0
        return sortedEntries
            .filter(([name, rating]) => !isNaN(rating) && rating > 0)
            .map(([name, rating]) => ({ name, rating }));
    };

    return { data, loading, error };
};

export default useFetchGraphData;