'use client'
import React, { useEffect, useState } from 'react';
import { updateTodoCombined} from "@/actions/actions";
import useStore from "@/app/store";


const TodoPriority = ({ todo }: {formData:FormData},{ todo: taskProps }) => {
    const [priority, setPriority] = useState(todo.priority);
    const updateTodoPriority = useStore((state) => state.changePriority);

    useEffect(() => {
        setPriority(todo.priority);
    }, [todo]);

    const handlePriorityChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPriority = parseInt(e.target.value, 10);
        setPriority(newPriority);

        const formData = new FormData();
        formData.append("inputId", todo.id.toString());
        formData.append("prioritys", newPriority.toString());

        await updateTodoCombined(formData);
        updateTodoPriority(todo.id, newPriority);
    };


    const { togglePinned: togglePinnedLocal, setAllTodos } = useStore();

    const handlePinToggle = async () => {
        togglePinnedLocal(todo.id); // lokale Zustand
        const formData = new FormData();
        formData.append("inputId", todo.id);
        try {
            const { allTodos } = await togglePinned(formData); // action call
            setAllTodos(allTodos); // Aktualisieren Sie den gesamten Todo-Zustand
        } catch (error) {
            console.error('Failed to update pinned status:', error);
        }
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