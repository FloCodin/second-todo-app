import React, {useEffect, useState} from "react";
import CompleteTodo from "@/app/components/todos/CompleteTodo";
import DeleteTodo from "@/app/components/todos/DeleteTodo";
import TodoPriority from "@/app/components/todos/TodoPriority";
import TodoTitle from "@/app/components/todos/TodoTitle";
import useStore from "@/app/store";
import {todoProps, User} from "@/app/types/types";
import {valueOf} from "tailwindcss";

const Todo = ({todo}: { todo: todoProps }) => {
    const {users, assignTodoToUser, fetchUsers} = useStore((state) => ({
        users: state.users as User[], // Ensure users are typed correctly
        assignTodoToUser: state.assignTodoToUser,
        fetchUsers: state.fetchUsers,
    }));
    const [selectedUser, setSelectedUser] = useState(todo.assignedToId || '');

    const todoStyle = {
        textDecoration: todo.isCompleted ? 'line-through' : 'none',
        opacity: todo.isCompleted ? 0.5 : 1,
    };

    const todoPriorityStyle = todo.priority <= 1
        ? 'border-emerald-200 border-solid border-2'
        : todo.priority <= 2
            ? 'border-amber-400 border-solid border-4'
            : todo.priority <= 3
                ? 'border-red-500 border-solid border-8'
                : 'border-blue-600 border-solid border-10';

    const formattedDate = todo.createdAt
        ? new Date(todo.createdAt).toLocaleDateString('de-CH')
        : 'The date could not get optimized';

    const handleUserChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const userId = e.target.value;
        setSelectedUser(userId);
        await assignTodoToUser(todo.id, userId);
    };

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <div>
            <table>
                <tbody>
                <tr className={`flex justify-between w-screen pl-4 pr-4`} style={todoStyle}>
                    <th className="border-b border-white" style={{width: "30%"}}>
                        <TodoTitle todo={todo}/>
                    </th>
                    <th className="border-b border-white" style={{width: "10%"}}>
                        {formattedDate}
                    </th>
                    <th className={`${todoPriorityStyle} ${todo.isPinned ? 'bg-yellow-100 text-black' : ''}`}
                        style={{width: "15.5%"}}>
                        <TodoPriority todo={todo}/>
                    </th>
                    <th className="border-b border-white flex justify-center" style={{width: "10%"}}>
                        <CompleteTodo todo={todo} className="pr-4"/>
                        <DeleteTodo todo={todo}/>
                    </th>
                    <th className="border-b border-white text-black" style={{width: "10%"}}>
                        <select
                            value={selectedUser} // Der State steuert den Wert
                            onChange={handleUserChange}
                            className="bg-gray-500"
                        >
                            <option value="">Select User</option> {/* Default Option */}
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>


                    </th>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Todo;