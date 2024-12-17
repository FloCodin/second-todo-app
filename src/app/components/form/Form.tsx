"use client";
import { formProps } from "@/app/types/types";
import React from "react";

const Form = ({ children, className, onSubmit }: formProps) => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        console.log("FormData submitted:", Object.fromEntries(formData)); // Debugging FormData

        if (onSubmit) {
            await onSubmit(formData as FormData); // Direkt FormData weitergeben
        }
    };

    return (
        <form onSubmit={handleSubmit} className={className}>
            {children}
        </form>
    );
};

export default Form;