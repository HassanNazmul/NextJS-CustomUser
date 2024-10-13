export const loginFetch = async (username: string, password: string) => {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });

        // Check if the response was not OK (e.g., 4xx or 5xx status code)
        if (!response.ok) {
            const errorMessage = response.status === 401
                ? 'Invalid username or password.'
                : response.status === 403
                    ? 'You are not allowed to log in.'
                    : 'An error occurred during login. Please try again.';

            // Log the error message to the console
            console.error(`Login failed: ${errorMessage}`);
            return {success: false, message: errorMessage};
        }

        const data = await response.json();

        // Check if the user's role is 'student'
        if (data.is_student) {
            console.error('Login failed: Students are not allowed to log in.');
            return {success: false, message: 'Students are not allowed to log in.'};
        }

        return {success: true, data};
    } catch (error) {
        // Log the fetch error
        console.error('Error logging in:', error);
        return {success: false, message: 'Network error. Please check your connection and try again.'};
    }
};