"use client";

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {deleteCookie, getCookie} from "cookies-next";
import AdminInfo from "@/components/dashboard/AdminInfo"; // Or localStorage

const Dashboard: React.FC = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);  // New loading state

    useEffect(() => {
        const token = getCookie("authToken");

        if (!token) {
            router.push("/login");
        } else {
            setIsLoading(false);
        }
    }, [router]);

    const handleLogout = () => {
        deleteCookie("authToken");
        router.push("/");
    };

    if (isLoading) {
        return null;
    }

    return (
        <div>
            <h1 className="text-9xl">This is Dashboard Page</h1>
            <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
                Logout
            </button>
            <AdminInfo/>
        </div>
    );
};

export default Dashboard;
