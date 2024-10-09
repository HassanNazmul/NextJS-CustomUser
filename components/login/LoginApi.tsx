export async function loginUser(email: string, password: string) {
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";
    return fetch(`${API_URL}/dj-rest-auth/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
}