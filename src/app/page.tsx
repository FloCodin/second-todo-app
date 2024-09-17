"use client"
import AddTodo from "@/app/components/todos/AddTodo";
import Todo from "@/app/components/todos/Todo";
import React, { useEffect, useState } from "react";
import useStore from "@/app/store";

export default function Home() {
    const { todos, fetchTodos } = useStore();
    const [order, setOrder] = useState("asc");

    useEffect(() => {
        fetchTodos(order);
    }, [order, fetchTodos]);

    const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setOrder(event.target.value);
    }

    return (
        <div className="">
            <div className="flex justify-center flex-col items-center mt-24">
                <AddTodo />
                <select
                    className="text-black mt-4 justify-center w-1/12"
                    onChange={handleSortOrderChange}
                    value={order}
                >
                    <option value="asc">Asc</option>
                    <option value="desc">Desc</option>
                </select>
                <div className="flex-col flex gap-2 justify-center mt-5 w-screen ">
                    {todos.map((todo) => (
                        <Todo key={todo.id} todo={todo} />
                    ))}
                </div>
            </div>
        </div>
    );
}