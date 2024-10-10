import { create } from 'zustand'
import { taskProps } from "@/app/types/types"
import { getAllToDos, createTodo, updateTodoCombined, deleteTodo } from "@/actions/actions";
import { FormData } from 'formdata-node';

interface TodoStore {
    todos: taskProps[];
    setTodos: (todos: taskProps[]) => void;
    completeTodo: (id: string) => Promise<void>;
    changePriority: (id: string, newPriority: number) => void;
    fetchTodos: (order: string, sortBy: string) => Promise<void>;
    addTodo: (input: string) => Promise<void>;
    deleteTodo: (id: string) => Promise<void>;
    editTodo: (id: string, newTitle: string, newPriority: number) => Promise<void>;
    togglePinned: (id: string) => Promise<void>;
}

const useStore = create<TodoStore>((set, get) => ({
    todos: [],
    setTodos: (todos) => set({ todos }),

    addTodo: async (input) => {
        const formData = new FormData();
        formData.append('input', input);
        const newTodo = await createTodo(formData);
        if (newTodo) {
            set((state) => ({ todos: [...state.todos, newTodo] }));
        }
    },

    deleteTodo: async (id) => {
        const formData = new FormData();
        formData.append('inputId', id);
        await deleteTodo(formData);
        set((state) => ({ todos: state.todos.filter(todo => todo.id !== id) }));
    },

    completeTodo: async (id) => {
        const todo = get().todos.find(t => t.id === id);
        if (todo) {
            const formData = new FormData();
            formData.append('inputId', id);
            formData.append('newTitle', todo.title);
            formData.append('prioritys', todo.priority.toString());
            const updatedTodo = await updateTodoCombined(formData);
            if (updatedTodo) {
                set((state) => ({
                    todos: state.todos.map(t =>
                        t.id === id ? { ...updatedTodo } : t
                    )
                }));
            }
        }
    },

    editTodo: async (id, newTitle, newPriority) => {
        const formData = new FormData();
        formData.append('inputId', id);
        formData.append('newTitle', newTitle);
        formData.append('prioritys', newPriority.toString());
        const updatedTodo = await updateTodoCombined(formData);
        if (updatedTodo) {
            set((state) => ({
                todos: state.todos.map(todo =>
                    todo.id === id ? { ...updatedTodo } : todo
                )
            }));
        }
    },

    changePriority: (id, newPriority) => set((state) => ({
        todos: state.todos.map(todo =>
            todo.id === id ? { ...todo, priority: newPriority } : todo
        )
    })),

    fetchTodos: async (dateOrder, priorityOrder) => {
        const todos = await getAllToDos(dateOrder, priorityOrder);
        console.log("Fetched Todos:", todos);
        set({ todos });
    },

    togglePinned: async (id) => {
        const todo = get().todos.find(t => t.id === id);
        if (todo) {
            const formData = new FormData();
            formData.append('inputId', id);
            formData.append('newTitle', todo.title);
            formData.append('prioritys', todo.priority.toString());
            const updatedTodo = await updateTodoCombined(formData);
            if (updatedTodo) {
                set((state) => ({
                    todos: state.todos.map(t =>
                        t.id === id ? { ...updatedTodo } : t
                    ).sort((a, b) => b.isPinned - a.isPinned)
                }));
            }
        }
    },
}));

export default useStore;
