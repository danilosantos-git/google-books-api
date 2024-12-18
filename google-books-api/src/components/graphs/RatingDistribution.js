import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import useFetchGraphData from '../../hooks/useFetchGraphData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RatingDistribution = ({ query }) => {
    const { data, loading, error } = useFetchGraphData(query);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <PieChart width={700} height={500} aria-label="Gráfico de Distribuição de Avaliações por Gênero">
            <Pie
                data={data.ratingsByGenre}
                cx={350}
                cy={250}
                labelLine={false}
                label={entry => entry.name}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
            >
                {data.ratingsByGenre.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
    );
};

export default RatingDistribution;