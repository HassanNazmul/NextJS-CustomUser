// config.js

const config = {
    API_URL:
        process.env.NODE_ENV === 'development'
            ? "http://localhost:8000"  // Use local API for development
            : process.env.REACT_APP_API_URL || "https://your-production-api.com",  // Use production API
};

export default config;
