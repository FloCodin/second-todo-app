"use client"
import AddTodo from "@/app/components/todos/AddTodo";
import Todo from "@/app/components/todos/Todo";
import {taskProps} from "@/app/types/types";
import React, {useEffect, useState} from "react";
import {getAllToDos} from "@/actions/actions";
import useStore from "@/app/components/zustand/HookStore";
import DisplayTodos from "@/app/components/zustand/DisplayTodos";



export default function Home() {
    const { todos, deleteTodo, toggleTodo } = useStore((state) => {
        return {
            todos: state.todos,
            deleteTodo: state.deleteTodo,
            toggleTodo: state.toggleTodo
        };
    });

    const [order, setOrder] = useState("asc");
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchTodos() {
            const todos = await getAllToDos(order)
            setData(todos);
        }
        fetchTodos()
    }, [order]);

    const handleSortOrderChange = (event) => {
        console.log(event.target.value)
        setOrder(event.target.value)
    }


    return (
        <div className="">
            <div className="flex justify-center flex-col items-center mt-24">

                <DisplayTodos />

                <AddTodo/>
                <select className="text-black mt-4  justify-center w-1/12" onChange={handleSortOrderChange}>
                    <option value={"asc"}>Asc</option>
                    <option value={"desc"}>Desc</option>
                </select>
                <div className="flex-col flex gap-2 justify-center mt-5 w-screen ">
                    {data.map((item) => {
                        const todo: taskProps = {
                            id: item.id,
                            createdAt: new Date(item.createdAt),
                            title: item.title,
                            priority: item.priority,
                            isCompleted: item.isCompleted,
                        };
                        return (
                            <div className="w-full" key={todo.id}>
                                <Todo todo={todo}/>
                            </div>
                        );
                    })}
                </div>


            </div>
        </div>
    );
}
/*
wenn zustand nicht funktioniert dann alles mit em state isch in de page


https://medium.com/@goodluckwohacodes/managing-react-state-globally-with-zustand-da185403c22a
https://zustand-demo.pmnd.rs/

 */