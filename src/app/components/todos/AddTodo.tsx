"use client";
import Form from "@/app/components/form/Form";
import Input from "@/app/components/inputField/Input";
import Button from "@/app/components/button/Button";
import * as actions from "@/actions/actions";
import React from "react";
import useStore from "@/app/store";
import todoTitle from "@/app/components/todos/TodoTitle";

interface AddTodoProps {
    onTodoAdded: (todo: any) => string; // You can replace `any` with the specific type of your `todo` object
}

const AddTodo: React.FC<AddTodoProps> = ({ onTodoAdded }) => {
    const addTodo = useStore((state) => state.addTodo);

    const handleSubmit = async (formData: FormData) => {
        const newTodo = await actions.createTodo(formData);
        if (newTodo) {
            const todoTitle = todoTitle.title; // Ensure `title` exists in the `newTodo` object
            await addTodo(todoTitle); // Pass the extracted string to `addTodo`
            onTodoAdded(newTodo); // Call the callback with the full `newTodo` object
        }
    };


    return (
        <div>
            <Form action={handleSubmit}>
                <div className="flex flex-row gap-3">
                    <Input name="input" type="text" placeholder="Add Todo Here..."/>
                    <Button type="submit" text="Add" bgColor="bg-blue-600"/>
                </div>
            </Form>
        </div>
    );
};

export default AddTodo;
