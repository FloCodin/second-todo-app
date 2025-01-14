"use client"
import CreateUser from "@/app/components/users/CreateUser";
import UserOverview from "@/app/components/users/UserOverview";
import {useEffect} from "react";

import { toast } from "react-toastify";
import {useTodoStore} from "@/app/store-provider";



export default function Page() {

    const {fetchUsers, fetchTodos, fetchRoles} = useTodoStore(
        (state) => state,
    );

    useEffect(() => {
        const initializeData = async () => {
            try {
                await Promise.all([
                    fetchUsers().catch((e) => {
                        console.error("Fehler beim Laden der Benutzer:", e);
                        toast.error("Benutzer konnten nicht geladen werden.");
                    }),
                    fetchTodos("desc", "desc", "desc").catch((e) => {
                        console.error("Fehler beim Laden der Todos:", e);
                        toast.error("Todos konnten nicht geladen werden.");
                    }),
                    fetchRoles().catch((e) => {
                        console.error("Fehler beim Laden der Rollen:", e);
                        toast.error("Rollen konnten nicht geladen werden.");
                    })
                ]);
            } catch (e) {
                console.error("Allgemeiner Fehler beim Initialisieren:", e);
            }
        };
        initializeData();
    }, [fetchRoles, fetchTodos, fetchUsers]);


    return (
        <div>
            <UserOverview/>
            <CreateUser/>
        </div>
    );
}