"use client";

import React, {useState} from "react";
import {FaCheck, FaSignInAlt, FaTimes} from "react-icons/fa";
import {loginUser} from "@/components/login/LoginAPI";
import {useRouter} from "next/navigation";
import {setCookie} from "cookies-next";

interface LoginFormProps {
    onSubmit: (email: string, password: string) => void;
}

const MIN_LOADING_TIME = 1000;

interface TextInputProps {
    id: string;
    label: string;
    type: string;
    value: string;
    error: string;
    shake: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
                                                 id,
                                                 label,
                                                 type,
                                                 value,
                                                 error,
                                                 shake,
                                                 onChange,
                                             }) => {
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className={`block text-sm font-medium text-gray-700 mb-1 ${
                    shake && error === "submit" && !value ? "animate-shake" : ""
                }`}
            >
                {label}
            </label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                className={`w-full px-4 py-2 border text-black ${
                    error === "submit" && !value ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 ${
                    error === "submit" && !value
                        ? "focus:ring-red-500"
                        : "focus:ring-purple-500"
                } transition-all duration-300 ease-in-out ${
                    shake && error === "submit" && !value ? "animate-shake" : ""
                }`}
                placeholder={`Enter your ${label.toLowerCase()}`}
                aria-label={label}
            />
        </div>
    );
};

const LoginForm: React.FC<LoginFormProps> = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [shake, setShake] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [redirecting, setRedirecting] = useState<boolean>(false);
    const router = useRouter();

    const triggerShake = (): void => {
        setShake(true);
        setTimeout(() => setShake(false), 400);
    };

    const handleSubmit = async (): Promise<void> => {
        if (email && password) {
            setIsLoading(true);
            const startTime = Date.now();

            try {
                await new Promise((resolve) => setTimeout(resolve, MIN_LOADING_TIME));
                const response = await loginUser(email, password);

                if (response.ok) {
                    const data = await response.json();
                    setCookie("authToken", data.key, {maxAge: 3600}); // Save token for 1 hour
                    console.log("Login successful, token:", data.key);
                    setSubmitted(true);
                    setEmail("");
                    setPassword("");
                    setTimeout(() => {
                        setRedirecting(true);
                        setTimeout(() => {
                            router.push("/dashboard");
                        }, 2000); // Redirect after loading with delay
                    }, 1000); // Show confirmation for a second before loading
                } else {
                    setError("submitFailed");
                    console.error("Login failed:", await response.json());
                    triggerShake();
                }
            } catch (error) {
                console.error("Error during submission:", error);
                setError("submitFailed");
                triggerShake();
            } finally {
                const timeElapsed = Date.now() - startTime;
                const remainingTime = MIN_LOADING_TIME - timeElapsed;
                setTimeout(() => {
                    setIsLoading(false);
                }, Math.max(remainingTime, 0));
            }
        } else {
            setError("submit");
            triggerShake();
        }
    };

    const handleInputChange = (field: "email" | "password") => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (field === "email") {
            setEmail(e.target.value);
        } else {
            setPassword(e.target.value);
        }
        setError("");
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div
                className="relative w-full max-w-lg bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg shadow-md flex flex-col justify-center items-center">
                <div className="w-full flex-grow flex flex-col justify-center">
                    {/* Email Input */}
                    <TextInput
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        error={error}
                        shake={shake}
                        onChange={handleInputChange("email")}
                    />

                    {/* Password Input */}
                    <TextInput
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        error={error}
                        shake={shake}
                        onChange={handleInputChange("password")}
                    />

                    {/* Submit Button */}
                    <div className="w-full flex space-x-4 pt-12 pb-4">
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading || submitted}
                            className={`flex-1 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center justify-center ${
                                error === "submitFailed"
                                    ? "bg-red-500"
                                    : submitted
                                        ? "bg-green-500"
                                        : "bg-indigo-500 hover:bg-indigo-600"
                            }`}
                            aria-label={submitted ? "Login submitted" : "Submit login"}
                        >
                            {isLoading ? (
                                <>
                                    <FaSignInAlt className="mr-2 animate-spin"/>
                                    <span className="animate-pulse">Logging in...</span>
                                </>
                            ) : error === "submitFailed" ? (
                                <>
                                    <FaTimes className="mr-2"/> Incorrect Credential
                                </>
                            ) : submitted ? (
                                <>
                                    <FaCheck className="mr-2"/> Logged In
                                </>
                            ) : (
                                <>
                                    <FaSignInAlt
                                        className={`mr-2 ${error === "submitFailed" ? "text-white" : ""}`}
                                    />
                                    Log In
                                </>
                            )}
                        </button>
                    </div>

                    {/* Forgot Password Section */}
                    <div className="w-full text-center mt-4">
                        <a href="#" className="text-sm text-indigo-600 hover:underline">
                            Forgot your password?
                        </a>
                    </div>
                </div>
            </div>
            {redirecting && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-md animate-fadeIn">
                        <p className="text-lg font-medium text-gray-800 animate-pulse">
                            Redirecting to dashboard...
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginForm;