// app/store.ts
import { create } from 'zustand'
import { taskProps } from "@/app/types/types"
import { getAllToDos} from "@/actions/actions";

interface TodoStore {
    todos: taskProps[];
    setTodos: (todos: taskProps[]) => void;
    addTodo: (todo: taskProps) => void;
    deleteTodo: (id: string) => void;
    completeTodo: (id: string) => void;
    editTodo: (id: string, newTitle: string) => void;
    changePriority: (id: string, newPriority: number) => void;
    fetchTodos: (order: string, sortBy: string) => Promise<void>;
    togglePinned: (isPinned: string) => void;
}
// set= en spezielli funktion vo zustand, wo immer wieder aktualisiert, wird bi jedem uffruef neu grendert
const useStore = create<TodoStore>((set) => ({
    todos: [],
    setTodos: (todos) => set({ todos }),
    addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
    deleteTodo: (id) => set((state) => ({ todos: state.todos.filter(todo => todo.id !== id) })),
    completeTodo: (id) => set((state) => ({
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
    fetchTodos: async (order, sortBy) => {
        const todos = await getAllToDos(order, sortBy);
        set({ todos });
    },
    togglePinned: (id) => set((state) => {
        const updatedTodos = state.todos.map((todo) =>
            todo.id === id ? { ...todo, isPinned: !todo.isPinned } : todo
        );
        const sortedTodos = [
            ...updatedTodos.filter(todo => todo.isPinned),
            ...updatedTodos.filter(todo => !todo.isPinned)
        ];
        return { todos: sortedTodos };
    }),
}));

export default useStore;