
import AddTodo from "@/app/components/todos/AddTodo";
import {prisma} from "@/app/utils/prisma";
import Todo from "@/app/components/todos/Todo";
import {Prisma} from '@prisma/client'
import {taskProps} from "@/app/types/types";

async function getAllToDos() {
    return prisma.task.findMany({
        select: {
            title: true,
            id: true,
            isCompleted: true,
            createdAt: true,
            priority: true,
        },
        orderBy: {
            createdAt: Prisma.SortOrder.desc,
        } as any
    });
}


export default async function Home() {

    const data = await getAllToDos();

  return (
    <div className="">
        <div className="flex justify-center flex-col items-center mt-24">

            <AddTodo/>
            <div className="flex-colflex gap-2 justify-center mt-5 w-screen ">
                {data.map((item) => {
                    const todo: taskProps = {
                        id: item.id,
                        createdAt: new Date(item.createdAt), // Assuming item.createdAt is a string
                        title: item.title,
                        priority: item.priority,
                        isCompleted: item.isCompleted,
                    };
                    return (
                        <div className="w-full" key={todo.id}>
                            <Todo todo={todo}/>
                        </div>
                    );
                })}
            </div>


        </div>
    </div>
  );
}
