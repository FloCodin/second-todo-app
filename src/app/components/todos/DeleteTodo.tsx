"use client"
import {todoProps} from "@/app/types/types";
import Form from "@/app/components/form/Form";
import * as actions from "@/actions/actions";
import Input from "@/app/components/inputField/Input";
import Button from "@/app/components/button/Button";
import {FaTrash} from "react-icons/fa";
import useStore from "@/app/store";

const DeleteTodo = ({ todo }: { todo: any }) => {
    const deleteTodo = useStore((state) => state.deleteTodo);

    const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const inputId = formData.get("inputId") as string;

        if (!inputId) {
            console.error("inputId is missing");
            return;
        }

        try {
            await actions.deleteTodo(formData as FormData);
            deleteTodo(todo.id); // Zustand aktualisieren
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
