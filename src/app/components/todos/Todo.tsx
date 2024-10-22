import React, {useEffect, useState} from "react";
import CompleteTodo from "@/app/components/todos/CompleteTodo";
import DeleteTodo from "@/app/components/todos/DeleteTodo";
import TodoPriority from "@/app/components/todos/TodoPriority";
import TodoTitle from "@/app/components/todos/TodoTitle";
import useStore from "@/app/store";


const Todo = ({ todo }) => {
    const { users, assignTodoToUser, fetchUsers } = useStore((state) => ({
        users: state.users,
        assignTodoToUser: state.assignTodoToUser,
        fetchUsers: state.fetchUsers,
    }));
    const [selectedUser , setSelectedUser ] = useState(todo.userId || '');

    const todoStyle = {
        textDecoration: todo.isCompleted ? 'line-through' : 'none',
        opacity: todo.isCompleted ? 0.5 : 1,
    };

    const todoPriorityStyle = todo.priority <= 1
        ? 'border-amber-400 border-solid border-2'
        : todo.priority <= 2
            ? 'border-amber-400 border-solid border-4'
            : todo.priority <= 3
                ? 'border-red-500 border-solid border-8'
                : 'border-blue-600 border-solid border-10';

    const formattedDate = todo.createdAt
        ? new Date(todo.createdAt).toLocaleDateString('de-CH')
        : 'The date could not get optimized';

    const handleUserChange = async (e) => {
        const userId = e.target.value;
        setSelectedUser (userId);
        await assignTodoToUser (todo.id, userId);
    };

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <tr className={`flex justify-between w-screen pl-4 pr-4`} style={todoStyle}>
            <th className="border-amber-400 border border-solid" style={{ width: "30%" }}>
                <TodoTitle todo={todo} />
            </th>
            <th className="border-amber-400 border border-solid" style={{ width: "20%" }}>
                creation date: {formattedDate}
            </th>
            <th className="border-amber-400 border border-solid" style ={{ width: "15%" }}>
                <CompleteTodo todo={todo} /> Complete Todo
            </th>
            <th className="border-amber-400 border border-solid" style={{ width: "15%" }}>
                <DeleteTodo todo={todo} /> delete Todo
            </th>
            <th className=
                    {`${todoPriorityStyle} border-amber-400 border border-solid items-center 
                     ${todo.isPinned ? 'bg-yellow-100 text-black' : ''}`}
                style={{ width: "17.5%" }}>
                <TodoPriority todo={todo} />
            </th>
            <th className="border-amber-400 border border-solid text-black" style={{ width: "10%" }}>
                <select value={selectedUser} onChange={handleUserChange}>
                    <option value="">Select User</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                </select>
            </th>
        </tr>
    );
};

export default Todo;