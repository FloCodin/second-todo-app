import { create } from 'zustand'
import { taskProps } from "@/app/types/types"
import { getAllToDos, createTodo, updateTodoCombined, deleteTodo } from "@/actions/actions";

interface taskProps {
    id: string;
    title: string;
    priority: number;
    isPinned: boolean;
}

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

    addTodo: async (newTodo) => {
        if (newTodo) {
            set((state) => ({ todos: [...state.todos, { ...newTodo }] }));
        }
    },


    deleteTodo: async (id) => {
        const formData = new FormData();
        formData.append('inputId', id);
        await deleteTodo(formData as FormData);
        set((state) => ({ todos: state.todos.filter(todo => todo.id !== id) }));
    },

    completeTodo: async (id) => {
        const todo = get().todos.find(t => t.id === id);
        if (todo) {
            const formData = new FormData();
            formData.append('inputId', id);
            formData.append('newTitle', todo.title);
            formData.append('prioritys', todo.priority.toString());
            const updatedTodo = await updateTodoCombined(formData as FormData);
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
        const updatedTodo = await updateTodoCombined(formData as FormData);
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
        set({ todos });
    },

    togglePinned: async (id) => {
        const todo = get().todos.find(t => t.id === id);
        if (todo) {
            const formData = new FormData();
            formData.append('inputId', id);
            formData.append('newTitle', todo.title);
            formData.append('prioritys', todo.priority.toString());
            const updatedTodo = await updateTodoCombined(formData as FormData);
            if (updatedTodo) {
                set((state) => ({
                    todos: state.todos.map(t =>
                        t.id === id ? { ...updatedTodo, isPinned: !t.isPinned } : t
                    ).sort((a, b) => Number(b.isPinned) - Number(a.isPinned))
                }));
            }
        }
    },
}));

export default useStore;