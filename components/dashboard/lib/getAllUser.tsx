import config from "@/utils/config";

export async function getAllUser() {
    // Retrieve token from localStorage or any other place you are storing it
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("No token found. Please log in.");
    }

    try {
        const response = await fetch(`${config.API_URL}/api/users/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
        });

        if (!response.ok) {
            if (response.status === 403) {
                throw new Error("Forbidden: You are not authorized to view this resource.");
            } else if (response.status === 401) {
                throw new Error("Unauthorized: Please log in again.");
            } else {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}
