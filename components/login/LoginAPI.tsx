import config from "@/config";


export async function loginUser(email: string, password: string) {
    return fetch(`${config.API_URL}/dj-rest-auth/login/`, {
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