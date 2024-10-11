import config from "@/utils/config";


export async function logOutUser() {
    return fetch(`${config.API_URL}/dj-rest-auth/logout/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
}
