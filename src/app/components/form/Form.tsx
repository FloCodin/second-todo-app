"use client";
import { formProps } from "@/app/types/types";
import { useRef } from "react";

const Form = ({ children, action, className, onSubmit }: formProps) => {
    const ref = useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission
        ref.current?.reset();
    };

    return (
        <form
            onSubmit={handleSubmit}
            ref={ref}
            className={className} // Apply className if provided
        >
            {children}
        </form>
    );
};

export default Form;