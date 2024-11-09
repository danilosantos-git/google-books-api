import React from 'react';
import { Grid, Typography } from '@mui/material';
import RatingDistribution from './graphs/RatingDistribution';
import RatingsOverTime from './graphs/RatingsOverTime';

const Graphs = ({ query }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    Distribuição de Avaliações por Gênero
                </Typography>
                <RatingDistribution query={query} />
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                    Avaliação de Livros ao Longo do Tempo
                </Typography>
                <RatingsOverTime query={query} />
            </Grid>
        </Grid>
    );
};

export default Graphs;