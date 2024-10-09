"use client";

import React from 'react';
import Login from "@/components/login/Login";

function LoginPage() {
    return (
        <main>
            <Login onSubmit={(email, password) => {
                console.log("Form submitted:", email, password);
            }}/>
        </main>
    );
}

export default LoginPage;
