"use client";
import { formProps } from "@/app/types/types";
import React from "react";

const Form = ({ children, className, onSubmit }: formProps) => {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Verhindere Standard-Formular-Submission
        if (onSubmit) {
            onSubmit(event); // Rufe die übergebene `onSubmit`-Funktion auf
        }
    };

    return (
        <form onSubmit={handleSubmit} className={className}>
            {children}
        </form>
    );
};

export default Form;
