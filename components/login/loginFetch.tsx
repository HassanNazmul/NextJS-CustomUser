export const loginFetch = async (username: string, password: string) => {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });

        if (!response.ok) {
            return null;  // Return null if login fails
        }

        const data = await response.json();  // Parse the response

        // Check if the user's role is 'student', and prevent login if so
        if (data.is_student) {
            return {success: false, message: 'Students are not allowed to log in.'};
        }

        return {success: true, data};  // Return the user data if the role is allowed
    } catch (error) {
        console.error('Error logging in:', error);
        return null;
    }
};

// export const loginFetch = async (username: string, password: string) => {
//     try {
//     // Call the Next.js proxy route, which forwards the request to Django
//     const response = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({username, password}),
//     });
//
//     if (!response.ok) {
//         return null;  // Return null if login fails
//     }
//
//     const data = await response.json();
//     return {success: true, data};
// } catch (error) {
//     console.error('Error logging in:', error);
//     return null;
// }
// };