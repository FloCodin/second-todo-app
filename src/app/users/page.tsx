import CreateUser from "@/app/components/users/CreateUser";
import UserOverview from "@/app/components/users/UserOverview";



export default function Page() {
    return (
        <div>
            <UserOverview/>
            <CreateUser/>
        </div>
    );
}