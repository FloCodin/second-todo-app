"use client"
import CreateUser from "@/app/components/users/CreateUser";
import UserOverview from "@/app/components/users/UserOverview";
import {useEffect} from "react";
import useStore from "@/app/store";


export default function Page() {

    const {users, todos, roles, fetchUsers, fetchTodos, fetchRoles} = useStore();

    useEffect(() => {
        const initializeData = async () => {
            try {
                await Promise.all(
                    [fetchUsers(),
                        fetchTodos("desc", "desc", "desc"),
                        fetchRoles()]
                )
            } catch (e) {
                console.log(e)
            }
        }
        initializeData()
    }, [fetchRoles, fetchTodos, fetchUsers]);

    return (
        <div>
            <UserOverview/>
            <CreateUser/>
        </div>
    );
}