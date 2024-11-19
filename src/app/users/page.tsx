import CreateUser from "@/app/components/users/createUser";
import UserOverview from "@/app/components/users/userOverview";



export default function Page() {
    return (
        <div>
            <UserOverview/>
            <CreateUser/>
        </div>
    );
}