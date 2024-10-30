"use client";
import AddTodo from "@/app/components/todos/AddTodo";
import Todo from "@/app/components/todos/Todo";
import React, {useEffect, useState} from "react";
import useStore from "@/app/store";
import SortButtons from "@/app/components/button/SortButtons";

export default function Home() {
    const {todos, fetchTodos} = useStore();
    const [dateOrder, setDateOrder] = useState("desc");
    const [priorityOrder, setPriorityOrder] = useState("desc");
    const [userOrder, setUserOrder] = useState("");

    useEffect(() => {
        fetchTodos(dateOrder, priorityOrder, userOrder);
    }, [dateOrder, priorityOrder, userOrder, fetchTodos]);



    return (
        <div className="">
            <div className="flex justify-center flex-col items-center mt-24">
                <AddTodo/>

                <SortButtons/>
                <div className="flex-col flex gap-2 justify-center mt-5 w-screen ">
                    {todos.map((todo) => (
                        <Todo key={todo.id} todo={todo}/>
                    ))}
            </div>

        </div>
        </div>
    );
}