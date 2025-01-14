'use client';
import React, { useState } from 'react';
import { updateTodoCombined } from "@/actions/actions";
import {TodoStore} from "@/app/store";
import {useTodoStore} from "@/app/store-provider";
import { TodoModel } from "@/app/types/types";



const TodoPriority = ({ todo }: { todo: TodoModel }) => {
    const [priority, setPriority] = useState(todo.priority);
    const updateTodoPriority = useTodoStore((state:TodoStore) => state.changePriority);
    const togglePinnedLocal = useTodoStore((state: TodoStore) => state.togglePinned);

    const handlePriorityChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPriority = parseInt(e.target.value, 10);
        setPriority(newPriority);

        const formData = new FormData();
        formData.append("inputId", todo.id.toString());
        formData.append("priority", newPriority.toString());

        await updateTodoCombined(formData as FormData);
        updateTodoPriority(todo.id, newPriority);
    };

    // Handle Pin Toggle
    const handlePinToggle = async () => {
        const formData = new FormData();
        formData.append("inputId", todo.id);
        formData.append("togglePinned", "true"); // Pinned so wie es soll

        await updateTodoCombined(formData as FormData);
        togglePinnedLocal(todo.id);
    };

    return (
        <div>
            TP {todo.priority}
            P {priority}
            <form>
                <input type="hidden" name="inputId" value={todo.id} />
                <select
                    name="prioritys"
                    id="priority-value"
                    className="text-black bg-gray-500"
                    value={priority}
                    onChange={handlePriorityChange}
                >
                    <option value="1">Low </option>
                    <option value="2">Mid </option>
                    <option value="3">High </option>
                </select>
            </form>
            <button onClick={handlePinToggle}>
                {todo.isPinned ? '📌' : '📍'}
            </button>
        </div>
    );
};

export default TodoPriority;
