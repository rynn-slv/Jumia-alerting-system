import React from 'react';
import OverviewCard from './OverviewCard';

function KPIGrid({ data }) {
    if (!data || !data.company) return null;

    const formatNumber = (num) => {
        if (!num) return 'N/A';

        if (num >= 1_000_000_000) {
            return `$${(num / 1_000_000_000).toFixed(2)}B`;
        }
        if (num >= 1_000_000) {
            return `$${(num / 1_000_000).toFixed(1)}M`;
        }
        if (num >= 1_000) {
            return `${(num / 1_000).toFixed(1)}K`;
        }
        return num.toLocaleString();
    };

    const formatLargeNumber = (num) => {
        if (!num) return 'N/A';

        if (num >= 1_000_000) {
            return `${(num / 1_000_000).toFixed(1)}M`;
        }
        if (num >= 1_000) {
            return `${(num / 1_000).toFixed(1)}K`;
        }
        return num.toLocaleString();
    };

    const kpis = [
        {
            title: 'Revenue',
            value: formatNumber(data.company.revenue),
            label: 'Annual Revenue (Estimated)',
            icon: '💰',
        },
        {
            title: 'GMV',
            value: formatNumber(data.company.gmv),
            label: 'Gross Merchandise Value',
            icon: '🛒',
        },
        {
            title: 'Active Users',
            value: formatLargeNumber(data.company.active_users),
            label: 'Monthly Active Users',
            icon: '👥',
        },
        {
            title: 'Countries',
            value: data.company.countries?.length || 0,
            label: 'Operating Countries',
            icon: '🌍',
        },
        {
            title: 'App Rating',
            value: data.app?.play_store?.rating?.toFixed(1) || 'N/A',
            label: 'Google Play Store',
            icon: '⭐',
        },
        {
            title: 'Total Funding',
            value: formatNumber(data.company.funding_total),
            label: 'Lifetime Funding',
            icon: '💼',
        },
    ];

    return (
        <div className="kpi-grid">
            {kpis.map((kpi, index) => (
                <OverviewCard key={index} {...kpi} />
            ))}
        </div>
    );
}

export default KPIGrid;
