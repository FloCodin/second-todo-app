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

const CompleteTodo = ({ todo, className }: CompleteTodoProps) => {
    const toggleTodo = useStore((state) => state.completeTodo);
    const handleSubmit = async (formData: FormData) => {
        formData.append("toggleCompleted", "true");
        await action.updateTodoCombined(formData);
        toggleTodo(todo.id);
    };

    return (
        <Form action={handleSubmit} className={className}> {/* Apply className here */}
            <Input name="inputId" value={todo.id} type="hidden" />
            <Button
                text={<FaCheck />}
                type="submit"
                actionButton
                bgColor={todo.isCompleted ? 'bg-green-400' : 'bg-blue-500'}
            />
        </Form>
    );
};

export default CompleteTodo;