"use client";
import AddTodo from "@/app/components/todos/AddTodo";
import Todo from "@/app/components/todos/Todo";
import React, { useEffect, useState } from "react";
import useStore from "@/app/store";
import CreateUser from "@/app/components/users/createUser";

export default function Home() {
    const { todos, fetchTodos } = useStore();
    const [dateOrder, setDateOrder] = useState("desc");
    const [priorityOrder, setPriorityOrder] = useState("desc");

    useEffect(() => {
        fetchTodos(dateOrder, priorityOrder);
    }, [dateOrder, priorityOrder, fetchTodos]);

    const handleDateOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setDateOrder(event.target.value);
    };

    const handlePriorityOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setPriorityOrder(event.target.value);
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
                        <option value="asc">Date Ascending</option>
                        <option value="desc">Date Descending</option>
                    </select>

                    <select
                        className="text-black"
                        onChange={handlePriorityOrderChange}
                        value={priorityOrder}
                    >
                        <option value="asc">Priority Low to High</option>
                        <option value="desc">Priority High to Low</option>
                    </select>
                </div>

                <div className="flex-col flex gap-2 justify-center mt-5 w-screen ">
                    {todos.map((todo) => (
                        <Todo key={todo.id} todo={todo} />
                    ))}
                </div>
            </div>
            <div>
                <CreateUser/>
            </div>
        </div>
    );
}
