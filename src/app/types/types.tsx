import {ReactNode} from "react";
import {Todo} from "@prisma/client";

export interface inputProps{
    name: string;
    type: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string | null;
}

export interface formProps{
    children: ReactNode;
    action?: (formData: FormData) => void;
    className?: string;
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void; // Korrigiert
}
export interface buttonProps {
    type?: "button" | "submit" | "reset"
    text?: string | ReactNode
    onClick?: ()=> void
    actionButton?: boolean
    bgColor?: string
}
export interface todoProps {
    id: string;
    title: string ;
    isCompleted: boolean;
    isPinned?: boolean;
    createdAt: Date;
    updatedAt?: Date;
    priority: number;
    assignedToId?: string;
    assignedTo?: string;
    userId?: string | null;
}
export interface Role {
    id: string;
    name: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    roles: Role[]; // Array of Role objects
    todos?: Todo[]; // Optional todos
}