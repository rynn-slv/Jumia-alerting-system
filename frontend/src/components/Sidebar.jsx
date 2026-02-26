import React, { useState, useEffect } from 'react';

function Sidebar() {
    const [activeSection, setActiveSection] = useState('overview');

    const sections = [
        { id: 'overview', label: 'Overview', icon: '📊' },
        { id: 'competitors', label: 'Competitors', icon: '🏆' },
        { id: 'growth', label: 'Growth', icon: '📈' },
        { id: 'news', label: 'News', icon: '📰' },
    ];

    useEffect(() => {
        const handleScroll = () => {
            const sections_elements = document.querySelectorAll('.section');

            sections_elements.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    setActiveSection(section.id);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <aside className="sidebar">
            <div className="sidebar__title">Navigation</div>
            <ul className="sidebar__nav">
                {sections.map(section => (
                    <li key={section.id}>
                        <a
                            href={`#${section.id}`}
                            className={`sidebar__link ${activeSection === section.id ? 'sidebar__link--active' : ''
                                }`}
                        >
                            <span className="sidebar__icon">{section.icon}</span>
                            <span>{section.label}</span>
                        </a>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default Sidebar;
