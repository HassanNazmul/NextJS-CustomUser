"use client"

import React from 'react';
import logoutFetch from "@/components/login/lib/logoutFetch";
import {deleteCookie} from "cookies-next";

const LogoutButton = () => {
    const handleLogout = async () => {
        // Call the logout function
        const result = await logoutFetch();

        // Check the result of the logout attempt
        if (result.success) {
            console.log('Logout successful.');
            deleteCookie("authToken");
            // Successful logout, no need to redirect here as it's handled by logoutFetch
        } else {
            console.log('Logout failed. Please try again.');
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="w-36 h-12 bg-gray-600 text-white py-2 border border-gray-500 hover:bg-gray-700"
        >
            Logout
        </button>
    );
};

export default LogoutButton;