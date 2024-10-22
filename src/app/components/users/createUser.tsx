"use client"
import { useEffect, useState } from "react";
import useStore from "@/app/store";

export default function CreateUser() {
    const [newUserName, setNewUserName] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");
    const { users, todos, addUser, fetchUsers, fetchTodos, deleteUser } = useStore();

    useEffect(() => {
        fetchUsers();
        fetchTodos("", "","");
    }, [fetchUsers, fetchTodos]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await addUser(newUserName, newUserEmail);
            setNewUserName("");
            setNewUserEmail("");
            await fetchUsers();
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const handleDeleteUser = async (userId: string) => {
        try {
            await deleteUser(userId);
            await fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const getUserTodos = (userId: string) => {
        return todos.filter(todo => todo.userId === userId).map(todo => todo.title);
    };

    return (
        <div className="container mx-auto p-6 text-white">
            <div className=" p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 ">User Overview</h2>
                <div className="">
                    <table className="w-full table-auto">
                        <thead>
                        <tr className="">
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Assigned Todos</th>
                            <th className="px-4 py-2 text-left">Delete User</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b">
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">
                                    <ul className="list-disc list-inside">
                                        {getUserTodos(user.id).map((todoTitle, index) => (
                                            <li key={index}>{todoTitle}</li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="px-4 py-2">
                                    <button
                                        onClick={() => handleDeleteUser(user.id)}
                                        className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className=" shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">Create New User</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="text-black">
                        <input
                            type="text"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            placeholder="Name"
                            required
                            className="w-full "
                        />
                    </div>
                    <div className="text-black">
                        <input
                            type="email"
                            value={newUserEmail}
                            onChange={(e) => setNewUserEmail(e.target.value)}
                            placeholder="Email"
                            required
                            className="w-full "
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 "
                    >
                        Create User
                    </button>
                </form>
            </div>
        </div>
    );
}