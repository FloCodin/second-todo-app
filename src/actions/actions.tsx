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


// const updatedTodo = await prisma.task.update({
//     where: {
//         id: inputId,
//     },
//     data: {
//         title: newTitle,
//         isCompleted: updateStatus,
//         priority: newPriority,
//         isPinned: !todo.isPinned,
//     }
// })

// export async function changeStatus(formData: FormData) {
//     const inputId = formData.get("inputId") as string
//     const todo = await prisma.task.findUnique({
//         where: {
//             id: inputId,
//         },
//     })
//     const updateStatus = !prisma.task.fields ?.isCompleted;
//     const updatedTodo = await prisma.task.update({
//         where: {
//             id: inputId
//         },
//         data: {
//             isCompleted: updateStatus
//         }
//     })
//     revalidatePath("/")
//     return updatedTodo;
// }

// export async function editTodo(formdata: FormData) {
//     const newTitle = formdata.get("newTitle") as string;
//     const inputId = formdata.get("inputId") as string;
//
//     const updatedTodo = await prisma.task.update({
//         where: {
//             id: inputId
//         },
//         data: {
//             title: newTitle
//         }
//     })
//     revalidatePath("/")
//     return updatedTodo;
// }


// export async function changePriority(formData: FormData) {
//     const inputId: string = formData.get("inputId") as string;
//     const newPriority: number = parseInt(formData.get("prioritys") as string, 10);
//
//     if (isNaN(newPriority) || newPriority < 1 || newPriority > 3) {
//         console.error("Invalid priority value");
//         return null;
//     }
//
//     const updatedTodo = await prisma.task.update({
//         where: {
//             id: inputId,
//         },
//         data: {
//             priority: newPriority,
//         },
//     });
//     revalidatePath("/");
//     return updatedTodo;
// }
// export async function togglePinned(taskId: string) {
//     const inputId = formData.get('inputId') as string;
//
//     if (!inputId) {
//         throw new Error('Todo ID is required');
//     }
//
//     const todo = await prisma.task.findUnique({
//         where: { id: taskId },
//     });
//
//     if (!todo) {
//         throw new Error('Todo not found');
//     }
//
//     const updatedTodo = await prisma.task.update({
//         data: {isPinned: !todo.isPinned},
//         where: {id: inputId},
//     }
//     );
//
//     const allTodos = await getAllToDos("asc", "createdAt");
//
//     return { updatedTodo, allTodos };
// }


// import {prisma} from "@/app/utils/prisma";
// import {revalidatePath} from "next/cache";
// import {Prisma} from '@prisma/client';
// //
// export async function createTodo(formData: FormData) {
//     const input = formData.get('input') as string;
//     if (!input.trim()) {
//         return;
//     }
//     await prisma.task.create({
//         data: {
//             title: input,
//         },
//     });
//     revalidatePath("/")
// }
//
// export async function changeStatus(formData: FormData) {
//     const inputId = formData.get("inputId") as string
//     const todo = await prisma.task.findUnique({
//         where: {
//             id: inputId,
//         },
//     })
//     const updateStatus = !todo?.isCompleted;
//     await prisma.task.update({
//         where: {
//             id: inputId
//         },
//         data: {
//             isCompleted: updateStatus
//         }
//     })
//
//     revalidatePath("/")
// }
//
// export async function editTodo(formdata: FormData) {
//     const newTitle = formdata.get("newTitle") as string;
//     const inputId = formdata.get("inputId") as string;
//
//     await prisma.task.update({
//         where: {
//             id: inputId
//         },
//         data: {
//             title: newTitle
//         }
//     })
// }
//
// export async function deleteTodo(formdata: FormData) {
//     const inputId = formdata.get("inputId") as string;
//     await prisma.task.delete({
//         where: {
//             id: inputId
//         }
//     })
//     revalidatePath("/")
// }
//
// export async function changePriority(formData: FormData): Promise<void> {
//     const inputId: string = formData.get("inputId") as string;
//     const newPriority: number = parseInt(formData.get("prioritys") as string, 10);
//
//     if (isNaN(newPriority) || newPriority < 1 || newPriority > 3) {
//         console.error("Invalid priority value");
//         return;
//     }
//
//     await prisma.task.update({
//         where: {
//             id: inputId,
//         },
//         data: {
//             priority: newPriority,
//         },
//     });
//     revalidatePath("/");
// }
//
// export async function getAllToDos(order: string) {
//     "use server"
//     const sortOrder = castSortOrder(order);
//     return prisma.task.findMany({
//         select: {
//             title: true,
//             id: true,
//             isCompleted: true,
//             createdAt: true,
//             priority: true,
//         },
//         orderBy: {
//             createdAt: sortOrder,
//         } as any
//     });
//
//   function castSortOrder(order: string): Prisma.SortOrder {
//     if (order === "asc") return Prisma.SortOrder.asc;
//     if (order === "desc") return Prisma.SortOrder.desc;
//     return Prisma.SortOrder.asc;
// }
// }