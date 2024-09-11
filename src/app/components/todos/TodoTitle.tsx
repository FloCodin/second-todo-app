"use client"
import {useState} from "react";
import Button from "@/app/components/button/Button";
import {MdEdit} from "react-icons/md";
import Form from "@/app/components/form/Form";
import Input from "@/app/components/inputField/Input";
import {taskProps} from "@/app/types/types";
import * as actions from "@/actions/actions"
import {revalidatePath} from "next/cache";


const TodoTitle = ({todo}: { todo: taskProps }) => {
    const [editTodoState, setEditTodoState] = useState(false);

    const handleEdit = () => {
        if (todo.isCompleted){
            return;
        }
        setEditTodoState(!editTodoState);
    };

    const handleSubmit = () => {
        setEditTodoState(!editTodoState)
    };

    return (
        <>

            <div className=" flex gap-5 items-center justify-center">{todo.title}
                <Button onClick={handleEdit} text={<MdEdit/>} bgColor="bg-blue-500" actionButton/>
                {editTodoState ? (
                    <Form action={actions.editTodo} onSubmit={handleSubmit}>
                        <Input name="inputId" value={todo.id} type="hidden"/>
                        <div className="flex justify-center">
                            <Input
                                name="newTitle"
                                placeholder={todo.title}
                                type="text">
                            </Input>
                            <Button type="submit" text="Save" bgColor="bg-blue-500"></Button>
                        </div>
                    </Form>
                ) : null}
            </div>
        </>
    )
}
export default TodoTitle





