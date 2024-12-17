"use client";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value?: string; // Optional für kontrollierte Inputs
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Event für Änderungen
}

const Input: React.FC<InputProps> = ({ value, onChange, ...rest }) => {
    return (
        <input
            value={value} // Wird nur verwendet, wenn `value` übergeben wurde
            onChange={onChange} // Änderungs-Handler
            {...rest} // Weitergabe aller anderen Props
            className="p-2 border rounded w-full text-black"
        />
    );
};

export default Input;
