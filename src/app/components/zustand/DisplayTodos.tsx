"use client"
import useStore from "@/app/components/zustand/HookStore";
const DisplayTodos = () => {
    const { todos, deleteTodo, toggleTodo } = useStore((state) => {
        return {
            todos: state.todos,
            deleteTodo: state.deleteTodo,
            toggleTodo: state.toggleTodo
        };
    });
    return (
        <ul >
            {todos.map((todo) => (
                <li
                    key={todo.id}
                    style={{
                        textDecoration: todo.completed ? "line-through" : "none",
                    }}
                    onClick={() => toggleTodo(todo.id)}
                >
                    {todo.text}
                    <button className="pl-4" onClick={() => deleteTodo(todo.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default DisplayTodos;