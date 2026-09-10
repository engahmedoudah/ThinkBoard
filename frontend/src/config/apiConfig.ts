/**
 * API Configuration
 * Central configuration for API endpoints and base URL
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const API_CONFIG = {
    BASE_URL: API_BASE_URL,
    ENDPOINTS: {
        NOTES: `${API_BASE_URL}/api/notes`,
    },
} as const;

export default API_CONFIG;
