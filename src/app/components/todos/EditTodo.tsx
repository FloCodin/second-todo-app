"use client";
import { useState } from "react";
import Button from "@/app/components/button/Button";
import { MdEdit } from "react-icons/md";
import Form from "@/app/components/form/Form";
import Input from "@/app/components/inputField/Input";
import { todoProps } from "@/app/types/types";
import * as actions from "@/actions/actions";
import useStore from "@/app/store";

const EditTodo = ({ todo }: { todo: todoProps }) => {
    const [editTodoState, setEditTodoState] = useState(false);
    const editTodo = useStore((state) => state.editTodo);

    const handleEdit = () => {
        if (todo.isCompleted) {
            return;
        }
        setEditTodoState(!editTodoState);
    };

    const handleSubmit = async (formData: FormData) => {
        const newTitle = formData.get("newTitle") as string;
        if (newTitle.trim() === "") {
            alert("Title cannot be empty");
            return;
        }

        formData.append("inputId", todo.id);

        // Backend-Aktualisierung
        await actions.updateTodoCombined(formData);
        // Lokale Zustandsaktualisierung
        editTodo(todo.id, newTitle, todo.priority);
        setEditTodoState(false);
    };

    return (
        <>
            <div className="flex gap-5 items-center">
                <Button onClick={handleEdit} text={<MdEdit />} actionButton bgColor="bg-blue-500" />
                {editTodoState ? (
                    <Form action={handleSubmit}>
                        <Input name="inputId" value={todo.id} type="hidden" />
                        <div className="flex justify-center">
                            <Input
                                name="newTitle"
                                placeholder="Edit Todo..."
                                type="text"
                                defaultValue={todo.title}
                            />
                            <Button type="submit" text="Save" bgColor="bg-blue-500" />
                        </div>
                    </Form>
                ) : null}
            </div>
        </>
    );
};

export default EditTodo;
