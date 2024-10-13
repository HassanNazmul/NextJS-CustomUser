// Function to handle logout requests
const logoutFetch = async () => {
    try {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return {success: false, message: 'Logout failed.'};
        }

        // Redirection after logout
        window.location.href = '/'; // Redirect to the login page

        return {success: true, message: 'Logout successful.'};
    } catch (error) {
        console.error('Error logging out:', error);
        return {success: false, message: 'Error logging out.'};
    }
};

export default logoutFetch;