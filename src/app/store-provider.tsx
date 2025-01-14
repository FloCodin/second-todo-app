"use client"
import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'
import {createTodoStore, TodoState, TodoStore} from "@/app/store";

export type TodoStoreApi = ReturnType<typeof createTodoStore>

export const TodoStoreContext = createContext<TodoStoreApi | undefined>(
    undefined,
)

export interface TodoStoreProviderProps {
    children: ReactNode
    initState: TodoState
}

export const TodoStoreProvider =  ({children, initState}: TodoStoreProviderProps) => {
    const storeRef = useRef<TodoStoreApi>(null)
    if(!storeRef.current) {
        storeRef.current = createTodoStore(initState)
    }

    return (
        <TodoStoreContext.Provider value={storeRef.current}>{children}</TodoStoreContext.Provider>
    )
}

export const useTodoStore = <T,>(
    selector: (store: TodoStore) => T,
): T => {
    const todoStoreContext = useContext(TodoStoreContext)

    if(!todoStoreContext) {
        throw new Error(`useTodoStore must be used within TodoStoreProvider`)
    }

    return useStore(todoStoreContext, selector)
}