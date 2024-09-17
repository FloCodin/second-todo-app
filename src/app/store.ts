// app/store.ts
import { create } from 'zustand'
import { taskProps } from "@/app/types/types"
import * as actions from "@/actions/actions"

interface TodoStore {
    todos: taskProps[];
    setTodos: (todos: taskProps[]) => void;
    addTodo: (todo: taskProps) => void;
    deleteTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
    editTodo: (id: string, newTitle: string) => void;
    changePriority: (id: string, newPriority: number) => void;
    fetchTodos: (order: string) => Promise<void>;
}

const useStore = create<TodoStore>((set) => ({
    todos: [],
    setTodos: (todos) => set({ todos }),
    addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
    deleteTodo: (id) => set((state) => ({ todos: state.todos.filter(todo => todo.id !== id) })),
    toggleTodo: (id) => set((state) => ({
        todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
    })),
    editTodo: (id, newTitle) => set((state) => ({
        todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, title: newTitle } : todo
        )
    })),
    changePriority: (id, newPriority) => set((state) => ({
        todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, priority: newPriority } : todo
        )
    })),
    fetchTodos: async (order) => {
        const todos = await actions.getAllToDos(order);
        set({ todos });
    }
}));

export default useStore;