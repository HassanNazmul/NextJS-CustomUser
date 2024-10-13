"use client";

import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {getCookie} from "cookies-next";
import LogoutButton from "@/components/login/LogoutButton";
import AdminInfo from "@/components/dashboard/AdminInfo";

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

    if (isLoading) {
        return null;
    }

    return (
        <div>
            <h1 className="text-9xl">This is Dashboard Page</h1>
            <br/>
            <AdminInfo/>
            <br/>
            <LogoutButton/>
        </div>
    );
};

export default Dashboard;
