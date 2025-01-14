"use client";
import React from "react";
import Form from "@/app/components/form/Form";
import Button from "@/app/components/button/Button";
import Input from "@/app/components/inputField/Input";
import  {TodoStore} from "@/app/store";
import { FaCheck } from "react-icons/fa";
import { TodoModel } from "@/app/types/types";
import {useTodoStore} from "@/app/store-provider";

interface CompleteTodoProps {
    todo: TodoModel;
}

const CompleteTodo = ({ todo }: CompleteTodoProps) => {
    const completeTodo = useTodoStore((state:TodoStore) => state.completeTodo);

    const handleComplete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      //  const formData = new FormData(e.currentTarget);

        try {
            // Backend-Aufruf zur Aktualisierung des Todos
            console.log("Updated Todo:", );

            // Zustand lokal aktualisieren
            if (!todo.isCompleted) {
                await completeTodo(todo.isCompleted);
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
