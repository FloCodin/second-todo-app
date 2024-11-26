//store.js
import { create } from 'zustand'
import {
    getAllToDos,
    createTodo,
    updateTodoCombined,
    deleteTodo,
    createUser,
    getAllUsers,
    assignTodoToUser, createRole, getAllRoles,
} from "@/actions/actions";
import {User} from "@prisma/client";
import { deleteUser as deleteUserAction } from '@/actions/actions';
import addTodo from "@/app/components/todos/AddTodo";

interface taskProps {
    id: string;
    title: string;
    priority: number;
    isPinned: boolean;
    userId?: string;
}
interface Role {
    id: string;
    name: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    roles: Role[];
}

interface TodoStore {
    todos: taskProps[];
    setTodos: (todos: taskProps[]) => void;
    completeTodo: (id: string) => Promise<void>;
    changePriority: (id: string, newPriority: number) => void;
    fetchTodos: (order: string, sortBy: string, userOrder: string) => Promise<void>;
    addTodo: (input: string) => Promise<void>;
    deleteTodo: (id: string) => Promise<void>;
    editTodo: (id: string, newTitle: string, newPriority: number) => Promise<void>;
    togglePinned: (id: string) => Promise<void>;
    users: User[];
    setUsers: (users: User[]) => void;
    fetchUsers: () => Promise<void>;
    addUser: (name: string, email: string, selectedRoles: string[]) => Promise<void>;
    assignTodoToUser: (todoId: string, userId: string) => Promise<void>;
    deleteUser: (userId: string) => Promise<void>;
    roles: Role[];
    setRoles: (roles: Role[]) => void;
    fetchRoles: () => Promise<void>;
    addRole: (name: string) => Promise<void>;
}

const useStore = create<TodoStore>((set, get) => ({
    todos: [],
    users: [],
    roles: [],
    setRoles: (roles) => set({ roles }),
    setUsers: (users) => set({ users }),
    setTodos: (todos) => set({ todos }),

    addTodo: async (title) => {
        const formData = new FormData();
        formData.append('title', title);
        const newTodo = await createTodo(formData as FormData);
        if (newTodo) {
            set((state) => ({ todos: [...state.todos, newTodo] }));
        }
        await addTodo
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

    fetchTodos: async (dateOrder, priorityOrder, userOrder) => {
        const todos = await getAllToDos(dateOrder, priorityOrder, userOrder);
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

    fetchUsers: async () => {
        try {
            const users = await getAllUsers();
            set({ users: users as User[] });
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    },
    addUser:  async (name: string, email: string, roleIds: string[]): Promise<User> => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    roleIds.forEach(roleId => formData.append('roles', roleId));

    try {
        const newUser  = await createUser (formData as FormData);
        if (newUser ) {
            set((state) => ({ users: [...state.users, newUser ] }));
            return newUser ; // Make sure to return the new user object
        }
        throw new Error("Failed to create user");
    } catch (error) {
        console.error("Error in addUser :", error);
        throw error; // Ensure to throw the error so it can be caught in handleSubmit
    }
},
    assignTodoToUser: async (todoId, userId) => {
        await assignTodoToUser(todoId, userId);
        set((state) => ({
            todos: state.todos.map(todo =>
                todo.id === todoId ? { ...todo, userId: userId } : todo
            ),
        }));
    },
    deleteUser: async (userId: string) => {
        try {
            await deleteUserAction(userId);
            set((state) => ({
                users: state.users.filter(user => user.id !== userId)
            }));
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    },
    fetchRoles: async () => {
        try {
            const roles = await getAllRoles();
            set({ roles });
        } catch (error) {
            console.error("Error fetching roles:", error);
        }
    },

    addRole: async (name) => {
        const formData = new FormData();
        formData.append('name', name);
        const newRole = await createRole(formData as FormData);
        if (newRole) {
            set((state) => ({ roles: [...state.roles, newRole] }));
        }
    },
}));

export default useStore;