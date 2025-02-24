"use client";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {User} from "@prisma/client";
import {useTodoStore} from "@/app/store-provider";

interface UserRoleMap {
    [key: string]: string[];
}

export default function CreateUser() {
    const [newUserName, setNewUserName] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");
    const [selectedRole, setSelectedRole] = useState<string>("");
    const [, setUserRoles] = useState<UserRoleMap>({});
    const { users, roles, addUser, fetchUsers } = useTodoStore(
        (state) => state
    );

    useEffect(() => {
        const initialUserRoles = users.reduce((acc: UserRoleMap, user) => {
            acc[user.id] = user.roles.map(role => role.id);
            return acc;
        }, {});
        setUserRoles(initialUserRoles);
    }, [users]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {

            const newUser = await addUser(newUserName, newUserEmail, [selectedRole]) as unknown as User;

            console.log("New User:", newUser); // Debugging
            if (newUser && newUser.id) {
                setUserRoles(prev => ({
                    ...prev,
                    [newUser.id]: [selectedRole],
                }));
            }
            if (newUser && typeof newUser === "object" && "id" in newUser) {
                setUserRoles(prev => ({
                    ...prev,
                    [newUser.id]: [selectedRole],
                }));
            }

            setNewUserName("");
            setNewUserEmail("");
            setSelectedRole("");
            await fetchUsers();
            toast.success("User created successfully!");
        } catch (error) {
            console.error("Error adding user:", error);
            toast.error("Failed to create user. Please try again.");
        }
    };


    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRole(e.target.value);
    };

    return (
        <div className="container mx-auto p-6 text-white">
            <ToastContainer />
            <div className="shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">Create New User</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="text-black">
                        <input
                            type="text"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            placeholder="Name"
                            required
                            className="w-full"
                        />
                    </div>
                    <div className="text-black">
                        <input
                            type="email"
                            value={newUserEmail}
                            onChange={(e) => setNewUserEmail(e.target.value)}
                            placeholder="Email"
                            required
                            className="w-full"
                        />
                    </div>
                    <div className="text-black">
                        <select
                            value={selectedRole}
                            onChange={handleRoleChange}
                            className="w-full"
                        >
                            <option value="">Select a role</option>
                            {roles.map(role => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Create User
                    </button>
                </form>
            </div>
        </div>
    );
}