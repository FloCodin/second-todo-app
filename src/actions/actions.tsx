"use server"

import { prisma } from "@/app/utils/prisma";
import { revalidatePath } from "next/cache";
import { Prisma } from '@prisma/client';

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
    revalidatePath("/")
    return newTodo;
}

interface Task {
    id: string;
    title: string;
    isCompleted: boolean;
    priority: number;
    isPinned: boolean;
}
export async function updateTodoCombined(formData: FormData){
    const inputId = formData.get("inputId") as string

    const allTodos = await getAllToDos("asc", "createdAt");
    const todo = await prisma.task.findUnique({
        where: { id: inputId },
    }) as Task | null;
    const updateStatus = !prisma.task.fields ?.isCompleted;

    const newTitle = formData.get("newTitle") as string;
    const newPriority: number = parseInt(formData.get("prioritys") as string, 10);

    if (isNaN(newPriority) || newPriority < 1 || newPriority > 3) {
        console.error("Invalid priority value");
        return null;
    }

    const updateData: Partial<Task> = {
        isCompleted: !todo?.isCompleted,
        priority: newPriority,
        isPinned: !todo?.isPinned,
    };

    if (newTitle && newTitle.trim() !== "") {
        updateData.title = newTitle.trim();
    }

    const updatedTodo = await prisma.task.update({
        where: { id: inputId },
        data: updateData,
    });
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
    revalidatePath("/")
    return { updatedTodo, allTodos, newPriority };
}

export async function deleteTodo(formdata: FormData) {
    const inputId = formdata.get("inputId") as string;
    await prisma.task.delete({
        where: {
            id: inputId
        }
    })
    revalidatePath("/")
    return inputId;
}


export async function getAllToDos(order: string, sortBy: string) {
    const sortOrder = castSortOrder(order);
    let orderBy: Prisma.TaskOrderByWithRelationInput[] = [
        { isPinned: 'desc' },
        sortBy === 'priority'
            ? { priority: 'desc' }
            : { createdAt: sortOrder }
    ];

    return prisma.task.findMany({
        orderBy: orderBy,
    });
}

function castSortOrder(order: string): Prisma.SortOrder {
    if (order === "asc") return Prisma.SortOrder.asc;
    if (order === "desc") return Prisma.SortOrder.desc;
    return Prisma.SortOrder.asc;
}







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