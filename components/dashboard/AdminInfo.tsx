import React, {useEffect, useState} from "react";
import {getAllUser} from "@/components/dashboard/lib/getAllUser";

// Define an interface for the user data
interface User {
    id: number;
    email: string;
    full_name: string;
    is_student: boolean;
    is_admin: boolean;
    is_staff: boolean;
    is_active: boolean;
    date_joined: string;
}

const AdminInfo = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getAllUser()
            .then((data) => {
                setUsers(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>Admin User Information</h2>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Full Name</th>
                    <th>Is Student</th>
                    <th>Is Admin</th>
                    <th>Is Staff</th>
                    <th>Is Active</th>
                    <th>Date Joined</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.email}</td>
                        <td>{user.full_name}</td>
                        <td>{user.is_student ? "Yes" : "No"}</td>
                        <td>{user.is_admin ? "Yes" : "No"}</td>
                        <td>{user.is_staff ? "Yes" : "No"}</td>
                        <td>{user.is_active ? "Yes" : "No"}</td>
                        <td>{new Date(user.date_joined).toLocaleString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminInfo;
