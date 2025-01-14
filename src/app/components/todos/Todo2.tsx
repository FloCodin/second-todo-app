import {TodoModel} from "@/app/types/types";
import Button from "@/app/components/button/Button";
import {FaCheck, FaTrash} from "react-icons/fa";
import React, {useState} from "react";
import {useTodoStore} from "@/app/store-provider";

const Todo2 = ({todo}: { todo: TodoModel }) => {

    const {
        completeTodo,
        editTitle,
        deleteTodo,
        changePriority,
        togglePinned,
    } = useTodoStore((state) => (state));
    const [title, setTitle] = useState(todo.title);

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
        : 'The date could not get sampled';

    const updatedDate = todo.updatedAt
        ? new Date(todo.updatedAt).toLocaleDateString('de-CH')
        : 'The date could not get updated';

    return (
        /* <div className="flex flex-row m-4 border" key={todo.id}>*/

        <div className={`${todoPriorityStyle} ${todo.isPinned ? 'bg-yellow-100 text-black' : ''} flex m-4 `}
             key={todo.id} style={todoStyle}>
            <p className="p-2">{todo.id}</p>
            <input className="p-2 text-black" value={title} onChange={event => setTitle(event.target.value)}
                   onBlur={() => editTitle(todo.id, title)}></input>

            <p className="p-2">{JSON.stringify(todo?.createdAt)}</p>
            <p className="p-2">{formattedDate}</p>
            <p className="p-2">{JSON.stringify(todo?.updatedAt)}</p>
            <p className="p-2">{updatedDate}</p>
            <p className="p-2">{todo.priority}</p>

            <div><Button
                text={<FaCheck/>}
                bgColor={todo.isCompleted ? "bg-green-400" : "bg-blue-500"}
                actionButton
                onClick={() => completeTodo(todo.id, !todo.isCompleted)}
                className={todoStyle}
            /></div>
            <div>
                <Button text={<FaTrash/>} onClick={() => deleteTodo(todo.id)} bgColor="bg-red-400"/>
            </div>

            <div>
                <input type="hidden" name="inputId" value={todo.id}/>
                <select
                    name="prioritys"
                    id="priority-value"
                    className="text-black bg-gray-500"
                    value={todo.priority}
                    onChange={(event) => {

                        const prio = Number(event.target.value);
                        return changePriority(todo.id, prio)
                    }}
                >
                    <option value="1">Low</option>
                    <option value="2">Mid</option>
                    <option value="3">High</option>
                </select>
                <Button text={todo.isPinned ? '📌' : '📍'} onClick={() => togglePinned(todo.id)}/>
            </div>
            <p className="p-2">{todo.assignedToId}</p>
            <p className="p-2">{todo.assignedTo}</p>
            <p className="p-2">{todo.userId}</p>

        </div>
    );
};

export default Todo2;