"use client";
import AddTodo from "@/app/components/todos/AddTodo";
import Todo from "@/app/components/todos/Todo";
import React, { useEffect, useState } from "react";
import useStore from "@/app/store";
import CreateUser from "@/app/components/users/createUser";
import UserOverview from "@/app/components/users/userOverview";

export default function Home() {
    const { todos, fetchTodos } = useStore();
    const [dateOrder, setDateOrder] = useState("desc");
    const [priorityOrder, setPriorityOrder] = useState("desc");
    const [userOrder, setUserOrder] = useState(""); // Neue State-Variable für Benutzer-Sortierung

    useEffect(() => {
        fetchTodos(dateOrder, priorityOrder, userOrder);
    }, [dateOrder, priorityOrder, userOrder, fetchTodos]);

    const handleDateOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDateOrder(event.target.value);
        setPriorityOrder("");
        setUserOrder("");
    };

    const handlePriorityOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPriorityOrder(event.target.value);
        setDateOrder("");
        setUserOrder("");
    };

    const handleUserOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setUserOrder(event.target.value);
        setDateOrder("");
        setPriorityOrder("");
    };

    return (
        <div className="">
            <div className="flex justify-center flex-col items-center mt-24">
                <AddTodo />

                <div className="flex gap-4 mt-4">
                    <select
                        className="text-black"
                        onChange={handleDateOrderChange}
                        value={dateOrder}
                    >
                        <option value="">Sort by Date</option>
                        <option value="asc">Date Ascending</option>
                        <option value="desc">Date Descending</option>
                    </select>

                    <select
                        className="text-black"
                        onChange={handlePriorityOrderChange}
                        value={priorityOrder}
                    >
                        <option value="">Sort by Priority</option>
                        <option value="asc">Priority Low to High</option>
                        <option value="desc">Priority High to Low</option>
                    </select>

                    <select
                        className="text-black"
                        onChange={handleUserOrderChange}
                        value={userOrder}
                    >
                        <option value="">Sort by User</option>
                        <option value="asc">User A to Z</option>
                        <option value="desc">User Z to A</option>
                    </select>
                </div>

                <div className="w-full">
                    <tr className="flex justify-evenly w-full ">
                        <th className="pl-40  text-lg "> todo:</th>
                        <th className="pl-52 text-lg"> creation date:</th>
                        <th className="pl-40 text-lg"> priority:</th>
                        <th className="pl-52 text-lg"> actions:</th>
                        <th className="pl-40 text-lg"> assigned to:</th>
                    </tr>
                </div>

                <div className="flex-col flex gap-2 justify-center mt-5 w-screen ">
                    {todos.map((todo) => (
                        <Todo key={todo.id} todo={todo} />
                    ))}
                </div>
            </div>

        </div>
    );
}