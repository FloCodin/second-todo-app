"use client"
import React, {useState, useEffect, useRef} from "react";
import Button from "@/app/components/button/Button";
import * as actions from "@/actions/actions"
import useStore from "@/app/store";
import { taskProps } from "@/app/types/types";
import {IoIosSave} from "react-icons/io";

const TodoTitle = ({ todo }: { todo: taskProps }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);
    const editTodo = useStore((state) => state.editTodo);
    const inputRef = useRef<HTMLInputElement>(null)


    useEffect(() => {
        if (inputRef.current) {
            // Now TypeScript knows inputRef.current is not null
            inputRef.current.focus();
        }
    }, []);
    const handleEdit = () => {
        if (todo.isCompleted) {
            return;
        }
        setIsEditing(true);
    };

    const handleBlur = async () => {
        try {
            if (newTitle !== todo.title) {
                const formData = new FormData();
                formData.append("inputId", todo.id);
                formData.append("newTitle", newTitle as string);
                await actions.updateTodoCombined(formData as FormData);
                if (newTitle != null) {
                    editTodo(todo.id, newTitle);
                }
            }
        } catch (error) {
            console.error("Error updating todo:", error);
        } finally {
            setIsEditing(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleBlur();
        }
    };

    return (
        <div className="flex gap-5 items-center justify-center">
            {isEditing ? (
                    <div className="flex flex-row gap-2">
                <input
                    ref={inputRef}
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder={todo.title || ''}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    required={true}
                    className="border-b border-gray-300 focus:outline-none focus:border-blue-500 text-black px-2 py-1"
                />
                        <Button
                            onClick={handleEdit}
                            text={ <IoIosSave/> }
                            bgColor="bg-blue-500"
                            actionButton
                        />
                    </div>
            ) : (
                <span onClick={handleEdit} className="cursor-pointer">
                    {todo.title}
                </span>
            )}

        </div>
    )
}

export default TodoTitle;