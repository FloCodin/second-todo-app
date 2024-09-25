"use client"
import AddTodo from "@/app/components/todos/AddTodo";
import Todo from "@/app/components/todos/Todo";
import React, { useEffect, useState } from "react";
import useStore from "@/app/store";

export default function Home() {
    const { todos, fetchTodos } = useStore();
    const [order, setOrder] = useState("asc");
    const [sortBy, setSortBy] = useState("createdAt");

    useEffect(() => {
        fetchTodos(order, sortBy);
    }, [order, sortBy, fetchTodos]);

    const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOrder(event.target.value);
    }

    const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(event.target.value);
    }

    return (
        <div className="">
            <div className="flex justify-center flex-col items-center mt-24">
                <AddTodo />
                <div className="flex gap-4 mt-4">
                    <select
                        className="text-black"
                        onChange={handleSortOrderChange}
                        value={order}
                    >
                        <option value="asc">Asc</option>
                        <option value="desc">Desc</option>
                    </select>
                    <select
                        className="text-black"
                        onChange={handleSortByChange}
                        value={sortBy}
                    >
                        <option value="createdAt">Date</option>
                        <option value="priority">Priority</option>
                    </select>
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