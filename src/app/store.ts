//store.ts
import {createStore} from 'zustand/vanilla'
import {
    assignTodoToUser,
    createRole,
    createTodo,
    createUser,
    deleteTodo,
    deleteUser as deleteUserAction,
    getAllRoles,
    getAllToDos,
    getAllUsers, toggleTodoCompleted, toggleTodoPinned,
    updateTodoPriority, updateTodoTitle,
} from "@/actions/actions";
import {Role, TodoModel, User} from "@/app/types/types";
import {User as PrismaUser} from "@prisma/client";

export type TodoState = {
    todos: TodoModel[];
    users: User[];
    roles: Role[];
    error?: string
}

export type TodoActions = {
    completeTodo: (id: string , isCompleted: boolean) => Promise<void>;
    editTitle: (id: string, newTitle: string) => Promise<void>;
    changePriority: (id: string, newPriority: number) => void;
    fetchTodos: (order: string, sortBy: string, userOrder: string) => Promise<void>;
    addTodo: (input: string) => Promise<void>;
    deleteTodo: (id: string) => Promise<void>;
    editTodo: (id: string, newTitle: string, newPriority: number) => Promise<void>;
    togglePinned: (id: string) => Promise<void>;
    fetchUsers: () => Promise<void>;
    addUser: (name: string, email: string, selectedRoles: string[]) => Promise<PrismaUser>;
    assignTodoToUser: (todoId: string, userId: string) => Promise<void>;
    deleteUser: (userId: string) => Promise<void>;
    fetchRoles: () => Promise<void>;
    addRole: (name: string) => Promise<void>;
}




export type TodoStore = TodoState & TodoActions

export const defaultInitTodoState: TodoState = {
    users: [],
    todos: [] as TodoModel[],
    roles: []
}

export const createTodoStore = (
    initState: TodoState = defaultInitTodoState
) => {
    return createStore<TodoStore>()((set, get) => {
        return {
            ...initState,
            addRole: async (name) => {
                const formData = new FormData();
                formData.append('name', name);
                const newRole = await createRole(name);
                if (newRole) {
                    set((state) => ({roles: [...state.roles, newRole]}));
                }
            },
            addTodo: async (title: string,) => {
                try {
                    const newTodo = await createTodo(title); // Backend-Aufruf
                    console.log("New Todo from Backend:", newTodo);
                    const todos = await getAllToDos()

                    if (newTodo) {
                        set(() => ({
                            todos: todos,
                        }));
                    }
                    set(() => ({error: "error while adding todo"}));
                } catch (error) {
                    console.error(error);
                    set(() => ({error: "error while adding todo"}));
                }

            },


            addUser: async (name: string, email: string, roleIds: string[]): Promise<PrismaUser> => {
                const newUser = await createUser(name, email, roleIds);
                set((state) => ({
                    users: [...state.users, newUser as User],
                }));

                return newUser as User; // Typ hier explizit erzwingen
            },
            assignTodoToUser: async (todoId, userId) => {
                await assignTodoToUser(todoId, userId);
                set((state) => ({
                    todos: state.todos.map(todo =>
                        todo.id === todoId ? {...todo, userId: userId} : todo
                    ),
                }));
            },

            changePriority: (id, newPriority) => set((state) => ({
                todos: state.todos.map(todo =>
                    todo.id === id ? {...todo, priority: newPriority} : todo
                )
            })),

            completeTodo: async (id: string,) => {
                try {
                    const updatedTodo = await toggleTodoCompleted(id, )
                    console.log("updated Todo", updatedTodo);
                    const todos = await getAllToDos()

                    if (updatedTodo) {
                        set(() => ({
                            todos: todos,
                        }));
                    }
                } catch (error) {
                    console.error(error);
                    set(() => ({error: "error while adding todo"}));
                }

            },

            deleteTodo: async (id: string) => {
                console.log("Deleting Todo with ID:", id);
                await deleteTodo(id);
                set((state) => ({todos: state.todos.filter(todo => todo.id !== id)}));
                console.log("Updated Todos:", get().todos);
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
            editTitle: async (id: string, newTitle: string) => {
                try {
                    const updatedTodo = await updateTodoTitle(id, newTitle)
                    console.log("updated Todo", updatedTodo);
                    const todos = await getAllToDos()

                    if (updatedTodo) {
                        set(() => ({
                            todos: todos,
                        }));
                    }
                } catch (error) {
                    console.error(error);
                    set(() => ({error: "error while adding todo"}));
                }

            },
            editTodo: async (id, newTitle, newPriority) => {
                const formData = new FormData();
                formData.append('inputId', id);
                formData.append('newTitle', newTitle);
                formData.append("priority's", newPriority.toString());
                const updatedTodo = await updateTodoPriority(id, newPriority);
                if (updatedTodo) {
                    set((state) => ({
                        todos: state.todos.map(todo =>
                            todo.id === id ? {...updatedTodo} : todo
                        )
                    }));
                }
            },
            fetchRoles: async () => {
                try {
                    const roles = await getAllRoles();
                    set({roles});
                } catch (error) {
                    console.error("Error fetching roles:", error);
                }
            },
            fetchTodos: async (dateOrder, priorityOrder, userOrder) => {
                const todos = await getAllToDos(dateOrder, priorityOrder, userOrder);
                set({todos});
            },
            fetchUsers: async () => {
                try {
                    const users = await getAllUsers();
                    set({users: users as User[]});
                } catch (error) {
                    console.error("Error fetching users:", error);
                }
            },

            togglePinned: async (id) => {
                const todo = get().todos.find(t => t.id === id);
                if (todo) {

                    const updateTodo = await toggleTodoPinned(id);
                    if (updateTodo) {
                        set((state) => ({
                            todos: state.todos.map(t =>
                                t.id === id ? {...updateTodo, isPinned: !t.isPinned} : t
                            ).sort((a, b) => Number(b.isPinned) - Number(a.isPinned))
                        }));
                    }
                }
            },
        };
    })
}