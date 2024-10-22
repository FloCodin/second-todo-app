"use client"
import { useEffect, useState } from "react";
import useStore from "@/app/store";

export default function CreateUser() {
    const [newUserName, setNewUserName] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");
    const { users, addUser, fetchUsers } = useStore();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addUser(newUserName, newUserEmail);
            setNewUserName("");
            setNewUserEmail("");
            await fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    return (
        <div>
            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">User Overview</h2>
                <table className="w-full">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Create New User</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 justify-center items-center max-w-screen">
                    <input
                        type="text"
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        placeholder="Name"
                        required
                        className="text-black p-2"
                    />
                    <input
                        type="email"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                        placeholder="Email"
                        required
                        className="text-black p-2"
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2">Create User</button>
                </form>
            </div>
        </div>
    );
}