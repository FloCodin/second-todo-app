import CreateUser from "@/app/components/users/createUser";
import UserOverview from "@/app/components/users/userOverview";


type PageProps = {};

export default function Page(props: PageProps) {
    return (
        <div>
            <UserOverview/>
            <CreateUser/>
        </div>
    );
}