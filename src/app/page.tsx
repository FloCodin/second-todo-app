"use client";

import React, {useEffect} from "react";
import {useTodoStore} from "@/app/store-provider";
import {toast} from "react-toastify";
import AddTodo from "@/app/components/todos/AddTodo";
import SortButtons from "@/app/components/button/SortButtons";
import Todo from "@/app/components/todos/Todo";
import Todo2 from "@/app/components/todos/Todo2";

export default function Home() {
    const {todos, error, completeTodo} = useTodoStore(
        (state) => state
    );

    useEffect(() => {
        toast(error) // reset the error when toast is not showing anymore
    }, [error]);

    return (
        <>
            <div className="container mx-auto">
                <div className="flex flex-col">
                    <div>Add todo</div>
                    <div>Sort Buttons</div>
                    {
                        todos.map(todo => {
                            return (
                                <Todo2 todo={todo} key={todo.id}/>
                            )
                        })
                    }
                </div>

            </div>
            <div className="container-fluid mx-auto">
                <div className="flex justify-center flex-col items-center mt-24">
                    <AddTodo/>
                    <SortButtons/>

                    <table className="m-8 w-full">
                        <thead>
                        <tr className="flex justify-evenly w-full pb-4">
                            <th className="text-lg text-center"> todo:</th>
                            <th className="text-lg text-center"> creation date:</th>
                            <th className="text-lg text-center"> priority:</th>
                            <th className="text-lg text-center"> actions:</th>
                            <th className="text-lg text-center"> assigned to:</th>
                        </tr>
                        </thead>
                        <tbody>
                        {todos.map((todo) => (
                            <Todo key={todo.id} todo={todo}/>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )

}
