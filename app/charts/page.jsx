'use client'

// components/CleaningCharts.js
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const CleaningCharts = () => {
    // Dummy data for the charts
    const cleaningData = {
        labels: ['January', 'February'],
        datasets: [
            {
                label: 'Prompt Cleanings',
                data: [30, 45], // Example data
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Missed Cleanings',
                data: [10, 5], // Example data
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
        ],
    };

    const pieData = {
        labels: ['Prompt Cleanings', 'Missed Cleanings'],
        datasets: [
            {
                data: [75, 15], // Total prompt + missed for pie chart
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            },
        ],
    };

    return (
        <div>
            <h2>Cleaning Statistics</h2>
            <Bar
                data={cleaningData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Prompt vs Missed Cleanings (Jan - Feb)',
                        },
                    },
                }}
            />
            <h2>Overall Cleaning Events</h2>
            <Pie
                data={pieData}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: 'Overall Cleaning Events',
                        },
                    },
                }}
            />
        </div>
    );
};

export default CleaningCharts;
