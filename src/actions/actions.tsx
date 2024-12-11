"use server";

import { prisma } from "@/app/utils/prisma";
import { revalidatePath } from "next/cache";
import {Prisma, Todo} from "@prisma/client";


// Create a new Todo
export async function createTodo(formData: FormData) {
    const title = formData.get("input");

    if (typeof title !== "string" || !title.trim()) {
        return null;
    }

    const newTodo = await prisma.todo.create({
        data: {
            title: title.trim(),
            priority: 1, // Default priority
            isCompleted: false,
            isPinned: false,
        },
    });

    revalidatePath("/");
    return newTodo;
}


// Update a Todo
export async function updateTodoCombined(formData: FormData) {
    const inputId = formData.get("inputId") as string;

    const todo = await prisma.todo.findUnique({
        where: {id: inputId},
    }) as Todo | null;

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
        where: { id: inputId },
        data: {
            title: newTitle?.trim() || todo.title,
            priority: !isNaN(newPriority) && newPriority >= 1 && newPriority <= 3 ? newPriority : todo.priority,
            isCompleted: toggleCompleted ? !todo.isCompleted : todo.isCompleted,
            isPinned: togglePinned ? !todo.isPinned : todo.isPinned,
        },
    });

    revalidatePath("/");
    return updatedTodo;
}


// Delete a Todo
export async function deleteTodo(formData: FormData) {
    const inputId = formData.get("inputId") as string;

    const todo = await prisma.todo.findUnique({ where: { id: inputId } });

    if (!todo) {
        console.error("Todo not found, cannot delete.");
        return null;
    }

    await prisma.todo.delete({ where: { id: inputId } });
    revalidatePath("/");
    return inputId;
}

// Fetch all Todos with sorting and relationships
export async function getAllToDos(dateOrder: string, priorityOrder: string, userOrder: string) {
    const orderBy: Prisma.TodoOrderByWithRelationInput[] = [];

    if (dateOrder) orderBy.push({ createdAt: dateOrder as Prisma.SortOrder });
    if (priorityOrder) orderBy.push({ priority: priorityOrder as Prisma.SortOrder });
    if (userOrder) orderBy.push({ user: { name: userOrder as Prisma.SortOrder } });

    return prisma.todo.findMany({
        orderBy,
        include: { user: true }, // Include the associated user
    });
}


// Fetch all Users with Roles
export async function getAllUsers() {
    return prisma.user.findMany({
        include: { role: true }, // Fetch associated role
    });
}

// Create a new User
export async function createUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const roleId = formData.get("roleId") as string;

    if (!name.trim() || !email.trim()) {
        throw new Error("Name and email are required");
    }

    try {
        const newUser = await prisma.user.create({
            data: {
                name: name.trim(),
                email: email.trim(),
                roleId, // Associate with a role if provided
            },
            include: { role: true },
        });

        revalidatePath("/");
        return newUser;
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user. Please try again.");
    }
}

// Assign a Todo to a User
export async function assignTodoToUser(todoId: string, userId: string) {
    return prisma.todo.update({
        where: { id: todoId },
        data: { userId },
    });
}

// Delete a User
export async function deleteUser(userId: string) {
    await prisma.user.delete({
        where: { id: userId },
    });

    revalidatePath("/");
}

// Create a new Role
export async function createRole(formData: FormData) {
    const name = formData.get("name") as string;

    if (!name.trim()) {
        return null;
    }

    try {
        const newRole = await prisma.role.create({
            data: { name: name.trim() },
        });

        revalidatePath("/");
        return newRole;
    } catch (error) {
        console.error("Error creating role:", error);
        return null;
    }
}

// Fetch all Roles
export async function getAllRoles() {
    return prisma.role.findMany();
}

// Update a User's Role
export async function updateUserRole(userId: string, roleId: string) {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                roleId,
            },
            include: { role: true },
        });

        revalidatePath("/");
        return updatedUser;
    } catch (error) {
        console.error("Error updating user role:", error);
        throw new Error("Failed to update user role. Please try again.");
    }
}
