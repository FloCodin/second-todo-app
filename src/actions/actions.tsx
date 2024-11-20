"use server"

import {prisma} from "@/app/utils/prisma";
import {revalidatePath} from "next/cache";
import {Prisma} from '@prisma/client';

export async function createTodo(formData: FormData) {
    const input = formData.get('input');

    if (typeof input !== 'string' || !input.trim()) {
        return null;
    }

    const newTodo = await prisma.todo.create({
        data: {
            title: input.trim(),
        },
    });

    revalidatePath("/");

    return newTodo;
}


interface Task {
    id: string;
    title: string;
    isCompleted: boolean;
    priority: number;
    isPinned: boolean;
}

export async function updateTodoCombined(formData: FormData) {
    const inputId = formData.get("inputId") as string;
    const todo = await prisma.todo.findUnique({
        where: {id: inputId},
    }) as Task | null;

    if (!todo) {
        console.error("Todo not found");
        return null;
    }

    const newTitle = formData.get("newTitle") as string;
    const newPriority: number = parseInt(formData.get("priority") as string, 10);

    const toggleCompleted = formData.get("toggleCompleted") === "true";
    const togglePinned = formData.get("togglePinned") === "true";

    if (!isNaN(newPriority) && (newPriority >= 1 && newPriority <= 3)) {
        todo.priority = newPriority; // Priorität wird nur geändert, wenn sie gültig ist
    }

    if (newTitle && newTitle.trim() !== "") {
        todo.title = newTitle.trim();
    }

    if (toggleCompleted) {
        todo.isCompleted = !todo.isCompleted;
    }

    if (togglePinned) {
        todo.isPinned = !todo.isPinned;
    }

    const updatedTodo = await prisma.todo.update({
        where: {
            id: inputId
        },
        data: {
            title: todo.title,
            priority: todo.priority,
            isCompleted: todo.isCompleted,
            isPinned: todo.isPinned,
        },
    });

    revalidatePath("/");
    return updatedTodo;
}


export async function deleteTodo(formData: FormData) {
    const inputId = formData.get("inputId") as string;

    console.log("Trying to delete Todo with ID:", inputId);

    const todo = await prisma.todo.findUnique({
        where: {id: inputId}
    });

    if (!todo) {
        console.error("Todo not found, cannot delete.");
        return null;
    }

    await prisma.todo.delete({
        where: {id: inputId}
    });

    revalidatePath("/");
    return inputId;
}

export async function getAllToDos(dateOrder: string, priorityOrder: string, userOrder: string) {
    let orderBy: Prisma.TodoOrderByWithRelationInput[] = [];

    if (dateOrder) {
        orderBy.push({createdAt: dateOrder as Prisma.SortOrder});
    }
    if (priorityOrder) {
        orderBy.push({priority: priorityOrder as Prisma.SortOrder});
    }
    if (userOrder) {
        orderBy.push({user: {name: userOrder as Prisma.SortOrder}});
    }

    return prisma.todo.findMany({
        orderBy,
        include: {user: true},
    });
}

export async function getAllUsers() {
    return prisma.user.findMany({
        include: {roles: true}
    });
}

export async function createUser(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const roles = formData.getAll('roles') as string[];

    if (!name.trim() || !email.trim()) {
        throw new Error("Name and email are required");
    }

    try {
        const newUser = await prisma.user.create({
            data: {
                email: email,
                name: name,
                roles: {
                    connect: roles.map(roleId => ({id: roleId}))
                }
            },
            include: {roles: true}
        });

        revalidatePath("/");

        return newUser;

    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user. Please try again.");
    }
}

export const assignTodoToUser = async (todoId: string, userId: string) => {
    return await prisma.todo.update({
        where: {id: todoId},
        data: {userId: userId},
    });
};

export async function deleteUser(userId: string) {
    await prisma.user.delete({
        where: {id: userId},
    });
    revalidatePath("/");
}

export async function createRole(formData: FormData) {
    const name = formData.get('name') as string;
    if (!name.trim()) {
        return null;
    }
    try {
        const newRole = await prisma.role.create({
            data: {
                name: name,
            },
        });
        revalidatePath("/");
        return newRole;
    } catch (error) {
        console.error("Error creating role:", error);
        return null;
    }
}

export async function getAllRoles() {
    return prisma.role.findMany();
}

export async function updateUserRole(userId: string, roleId: string) {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                roles: {
                    set: [{ id: roleId }]
                }
            },
            include: { roles: true }
        });

        revalidatePath("/");
        console.log("Updated user:", updatedUser); // Add this log
        return updatedUser;
    } catch (error) {
        console.error("Error updating user role:", error);
        throw new Error("Failed to update user role. Please try again.");
    }
}
