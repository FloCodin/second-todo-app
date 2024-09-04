"use server"

import {prisma} from "@/app/utils/prisma";
import {revalidatePath} from "next/cache";
import {Task} from '@prisma/client';

export async function createTodo(formData: FormData){
    const input = formData.get('input') as string;
    if (!input.trim()){
        return;
    }
    await prisma.task.create({
        data: {
            title: input,
        },
    });
    revalidatePath("/")
}

export async function changeStatus (formData: FormData){
    const inputId= formData.get("inputId") as string
    const todo = await prisma.task.findUnique({
        where: {
            id: inputId,
        },
    })
    const updateStatus = !todo?.isCompleted;
    await prisma.task.update({
        where: {
            id: inputId
        },
        data:{
            isCompleted: updateStatus
        }
    })

    revalidatePath("/")
}
export async function editTodo (formdata: FormData){
    const newTitle = formdata.get("newTitle") as string;
    const inputId = formdata.get("inputId") as string;

    await prisma.task.update({
        where: {
            id: inputId
        },
        data:{
            title: newTitle
        }
    })
    revalidatePath("/")
}
export async function deleteTodo (formdata: FormData){
    const inputId = formdata.get("inputId") as string;
    await prisma.task.delete({
        where:{
            id: inputId
        }
    })
    revalidatePath("/")
}

export async function changePriority(formData: FormData): Promise<void> {
    const inputId: string = formData.get("inputId") as string;
    const newPriority: number = parseInt(formData.get("prioritys") as string, 10);

    if (isNaN(newPriority) || newPriority < 1 || newPriority > 3) {
        console.error("Invalid priority value");
        return;
    }

    await prisma.task.update({
        where: {
            id: inputId,
        },
        data: {
            priority: newPriority,
        },
    });
    revalidatePath("/");
}
