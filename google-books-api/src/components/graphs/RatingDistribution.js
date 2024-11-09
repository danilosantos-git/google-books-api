import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import useFetchGraphData from '../../hooks/useFetchGraphData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RatingDistribution = ({ query }) => {
    const { data, loading, error } = useFetchGraphData(query);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <PieChart width={500} height={500}> {/* Aumentado para 500x500 */}
            <Pie
                data={data.ratingsByGenre}
                cx={250} // Centralizando o gráfico
                cy={250} // Centralizando o gráfico
                labelLine={false}
                label={entry => entry.name}
                outerRadius={100}
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