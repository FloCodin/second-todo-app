"use client";
import React from "react";
import Form from "@/app/components/form/Form";
import Button from "@/app/components/button/Button";
import Input from "@/app/components/inputField/Input";
import * as actions from "@/actions/actions";
import useStore from "@/app/store";
import { FaCheck } from "react-icons/fa";
import { todoProps } from "@/app/types/types";

interface CompleteTodoProps {
    todo: todoProps;
}

const CompleteTodo = ({ todo }: CompleteTodoProps) => {
    const completeTodo = useStore((state) => state.completeTodo);

    const handleComplete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const inputId = formData.get("inputId") as string;

        try {
            // Backend-Aufruf zur Aktualisierung des Todos
            const updatedTodo = await actions.updateTodoCombined(formData as FormData);
            console.log("Updated Todo:", updatedTodo);

            // Zustand lokal aktualisieren
            if (updatedTodo) {
                await completeTodo(inputId);
            }
        } catch (error) {
            console.error("Error completing todo:", error);
        }
    };

    return (
        <Form onSubmit={handleComplete}>
            <Input type="hidden" name="inputId" value={todo.id} />
            <Button
                type="submit"
                text={<FaCheck />}
                bgColor={todo.isCompleted ? "bg-green-400" : "bg-blue-500"}
                actionButton
            />
        </Form>
    );
};

export default CompleteTodo;
