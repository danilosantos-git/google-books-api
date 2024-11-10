import React, { useState } from 'react';
import { Grid, Typography, TextField, Tabs, Tab, Box, Button } from '@mui/material';
import { FirstPage, LastPage, ArrowBack, ArrowForward } from '@mui/icons-material';
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
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 10;
    const totalPages = Math.ceil(books.length / booksPerPage);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setCurrentPage(1);
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleFirstPage = () => {
        setCurrentPage(1);
    };

    const handleLastPage = () => {
        setCurrentPage(totalPages);
    };

    if (loading) return <Typography>Carregando...</Typography>;
    if (error) return <Typography>{error}</Typography>;

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

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
                    aria-label="Filtrar por título ou autor"
                />
                <Grid container spacing={2}>
                    {currentBooks.map((book) => (
                        <Grid item xs={12} sm={6} md={4} key={book.id}>
                            <BookCard book={book} />
                        </Grid>
                    ))}
                </Grid>
                <Box display="flex" justifyContent="center" marginTop={2}>
                    <Button onClick={handleFirstPage} disabled={currentPage === 1} aria-label="Ir para a primeira página">
                        <FirstPage />
                    </Button>
                    <Button onClick={handlePreviousPage} disabled={currentPage === 1} aria-label="Página anterior">
                        <ArrowBack />
                    </Button>
                    {Array.from({ length: totalPages }, (_, index) => (
                        <Button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            disabled={currentPage === index + 1}
                            aria-label={`Ir para a página ${index + 1}`}
                        >
                            {index + 1}
                        </Button>
                    ))}
                    <Button onClick={handleNextPage} disabled={currentPage === totalPages} aria-label="Próxima página">
                        <ArrowForward />
                    </Button>
                    <Button onClick={handleLastPage} disabled={currentPage === totalPages} aria-label="Ir para a última página">
                        <LastPage />
                    </Button>
                </Box>
            </TabPanel>
            <TabPanel value={activeTab} index={1}>
                <TextField
                    label="Filtrar por gênero"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={filter}
                    onChange={handleFilterChange}
                    aria-label="Filtrar por gênero"
                />
                <Graphs query={debouncedFilter} />
            </TabPanel>
        </div>
    );
};

export default BookList;