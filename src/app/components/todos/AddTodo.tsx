"use client"
import Form from "@/app/components/form/Form";
import Input from "@/app/components/inputField/Input";
import Button from "@/app/components/button/Button";
import * as actions from "@/actions/actions";
import React from "react";
import useStore from "@/app/store";

const AddTodo = () => {
    const addTodo = useStore((state) => state.addTodo);

    const handleSubmit = async (formData: FormData) => {
        const newTodo = await actions.createTodo(formData);
        if (newTodo) {
            await addTodo(newTodo);
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
}

export default AddTodo;