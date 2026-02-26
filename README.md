# JUMIA Analytics Dashboard

A comprehensive single-page React analytics dashboard for JUMIA (Africa's leading e-commerce platform) featuring real-time data from public sources, Python FastAPI backend, and pure CSS styling.

## 🌟 Features

- **Single-Page Dashboard**: All analytics on one page with smooth anchor navigation
- **Real Data Sources**: NewsAPI, Google Trends, App Stores, SimilarWeb, Investor Relations
- **Python Backend**: FastAPI server with RESTful endpoints
- **Pure CSS**: No frameworks - custom responsive design with dark/light theme
- **Interactive Charts**: Chart.js visualizations (trends, competitors, market share)
- **News Integration**: Latest news with Feedly integration
- **Multi-Country**: Tracks JUMIA across 11 African countries

## 🌍 Countries Covered

JUMIA operates in 11 African countries:

- Algeria
- Egypt
- Ghana
- Ivory Coast
- Kenya
- Morocco
- Nigeria
- Senegal
- South Africa
- Tunisia
- Uganda

## 📁 Project Structure

```
Jumia-alerting-system/
├── scripts/
│   ├── fetch_data.py          # Data fetching script
│   ├── requirements.txt       # Python dependencies for scraping
│   └── .env.example           # API keys template
├── backend/
│   ├── server.py              # FastAPI server
│   ├── requirements.txt       # Backend dependencies
│   └── data/
│       └── data.json          # Fetched data storage
└── frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css         # Pure CSS with theme support
        ├── components/       # React components
        │   ├── Navbar.jsx
        │   ├── Sidebar.jsx
        │   ├── OverviewCard.jsx
        │   ├── KPIGrid.jsx
        │   ├── TrendChart.jsx
        │   ├── CompetitorChart.jsx
        │   ├── NewsList.jsx
        │   └── Footer.jsx
        └── services/
            └── api.js        # API service
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- Node.js 16+
- NewsAPI key (free from https://newsapi.org)

### 1. Setup Environment

**Create `.env` file in `scripts/` directory:**

```bash
cd scripts
cp .env.example .env
```

Edit `.env` and add your NewsAPI key:

```
NEWSAPI_KEY=your_actual_api_key_here
```

### 2. Install Dependencies

**Python (data fetching & backend):**

```bash
# Install data fetching dependencies
cd scripts
pip install -r requirements.txt

# Install backend dependencies
cd ../backend
pip install -r requirements.txt
```

**Node.js (frontend):**

```bash
cd frontend
npm install
```

### 3. Fetch Data

Run the data fetching script to populate `backend/data/data.json`:

```bash
cd scripts
python fetch_data.py
```

This will:

- Fetch news from NewsAPI
- Get Google Trends data (12 months)
- Scrape app store ratings
- Fetch traffic metrics from SimilarWeb
- Get investor data from Jumia IR
- Fetch YouTube channel stats
- Get competitor data (Konga, Jiji, Takealot)

**Expected output**: A summary showing which sources succeeded/failed.

### 4. Start Backend

```bash
cd backend
uvicorn server:app --reload --port 3001
```

Backend runs on: **http://localhost:3001**

API Endpoints:

- `GET /api/data` - Complete dataset
- `GET /api/company` - Company KPIs
- `GET /api/competitors` - Competitor data
- `GET /api/trends` - Google Trends
- `GET /api/news` - News articles

### 5. Start Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on: **http://localhost:3002**

## 💡 Usage

1. **Run data fetcher** to get latest data: `python scripts/fetch_data.py`
2. **Start backend**: `uvicorn backend/server:app --reload --port 3001`
3. **Start frontend**: `npm run dev` (in frontend directory)
4. **Open browser**: Navigate to http://localhost:3002

### Dashboard Sections

- **Overview** (#overview): Key metrics (revenue, GMV, users, funding, ratings)
- **Competitors** (#competitors): App ratings comparison and market share charts
- **Growth** (#growth): 12-month trend lines and country interest breakdown
- **News** (#news): Latest articles with Feedly integration

## 🎨 Features & Design

### Pure CSS Design

- **No frameworks** (no Tailwind, Bootstrap, Material-UI)
- CSS variables for theming
- Smooth transitions and hover effects
- Responsive grid layouts
- Dark/light mode toggle (saved to localStorage)

### Theme Toggle

Click the 🌙/☀️ button in navbar to switch between dark and light themes. Your preference is saved automatically.

### Charts (Chart.js)

- **Line Chart**: 12-month search interest trends for Jumia and competitors
- **Bar Chart**: App ratings comparison
- **Pie Chart**: Estimated market share
- **Country Table**: Visual bars showing search interest by region

### News Integration

- Displays latest news from NewsAPI
- **Feedly button**: Opens curated Jumia feed in Feedly
- Link: https://feedly.com/i/search/Jumia

## 📊 Data Sources

| Source | Data Collected | Method |
|--------|----------------|--------|
| **NewsAPI** | Recent news articles | REST API |
| **Google Trends** | Search interest (12mo) | pytrends library |
| **Google Play** | App rating, reviews, installs | Web scraping |
| **Apple App Store** | App rating, review count | Web scraping |
| **SimilarWeb** | Traffic rank, monthly visits | Web scraping |
| **Jumia Investor Relations** | Revenue, GMV, funding | Web scraping |
| **YouTube** | Subscriber count | Web scraping |

### Data Refresh

Run the fetch script periodically to update data:

```bash
cd scripts
python fetch_data.py
```

**Recommended**: Set up a cron job or scheduled task to run daily.

## 🛠️ Troubleshooting

### Data Fetching Issues

**"NewsAPI key not configured"**

- Add your API key to `scripts/.env` file
- Get a free key from https://newsapi.org

**Web scraping failures**

- Some sources may block requests or change page structure
- The script includes fallback estimates and will continue on errors
- Check the fetch summary for which sources succeeded/failed

**Rate limiting**

- The script includes 1.5s delays between requests
- If you still hit limits, increase `REQUEST_DELAY` in `fetch_data.py`

### Backend Issues

**"Data file not found"**

- Run `python scripts/fetch_data.py` first
- Ensure `backend/data/data.json` exists

**Port 3001 already in use**

- Change port in `uvicorn` command
- Update proxy in `frontend/vite.config.js` to match

### Frontend Issues

**"Failed to load data"**

- Ensure backend is running on port 3001
- Check browser console for errors
- Verify `frontend/vite.config.js` proxy is configured

**Charts not displaying**

- Ensure data has been fetched (run `python scripts/fetch_data.py`)
- Check that trends data exists in `backend/data/data.json`

## 📝 Development

### Adding New Data Sources

1. Add fetching logic to `scripts/fetch_data.py`
2. Update data structure in `backend/data/data.json`
3. Add backend endpoint in `backend/server.py`
4. Create/update React component in `frontend/src/components/`
5. Import and render in `App.jsx`

### Customizing Design

All styles are in `frontend/src/index.css`:

- **Theme colors**: Edit CSS variables in `:root` and `.dark`
- **Spacing**: Modify `--spacing-*` variables
- **Component styles**: Find component classes (e.g., `.card`, `.navbar`)

### Building for Production

```bash
cd frontend
npm run build
```

Build output: `frontend/dist/`

Serve with any static hosting or configure backend to serve static files.

## 🔑 API Keys Required

### NewsAPI (Required for news)

1. Sign up at https://newsapi.org
2. Get free API key (500 requests/day)
3. Add to `scripts/.env`:

```
NEWSAPI_KEY=your_key_here
```

### Optional Improvements

For more robust data:

- **SerpAPI**: For more reliable app store data
- **ScraperAPI**: For bypassing blocking on SimilarWeb/YouTube
- **Polygon/Alpha Vantage**: For stock price data (Jumia is publicly traded: JMIA)

## 📄 License

This project is for educational and analytical purposes. Ensure compliance with terms of service for all data sources when scraping.

## 🤝 Contributing

To improve data accuracy:

1. Add more robust scraping patterns in `fetch_data.py`
2. Implement additional public data sources
3. Enhance error handling and retry logic
4. Add data validation and confidence scoring

## 📮 Support

For issues with:

- **Data fetching**: Check `fetch_data.py` logs and source availability
- **Backend**: Verify FastAPI server logs
- **Frontend**: Check browser console for errors

---

**Built with**: React + Vite, FastAPI, Chart.js, Pure CSS

**No external CSS frameworks • No placeholder data • Real public sources**

