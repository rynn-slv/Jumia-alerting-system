import React, { useState } from 'react';
import api from '../services/api';

function Navbar({ isDark, toggleTheme, onDataRefresh }) {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await api.refreshData();
            // Call the parent's refresh function to reload all data
            if (onDataRefresh) {
                await onDataRefresh();
            }
        } catch (error) {
            console.error('Failed to refresh data:', error);
            alert('Failed to refresh data. Check console for details.');
        } finally {
            setIsRefreshing(false);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <div className="navbar__brand">
                    <div>
                        <div className="navbar__logo">JUMIA</div>
                        <div className="navbar__subtitle">Analytics Dashboard</div>
                    </div>
                </div>

                <div className="navbar__actions">
                    <button
                        className="theme-toggle"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        aria-label="Refresh data"
                        style={{ marginRight: '0.5rem' }}
                    >
                        {isRefreshing ? '⏳' : '🔄'}
                        <span>{isRefreshing ? 'Refreshing...' : 'Refresh Data'}</span>
                    </button>

                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {isDark ? '☀️' : '🌙'}
                        <span>{isDark ? 'Light' : 'Dark'}</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
