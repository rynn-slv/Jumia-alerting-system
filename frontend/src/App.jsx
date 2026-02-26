import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import KPIGrid from './components/KPIGrid';
import TrendChart from './components/TrendChart';
import CompetitorChart from './components/CompetitorChart';
import NewsList from './components/NewsList';
import Footer from './components/Footer';
import api from './services/api';

function App() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        fetchData();

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDark(true);
            document.body.classList.add('dark');
        }
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await api.getAllData();
            setData(result);
            setError(null);
        } catch (err) {
            setError('Failed to load data. Make sure the backend is running.');
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const toggleTheme = () => {
        setIsDark(!isDark);
        document.body.classList.toggle('dark');
        localStorage.setItem('theme', !isDark ? 'dark' : 'light');
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="loading__spinner"></div>
                <div className="loading__text">Loading JUMIA Analytics...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="loading">
                <div className="error">{error}</div>
            </div>
        );
    }

    // Country interest table render
    const renderCountryTable = () => {
        if (!data?.trends?.by_country || data.trends.by_country.length === 0) {
            return null;
        }

        const maxInterest = Math.max(...data.trends.by_country.map(c => c.interest));

        return (
            <div className="country-table">
                <div className="country-table__header">
                    <h3 className="country-table__title">Search Interest by Country</h3>
                </div>
                <div className="country-table__body">
                    {data.trends.by_country.map((country, index) => (
                        <div key={index} className="country-row">
                            <div className="country-row__name">{country.country}</div>
                            <div className="country-row__bar">
                                <div
                                    className="country-row__fill"
                                    style={{ width: `${(country.interest / maxInterest) * 100}%` }}
                                ></div>
                            </div>
                            <div className="country-row__value">{country.interest}</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div className="app">
            <Sidebar />

            <div className="app__main">
                <Navbar isDark={isDark} toggleTheme={toggleTheme} onDataRefresh={fetchData} />

                <main className="app__content">
                    <div className="container">
                        {/* Overview Section */}
                        <section className="section" id="overview">
                            <div className="section__header">
                                <h2 className="section__title">Overview</h2>
                                <p className="section__description">
                                    Key performance indicators for  'JUMIA'
                                </p>
                            </div>

                            <KPIGrid data={data} />

                            {data?.company?.countries && (
                                <div className="card">
                                    <h3 className="mb-md">Operating Countries</h3>
                                    <p className="text-secondary">
                                        {data.company.countries.join(', ')}
                                    </p>
                                </div>
                            )}
                        </section>

                        {/* Competitors Section */}
                        <section className="section" id="competitors">
                            <div className="section__header">
                                <h2 className="section__title">Competitors (Algeria)</h2>
                                <p className="section__description">
                                    Algeria e-commerce market comparison
                                </p>
                            </div>

                            <CompetitorChart data={data} isDark={isDark} />
                        </section>

                        {/* Growth Section */}
                        <section className="section" id="growth">
                            <div className="section__header">
                                <h2 className="section__title">Growth Trends</h2>
                                <p className="section__description">
                                    12-month search interest for Algeria e-commerce and regional breakdown
                                </p>
                            </div>

                            <TrendChart data={data} isDark={isDark} />

                            {renderCountryTable()}
                        </section>

                        {/* News Section */}
                        <NewsList data={data} />
                    </div>
                </main>

                <Footer data={data} />
            </div>
        </div>
    );
}

export default App;
