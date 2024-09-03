import React from "react";
import {taskProps} from "@/app/types/types";
import ChangeTodo from "@/app/components/todos/ChangeTodo";
import EditTodo from "@/app/components/todos/EditTodo";
import DeleteTodo from "@/app/components/todos/DeleteTodo";
import PriorityTodo from "@/app/components/todos/PriorityTodo";



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
        : 'to old '; // Fallback to an empty string or any default value you prefer

    return (




            <tr className={`flex justify-between text-white `}
                style={todoStyle}
            >
                <th> <ChangeTodo todo={todo}/></th>
                <th> <span >{todo.title} </span> </th>
                <th>  <span >created at: {formattedDate}</span> </th>
                <th> <EditTodo todo={todo}/></th>
                <th> <DeleteTodo todo={todo}/> </th>
                <th className={`${todoPriorityStyle}`}> <PriorityTodo todo={todo}/></th>
            </tr>

    )
}
export default Todo