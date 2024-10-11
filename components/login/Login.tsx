import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the client-side form to keep it separate
const LoginForm = dynamic(() => import('./LoginForm'), {ssr: false});

const Login = () => {
    return (
        <div>
            <LoginForm/>
        </div>
    );
};

export default Login;
