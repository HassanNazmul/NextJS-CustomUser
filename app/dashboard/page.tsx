"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next"; // Install with `npm install cookies-next`

const Dashboard: React.FC = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = getCookie("authToken");

        if (!token) {
            router.push("/login");
        } else {
            setIsLoading(false);
        }
    }, [router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div>
            <h1>Welcome to the Dashboard!</h1>
            {/* Add more dashboard content here */}
        </div>
    );
};

export default Dashboard;
