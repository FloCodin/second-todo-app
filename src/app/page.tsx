"use client";
import AddTodo from "@/app/components/todos/AddTodo";
import Todo from "@/app/components/todos/Todo";
import React, {useEffect, useState} from "react";
import useStore from "@/app/store";
import SortButtons from "@/app/components/button/SortButtons";

export default function Home() {
    const {todos, fetchTodos} = useStore();
    const [localTodos, setLocalTodos] = useState(todos);
    const [dateOrder, setDateOrder] = useState("desc");
    const [priorityOrder, setPriorityOrder] = useState("desc");
    const [userOrder, setUserOrder] = useState("");

    useEffect(() => {
        const loadTodos = async () => {
            try {
                await fetchTodos(dateOrder, priorityOrder, userOrder);
            } catch (error) {
                console.error("Fehler beim Laden der Todos:", error);
                alert("Ein Fehler ist aufgetreten. Bitte versuche es später erneut.");
            }
        };

        loadTodos();
    }, [dateOrder, priorityOrder, userOrder, fetchTodos]);

    useEffect(() => {
        setLocalTodos(todos);
    }, [todos]);

    const handleTodoAdded = (newTodo) => {
        setLocalTodos(prevTodos => [newTodo, ...prevTodos]);
    };

    return (
        <div className="">
            <div className="flex justify-center flex-col items-center mt-24">
                <AddTodo onTodoAdded={handleTodoAdded}/>
                <SortButtons/>
                <div className="flex-col flex gap-2 justify-center mt-5 w-screen ">
                    {localTodos.map((todo) => (
                        <Todo key={todo.id} todo={todo}/>
                    ))}
                </div>
            </div>
        </div>
    );
}