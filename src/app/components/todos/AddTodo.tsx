"use client";
import Form from "@/app/components/form/Form";
import Input from "@/app/components/inputField/Input";
import Button from "@/app/components/button/Button";
import * as actions from "@/actions/actions";
import React from "react";
import useStore from "@/app/store";
import { todoProps } from "@/app/types/types";

interface AddTodoProps {
    onTodoAdded: (newTodo: todoProps) => void; // Ensure this matches
}

const AddTodo: React.FC<AddTodoProps> = ({ onTodoAdded }) => {
    const addTodo = useStore((state) => state.addTodo);

    const handleSubmit = async (formData: FormData) => {
        const newTodo = await actions.createTodo(formData);
        if (newTodo && 'title' in newTodo) {
            // Ensure newTodo matches todoProps structure
            const formattedNewTodo: todoProps = {
                id: newTodo.id,
                title: newTodo.title,
                isCompleted: false, // Default value
                createdAt: new Date(), // Set current date or use newTodo.createdAt if available
                isPinned: false, // Default value
                priority: 1, // Default priority or use newTodo.priority if available
                userId: newTodo.userId || null // Ensure this aligns with your type definition
            };
            onTodoAdded(formattedNewTodo); // Call the callback with the formatted newTodo object
        }
    };

    return (
        <div>
            <Form action={handleSubmit}>
                <div className="flex flex-row gap-3">
                    <Input name="input" type="text" placeholder="Add Todo Here..." />
                    <Button type="submit" text="Add" bgColor="bg-blue-600" />
                </div>
            </Form>
        </div>
    );
};

export default AddTodo;