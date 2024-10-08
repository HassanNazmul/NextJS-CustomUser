"use client";

import React, {useState} from "react";
import {FaSignInAlt, FaCheck, FaTimes} from "react-icons/fa";

interface LoginFormProps {
    onSubmit: (email: string, password: string) => void;
}

const MIN_LOADING_TIME = 2000;

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

const LoginForm: React.FC<LoginFormProps> = ({onSubmit}) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [shake, setShake] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);

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
                await onSubmit(email, password);

                const timeElapsed = Date.now() - startTime;
                const remainingTime = MIN_LOADING_TIME - timeElapsed;

                setTimeout(() => {
                    setSubmitted(true);
                    setEmail("");
                    setPassword("");
                    setIsLoading(false);
                }, Math.max(remainingTime, 0));
            } catch (error) {
                console.error("Error during submission:", error);
                setError("submitFailed");
                triggerShake();
                setIsLoading(false);
            }
        } else {
            setError("submit");
            triggerShake();
        }
    };

    const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setter(e.target.value);
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
                        onChange={handleInputChange(setEmail)}
                    />

                    {/* Password Input */}
                    <TextInput
                        id="password"
                        label="Password"
                        type="password"
                        value={password}
                        error={error}
                        shake={shake}
                        onChange={handleInputChange(setPassword)}
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
                                        ? "bg-gray-500"
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
                                    <FaTimes className="mr-2"/> Login Failed
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
        </div>
    );
};

export default LoginForm;