import React from 'react';
import { Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import RatingDistribution from './graphs/RatingDistribution';
import RatingsOverTime from './graphs/RatingsOverTime';

const Graphs = ({ query = '*' }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                >
                    <Typography variant="h5" gutterBottom>
                        Distribuição de Avaliações por Gênero
                    </Typography>
                    <RatingDistribution query={query} />
                </motion.div>
            </Grid>
            <Grid item xs={12}>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                >
                    <Typography variant="h5" gutterBottom>
                        Avaliação de Livros ao Longo do Tempo
                    </Typography>
                    <RatingsOverTime query={query} />
                </motion.div>
            </Grid>
        </Grid>
    );
};

export default Graphs;