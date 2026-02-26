import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function TrendChart({ data, isDark }) {
    if (!data || !data.trends || !data.trends.timeseries || data.trends.timeseries.length === 0) {
        return (
            <div className="chart-container">
                <div className="chart-container__header">
                    <h3 className="chart-container__title">Search Interest Trends</h3>
                    <p className="chart-container__subtitle">12-month Google Trends data</p>
                </div>
                <div className="loading">
                    <div className="loading__text">No trend data available. Run the data fetch script.</div>
                </div>
            </div>
        );
    }

    const timeseries = data.trends.timeseries;

    const chartData = {
        labels: timeseries.map(item => {
            const date = new Date(item.date);
            return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
        }),
        datasets: [
            {
                label: 'Jumia Algeria',
                data: timeseries.map(item => item['Jumia Algeria'] || 0),
                borderColor: '#f68b1e',
                backgroundColor: 'rgba(246, 139, 30, 0.1)',
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Ouedkniss',
                data: timeseries.map(item => item.Ouedkniss || 0),
                borderColor: '#10b981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Batolis',
                data: timeseries.map(item => item.Batolis || 0),
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                tension: 0.4,
                fill: true,
            },
            {
                label: 'ouedkniss',
                data: timeseries.map(item => item.ouedkniss || 0),
                borderColor: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                tension: 0.4,
                fill: true,
            },
            {
                label: 'Soukshop',
                data: timeseries.map(item => item.Soukshop || 0),
                borderColor: '#ec4899',
                backgroundColor: 'rgba(236, 72, 153, 0.1)',
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: isDark ? '#cbd5e1' : '#475569',
                    font: {
                        size: 12,
                        weight: 600,
                    },
                },
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                titleColor: isDark ? '#f1f5f9' : '#0f172a',
                bodyColor: isDark ? '#cbd5e1' : '#475569',
                borderColor: isDark ? '#334155' : '#e2e8f0',
                borderWidth: 1,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: isDark ? '#cbd5e1' : '#475569',
                },
                grid: {
                    color: isDark ? '#334155' : '#e2e8f0',
                },
            },
            x: {
                ticks: {
                    color: isDark ? '#cbd5e1' : '#475569',
                },
                grid: {
                    color: isDark ? '#334155' : '#e2e8f0',
                },
            },
        },
    };

    return (
        <div className="chart-container">
            <div className="chart-container__header">
                <h3 className="chart-container__title">Search Interest Trends (Algeria)</h3>
                <p className="chart-container__subtitle">12-month Google Trends comparison for Algeria e-commerce</p>
            </div>
            <div className="chart-wrapper">
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
}

export default TrendChart;
