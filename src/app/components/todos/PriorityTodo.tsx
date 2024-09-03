import React from 'react';
import Button from "@/app/components/button/Button";
import { GiFlyingFlag } from "react-icons/gi";
import { taskProps } from "@/app/types/types";
import {changePriority} from "@/actions/actions";

interface TodoProps {
    id: string;
    title: string;
    priority: number;
}

const PriorityTodo = ({ todo }: { todo: taskProps }) => {

    return (
        <form action={changePriority}>
            <input type="hidden" name="inputId" value={todo.id} />
            <Button
                type="submit"
                text={<GiFlyingFlag />}
            >
            </Button>
        </form>
    );
};

export default PriorityTodo;