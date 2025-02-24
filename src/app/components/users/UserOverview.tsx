"use client"
import React, {useEffect, useState} from "react";
import {deleteUser,/* updateUserRole */ } from "@/actions/actions";
import {useTodoStore} from "@/app/store-provider";

export default function UserOverview() {
    const {users, todos, roles, fetchUsers} = useTodoStore(
        (state) => state
    );
    const [localUsers, setLocalUsers] = useState(users);

    useEffect(() => {
        setLocalUsers(users);
    }, [users]);

    const handleDeleteUser = async (userId: string) => {
        try {
            await deleteUser(userId);
            await fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // const handleRoleChange = async (userId: string, newRoleId: string) => {
    //     try {
    //         // const updatedUser = await updateUserRole(userId, newRoleId);
    //         // setLocalUsers(prevUsers =>
    //         //     prevUsers.map(user =>
    //         //         user.id === userId ? {...user, roles: [{id: newRoleId, name: ''}]} : user
    //         //     )
    //         // );
    //         await fetchUsers(); // This will update the global state
    //     } catch (error) {
    //         console.error("Error updating user role:", error);
    //     }
    // };

    const getUserTodos = (userId: string) => {
        return todos.filter(todo => todo.userId === userId).map(todo => todo.title);
    };


    return (
        <div className="container mx-auto p-6 text-white">
            <div className="p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">User Overview</h2>
                <div>
                    <table className="w-full table-auto">
                        <thead>
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
                            <th className="px-4 py-2 text-left">Assigned Todos</th>
                            <th className="px-4 py-2 text-left">Role</th>
                            <th className="px-4 py-2 text-left">Delete User</th>
                        </tr>
                        </thead>
                        <tbody>
                        {localUsers.map(user => (
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
                                    <select
                                        value={user.roles[0]?.id || ''}
                                        //onChange= {(e) => handleRoleChange(user.id, e.target.value)}
                                        className="bg-gray-700 text-white rounded-md px-2 py-1"
                                    >
                                        <option value="">Select a role</option>
                                        {roles.map(role => (
                                            <option key={role.id} value={role.id}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
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
        </div>
    );
}