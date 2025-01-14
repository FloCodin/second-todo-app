"use client"
import Form from "@/app/components/form/Form";
import Button from "@/app/components/button/Button";
import {FaTrash} from "react-icons/fa";
import {useTodoStore} from "@/app/store-provider";
import React from "react";
import {TodoModel} from "@/app/types/types";


const DeleteTodo =  ({ todo }: { todo: TodoModel }) => {
    const deleteTodo = useTodoStore((state) => state.deleteTodo);

    const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const inputId = formData.get("inputId") as string;

        if (!inputId) {
            console.error("inputId is missing");
            return;
        }

        try {
            await deleteTodo(todo.id); // Zustand aktualisieren
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <Form onSubmit={handleDelete}>
            <input type="hidden" name="inputId" value={todo.id} />
            <Button type="submit" text={<FaTrash />} bgColor="bg-red-400" />
        </Form>
    );
};

export default DeleteTodo;
