'use client'
import React, {useEffect} from 'react';
import Button from "@/app/components/button/Button";
import { GiFlyingFlag } from "react-icons/gi";
import { taskProps } from "@/app/types/types";
import {changePriority} from "@/actions/actions";
import Form from "@/app/components/form/Form";
import { useState } from 'react';
import {event} from "next/dist/build/output/log";

const TodoPriority = ({ todo }: { todo: taskProps }) => {

    const [priority, setPriority] = useState(todo.priority);

    useEffect(() => {
        setPriority(todo.priority)
    }, [todo]);

    return (
        <>
        TP {todo.priority}
        P {priority}
        <Form action={changePriority} method="post">
            <input type="hidden" name="inputId" value={todo.id} />

            <select
                name="prioritys"
                id="priority-value"
                className="text-black"
                value={priority}
                onChange={(e) => {
                    setPriority(e.target.value as number);
                }}
            >
                <option value="1">Low Priority</option>
                <option value="2">Mid Priority</option>
                <option value="3">High Priority</option>
            </select>

            <Button
                type="submit"
                text="save"
                bgColor={"bg-blue-500"}
            >
            </Button>
        </Form>
        </>
    );
};

export default TodoPriority;