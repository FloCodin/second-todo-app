"use client";
import React, { useState } from "react";
import Form from "@/app/components/form/Form";
import Input from "@/app/components/inputField/Input";
import Button from "@/app/components/button/Button";
import * as actions from "@/actions/actions";
import useStore from "@/app/store";
import { toast, ToastContainer } from "react-toastify";

interface AddTodoProps {
    onTodoAdded: (todo: any) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onTodoAdded }) => {
    const [inputValue, setInputValue] = useState("");
    const addTodo = useStore((state) => state.addTodo);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Standardverhalten verhindern
        const formData = new FormData(e.currentTarget);
        const todoTitle = formData.get("input") as string;

        if (!todoTitle.trim()) {
            toast.error("Todo cannot be empty!");
            return;
        }

        try {
            const newTodo = await actions.createTodo(formData as FormData); // Backend-Aufruf
            if (newTodo) {
                addTodo(todoTitle); // Zustand aktualisieren
                onTodoAdded(newTodo);
                setInputValue(""); // Input leeren
                toast.success("Todo added successfully!");
            }
        } catch (error) {
            console.error("Error adding todo:", error);
            toast.error("Failed to add todo. Please try again.");
        }
    };

    return (
        <div>

            <Form onSubmit={handleSubmit}>
                <div className="flex flex-row gap-3">
                    <Input
                        name="input"
                        type="text"
                        placeholder="Add Todo Here..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button type="submit" text="Add" bgColor="bg-blue-600" />
                </div>
            </Form>
        </div>
    );
};

export default AddTodo;
