"use server"
import { Prisma, Todo, User } from "@prisma/client";
import prisma from "@/app/utils/prisma";
import { TodoModel } from "@/app/types/types";

export async function createTodo(title: string): Promise<Todo | null> {
    const newTodo = await prisma.todo.create({
        data: { title: title.trim() },
    });

    console.log("New Todo created:", newTodo);
    return newTodo;
}

export async function updateTodoTitle(id: string, newTitle: string): Promise<Todo | null> {
    if (!newTitle.trim()) {
        console.error("Invalid title provided");
        return null;
    }
    return prisma.todo.update({
        where: { id },
        data: { title: newTitle.trim() },
    });
}

export async function updateTodoPriority(id: string, newPriority: number): Promise<Todo | null> {
    if (newPriority < 1 || newPriority > 3) {
        console.error("Priority must be between 1 and 3");
        return null;
    }
    return prisma.todo.update({
        where: { id },
        data: { priority: newPriority },
    });
}

export async function toggleTodoCompleted(id: string): Promise<Todo | null> {
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) {
        console.error("Todo not found");
        return null;
    }
    return prisma.todo.update({
        where: { id },
        data: { isCompleted: !todo.isCompleted },
    });
}

// Function to toggle the isPinned status of a Todo
export async function toggleTodoPinned(id: string): Promise<Todo | null> {
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) {
        console.error("Todo not found");
        return null;
    }
    return prisma.todo.update({
        where: { id },
        data: { isPinned: !todo.isPinned },
    });
}

export async function updateTodoCombined(
    id: string,
    newTitle?: string,
    newPriority?: number,
    toggleCompleted?: boolean,
    togglePinned?: boolean
): Promise<Todo | null> {
    const todo = await prisma.todo.findUnique({
        where: { id },
    }) as TodoModel | null;

    if (!todo) {
        console.error("Todo not found");
        return null;
    }

    if (newPriority !== undefined && newPriority >= 1 && newPriority <= 3) {
        todo.priority = newPriority;
    }

    if (newTitle && newTitle.trim() !== "") {
        todo.title = newTitle.trim();
    }

    if (toggleCompleted !== undefined) {
        todo.isCompleted = toggleCompleted;
    }

    if (togglePinned !== undefined) {
        todo.isPinned = togglePinned;
    }

    const updatedTodo = await prisma.todo.update({
        where: { id },
        data: {
            title: todo.title,
            priority: todo.priority,
            isCompleted: todo.isCompleted,
            isPinned: todo.isPinned,
        },
    });

    return updatedTodo;
}

export async function deleteTodo(id: string): Promise<string | null> {
    const todo = await prisma.todo.findUnique({
        where: { id },
    });

    if (!todo) {
        console.error("Todo not found, cannot delete.");
        return null;
    }

    await prisma.todo.delete({
        where: { id },
    });

    return id;
}

export async function getAllToDos(
    dateOrder: string = "desc",
    priorityOrder: string = "desc",
    userOrder: string = "desc"
) {
    const orderBy: Prisma.TodoOrderByWithRelationInput[] = [];

    if (dateOrder) {
        orderBy.push({ createdAt: dateOrder as Prisma.SortOrder });
    }
    if (priorityOrder) {
        orderBy.push({ priority: priorityOrder as Prisma.SortOrder });
    }
    if (userOrder) {
        orderBy.push({ user: { name: userOrder as Prisma.SortOrder } });
    }

    return prisma.todo.findMany({
        orderBy,
        include: { user: true },
    });
}

export async function getAllUsers() {
    return prisma.user.findMany({
        include: { roles: true },
    });
}

export async function createUser(
    name: string,
    email: string,
    roleIds: string[]
): Promise<User> {
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            roles: {
                connect: roleIds.map((roleId) => ({ id: roleId })),
            },
        },
        include: { roles: true },
    });

    return newUser;
}

export const completeTodo = async (id: string, isCompleted: boolean) => {
    return prisma.todo.update({
        where: { id },
        data: { isCompleted },
    });
};

export const updateTitle = async (id: string, newTitle: string) => {
    return prisma.todo.update({
        where: { id },
        data: { title: newTitle },
    });
};

export const assignTodoToUser = async (todoId: string, userId: string) => {
    return prisma.todo.update({
        where: { id: todoId },
        data: { userId },
    });
};

export async function deleteUser(userId: string) {
    await prisma.user.delete({
        where: { id: userId },
    });
}

export async function createRole(name: string) {
    if (!name.trim()) {
        return null;
    }
    try {
        const newRole = await prisma.role.create({
            data: {
                name,
            },
        });
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
                    set: [{ id: roleId }],
                },
            },
            include: { roles: true },
        });

        return updatedUser;
    } catch (error) {
        console.error("Error updating user role:", error);
        throw new Error("Failed to update user role. Please try again.");
    }
}
