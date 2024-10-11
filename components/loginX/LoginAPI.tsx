import config from "@/utils/config";

export async function loginUser(email: string, password: string) {
    const response = await fetch(`${config.API_URL}/dj-rest-auth/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });

    // Since we're getting JSON directly, there's no need for response.ok or response.json()
    const data = await response.json();
    console.log("Login response data:", data);  // Log the entire response object

    // Verify if the user roles are included in the response
    if (!data.is_admin && !data.is_staff) {
        throw new Error("Only admins, staff, and superusers are allowed to loginX.");
    }

    // If the user has the required permissions, return the data
    return data;
}
