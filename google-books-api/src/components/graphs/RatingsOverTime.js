import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import useFetchGraphData from '../../hooks/useFetchGraphData';

const RatingsOverTime = ({ query }) => {
    const { data, loading, error } = useFetchGraphData(query);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <LineChart width={600} height={400} data={data.ratingsOverTime}> {/* Aumentado para 600x400 */}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
                dataKey="name"
                tickFormatter={(value) => {
                    return value; // Agora exibe apenas o ano
                }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="rating" stroke="#8884d8" />
        </LineChart>
    );
};

export default RatingsOverTime;