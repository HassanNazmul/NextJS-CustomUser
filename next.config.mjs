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
            {
                // The source property defines the route that users will interact with
                source: '/api/auth/logout',
                // The destination property points to the backend API endpoint where the request should be redirected
                destination: `${backendUrl}/dj-rest-auth/logout/`, // The backend API URL is hidden from the client
            },
            {
                // The source property defines the route that users will interact with
                source: '/api/alluser',
                // The destination property points to the backend API endpoint where the request should be redirected
                destination: `${backendUrl}/api/users/`, // The backend API URL is hidden from the client
            },
        ];
    },
};

export default nextConfig;