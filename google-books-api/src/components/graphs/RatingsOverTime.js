import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useFetchGraphData from '../../hooks/useFetchGraphData';

const RatingsOverTime = ({ query }) => {
    const { data, loading, error } = useFetchGraphData(query);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <LineChart width={600} height={400} data={data.ratingsOverTime} aria-label="Gráfico de Avaliação de Livros ao Longo do Tempo">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="rating" stroke="#8884d8" />
        </LineChart>
    );
};

export default RatingsOverTime;