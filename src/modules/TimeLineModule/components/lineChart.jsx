import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

export const options = {
    responsive: false,
    plugins: {
        title: {
            display: false,
        },
        legend: {
            display: false, // Hide dataset labels
        },
    },

    scales: {
        x: {
            display: false, // Hide x-axis labels and grid lines
        },
        y: {
            display: false, // Hide y-axis labels and grid lines
        },
    },
};

const LineChart = ({ chartData }) => {
    // console.log(chartData);
    const data = {
        labels: chartData.length > 0 && chartData.map((_, index) => index),
        datasets: [
            {
                fill: true,
                label: 'Dataset 2',
                data: chartData,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                pointRadius: 0,
            },
        ],
    };

    return (
        <div style={{height: '80px', display: 'flex' }}>
            { chartData.length > 0 && <Line options={options} data={data} style={{height: '80px', width: '100%'}} /> }
        </div>
    )
}

export default LineChart;
