"use client";

import AddTodo from "@/app/components/todos/AddTodo";
import Todo from "@/app/components/todos/Todo";
import React, { useEffect } from "react";
import useStore from "@/app/store";
import SortButtons from "@/app/components/button/SortButtons";
import {toast, ToastContainer} from "react-toastify";

export default function Home() {
    const { todos, fetchTodos, addTodo } = useStore();
    const [dateOrder, setDateOrder] = React.useState("desc");
    const [priorityOrder, setPriorityOrder] = React.useState("desc");
    const [userOrder, setUserOrder] = React.useState("");

    useEffect(() => {
        fetchTodos(dateOrder, priorityOrder, userOrder).catch((error) =>
            console.error("Error fetching todos:", error)
        );
    }, [dateOrder, priorityOrder, userOrder, fetchTodos]);



    const handleTodoAdded = async (title: string) => {

        try {
            if (title && title.trim()) {
                await addTodo(title);
                toast.success("Todo added successfully!"); // Erfolgsmeldung
            } else {
                toast.error("Todo cannot be empty!"); // Fehlermeldung
            }
        } catch (error) {
            console.error("Error adding todo:", error);
            toast.error("Something went wrong!");
        }
    };



    return (
        <div className="container mx-auto">
            <ToastContainer
            />
            <div className="flex justify-center flex-col items-center mt-24">
                <AddTodo onTodoAdded={handleTodoAdded} />
                <SortButtons />
                <div className="flex-col flex gap-2 justify-center mt-5 w-screen">
                    {todos.map((todo) => (
                        <Todo key={todo.id} todo={todo} />
                    ))}
                </div>
            </div>
        </div>
    );
}
