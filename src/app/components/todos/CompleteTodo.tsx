"use client";
import Button from "@/app/components/button/Button";
import Input from "@/app/components/inputField/Input";
import Form from "@/app/components/form/Form";
import * as action from "@/actions/actions";
import { todoProps } from "@/app/types/types";
import { FaCheck } from "react-icons/fa";
import useStore from "@/app/store";

interface CompleteTodoProps {
    todo: todoProps;
    className?: string; // Add this line to accept className
}

const CompleteTodo = ({ todo }: CompleteTodoProps) => {
    const toggleTodo = useStore((state) => state.completeTodo);

    const handleSubmit = async (formData: FormData) => {
        console.log("FormData in Complete:", Object.fromEntries(formData)); // Debugging FormData
        const response = await action.updateTodoCombined(formData);
        console.log("Update Response:", response); // Debug API-Antwort
        await toggleTodo(todo.id);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input name="inputId" value={todo.id} type="hidden" />
            <Button
                text={<FaCheck />}
                type="submit"
                actionButton
                bgColor={todo.isCompleted ? "bg-green-400" : "bg-blue-500"}
            />
        </Form>
    );
};


export default CompleteTodo;