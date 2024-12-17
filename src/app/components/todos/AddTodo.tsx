"use client";
import React, { useState } from "react";
import Form from "@/app/components/form/Form";
import Input from "@/app/components/inputField/Input";
import Button from "@/app/components/button/Button";
import * as actions from "@/actions/actions";
import useStore from "@/app/store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AddTodoProps {
    onTodoAdded: (todo: any) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onTodoAdded }) => {
    const [inputValue, setInputValue] = useState(""); // State für Input-Wert
    const addTodo = useStore((state) => state.addTodo);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Verhindere Standardverhalten
        try {
            const formData = new FormData(e.currentTarget);
            const todoTitle = formData.get("input") as string;

            if (!todoTitle.trim()) {
                toast.error("Todo cannot be empty!");
                return;
            }

            const newTodo = await actions.createTodo(formData as FormData); // Backend-Aufruf
            if (newTodo) {
                await addTodo(todoTitle); // Store-Update
                onTodoAdded(newTodo);
                setInputValue(""); // Input zurücksetzen
                toast.success("Todo added successfully!");
            }
        } catch (error) {
            console.error("Error adding todo:", error);
            toast.error("Failed to add todo. Please try again.");
        }
    };

    return (
        <div>
            <ToastContainer />
            <Form onSubmit={handleSubmit}>
                <div className="flex flex-row gap-3">
                    <Input
                        name="input"
                        type="text"
                        placeholder="Add Todo Here..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)} // Aktualisieren des States
                    />
                    <Button type="submit" text="Add" bgColor="bg-blue-600" />
                </div>
            </Form>
        </div>
    );
};

export default AddTodo;
