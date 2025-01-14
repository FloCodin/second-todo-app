import React, {ReactNode} from "react";

export interface inputProps {
    name: string;
    type: string;
    placeholder?: string;
    value?: string;
    defaultValue?: string | null;
}

export interface formProps {
    children: ReactNode;
    action?: (formData: FormData) => void;
    className?: string;
    onSubmit?: (event: React.FormEvent<HTMLFormElement> | FormData) => void;
}

export interface buttonProps {
    type?: "button" | "submit" | "reset",
    text?: string | ReactNode,
    onClick?: () => void,
    actionButton?: boolean,
    bgColor?: string,
    className?: { textDecoration: string; opacity: number }
}

export interface TodoModel {
    id: string;
    title: string;
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
    todos?: TodoModel[]; // Optional todos
}