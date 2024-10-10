'use client';
import React, { useEffect, useState } from 'react';
import { updateTodoCombined } from "@/actions/actions";
import useStore from "@/app/store";
import { taskProps } from "@/app/types/types";

const TodoPriority = ({ todo }: { todo: taskProps }) => {
    const [priority, setPriority] = useState(todo.priority);
    const updateTodoPriority = useStore((state) => state.changePriority);
    const togglePinnedLocal = useStore((state) => state.togglePinned);

    const handlePriorityChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPriority = parseInt(e.target.value, 10);
        setPriority(newPriority);

        const formData = new FormData();
        formData.append("inputId", todo.id.toString());
        formData.append("prioritys", newPriority.toString());

        await updateTodoCombined(formData);
        updateTodoPriority(todo.id, newPriority);
    };

    // Handle Pin Toggle
    const handlePinToggle = async () => {
        const formData = new FormData();
        formData.append("inputId", todo.id);
        formData.append("togglePinned", "true"); // Pinned so wie es soll

        await updateTodoCombined(formData);
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
                    className="text-black"
                    value={priority}
                    onChange={handlePriorityChange}
                >
                    <option value="1">Low Priority</option>
                    <option value="2">Mid Priority</option>
                    <option value="3">High Priority</option>
                </select>
            </form>
            <button onClick={handlePinToggle}>
                {todo.isPinned ? '📌' : '📍'}
            </button>
        </div>
    );
};

export default TodoPriority;
