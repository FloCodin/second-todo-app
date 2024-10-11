"use server"

import {prisma} from "@/app/utils/prisma";
import {revalidatePath} from "next/cache";
import {Prisma} from '@prisma/client';

export async function createTodo(formData: FormData) {
    const input = formData.get('input') as string;
    if (!input.trim()) {
        return null;
    }
    const newTodo = await prisma.task.create({
        data: {
            title: input,
        },
    });
    revalidatePath("/"); // Optional: Cache-Invalidierung
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
    const todo = await prisma.task.findUnique({
        where: {id: inputId},
    }) as Task | null;

    if (!todo) {
        console.error("Todo not found");
        return null;
    }

    const newTitle = formData.get("newTitle") as string;
    const newPriority: number = parseInt(formData.get("prioritys") as string, 10);

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

    const updatedTodo = await prisma.task.update({
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

    revalidatePath("/"); // Optional: Cache-Invalidierung
    return updatedTodo;
}


export async function deleteTodo(formData: FormData) {
    const inputId = formData.get("inputId") as string;

    console.log("Trying to delete Todo with ID:", inputId);

    const todo = await prisma.task.findUnique({
        where: {id: inputId}
    });

    if (!todo) {
        console.error("Todo not found, cannot delete.");
        return null;
    }

    await prisma.task.delete({
        where: {id: inputId}
    });

    revalidatePath("/");
    return inputId;
}

export async function getAllToDos(dateOrder: string, priorityOrder: string) {
    return prisma.task.findMany({
        orderBy: [
            {isPinned: 'desc',},
            {priority: castSortOrder(priorityOrder)},
            {createdAt: castSortOrder(dateOrder)}
        ],
    });
}

// export async function getAllToDos(priorityOrder: string) {
//     return prisma.task.findMany({
//         orderBy: [
//             { priority: castSortOrder(priorityOrder) }
//         ],
//     });
// }


function castSortOrder(order: string): Prisma.SortOrder {
    return order === "asc" ? Prisma.SortOrder.asc : Prisma.SortOrder.desc;
}
