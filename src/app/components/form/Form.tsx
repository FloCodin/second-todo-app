"use client"
import {formProps} from "@/app/types/types";
import {useRef} from "react";

const Form = ({children, action, className, onSubmit}: formProps) => {
    const ref = useRef<HTMLFormElement>(null)

    const formAction = async (formData: FormData) => {
        if (action) {
            await action(formData);
        }
        ref.current?.reset()
    }
    return (
        <form action={formAction}
              onSubmit={onSubmit}
              ref={ref}
        >
            {children}
        </form>
    )
}
export default Form;










