"use client";
import React, {useState} from "react";
import Form from "@/app/components/form/Form";
import Input from "@/app/components/inputField/Input";
import Button from "@/app/components/button/Button";
import {toast} from "react-toastify";
import {useTodoStore} from "@/app/store-provider";



const AddTodo: React.FC = () => {
    const [inputValue, setInputValue] = useState("");
    const {addTodo} = useTodoStore((state) => state);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        addTodo(inputValue).then(() => {
            setInputValue(""); // Input leeren
            toast.success("Todo added successfully!");
        }).catch((error) => {
            console.error("Error adding todo:", error);
            toast.error("Failed to add todo. Please try again.");
        })

    };

    return (
        <div>

            <Form onSubmit={handleSubmit}>
                <div className="flex flex-row gap-3">
                    <Input
                        name="input"
                        type="text"
                        placeholder="Add Todo Here..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <Button type="submit" text="Add" bgColor="bg-blue-600"/>
                </div>
            </Form>
        </div>
    );
};

export default AddTodo;
