import React from 'react';

function OverviewCard({ title, value, label, icon, change }) {
    return (
        <div className="card overview-card">
            <div className="overview-card__header">
                <div className="overview-card__title">{title}</div>
                <div className="overview-card__icon">{icon}</div>
            </div>

            <div className="overview-card__value">{value}</div>
            <div className="overview-card__label">{label}</div>

            {change && (
                <div className={`overview-card__change overview-card__change--${change.type}`}>
                    {change.type === 'positive' ? '↑' : '↓'} {change.value}
                </div>
            )}
        </div>
    );
}

export default OverviewCard;
