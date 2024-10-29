"use client"
import { useState, useEffect } from "react";
import useStore from "@/app/store";

export default function AddRole() {
    const [roleName, setRoleName] = useState("");
    const { roles, fetchRoles, addRole } = useStore();

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addRole(roleName);
        setRoleName("");
    };

    return (
        <div className="container mx-auto p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Add New Role</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-black">
                <input
                    type="text"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    placeholder="Role Name"
                    required
                    className="w-full p-2"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                >
                    Create Role
                </button>
            </form>

            <h3 className="text-xl font-bold mt-6">Existing Roles</h3>
            <ul className="list-disc list-inside">
                {roles.map(role => (
                    <li key={role.id}>{role.name}</li>
                ))}
            </ul>
        </div>
    );
}