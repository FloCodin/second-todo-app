"use client"
import {useState} from "react";
import Button from "@/app/components/button/Button";
import {MdEdit} from "react-icons/md";
import Form from "@/app/components/form/Form";
import Input from "@/app/components/inputField/Input";
import {taskProps} from "@/app/types/types";
import * as actions from "@/actions/actions"


const EditTodo = ({todo}: { todo: taskProps }) => {
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
            <div className=" flex gap-5 items-center">
                <Button onClick={handleEdit} text={<MdEdit/>} actionButton/>
                {editTodoState ? (
                    <Form action={actions.editTodo} onSubmit={handleSubmit}>
                        <Input name="inputId" value={todo.id} type="hidden"/>
                        <div className="flex justify-center">
                            <Input
                                name="newTitle"
                                placeholder="Edit Todo..."
                                type="text">

                            </Input>
                            <Button type="submit" text="Save"></Button>
                        </div>
                    </Form>
                ) : null}
            </div>
        </>
    )
}
export default EditTodo





