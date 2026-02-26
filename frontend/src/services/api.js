/**
 * API Service for JUMIA Analytics Dashboard
 * Handles all data fetching from backend
 */

const API_BASE = '/api';

class ApiService {
    async fetchData(endpoint) {
        try {
            const response = await fetch(`${API_BASE}${endpoint}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Error fetching ${endpoint}:`, error);
            throw error;
        }
    }

    async getAllData() {
        return this.fetchData('/data');
    }

    async getCompanyData() {
        return this.fetchData('/company');
    }

    async getCompetitors() {
        return this.fetchData('/competitors');
    }

    async getTrends() {
        return this.fetchData('/trends');
    }

    async getNews() {
        return this.fetchData('/news');
    }

    async getAppData() {
        return this.fetchData('/app');
    }

    async getTrafficData() {
        return this.fetchData('/traffic');
    }

    async refreshData() {
        return this.fetchData('/refresh');
    }
}

export default new ApiService();
