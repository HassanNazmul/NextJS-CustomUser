"use client";

import React, {useState} from "react";
import {loginFetch} from "./lib/loginFetch";
import {useRouter} from "next/navigation";
import {setCookie} from "cookies-next";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await loginFetch(username, password);

        if (response && response.success) {
            // Store token in cookies after successful login
            setCookie("authToken", response.data.token);

            // Redirect to dashboard
            router.push("/dashboard");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-6 border border-gray-600 w-full max-w-md shadow-md"
            >
                <h2 className="text-2xl font-semibold mb-4 text-center text-white">
                    Login
                </h2>

                <div className="mb-4">
                    <label
                        className="block text-gray-400 text-sm mb-2"
                        htmlFor="username"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        className="w-full p-2 bg-gray-700 border border-gray-600 text-gray-300"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label
                        className="block text-gray-400 text-sm mb-2"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full p-2 bg-gray-700 border border-gray-600 text-gray-300"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gray-600 text-white py-2 border border-gray-500 hover:bg-gray-700"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
