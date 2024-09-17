'use client'
import React, { useEffect, useState } from 'react';
import Button from "@/app/components/button/Button";
import { taskProps } from "@/app/types/types";
import { changePriority } from "@/actions/actions";
import Form from "@/app/components/form/Form";
import useStore from "@/app/store";

const TodoPriority = ({ todo }: { todo: taskProps }) => {
    const [priority, setPriority] = useState(todo.priority);
    const updateTodoPriority = useStore((state) => state.changePriority);

    useEffect(() => {
        setPriority(todo.priority);
    }, [todo]);

    const handleSubmit = async (formData: FormData) => {
        const newPriority = parseInt(formData.get("prioritys") as string, 10);
        await changePriority(formData);
        updateTodoPriority(todo.id, newPriority);
    };

    return (
        <>
            TP {todo.priority}
            P {priority}
            <Form action={handleSubmit}>
                <input type="hidden" name="inputId" value={todo.id} />
                <select
                    name="prioritys"
                    id="priority-value"
                    className="text-black"
                    value={priority}
                    onChange={(e) => setPriority(parseInt(e.target.value, 10))}
                >
                    <option value="1">Low Priority</option>
                    <option value="2">Mid Priority</option>
                    <option value="3">High Priority</option>
                </select>
                <Button type="submit" text="save" bgColor="bg-blue-500" />
            </Form>
        </>
    );
};

export default TodoPriority;