import React from 'react';

function Footer({ data }) {
    const fetchedAt = data?.fetched_at
        ? new Date(data.fetched_at).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
        : 'Unknown';

    return (
        <footer className="footer">
            <div className="footer__content">
                <p className="footer__text">
                    © 2025 JUMIA Analytics Dashboard
                </p>

                <p className="footer__team">
                    Made by <strong>Team 1.4</strong>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
