import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/navBar/Navigation";
import {TodoStoreProvider} from "@/app/store-provider";
import {getAllRoles, getAllToDos, getAllUsers} from "@/actions/actions";
import {Role, TodoModel, User} from "@/app/types/types";
import {ToastContainer} from "react-toastify";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Todo Take 2",
    description: "Made by Flo",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const sortOrder = "desc"
    const users: User[] = await getAllUsers()
    const todos: TodoModel[] = await getAllToDos(sortOrder, sortOrder, sortOrder)
    const roles: Role[] = await getAllRoles()

    const initState = {
        users: users,
        todos: todos,
        roles: roles,
    }

    return (
        <html lang="de">

        <body className={inter.className}>
        <TodoStoreProvider initState={initState}>
            <Navbar/>
            <ToastContainer/>
            {children}
        </TodoStoreProvider>
        </body>
        </html>
    );
}