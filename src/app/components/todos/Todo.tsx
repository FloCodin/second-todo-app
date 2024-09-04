import React from "react";
import {taskProps} from "@/app/types/types";
import CompleteTodo from "@/app/components/todos/CompleteTodo";
import DeleteTodo from "@/app/components/todos/DeleteTodo";
import TodoPriority from "@/app/components/todos/TodoPriority";
import TodoTitle from "@/app/components/todos/TodoTitle";



const Todo = ({todo}: { todo: taskProps }) => {
    const todoStyle = {
        textDecoration: todo.isCompleted ? 'line-through' : 'none',
        opacity: todo.isCompleted ? 0.5 : 1,

    }
    const todoPriorityStyle = todo.priority <= 1
        ? 'border-amber-400 border-solid border-2'
        : todo.priority <=2
            ? 'border-amber-400 border-solid border-4'
            : todo.priority <=3
                ? 'border-red-500 border-solid border-8':'border-blue-600 border-solid border-10';

    const formattedDate = todo.createdAt
        ? new Date(todo.createdAt).toLocaleDateString('de-CH')
        : 'The date could not get optimised '; // Fallback dass Daten not null sind

    return (
        <tr
            className={`flex justify-between w-screen pl-4 pr-4 `}
            style={todoStyle}
        >
            Priority = {todo.priority}
                <th className="border-amber-400 border border-solid " style={{width: "30%"}}> <TodoTitle todo={todo}/> </th>
                <th className="border-amber-400 border border-solid " style={{width: "20%"}}>  creation date: {formattedDate} </th>
                <th className="border-amber-400 border border-solid " style={{width: "15%"}}> <CompleteTodo todo={todo}/> Complete Todo</th>
                <th className="border-amber-400 border border-solid " style={{width: "15%"}}> <DeleteTodo todo={todo}/>delete Todo </th>
                <th className={`${todoPriorityStyle} border-amber-400 border border-solid ` } style={{width: "17.5%"}}> <TodoPriority todo={todo}/> prioritize Todo</th>
        </tr>

    )
}
export default Todo