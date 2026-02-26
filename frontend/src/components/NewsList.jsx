import React from 'react';

function NewsList({ data }) {
    if (!data || !data.news || data.news.length === 0) {
        return (
            <div className="section" id="news">
                <div className="section__header">
                    <h2 className="section__title">Latest News</h2>
                    <p className="section__description">Recent news articles about JUMIA</p>
                </div>

                <a
                    href="https://blogtrottr.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="feedly-button"
                >
                    <span>🔔</span>
                    <span>Follow JUMIA on Blogtrottr</span>
                </a>

                <div className="loading">
                    <div className="loading__text">
                        No news articles available. Configure NewsAPI key and run the data fetch script.
                    </div>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="section" id="news">
            <div className="section__header">
                <h2 className="section__title">Latest News</h2>
                <p className="section__description">Recent news articles about JUMIA</p>
            </div>

            <a
                href="https://alerts.talkwalker.com/alerts/manage"
                target="_blank"
                rel="noopener noreferrer"
                className="feedly-button"
            >
                <span>🔔</span>
                <span>Follow JUMIA on Talkwalker</span>
            </a>

            <div className="news-list">
                {data.news.map((article, index) => (
                    <article key={index} className="news-card">
                        <div className="news-card__header">
                            <h3 className="news-card__title">{article.title}</h3>
                        </div>

                        <div className="news-card__meta">
                            <span className="news-card__source">{article.source}</span>
                            <span>•</span>
                            <span>{formatDate(article.publishedAt)}</span>
                        </div>

                        {article.summary && (
                            <p className="news-card__summary">{article.summary}</p>
                        )}

                        <a
                            href={article.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="news-card__link"
                        >
                            Read full article →
                        </a>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default NewsList;
