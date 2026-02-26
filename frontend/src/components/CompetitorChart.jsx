import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function CompetitorChart({ data, isDark }) {
    if (!data || !data.competitors) {
        return null;
    }

    const competitors = data.competitors;
    const competitorNames = Object.keys(competitors);
    const ratings = competitorNames.map(name => competitors[name].app_rating || 0);

    // Add Jumia to the comparison
    const allNames = ['Jumia', ...competitorNames];
    const allRatings = [data.app?.play_store?.rating || 0, ...ratings];

    const barData = {
        labels: allNames,
        datasets: [
            {
                label: 'App Rating',
                data: allRatings,
                backgroundColor: [
                    'rgba(246, 139, 30, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                ],
                borderColor: [
                    '#f68b1e',
                    '#10b981',
                    '#3b82f6',
                    '#8b5cf6',
                ],
                borderWidth: 2,
            },
        ],
    };

    const pieData = {
        labels: allNames,
        datasets: [
            {
                label: 'Market Share (Estimated)',
                data: [35, 25, 25, 15], // Estimated market share
                backgroundColor: [
                    'rgba(246, 139, 30, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(59, 130, 246, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                ],
                borderColor: [
                    '#f68b1e',
                    '#10b981',
                    '#3b82f6',
                    '#8b5cf6',
                ],
                borderWidth: 2,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
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
                max: 5,
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
                    display: false,
                },
            },
        },
    };

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    color: isDark ? '#cbd5e1' : '#475569',
                    font: {
                        size: 12,
                        weight: 600,
                    },
                },
            },
            tooltip: {
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                titleColor: isDark ? '#f1f5f9' : '#0f172a',
                bodyColor: isDark ? '#cbd5e1' : '#475569',
                borderColor: isDark ? '#334155' : '#e2e8f0',
                borderWidth: 1,
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.parsed}%`;
                    }
                }
            },
        },
    };

    return (
        <div className="charts-grid">
            <div className="chart-container">
                <div className="chart-container__header">
                    <h3 className="chart-container__title">App Ratings Comparison</h3>
                    <p className="chart-container__subtitle">Google Play Store ratings</p>
                </div>
                <div className="chart-wrapper">
                    <Bar data={barData} options={barOptions} />
                </div>
            </div>

            <div className="chart-container">
                <div className="chart-container__header">
                    <h3 className="chart-container__title">Market Share (Estimated)</h3>
                    <p className="chart-container__subtitle">Based on traffic and user data</p>
                </div>
                <div className="chart-wrapper">
                    <Pie data={pieData} options={pieOptions} />
                </div>
            </div>
        </div>
    );
}

export default CompetitorChart;
