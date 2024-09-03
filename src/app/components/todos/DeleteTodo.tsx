import {taskProps} from "@/app/types/types";
import Form from "@/app/components/form/Form";
import * as actions from "@/actions/actions";
import Input from "@/app/components/inputField/Input";
import Button from "@/app/components/button/Button";
import {FaTrash} from "react-icons/fa";

const DeleteTodo = ({todo}: { todo: taskProps }) => {


    return(
        <Form action={actions.deleteTodo}>
            <Input name="inputId" type="hidden" value={todo.id}></Input>
            <Button actionButton type="submit" bgColor="bg-red-400" text={<FaTrash/>}></Button>
        </Form>
    )
}

export default DeleteTodo


