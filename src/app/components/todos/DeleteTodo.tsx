"use client"
import {todoProps} from "@/app/types/types";
import Form from "@/app/components/form/Form";
import * as actions from "@/actions/actions";
import Input from "@/app/components/inputField/Input";
import Button from "@/app/components/button/Button";
import {FaTrash} from "react-icons/fa";
import useStore from "@/app/store";

const DeleteTodo = ({ todo }: { todo: todoProps }) => {
    const deleteTodo = useStore((state) => state.deleteTodo);

    const handleDelete = async (formData: FormData) => {
        console.log("FormData in Delete:", Object.fromEntries(formData)); // Debugging FormData
        await actions.deleteTodo(formData); // Prüfen, ob die Action aufgerufen wird
        await deleteTodo(todo.id); // Zustand aktualisieren
    };

    return (
        <Form onSubmit={handleDelete}>
            <Input name="inputId" type="hidden" value={todo.id} />
            <Button actionButton type="submit" bgColor="bg-red-400" text={<FaTrash />} />
        </Form>
    );
};

export default DeleteTodo