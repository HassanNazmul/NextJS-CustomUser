// /** @type {import('next').NextConfig} */
// const nextConfig = {};
//
// export default nextConfig;


/** @type {import('next').NextConfig} */

// Directly hardcode the backend API URL here
const backendUrl = 'http://localhost:8000';  // Use your production URL when deploying

const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/api/auth/login',
                destination: `${backendUrl}/dj-rest-auth/login/`, // The backend API URL is hidden
            },
        ];
    },
};

export default nextConfig;