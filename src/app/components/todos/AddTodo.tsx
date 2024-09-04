import Form from "@/app/components/form/Form";
import Input from "@/app/components/inputField/Input";
import Button from "@/app/components/button/Button";
import * as actions from "@/actions/actions";


const AddTodo = () => {
    return (
        <div >
            <Form action={actions.createTodo}>
                <div className="flex flex-row gap-3">
                    <Input name="input" type="text" placeholder="Add Todo Here..."/>
                    <Button type="submit" text="Add" bgColor="bg-blue-600"/>

                </div>
            </Form>
        </div>
    );
}
export default AddTodo