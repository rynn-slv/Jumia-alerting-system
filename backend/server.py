"""
JUMIA Analytics Dashboard - FastAPI Backend
Serves data from data.json through REST API endpoints
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import json
from typing import Dict, Any

app = FastAPI(
    title="JUMIA Analytics API",
    description="REST API for JUMIA analytics dashboard data",
    version="1.0.0"
)

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify actual frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Path to data file
DATA_FILE = Path(__file__).parent / 'data' / 'data.json'

def load_data() -> Dict[str, Any]:
    """Load data from JSON file"""
    try:
        if not DATA_FILE.exists():
            return {
                "error": "Data file not found. Please run the data fetching script first.",
                "message": "Run: python scripts/fetch_data.py"
            }
        
        with open(DATA_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        return {
            "error": f"Failed to load data: {str(e)}"
        }

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "name": "JUMIA Analytics API",
        "version": "1.0.0",
        "endpoints": {
            "/api/data": "Complete dataset",
            "/api/company": "Company KPIs",
            "/api/competitors": "Competitor data",
            "/api/trends": "Google Trends data",
            "/api/news": "News articles"
        }
    }

@app.get("/api/data")
async def get_all_data():
    """Get complete dataset"""
    data = load_data()
    if "error" in data and len(data) == 2:  # Only error and message keys
        raise HTTPException(status_code=500, detail=data["error"])
    return data

@app.get("/api/company")
async def get_company_data():
    """Get company KPIs only"""
    data = load_data()
    if "error" in data and len(data) == 2:
        raise HTTPException(status_code=500, detail=data["error"])
    
    return {
        "company": data.get("company", {}),
        "fetched_at": data.get("fetched_at", "")
    }

@app.get("/api/competitors")
async def get_competitors_data():
    """Get competitor data"""
    data = load_data()
    if "error" in data and len(data) == 2:
        raise HTTPException(status_code=500, detail=data["error"])
    
    return {
        "competitors": data.get("competitors", {}),
        "fetched_at": data.get("fetched_at", "")
    }

@app.get("/api/trends")
async def get_trends_data():
    """Get Google Trends data"""
    data = load_data()
    if "error" in data and len(data) == 2:
        raise HTTPException(status_code=500, detail=data["error"])
    
    return {
        "trends": data.get("trends", {}),
        "fetched_at": data.get("fetched_at", "")
    }

@app.get("/api/news")
async def get_news():
    """Get news articles"""
    data = load_data()
    if "error" in data and len(data) == 2:
        raise HTTPException(status_code=500, detail=data["error"])
    
    return {
        "news": data.get("news", []),
        "fetched_at": data.get("fetched_at", "")
    }

@app.get("/api/app")
async def get_app_data():
    """Get app store data"""
    data = load_data()
    if "error" in data and len(data) == 2:
        raise HTTPException(status_code=500, detail=data["error"])
    
    return {
        "app": data.get("app", {}),
        "fetched_at": data.get("fetched_at", "")
    }

@app.get("/api/traffic")
async def get_traffic_data():
    """Get website traffic data"""
    data = load_data()
    if "error" in data and len(data) == 2:
        raise HTTPException(status_code=500, detail=data["error"])
    
    return {
        "traffic": data.get("traffic", {}),
        "youtube": data.get("youtube", {}),
        "fetched_at": data.get("fetched_at", "")
    }

@app.get("/api/refresh")
async def refresh_data():
    """Trigger data fetch script to update data.json"""
    import subprocess
    import os
    
    try:
        # Get the scripts directory path
        script_dir = Path(__file__).parent.parent / 'scripts'
        fetch_script = script_dir / 'fetch_data.py'
        
        if not fetch_script.exists():
            raise HTTPException(status_code=404, detail="Fetch script not found")
        
        # Run the fetch script
        result = subprocess.run(
            ['python', str(fetch_script)],
            cwd=str(script_dir),
            capture_output=True,
            text=True,
            timeout=120  # 2 minute timeout
        )
        
        return {
            "status": "success" if result.returncode == 0 else "error",
            "message": "Data refresh completed" if result.returncode == 0 else "Data refresh failed",
            "output": result.stdout[-500:] if result.stdout else "",  # Last 500 chars
            "error": result.stderr[-500:] if result.stderr else ""
        }
    except subprocess.TimeoutExpired:
        raise HTTPException(status_code=408, detail="Data fetch timed out")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to refresh data: {str(e)}")

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    data_exists = DATA_FILE.exists()
    return {
        "status": "healthy" if data_exists else "warning",
        "data_file_exists": data_exists,
        "data_file_path": str(DATA_FILE)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3001, reload=True)
